import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    const { searchParams } = new URL(request.url);
    const selectedBlood = searchParams.get("blood");
    const db = await connectDB();
    const donorCollection = db.collection("Donor");
    let query = {};
    if (selectedBlood) {
      query = {
        blood: selectedBlood,
      };
    }
    const resp = await donorCollection.find(query).toArray();

    return NextResponse.json(resp, { status: 200 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { message: "Something went wrong", error: error.message },
      { status: 504 }
    );
  }
};
