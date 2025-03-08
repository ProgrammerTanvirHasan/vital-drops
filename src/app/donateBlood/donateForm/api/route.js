import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const donor = await request.json();
  try {
    const db = await connectDB();
    const donorCollection = db.collection("Donor");
    const resp = await donorCollection.insertOne(donor);
    return NextResponse.json(
      { message: "Registered as a donor" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 504 }
    );
  }
};
