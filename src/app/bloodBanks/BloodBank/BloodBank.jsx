"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const BloodBank = () => {
  const [bloodBanks, setBloodBanks] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const bloodBankInfo = [
    {
      id: 1,
      title: "Blood Testing",
      description:
        "Blood banks screen donated blood for infectious diseases and determine blood type.",
      icon: "🔬",
    },
    {
      id: 2,
      title: "Storage",
      description:
        "Blood is stored in special refrigeration units at precisely controlled temperatures.",
      icon: "❄️",
    },
    {
      id: 3,
      title: "Distribution",
      description:
        "Blood banks supply hospitals and medical facilities with needed blood products.",
      icon: "🚑",
    },
    {
      id: 4,
      title: "Components Separation",
      description:
        "Donated blood can be separated into red cells, plasma, and platelets.",
      icon: "🧪",
    },
    {
      id: 5,
      title: "Regular Donations",
      description:
        "Blood banks rely on regular donations to maintain adequate supplies.",
      icon: "♻️",
    },
    {
      id: 6,
      title: "Emergency Response",
      description:
        "Blood banks mobilize during disasters to meet increased demand.",
      icon: "🚨",
    },
  ];

  const bloodBankServices = [
    "Blood collection from donors",
    "Blood component preparation",
    "Blood storage and inventory management",
    "Blood testing and screening",
    "Cross-matching for transfusions",
    "Distribution to hospitals and healthcare facilities",
    "Mobile blood drives and donor recruitment",
    "Research and development of blood products",
    "Therapeutic apheresis services",
    "Stem cell collection and processing",
  ];

  useEffect(() => {
    const fetchBloodBanks = async () => {
      if (!selectedDistrict) return;

      setLoading(true);
      setError("");

      try {
        const resp = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/bloodBanks/BloodBank/api/getall?district=${selectedDistrict}`
        );
        if (!resp.ok) throw new Error("Failed to fetch blood bank data");

        const data = await resp.json();
        setBloodBanks(data);
      } catch (err) {
        setError(err.message);
        setBloodBanks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBloodBanks();
  }, [selectedDistrict]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-rose-100 py-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Select your district from the dropdown menu to find blood banks in
            your area. Our database includes contact information and addresses
            for each facility.
          </p>

          <div className="relative inline-block group mb-8">
            <select
              name="district"
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="p-3 w-64 border-2 border-rose-400 focus:ring-2 focus:ring-rose-500 bg-white text-rose-900 rounded-lg outline-none shadow-md transition-all hover:shadow-lg appearance-none pr-10 font-semibold capitalize"
            >
              <option value="">Select District</option>
              <option value="jamalpur">Jamalpur</option>
              <option value="mymensingh">Mymensingh</option>
              <option value="sherpur">Sherpur</option>
              <option value="tangail">Tangail</option>
              <option value="bogura">Bogura</option>
              <option value="dhaka">Dhaka</option>
              <option value="munshiganj">Munshiganj</option>
              <option value="gajipur">Gajipur</option>
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

        {!selectedDistrict && (
          <div className="mb-10 bg-white rounded-xl shadow-lg p-6 mx-auto max-w-4xl">
            <h2 className="text-2xl font-bold text-center text-rose-800 mb-4">
              What Blood Banks Do
            </h2>
            <p className="text-gray-600 mb-6 text-center">
              Blood banks are essential healthcare facilities that collect,
              process, store, and distribute blood and blood components. They
              play a crucial role in ensuring safe blood transfusions and saving
              lives during emergencies.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bloodBankInfo.map((info) => (
                <div
                  key={info.id}
                  className="bg-gradient-to-br from-rose-50 to-white p-5 rounded-lg shadow hover:shadow-md transition-all transform hover:-translate-y-1 border border-rose-100"
                >
                  <div className="text-3xl mb-3">{info.icon}</div>
                  <h3 className="font-bold text-rose-700 text-lg mb-2">
                    {info.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{info.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {!selectedDistrict && (
          <div className="mb-10 bg-white rounded-xl shadow-lg p-6 mx-auto max-w-4xl">
            <h2 className="text-2xl font-bold text-center text-rose-800 mb-6">
              Services Provided by Blood Banks
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bloodBankServices.map((service, index) => (
                <div
                  key={index}
                  className="flex items-start p-3 bg-rose-50 rounded-lg"
                >
                  <div className="flex-shrink-0 text-rose-600 mr-3">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <span className="text-gray-700">{service}</span>
                </div>
              ))}
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
              Searching for blood banks...
            </p>
          </div>
        ) : selectedDistrict && bloodBanks.length === 0 ? (
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
              No blood banks found
            </h3>
            <p className="text-gray-600 mb-6">
              We couldn't find any blood banks in the selected district. Please
              try another district or check again later.
            </p>
            <button
              onClick={() => setSelectedDistrict("")}
              className="bg-rose-600 hover:bg-rose-700 text-white font-bold py-2 px-6 rounded-lg transition-colors shadow-md hover:shadow-lg"
            >
              Reset Search
            </button>
          </div>
        ) : (
          bloodBanks.length > 0 && (
            <div className="grid grid-cols-1 gap-6 mb-10">
              {bloodBanks.map((bank) => (
                <div
                  key={bank._id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:shadow-xl"
                >
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                      <h2 className="text-2xl font-bold text-gray-800 mb-2 md:mb-0">
                        {bank.name}
                      </h2>
                      <div className="bg-rose-100 text-rose-800 px-4 py-1 rounded-full font-semibold text-sm uppercase">
                        {bank.district || bank.address}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="bg-gray-50 p-3 rounded">
                        <p className="text-gray-700">
                          <span className="font-semibold text-rose-700">
                            Address:
                          </span>{" "}
                          {bank.FullAddress}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded">
                        <p className="text-gray-700">
                          <span className="font-semibold text-rose-700">
                            Contact:
                          </span>{" "}
                          {bank.contact}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-end mt-4">
                      <Link href={`/bloodBanks/BloodBank/${bank._id}`}>
                        <button className="bg-rose-600 hover:bg-rose-700 text-white font-bold py-2 px-6 rounded-lg transition-colors shadow-md hover:shadow-lg flex items-center">
                          View Details
                          <svg
                            className="w-4 h-4 ml-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            ></path>
                          </svg>
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default BloodBank;
