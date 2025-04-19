"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

const BloodRequest = () => {
  const [allBloodRequest, setAllBloodRequest] = useState([]);
  const [bloodRequests, setBloodRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleComments, setVisibleComments] = useState({});
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchBloodRequest = async () => {
      try {
        setLoading(true);
        const resp = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/todaysBloodRequest/api/getall`
        );
        if (!resp.ok) throw new Error("Failed to fetch data");

        const data = await resp.json();
        const shortedData = sortData(data);
        setAllBloodRequest(shortedData);
        setBloodRequests(shortedData.slice(0, 6));
      } catch (error) {
        setError(error.message);
        console.error("Error fetching blood requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBloodRequest();
  }, []);

  const sortData = (data) => {
    return [...data].sort(
      (a, b) => new Date(b.currentDate) - new Date(a.currentDate)
    );
  };

  const toggleComments = (id) => {
    setVisibleComments((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleToggole = () => {
    if (showAll) {
      setBloodRequests(allBloodRequest.slice(0, 6));
    } else {
      setBloodRequests(allBloodRequest);
    }
    setShowAll(!showAll);
  };

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
        Today's Blood Requests
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
              <Link href={`/todaysBloodRequest/${request._id}`}>
                <button className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
                  Respond to Request
                </button>
              </Link>
            </div>
            <div className="mt-4">
              <button
                onClick={() => toggleComments(request._id)}
                className="text-red-600 font-semibold underline transition"
              >
                Comments
              </button>
              {visibleComments[request._id] && (
                <div className="mt-2 space-y-2">
                  {request.comments && request.comments.length > 0 ? (
                    request.comments.map((comment, idx) => (
                      <div key={idx} className="bg-gray-100 text-sm rounded-lg">
                        <p className="text-blue-600 font-semibold">
                          {comment[1].startsWith("http") ? (
                            <a
                              href={comment[1]}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:underline"
                            >
                              {comment[2]}
                            </a>
                          ) : (
                            comment[1]
                          )}
                        </p>
                        <p className="text-gray-700">{comment[0]}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No comments yet.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        {allBloodRequest.length > 6 && (
          <div>
            <button
              onClick={handleToggole}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg"
            >
              {showAll ? "See less" : "See more"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BloodRequest;
