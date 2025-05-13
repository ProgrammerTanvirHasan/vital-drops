import { connectDB } from "@/lib/connectDB";
import axios from "axios";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    const userDetails = await request.json();

    // Validate required fields
    const requiredFields = [
      "userName",
      "userEmail",
      "userAddress",
      "userCity",
      "userArea",
      "userCountry",
      "userNumber",
      "amount",
    ];
    for (const field of requiredFields) {
      if (!userDetails[field]) {
        return NextResponse.json(
          { error: `Missing field: ${field}` },
          { status: 400 }
        );
      }
    }

    const trx_id = new ObjectId().toString();
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

    if (!BASE_URL) {
      return NextResponse.json(
        { error: "Base URL is not defined" },
        { status: 500 }
      );
    }

    const initiateData = {
      store_id: "vital67def698aa36d",
      store_passwd: "vital67def698aa36d@ssl",
      total_amount: userDetails.amount,
      currency: "BDT",
      tran_id: trx_id,
      success_url: `${BASE_URL}/api/payment/success?status=success`,
      fail_url: `${BASE_URL}/api/payment/success?status=cancel`,
      cancel_url: `${BASE_URL}/api/payment/success?status=fail`,
      cus_name: userDetails.userName,
      cus_email: userDetails.userEmail,
      cus_add1: userDetails.userAddress,
      cus_add2: userDetails.userAddress,
      cus_city: userDetails.userCity,
      cus_state: "Dhaka",
      cus_postcode: userDetails.userArea,
      cus_country: userDetails.userCountry,
      cus_phone: userDetails.userNumber,
      cus_fax: "01711111111",
      shipping_method: "NO",
      product_name: "Cabin room",
      product_category: "Room",
      product_profile: "general",
      multi_card_name: "mastercard,visacard,amexcard",
      value_a: "ref001_A",
      value_b: "ref002_B",
      value_c: "ref003_C",
      value_d: "ref004_D",
    };

    const formBody = new URLSearchParams(initiateData).toString();

    const sslRes = await axios.post(
      "https://sandbox.sslcommerz.com/gwprocess/v4/api.php",
      formBody,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const gatewayURL = sslRes?.data?.GatewayPageURL;

    if (!gatewayURL) {
      return NextResponse.json(
        { error: "Payment gateway response invalid" },
        { status: 500 }
      );
    }

    // Save payment record
    const db = await connectDB();
    const paymentCollection = db.collection("payment");

    const insertResult = await paymentCollection.insertOne({
      cus_name: userDetails.userName,
      paymentID: trx_id,
      amount: userDetails.amount,
      status: "pending",
      createdAt: new Date(),
    });

    if (insertResult.insertedId) {
      return NextResponse.json({ paymentURL: gatewayURL });
    } else {
      return NextResponse.json(
        { error: "Database insertion failed" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Payment Initiation Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
