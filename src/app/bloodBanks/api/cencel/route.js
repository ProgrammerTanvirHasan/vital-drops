import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const formData = await req.formData();
    const tran_id = formData.get("tran_id");

    if (!tran_id) {
      return NextResponse.json(
        { error: "Transaction ID missing" },
        { status: 404 }
      );
    }

    const clientRedirectURL = `http://localhost:3000/bloodBanks/fail?tran_id=${tran_id}`;
    return NextResponse.redirect(clientRedirectURL, 307);
  } catch (error) {
    console.error("Fail Route Error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
};
