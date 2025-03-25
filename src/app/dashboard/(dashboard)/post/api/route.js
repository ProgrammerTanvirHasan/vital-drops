import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const post = await request.json();
  try {
    const db = await connectDB();
    const postCollection = db.collection("allPost");
    const resp = await postCollection.insertOne(post);
    return NextResponse.json({ message: "post pubish successfully" }, resp);
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 504 }
    );
  }
};
