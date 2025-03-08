import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
export const POST = async (request) => {
  const user = await request.json();
  const email = user?.email;
  try {
    const db = await connectDB();
    const userCollection = db.collection("users");
    const exist = await userCollection.findOne({ email });
    if (exist) {
      return NextResponse.json(
        { message: "User aalredy added" },
        { status: 400 }
      );
    }
    const hashPassword = bcrypt.hashSync(user.password, 14);
    const resp = await userCollection.insertOne({
      ...user,
      password: hashPassword,
    });

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 504 }
    );
  }
};
