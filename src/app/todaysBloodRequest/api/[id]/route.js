import { connectDB } from "@/lib/connectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  try {
    const db = await connectDB();
    const patientInfoCollection = db.collection("PatientInfo");
    const resp = await patientInfoCollection.findOne({
      _id: new ObjectId(params.id),
    });
    return NextResponse.json(resp, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong", error: error.message },
      { status: 504 }
    );
  }
};

export const PATCH = async (request, { params }) => {
  try {
    const db = await connectDB();
    const patientInfoCollection = db.collection("PatientInfo");
    const updatedDoc = await request.json();
    const resp = await patientInfoCollection.updateOne(
      {
        _id: new ObjectId(params.id),
      },
      {
        $push: {
          comments: updatedDoc.comments,
        },
      }
    );
    return NextResponse.json(resp, { message: "Comment added successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong", error: error.message },
      { status: 504 }
    );
  }
};
