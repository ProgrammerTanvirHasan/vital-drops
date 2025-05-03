"use client";

import { useEffect, useState } from "react";

const RegDonor = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDonor = async () => {
      try {
        const resp = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/regDonor/api`
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
    return (
      <div className="min-h-screen flex flex-col items-center justify-center py-10">
        <div className="relative w-24 h-24">
          <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-rose-200 border-t-rose-600 rounded-full animate-spin"></div>
          </div>
          <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
            <div className="w-6 h-6 bg-white rounded-full animate-pulse"></div>
          </div>
        </div>
        <p className="mt-4 text-rose-800 font-medium">
          Searching for our donors...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
        Meet Our Lifesavers
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {donors.map((donor) => (
          <div
            key={donor._id}
            className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border-t-4 border-red-500"
          >
            <div className="flex flex-col items-center p-6">
              <div className="w-36 h-36 mb-4 rounded-full overflow-hidden border-4 border-red-400 shadow">
                <img
                  src={donor.image}
                  alt={donor.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-800">{donor.name}</h3>
              <span className="mt-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                {donor.blood}
              </span>
              <p className="text-gray-600 text-sm mt-2 text-center">
                {donor.address}
              </p>
              <p className="text-gray-500 text-sm">
                Last Donated: {donor.lastDonationDate || "N/A"}
              </p>
              <p className="mt-2 text-sm">
                📞{" "}
                <a
                  href={`tel:${donor.number}`}
                  className="text-blue-500 hover:underline"
                >
                  {donor.number}
                </a>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegDonor;
