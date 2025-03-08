import { connectDB } from "@/lib/connectDB";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

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
  ],

  callbacks: {
    async signIn({ account, user }) {
      if (account.provider === "google" || account.provider === "github") {
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
            const resp = await userCollection.insertOne(newUser);
            return user;
          } else {
            return user;
          }
        } catch (error) {
          throw new Error("login failed");
        }
      } else {
        return user;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role || "User";
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role || "User";
        session.user.email = token.email || "";
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
