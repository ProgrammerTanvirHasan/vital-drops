"use client";

import { useEffect, useState } from "react";

const RegDonor = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDonor = async () => {
      try {
        const resp = await fetch(
          "http://localhost:3000/dashboard/regDonor/api"
        );
        const data = await resp.json();
        setDonors(data);
      } catch (error) {
        console.error("Error fetching donors:", error);
      } finally {
        setLoading(false);
      }
    };
    getDonor();
  }, []);

  if (loading) {
    return <p className="text-center text-lg font-semibold">Loading...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-6">
        All Registered Donors
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {donors.map((donor) => (
          <div key={donor._id} className="bg-white p-4 rounded-lg shadow-md">
            <img
              src={donor.image}
              alt={donor.name}
              className="w-full h-40 object-cover rounded-lg"
            />
            <h3 className="text-xl font-semibold mt-3">{donor.name}</h3>
            <p className="text-gray-600">
              Blood Type: <span className="font-bold">{donor.blood}</span>
            </p>
            <p className="text-gray-600">Location: {donor.address}</p>
            <p className="text-gray-600">
              Last Donation: {donor.lastDonationDate}
            </p>
            <p className="text-gray-600">Contact: {donor.number}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegDonor;
