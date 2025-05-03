"use client";

import Link from "next/link";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const viewAllBloodBank = () => {
  const [Bank, setBank] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const resp = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/bloodBanks/BloodBank/api/getall`
        );
        const data = await resp.json();
        setBank(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const handleDelete = async (id) => {
    setLoading(true);
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      try {
        const resp = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/viewAllBloodBank/deleteBank/${id}`,
          {
            method: "DELETE",
          }
        );

        if (resp.ok) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });

          setBank(Bank.filter((bank) => bank._id !== id));
        } else {
          Swal.fire({
            title: "Error!",
            text: "Something went wrong.",
            icon: "error",
          });
        }
      } catch (error) {
        console.error("Error deleting event:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      {loading && (
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
            Searching For Blood Bank...
          </p>
        </div>
      )}
      <h1 className="text-4xl font-bold text-center text-red-600 mb-6">
        Blood Donation Camps
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Bank.map((bank) => (
          <div
            key={bank._id}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-200 p-4 flex items-start justify-between gap-4"
          >
            <div className="flex-1">
              <h2 className="text-xl font-bold text-red-600 mb-1">
                🏥 {bank.name}
              </h2>
              <div className="text-gray-700 text-sm space-y-0.5">
                <p>
                  📞 <strong>Contact:</strong> {bank.contact}
                </p>
                <p>
                  📧 <strong>Email:</strong> {bank.email}
                </p>
                <p>
                  📍 <strong>Address:</strong> {bank.address}
                </p>
                <p>
                  🗺️ <strong>Full Address:</strong> {bank.FullAddress}
                </p>
                <p>
                  ⏰ <strong>Hours:</strong> {bank.hours}
                </p>
              </div>
              {bank.additional_info && (
                <div className="mt-2 text-gray-600 italic text-sm">
                  {bank.additional_info}
                </div>
              )}
            </div>

            <div className="flex flex-col justify-start items-end gap-2 min-w-[120px]">
              <Link href={`/dashboard/viewAllBloodBank/${bank._id}`}>
                <button className="w-full px-3 py-1.5 bg-green-700 text-white rounded hover:bg-green-900 text-sm">
                  ✏️ Update
                </button>
              </Link>
              <button
                onClick={() => handleDelete(bank._id)}
                className="w-full px-3 py-1.5 bg-red-700 text-white rounded hover:bg-red-900 text-sm"
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default viewAllBloodBank;
