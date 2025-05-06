"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  Loader2,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Droplet,
  Phone,
  MapPin,
  Info,
} from "lucide-react";

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

  const handleToggle = () => {
    setBloodRequests(showAll ? allBloodRequest.slice(0, 6) : allBloodRequest);
    setShowAll(!showAll);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="animate-spin w-8 h-8 text-red-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 text-lg font-semibold py-8">
        Error: {error}
      </div>
    );
  }

  if (bloodRequests.length === 0) {
    return (
      <div className="text-center text-gray-600 text-lg font-semibold py-8">
        No Blood Requests Found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-extrabold text-red-700 text-center mb-10">
          🚑 Urgent Blood Requests
        </h2>

        <div className="space-y-10">
          {bloodRequests.map((request) => (
            <div
              key={request._id}
              className="rounded-3xl shadow-xl border border-red-100 overflow-hidden bg-white"
            >
              <div className="bg-red-600 text-white py-4 px-6 flex items-center justify-between">
                <h3 className="text-2xl font-bold">{request.patientName}</h3>
                <span className="text-sm">
                  {new Date(request.currentDate).toLocaleDateString()}
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-6 p-6">
                <div className="space-y-3 text-gray-700">
                  <p>
                    <Droplet className="inline-block mr-2 text-red-500" />
                    <strong>Blood Group:</strong> {request.bloodGroup}
                  </p>
                  <p>
                    <strong>Urgency:</strong> {request.urgent}
                  </p>
                  <p>
                    <strong>Quantity Needed:</strong> {request.quantity}
                  </p>
                  <p>
                    <strong>Patient Age:</strong> {request.patientAge}
                  </p>
                </div>
                <div className="space-y-3 text-gray-700">
                  <p>
                    <MapPin className="inline-block mr-2 text-blue-600" />
                    <strong>Hospital:</strong> {request.hospitalName}
                  </p>
                  <p>
                    <strong>Address:</strong> {request.hospitalAddress}
                  </p>
                  <p>
                    <Phone className="inline-block mr-2 text-green-600" />
                    <strong>Contact:</strong> {request.contactNumber}
                  </p>
                  <p>
                    <strong>Attendant:</strong> {request.attendantName} (
                    {request.attendentContact})
                  </p>
                </div>
              </div>

              {request.additionalInfo && (
                <div className="bg-gray-100 border-t border-gray-200 px-6 py-4 flex items-center">
                  <Info className="mr-2 text-blue-600" />
                  <p className="text-gray-600 italic">
                    {request.additionalInfo}
                  </p>
                </div>
              )}

              <div className="flex flex-wrap justify-between items-center p-6 border-t border-gray-100">
                <Link href={`/todaysBloodRequest/${request._id}`}>
                  <button className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2 rounded-full transition duration-300">
                    Respond Now
                  </button>
                </Link>

                <button
                  onClick={() => toggleComments(request._id)}
                  className="text-red-600 text-sm font-medium flex items-center gap-1 hover:underline mt-3 md:mt-0"
                >
                  <MessageCircle size={16} />
                  Comments
                </button>
              </div>

              {visibleComments[request._id] && (
                <div className="bg-white px-6 pb-6 max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300">
                  {request.comments?.length > 0 ? (
                    request.comments.map((comment, idx) => (
                      <div key={idx} className="bg-gray-50 p-3 rounded-lg mb-2">
                        <p className="font-medium text-blue-700">
                          {comment[1]?.startsWith("http") ? (
                            <a
                              href={comment[1]}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:underline"
                            >
                              {comment[2] || "External Link"}
                            </a>
                          ) : (
                            comment[1]
                          )}
                        </p>
                        <p className="text-sm text-gray-700">{comment[0]}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No comments yet.</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {allBloodRequest.length > 6 && (
          <div className="text-center mt-12">
            <button
              onClick={handleToggle}
              className="bg-gradient-to-r from-teal-600 to-cyan-700 text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2 hover:from-cyan-700 hover:to-teal-800 mx-auto"
            >
              {showAll ? (
                <>
                  See Less <ChevronUp size={18} />
                </>
              ) : (
                <>
                  See More <ChevronDown size={18} />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BloodRequest;
