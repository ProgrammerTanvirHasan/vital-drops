import { connectDB } from "@/lib/connectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const DELETE = async (request, { params }) => {
  const db = await connectDB();
  const bankGroupCollection = db.collection("bankGroup");
  try {
    const resp = await bankGroupCollection.deleteOne({
      _id: new ObjectId(params.id),
    });
    return NextResponse.json(resp, { message: "blood bank deleted" });
  } catch (error) {
    return NextResponse.json(error, { message: "something went wrong" });
  }
};
