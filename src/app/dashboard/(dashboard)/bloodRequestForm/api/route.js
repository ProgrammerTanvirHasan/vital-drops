import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const patientInfo = await request.json();
  try {
    const db = await connectDB();
    const patientInfoCollection = db.collection("PatientInfo");
    const resp = await patientInfoCollection.insertOne(patientInfo);
    return NextResponse.json(
      { message: "Blood request sending successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 504 }
    );
  }
};
