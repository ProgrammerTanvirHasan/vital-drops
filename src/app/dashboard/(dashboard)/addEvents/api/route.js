import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const events = await request.json();
  try {
    const db = await connectDB();
    const eventsCollection = db.collection("events");
    const resp = await eventsCollection.insertOne(events);
    return NextResponse.json({ message: "New events added" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 504 }
    );
  }
};


