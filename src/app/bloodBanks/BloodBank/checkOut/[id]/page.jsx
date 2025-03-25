"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import { use, useEffect, useState } from "react";

const Page = ({ params }) => {
  const param = use(params);
  const [rent, setRent] = useState({});
  const [loading, setLoading] = useState(true);
  const session = useSession();
  const ammount = parseInt(rent?.cabinRent) || 0;

  useEffect(() => {
    const cabinRent = async () => {
      try {
        const resp = await fetch(
          `http://localhost:3000/bloodBanks/BloodBank/api/${param.id}`
        );
        const data = await resp.json();
        setRent(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (param.id) {
      cabinRent();
    }
  }, [param.id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleCabin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const userName = form.userName.value;
    const userEmail = form.userEmail.value;
    const userNumber = form.userNumber.value;
    const userAddress = form.userAddress.value;
    const paymentMethod = form.paymentMethod.value;
    const ammount = parseInt(form.ammount.value) || 0;
    const userCity = form.userCity.value;
    const userArea = form.userArea.value;
    const userCountry = form.userCountry.value;

    const userDetails = {
      userName,
      userEmail,
      userNumber,
      userAddress,
      paymentMethod,
      ammount,
      userCity,
      userArea,
      userCountry,
    };

    try {
      const resp = await axios.post(
        `http://localhost:3000/bloodBanks/BloodBank/checkOut/api/${param.id}`,
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
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
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
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Page;
