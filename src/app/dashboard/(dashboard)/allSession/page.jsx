"use client";

import axios from "axios";
import { useEffect, useState } from "react";

const AllSession = () => {
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBloodBank = async () => {
      try {
        const resp = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/allSession/api`
        );
        setBanks(resp.data);
      } catch (error) {
        console.error("Error fetching blood bank data:", error);
      } finally {
        setLoading(false);
      }
    };

    getBloodBank();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-10 min-h-screen">
        <div className="relative w-24 h-24">
          <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-rose-200 border-t-rose-600 rounded-full animate-spin"></div>
          </div>
          <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
            <div className="w-6 h-6 bg-white rounded-full animate-pulse"></div>
          </div>
        </div>
        <p className="mt-4 text-rose-800 font-medium">
          Searching for blood bank...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto ">
      <div className="grid grid-cols-1  gap-6">
        {banks.map((bank) => (
          <div
            key={bank._id}
            className="bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row items-center gap-6"
          >
            <div className="flex-shrink-0">
              <img
                src={bank.ourCabin}
                alt="Donor"
                className="w-96  h-64 object-cover  border-4 border-pink-200"
              />
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">
                  {bank.name}
                </h2>
                <div className="bg-red-600 text-white font-bold px-3 py-1 rounded-full">
                  Contact Anytime
                </div>
              </div>
              <p className="text-sm text-gray-600">{bank.email}</p>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                <p>
                  <span className="font-semibold text-red-600">Contact:</span>{" "}
                  {bank.contact}
                </p>
                <p>
                  <span className="font-semibold text-red-600">District:</span>{" "}
                  {bank.district}
                </p>
                <p>
                  <span className="font-semibold text-red-600">
                    Working Hours:
                  </span>{" "}
                  {bank.hours}
                </p>
                <p>
                  <span className="font-semibold text-red-600">
                    Cabin Rent:
                  </span>{" "}
                  ${bank.cabinRent}
                </p>
              </div>
              <p className="text-sm">
                <span className="font-semibold text-red-600">Address:</span>{" "}
                <span className="text-black"> {bank.FullAddress}</span>
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-semibold text-red-600">Info:</span>{" "}
                {bank.additional_info}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllSession;
