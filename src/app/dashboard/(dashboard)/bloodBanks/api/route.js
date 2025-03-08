import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const bankInfo = await request.json();

  try {
    const db = await connectDB();
    const bankGroupCollection = db.collection("bankGroup");

    const resp = await bankGroupCollection.insertOne(bankInfo);

    return NextResponse.json(
      resp,
      { message: "Blood bank added to the website" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 504 }
    );
  }
};
