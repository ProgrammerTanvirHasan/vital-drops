import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    const db = await connectDB();
    const { searchParams } = new URL(request.url);
    const district = searchParams.get("district");

    const bankGroupCollection = db.collection("bankGroup");
    let query = {};
    if (district) {
      query = { address: district };
    }
    const resp = await bankGroupCollection.find(query).toArray();

    return NextResponse.json(resp, { status: 200 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { message: "Something went wrong", error: error.message },
      { status: 504 }
    );
  }
};
