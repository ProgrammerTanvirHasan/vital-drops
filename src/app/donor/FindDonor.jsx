"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const FindDonor = () => {
  const [donors, setDonors] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedBlood, setSelectedBlood] = useState("");

  useEffect(() => {
    const fetchDonor = async () => {
      setLoading(true);
      setError("");
      try {
        const resp = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/donor/api?blood=${selectedBlood}`
        );
        if (!resp.ok) throw new Error("Failed to fetch donor data");

        const data = await resp.json();
        setDonors(data);
      } catch (err) {
        setError(err.message);
        setDonors([]);
      } finally {
        setLoading(false);
      }
    };

    if (selectedBlood) {
      fetchDonor();
    }
  }, [selectedBlood]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-rose-100 py-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Select your required blood type from the dropdown below to find
            compatible donors in your area. Donor details include contact
            information and last donation date.
          </p>

          <div className="relative inline-block group mb-8">
            <select
              name="blood"
              onChange={(e) => setSelectedBlood(e.target.value)}
              className="p-3 w-64 border-2 border-rose-400 focus:ring-2 focus:ring-rose-500 bg-white text-rose-900 rounded-lg outline-none shadow-md transition-all hover:shadow-lg appearance-none pr-10 font-semibold"
            >
              <option value="">Select Blood Type</option>
              <option value="AB_PLUS">AB+</option>
              <option value="A_PLUS">A+</option>
              <option value="B_PLUS">B+</option>
              <option value="B_MINUS">B-</option>
              <option value="AB_MINUS">AB-</option>
              <option value="A_MINUS">A-</option>
              <option value="O_PLUS">O+</option>
              <option value="O_MINUS">O-</option>
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg
                className="w-5 h-5 text-rose-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        {!selectedBlood && (
          <div className="mb-10 bg-white text-black rounded-xl shadow-lg p-6 mx-auto max-w-4xl">
            <h2 className="text-2xl font-bold text-center text-rose-800 mb-4">
              Blood Type Compatibility Chart
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-rose-50 p-4 rounded-lg">
                <h3 className="font-bold text-rose-700 mb-2">
                  If your blood type is:
                </h3>
                <ul className="space-y-1">
                  <li>
                    <span className="font-semibold">O-</span>: Universal donor
                    (can donate to all types)
                  </li>
                  <li>
                    <span className="font-semibold">O+</span>: Can donate to O+,
                    A+, B+, AB+
                  </li>
                  <li>
                    <span className="font-semibold">A-</span>: Can donate to A-,
                    A+, AB-, AB+
                  </li>
                  <li>
                    <span className="font-semibold">A+</span>: Can donate to A+,
                    AB+
                  </li>
                  <li>
                    <span className="font-semibold">B-</span>: Can donate to B-,
                    B+, AB-, AB+
                  </li>
                  <li>
                    <span className="font-semibold">B+</span>: Can donate to B+,
                    AB+
                  </li>
                  <li>
                    <span className="font-semibold">AB-</span>: Can donate to
                    AB-, AB+
                  </li>
                  <li>
                    <span className="font-semibold">AB+</span>: Can donate to
                    AB+ only
                  </li>
                </ul>
              </div>
              <div className="bg-rose-50 p-4 rounded-lg">
                <h3 className="font-bold text-rose-700 mb-2">
                  If you need blood, you can receive from:
                </h3>
                <ul className="space-y-1">
                  <li>
                    <span className="font-semibold">O-</span>: O- only
                  </li>
                  <li>
                    <span className="font-semibold">O+</span>: O-, O+
                  </li>
                  <li>
                    <span className="font-semibold">A-</span>: O-, A-
                  </li>
                  <li>
                    <span className="font-semibold">A+</span>: O-, O+, A-, A+
                  </li>
                  <li>
                    <span className="font-semibold">B-</span>: O-, B-
                  </li>
                  <li>
                    <span className="font-semibold">B+</span>: O-, O+, B-, B+
                  </li>
                  <li>
                    <span className="font-semibold">AB-</span>: O-, A-, B-, AB-
                  </li>
                  <li>
                    <span className="font-semibold">AB+</span>: All blood types
                    (universal recipient)
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded shadow">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-red-700 text-sm font-medium">{error}</p>
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-10">
            <div className="relative w-24 h-24">
              <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-rose-200 border-t-rose-600 rounded-full animate-spin"></div>
              </div>
              <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                <div className="w-6 h-6 bg-white rounded-full animate-pulse"></div>
              </div>
            </div>
            <p className="mt-4 text-rose-800 font-medium">
              Searching for donors...
            </p>
          </div>
        ) : donors.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 mb-10">
            {donors.map((donor) => (
              <div
                key={donor._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:shadow-xl"
              >
                <div className="md:flex">
                  <div className="md:w-1/3 bg-rose-50 flex items-center justify-center p-6">
                    <div className="relative overflow-hidden rounded-full border-4 border-rose-200 h-48 w-48 shadow-inner">
                      <Image
                        src={donor.image}
                        alt={`${donor.name}'s profile`}
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform hover:scale-105 duration-300"
                      />
                    </div>
                  </div>
                  <div className="md:w-2/3 p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-800">
                          {donor.name}
                        </h2>
                        <p className="text-gray-600 mb-2">{donor.email}</p>
                      </div>
                      <div className="bg-rose-600 text-white font-bold py-2 px-4 rounded-full text-xl">
                        {donor.blood
                          .replace("_PLUS", "+")
                          .replace("_MINUS", "-")}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-3 rounded">
                        <p className="text-gray-700">
                          <span className="font-semibold text-rose-700">
                            Phone:
                          </span>{" "}
                          {donor.number}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded">
                        <p className="text-gray-700">
                          <span className="font-semibold text-rose-700">
                            Date of Birth:
                          </span>{" "}
                          {donor.dob}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded">
                        <p className="text-gray-700">
                          <span className="font-semibold text-rose-700">
                            Last Donation:
                          </span>{" "}
                          {donor.lastDonationDate}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded">
                        <p className="text-gray-700">
                          <span className="font-semibold text-rose-700">
                            District:
                          </span>{" "}
                          {donor.address}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 bg-gray-50 p-3 rounded">
                      <p className="text-gray-700">
                        <span className="font-semibold text-rose-700">
                          Full Address:
                        </span>{" "}
                        {donor.fullAddress}
                      </p>
                    </div>

                    <div className="mt-4 text-xs text-gray-500 text-right">
                      <p>Posted on: {donor.currentDate}</p>
                    </div>

                    <div className="mt-4">
                      <button className="bg-rose-600 hover:bg-rose-700 text-white font-bold py-2 px-6 rounded-lg transition-colors shadow-md hover:shadow-lg">
                        Contact Donor
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : selectedBlood && !loading ? (
          <div className="bg-rose-50 border border-rose-200 rounded-lg p-10 text-center shadow-md">
            <svg
              className="w-16 h-16 text-rose-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 13a9 9 0 100-18 9 9 0 000 18z"
              ></path>
            </svg>
            <h3 className="text-2xl font-bold text-rose-800 mb-2">
              No donors found
            </h3>
            <p className="text-gray-600 mb-6">
              We couldn't find any donors matching the selected blood type.
              Please try a different blood type or check again later.
            </p>
            <button
              onClick={() => setSelectedBlood("")}
              className="bg-rose-600 hover:bg-rose-700 text-white font-bold py-2 px-6 rounded-lg transition-colors shadow-md hover:shadow-lg"
            >
              Reset Search
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default FindDonor;
