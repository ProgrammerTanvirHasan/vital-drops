import { connectDB } from "@/lib/connectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const DELETE = async (request, { params }) => {
  const db = await connectDB();
  const eventsCollection = db.collection("events");
  try {
    const resp = await eventsCollection.deleteOne({
      _id: new ObjectId(params.id),
    });
    return NextResponse.json(resp, { message: "events deleted" });
  } catch (error) {
    return NextResponse.json(error, { message: "something went wrong" });
  }
};
