"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const FindDonor = () => {
  const [donors, setDonors] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedBlood, setSelectedBlood] = useState("");

  useEffect(() => {
    const fetchDonor = async () => {
      try {
        const resp = await fetch(
          `http://localhost:3000/donor/api?blood=${selectedBlood}`
        );
        if (!resp.ok) throw new Error("Failed to fetch donor data");

        const data = await resp.json();
        setDonors(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedBlood) {
      fetchDonor();
    }
  }, [selectedBlood]);

  return (
    <div className="min-h-screen shadow-2xl ">
      <div className="container mx-auto ">
        <div className="relative mb-4">
          <label>
            <p>Find Your Donor</p>
          </label>
          <select
            name="district"
            onChange={(e) => setSelectedBlood(e.target.value)}
            className="p-2 w-64 border focus:ring-2 bg-slate-950 glass ring-blue-400 text-white rounded-md outline-none"
          >
            <option value="">Select blood</option>
            <option value="AB_PLUS">AB+</option>
            <option value="A_PLUS">A+</option>
            <option value="B_PLUS">B+</option>
            <option value="B_MINUS">B-</option>
            <option value="AB_MINUS">AB-</option>
            <option value="A_MINUS">A-</option>
            <option value="O_PLUS">O+</option>
            <option value="O_MINUS">O-</option>
          </select>
        </div>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {loading ? (
        <div className="ml-12">
          Loading...
          <span className="loading loading-ring loading-xs"></span>
          <span className="loading loading-ring loading-sm"></span>
          <span className="loading loading-ring loading-md"></span>
          <span className="loading loading-ring loading-lg"></span>
          <span className="loading loading-ring loading-xl"></span>
        </div>
      ) : donors.length > 0 ? (
        <ul>
          {donors.map((donor) => (
            <li
              className="shadow-2xl w-3/4 mx-auto bg-gray-200"
              key={donor._id}
              style={{
                border: "1px solid black",
                padding: "10px",
                marginBottom: "10px",
              }}
            >
              <div className="lg:flex flex-row-reverse justify-around">
                <div>
                  <Image
                    src={
                      donor.image ||
                      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    }
                    alt="Donor profile"
                    height={250}
                    width={250}
                  ></Image>
                </div>
                <div>
                  <p>
                    <strong>Name:</strong> {donor.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {donor.email}
                  </p>
                  <p>
                    <strong>Blood Type:</strong> {donor.blood}
                  </p>
                  <p>
                    <strong>Phone:</strong> {donor.number}
                  </p>
                  <p>
                    <strong>Date of Birth:</strong> {donor.dob}
                  </p>
                  <p>
                    <strong>Last Donation Date:</strong>{" "}
                    {donor.lastDonationDate}
                  </p>
                  <p>
                    <strong>District:</strong> {donor.address}
                  </p>
                  <p>
                    <strong>Address:</strong> {donor.fullAddress}
                  </p>
                  <p>
                    <strong>PostDate:</strong> {donor.currentDate}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-xl text-red-700 container mx-auto">
          No donors found !
        </p>
      )}
    </div>
  );
};

export default FindDonor;
