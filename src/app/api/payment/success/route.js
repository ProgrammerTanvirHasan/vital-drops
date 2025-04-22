import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const formData = await req.formData();
    const tran_id = formData.get("tran_id");
    const url = new URL(req.url);
    const status = url.searchParams.get("status");

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
      { $set: { status: status || "unknown" } }
    );

    return new NextResponse(null, {
      status: 302,
      headers: {
        Location: `http://localhost:3000/paymentSection/status/${status}?tran_id=${tran_id}`,
      },
    });
  } catch (error) {
    console.error("Error in success handler:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
};
