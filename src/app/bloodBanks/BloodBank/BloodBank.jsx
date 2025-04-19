"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const BloodBank = () => {
  const [bloodBanks, setBloodBanks] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState("");

  useEffect(() => {
    const fetchBloodBanks = async () => {
      setLoading(true);
      setError("");

      if (selectedDistrict) {
        try {
          const resp = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/bloodBanks/BloodBank/api/getall?district=${selectedDistrict}`
          );
          if (!resp.ok) throw new Error("Failed to fetch blood bank data");

          const data = await resp.json();
          setBloodBanks(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchBloodBanks();
  }, [selectedDistrict]);

  return (
    <div className="min-h-screen shadow-2xl">
      <div className="container mx-auto">
        <div className="relative mb-4">
          <label>
            <p>Find your nearest blood bank</p>
          </label>
          <select
            name="district"
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="p-2 w-64 border focus:ring-2 bg-slate-950 glass ring-blue-400 text-white rounded-md outline-none"
          >
            <option value="">Select Any location</option>
            <option value="jamalpur">jamalpur</option>
            <option value="mymensingh">mymensingh</option>
            <option value="sherpur">sherpur</option>
            <option value="tangail">tangail</option>
            <option value="bogura">bogura</option>
            <option value="dhaka">dhaka</option>
            <option value="munshiganj">munshiganj</option>
            <option value="gajipur">gajipur</option>
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
      ) : selectedDistrict && bloodBanks.length === 0 ? (
        <p className="text-xl text-red-700 container mx-auto">
          No blood banks found!
        </p>
      ) : (
        bloodBanks.length > 0 && (
          <ul className="container mx-auto">
            {bloodBanks.map((bank) => (
              <li key={bank._id} className="mt-2 p-2 border-b border-gray-300">
                <strong>{bank.name}</strong> - {bank.FullAddress} (
                {bank.contact})
                <div className="flex justify-end">
                  <Link href={`/bloodBanks/BloodBank/${bank._id}`}>
                    <button className="btn bg-green-600 text-red-950">
                      View Details
                    </button>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )
      )}
    </div>
  );
};

export default BloodBank;
