import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";
const corsHeaders = {
  "Access-Control-Allow-Origin":
    "https://vital-drops-mhcycuafp-tanvirs-projects-83d6fcaf.vercel.app",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};
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
