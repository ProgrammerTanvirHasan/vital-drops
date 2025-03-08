import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const db = await connectDB();
    const patientInfoCollection = db.collection("PatientInfo");
    const resp = await patientInfoCollection.find().toArray();
    return NextResponse.json(resp, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong", error: error.message },
      { status: 504 }
    );
  }
};
