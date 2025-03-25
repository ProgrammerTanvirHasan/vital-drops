import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const formData = await req.formData();
    const tran_id = formData.get("tran_id");
    if (!tran_id) {
      return NextResponse.json(
        { error: "Transaction ID missing" },
        { status: 400 }
      );
    }
    const db = await connectDB();
    const paymentCollection = db.collection("payment");
    await paymentCollection.updateOne(
      { paymentID: tran_id },
      { $set: { status: "completed" } }
    );
    const clientRedirectURL = `http://localhost:3000/bloodBanks/success?tran_id=${tran_id}`;
    return NextResponse.redirect(clientRedirectURL);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Database update failed" },
      { status: 500 }
    );
  }
};
