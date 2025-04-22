import { connectDB } from "@/lib/connectDB";
import axios from "axios";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import qs from "querystring";
export const POST = async (request) => {
  try {
    const userDetails = await request.json();
    const trx_id = new ObjectId().toString();
    const initiateData = {
      store_id: "vital67def698aa36d",
      store_passwd: "vital67def698aa36d@ssl",
      total_amount: userDetails.ammount,
      currency: "BDT",
      tran_id: trx_id,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/success`,
      fail_url: `${process.env.NEXT_PUBLIC_BASE_URL}/bloodBanks/api/fail`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/bloodBanks/api/cencel`,
      cus_name: "Customer Name",
      cus_email: "cust@yahoo.com",
      cus_add1: "Dhaka",
      cus_add2: "Dhaka",
      cus_city: "Dhaka",
      cus_state: "Dhaka",
      cus_postcode: "1000",
      cus_country: "Bangladesh",
      cus_phone: "01711111111",
      cus_fax: "01711111111",
      shipping_method: "NO",
      product_name: "Cabion room",
      product_category: "Room",
      product_profile: "general",
      multi_card_name: "mastercard,visacard,amexcard",
      value_a: "ref001_A",
      value_b: "ref002_B",
      value_c: "ref003_C",
      value_d: "ref004_D",
    };

    const response = await axios.post(
      `https://sandbox.sslcommerz.com/gwprocess/v4/api.php`,
      qs.stringify(initiateData),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const data = {
      cus_name: userDetails.userName,
      paymentID: trx_id,
      amount: userDetails.ammount,
      status: "pending",
    };

    const db = await connectDB();
    const paymentCollection = db.collection("payment");
    const res = await paymentCollection.insertOne(data);
    if (res) {
      return NextResponse.json({ paymentURL: response?.data?.GatewayPageURL });
    }
  } catch (error) {
    return NextResponse.json({ error: "internel problem" });
  }
};
