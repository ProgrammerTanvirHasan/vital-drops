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
          "http://localhost:3000/dashboard/allSession/api"
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
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold">Data Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {banks.map((bank) => (
          <div key={bank._id} className="border p-5  shadow-2xl bg-slate-300  ">
            <h3 className="text-xl font-semibold text-gray-800">{bank.name}</h3>
            <p className="text-gray-600">
              <strong>Contact:</strong> {bank.contact}
            </p>
            <p className="text-gray-600">
              <strong>Email:</strong> {bank.email}
            </p>
            <p className="text-gray-600">
              <strong>District:</strong> {bank.district}
            </p>
            <p className="text-gray-600">
              <strong>Blood Types:</strong> {bank.blood_types}
            </p>
            <p className="text-gray-600">
              <strong>Working Hours:</strong> {bank.hours}
            </p>
            <p className="text-gray-600">
              <strong>Address:</strong> {bank.FullAddress}
            </p>
            <p className="text-gray-600">
              <strong>Info:</strong> {bank.additional_info}
            </p>
            <p className="text-red-500 font-bold">
              <strong>Cabin Rent:</strong> ${bank.cabinRent}
            </p>
            <img
              src={bank.ourCabin}
              alt="Cabin"
              className="w-full h-40 object-cover mt-3 rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllSession;
