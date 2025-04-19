import { connectDB } from "@/lib/connectDB";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

export const authOptions = {
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        if (!email || !password) {
          throw new Error("Email and password are required");
        }

        const db = await connectDB();
        const currentUser = await db.collection("users").findOne({ email });
        if (!currentUser) {
          throw new Error("User not found");
        }
        const matchPassword = await bcrypt.compare(
          password,
          currentUser.password
        );

        if (!matchPassword) {
          throw new Error("Incorrect password");
        }

        return {
          email: currentUser?.email,
          name: currentUser?.name,
          role: currentUser?.role,
          image: currentUser?.image,
        };
      },
    }),

    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_ID,
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ account, user, profile }) {
      if (account.provider === "facebook") {
        user.id = profile.id;
      }
      if (
        account.provider === "google" ||
        account.provider === "github" ||
        account.provider === "facebook"
      ) {
        const { name, email, image } = user;
        try {
          const db = await connectDB();
          if (!db) {
            throw new Error("Database connection failed");
          }
          const userCollection = db.collection("users");
          const exist = await userCollection.findOne({ email });

          if (!exist) {
            const newUser = {
              name,
              email,
              image,
              role: "User",
            };
            await userCollection.insertOne(newUser);
            user.role = "User";
            return user;
          } else {
            user.role = exist.role || "User";
            return user;
          }
        } catch (error) {
          throw new Error("login failed");
        }
      } else {
        return user;
      }
    },

    async jwt({ token, account, profile, user }) {
      if (user) {
        token.role = user.role || "User";
        token.email = user.email;
        token.name = user.name;
        token.image = user.image || token.image || "";
      }

      if (account && profile && account.provider === "facebook") {
        token.facebookId = profile.id;
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.role = token.role || "User";
        session.user.email = token.email || "";
        session.user.image = token.image || "";
        if (token.facebookId) {
          session.user.facebookProfile = `https://www.facebook.com/${token.facebookId}`;
        }
      }

      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
