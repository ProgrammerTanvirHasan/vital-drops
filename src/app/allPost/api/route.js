import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const db = await connectDB();
    const postCollection = db.collection("allPost");
    const resp = await postCollection.find().toArray();
    return NextResponse.json(resp);
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 504 }
    );
  }
};
