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
        <div className="text-center text-white font-semibold bg-green-700 py-2 rounded-lg mb-4">
          Loading...
        </div>
      )}
      <h1 className="text-4xl font-bold text-center text-red-600 mb-6">
        Blood Donation Camps
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Bank.map((bank) => (
          <div
            key={bank._id}
            className="bg-white shadow-lg rounded-lg border border-gray-200 p-6 hover:shadow-xl transition duration-300"
          >
            <h2 className="text-2xl font-bold text-red-500">{bank.name}</h2>
            <p className="text-gray-700 mt-2">
              <strong>📞 Contact:</strong> {bank.contact}
            </p>
            <p className="text-gray-700">
              <strong>📧 Email:</strong> {bank.email}
            </p>
            <p className="text-gray-700">
              <strong>📍 Address:</strong> {bank.address}
            </p>
            <p className="text-gray-700">
              <strong>📌 Full Address:</strong> {bank.FullAddress}
            </p>
            <p className="text-gray-700">
              <strong>⏰ Hours:</strong> {bank.hours}
            </p>
            <div className="mt-4 p-3 bg-gray-100 rounded-lg border-l-4 border-red-500">
              <p className="text-gray-700 italic">{bank.additional_info}</p>
            </div>
            <div className=" mt-4">
              <Link href={`/dashboard/viewAllBloodBank/${bank._id}`}>
                <button className="btn bg-green-800 text-white hover:bg-black">
                  update
                </button>
              </Link>
              <button
                onClick={() => handleDelete(bank._id)}
                className="btn bg-red-700 text-white hover:bg-black"
              >
                delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default viewAllBloodBank;
