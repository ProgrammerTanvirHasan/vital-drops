"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import { use, useEffect, useState } from "react";

const Page = ({ params }) => {
  const { id } = use(params);
  const [rent, setRent] = useState({});
  const [loading, setLoading] = useState(true);
  const session = useSession();
  const ammount = parseInt(rent?.cabinRent) || 0;

  useEffect(() => {
    const cabinRent = async () => {
      try {
        const resp = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/bloodBanks/BloodBank/api/${id}`
        );
        const data = await resp.json();
        setRent(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      cabinRent();
    }
  }, [id]);

  if (loading) {
    return <p className="min-h-screen">Please wait...</p>;
  }

  const handleCabin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const userName = form.userName.value;
    const userEmail = form.userEmail.value;
    const userNumber = form.userNumber.value;
    const userAddress = form.userAddress.value;
    const paymentMethod = form.paymentMethod.value;
    const amount = parseInt(form.ammount.value) || 0;
    const userCity = form.userCity.value;
    const userArea = form.userArea.value;
    const userCountry = form.userCountry.value;

    const userDetails = {
      userName,
      userEmail,
      userNumber,
      userAddress,
      paymentMethod,
      amount,
      userCity,
      userArea,
      userCountry,
    };

    try {
      const resp = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/bloodBanks/BloodBank/checkOut/api/${id}`,
        userDetails,
        { headers: { "Content-Type": "application/json" } }
      );
      const redirectURL = resp?.data?.paymentURL;
      if (redirectURL) {
        window.location.replace(redirectURL);
      }
    } catch (error) {
      console.error(
        "Error submitting form:",
        error.response?.data || error.message || error
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white text-black p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>
      <img
        className="h-[400px] min-w-full"
        src={rent?.ourCabin}
        alt="cabin img"
      />

      <form onSubmit={handleCabin} className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Billing Details</h3>
        <input
          type="text"
          name="userName"
          defaultValue={session?.data?.user?.name || ""}
          placeholder="Full Name"
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="email"
          name="userEmail"
          defaultValue={session?.data?.user?.email || ""}
          placeholder="Email Address"
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="text"
          name="userNumber"
          placeholder="Phone Number"
          className="w-full p-2 border rounded mb-2"
        />

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Shipping Address</h3>
          <input
            type="text"
            name="userAddress"
            placeholder="Street Address"
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="text"
            name="userCity"
            placeholder="City"
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="text"
            name="userArea"
            placeholder="ZIP Code"
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="text"
            name="userCountry"
            placeholder="Country"
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Payment Method</h3>
          <select name="paymentMethod" className="w-full p-2 border rounded">
            <option>Credit Card</option>
            <option>PayPal</option>
            <option>Bank Transfer</option>
          </select>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg mb-6 flex justify-between">
          <h3 className="text-lg font-semibold mb-2">Price</h3>
          <input
            type="text"
            name="ammount"
            defaultValue={ammount}
            className="p-2 border rounded"
            readOnly
          />
        </div>

        <button
          type="submit"
          className="block text-center bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-full hover:from-cyan-600 hover:to-teal-600 transition p-2 w-full"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Page;
