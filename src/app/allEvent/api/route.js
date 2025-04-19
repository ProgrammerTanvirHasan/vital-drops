import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";
export const GET = async () => {
  try {
    const db = await connectDB();
    const eventsCollection = db.collection("events");
    const resp = await eventsCollection.find().toArray();
    return NextResponse.json(resp, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong", error: error.message },
      { status: 504 }
    );
  }
};
