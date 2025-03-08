"use client";

import React, { useEffect, useState } from "react";

const BloodRequest = () => {
  const [bloodRequests, setBloodRequests] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading
  const [error, setError] = useState(null); // Optional: state to track any errors

  useEffect(() => {
    const fetchBloodRequest = async () => {
      try {
        setLoading(true); // Set loading to true before fetching
        const resp = await fetch(
          "http://localhost:3000/todaysBloodRequest/api"
        );
        if (!resp.ok) throw new Error("Failed to fetch data");

        const data = await resp.json();
        setBloodRequests(data);
      } catch (error) {
        setError(error.message); // Handle any errors
        console.error("Error fetching blood requests:", error);
      } finally {
        setLoading(false); // Set loading to false after the fetch is complete
      }
    };

    fetchBloodRequest();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="text-xl font-semibold text-gray-700">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="text-xl font-semibold text-red-600">Error: {error}</div>
      </div>
    );
  }

  if (bloodRequests.length === 0) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="text-xl font-semibold text-gray-700">No Data Found</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <p className="text-2xl font-semibold text-gray-800 mb-6">
        Today's Blood Requests ({bloodRequests.length})
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {bloodRequests.map((request, index) => (
          <div
            key={index}
            className="bg-white border border-gray-300 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 transform hover:scale-105 p-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-blue-600">
                {request.patientName}
              </h3>
              <span className="text-sm text-gray-500">
                {request.currentDate}
              </span>
            </div>
            <div className="space-y-2 text-gray-700">
              <p>
                <strong>Age:</strong> {request.patientAge}
              </p>
              <p>
                <strong>Blood Group:</strong> {request.bloodGroup}
              </p>
              <p>
                <strong>Urgent:</strong> {request.urgent}
              </p>
              <p>
                <strong>Quantity:</strong> {request.quantity}
              </p>
              <p>
                <strong>Hospital:</strong> {request.hospitalName}
              </p>
              <p>
                <strong>Address:</strong> {request.hospitalAddress}
              </p>
              <p>
                <strong>Contact:</strong> {request.contactNumber}
              </p>
              <p>
                <strong>Attendant:</strong> {request.attendantName}
              </p>
              <p>
                <strong>Attendant Contact:</strong> {request.attendentContact}
              </p>
              <p>
                <strong>Additional Info:</strong> {request.additionalInfo}
              </p>
            </div>
            <div className="mt-4">
              <button className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
                Respond to Request
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BloodRequest;
