import { connectDB } from "@/lib/connectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  try {
    const { id } = await params;
    const db = await connectDB();

    const bankGroupCollection = db.collection("bankGroup");

    const resp = await bankGroupCollection.findOne({
      _id: new ObjectId(String(id)),
    });

    return NextResponse.json(resp, { status: 200 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { message: "Something went wrong", error: error.message },
      { status: 504 }
    );
  }
};

export const PATCH = async (request, { params }) => {
  try {
    const { id } = await params;
    const updatedDoc = await request.json();
    console.log(updatedDoc, "updateddoc");
    const db = await connectDB();

    const bankGroupCollection = db.collection("bankGroup");

    const resp = await bankGroupCollection.updateOne(
      {
        _id: new ObjectId(String(id)),
      },
      {
        $set: updatedDoc,
      },
      {
        upsert: true,
      }
    );

    return NextResponse.json(resp, { status: 200 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { message: "Something went wrong", error: error.message },
      { status: 504 }
    );
  }
};
