"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const UpdateBloodBank = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!id) return;

    const fetchBloodBank = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/bloodBanks/BloodBank/api/${id}`
        );
        if (!res.ok) throw new Error("Failed to fetch");

        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchBloodBank();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedData = {
      name: form.name.value,
      contact: form.contact.value,
      email: form.email.value,
      blood_types: form.blood_types.value,
      hours: form.hours.value,
      FullAddress: form.FullAddress.value,
      additional_info: form.additional_info.value,
      cabinRent: form.cabinRent.value,
      updatedAt: new Date().toISOString(), // date added
    };

    const imageFile = form.image.files[0];
    if (imageFile) {
      const formData = new FormData();
      formData.append("image", imageFile);
      try {
        const imageUpload = await axios.post(
          `https://api.imgbb.com/1/upload?key=a9b9160b05e3d4e68e60f154f621c349`,
          formData
        );
        updatedData.ourCabin = imageUpload?.data?.data?.display_url;
      } catch (err) {
        console.error("Image upload failed", err);
      }
    } else {
      updatedData.ourCabin = data?.ourCabin || "";
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/bloodBanks/BloodBank/api/${data?._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (res.ok) {
        Swal.fire("Updated", "Blood bank updated successfully", "success");
        router.push("/");
      } else {
        throw new Error("Failed to update");
      }
    } catch (err) {
      Swal.fire("Error", err.message || "Something went wrong", "error");
    }
  };

  if (!data) {
    return <div className="text-center py-10 min-h-screen">Please wait...</div>;
  }

  return (
    <div className="min-h-screen  py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center text-red-600 mb-10">
          Update Blood Bank Info
        </h1>

        <form onSubmit={handleUpdate} className="space-y-6">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-gray-700 font-medium">
                Blood Bank Name
              </label>
              <input
                name="name"
                defaultValue={data.name}
                required
                className="mt-1 w-full p-3 border border-gray-300 rounded-lg bg-slate-100 text-black outline-none"
              />
            </div>
            <div>
              <label className="text-gray-700 font-medium">
                Contact Number
              </label>
              <input
                name="contact"
                defaultValue={data.contact}
                required
                className="mt-1 w-full p-3 border border-gray-300 rounded-lg bg-slate-100 text-black outline-none"
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-gray-700 font-medium">Email</label>
              <input
                name="email"
                defaultValue={data.email}
                type="email"
                required
                className="mt-1 w-full p-3 border border-gray-300 rounded-lg bg-slate-100 text-black outline-none"
              />
            </div>
            <div>
              <label className="text-gray-700 font-medium">
                Cabin Rent (৳)
              </label>
              <input
                name="cabinRent"
                defaultValue={data.cabinRent}
                type="number"
                className="mt-1 w-full p-3 border border-gray-300 rounded-lg bg-slate-100 text-black outline-none"
              />
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-gray-700 font-medium">Address</label>
              <input
                name="FullAddress"
                defaultValue={data.FullAddress}
                className="mt-1 w-full p-3 border border-gray-300 rounded-lg bg-slate-100 text-black outline-none"
              />
            </div>
            <div>
              <label className="text-gray-700 font-medium">
                Upload New Cabin Image
              </label>
              <input
                name="image"
                type="file"
                accept="image/*"
                className="mt-1 w-full p-3 border border-gray-300 rounded-lg bg-slate-100 text-black outline-none"
              />
              {data?.ourCabin && (
                <img
                  src={data.ourCabin}
                  alt="Cabin"
                  className="w-32 h-auto mt-3 rounded-lg shadow-md"
                />
              )}
            </div>
          </div>

          {/* Row 4 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-gray-700 font-medium">
                Available Blood Types
              </label>
              <input
                name="blood_types"
                defaultValue={data.blood_types}
                className="mt-1 w-full p-3 border border-gray-300 rounded-lg bg-slate-100 text-black outline-none"
              />
            </div>
            <div>
              <label className="text-gray-700 font-medium">Opening Hours</label>
              <input
                name="hours"
                defaultValue={data.hours}
                className="mt-1 w-full p-3 border border-gray-300 rounded-lg bg-slate-100 text-black outline-none"
              />
            </div>
          </div>

          {/* Additional Info */}
          <div>
            <label className="text-gray-700 font-medium">Additional Info</label>
            <textarea
              name="additional_info"
              defaultValue={data.additional_info}
              className="mt-1 w-full p-3 border border-gray-300 rounded-lg bg-slate-100 text-black outline-none h-24"
            />
          </div>

          {/* Submit */}
          <div className="text-center pt-4">
            <button
              type="submit"
              className="w-full md:w-1/2 bg-gradient-to-r from-cyan-700 to-blue-600 hover:from-blue-800 hover:to-cyan-800 text-white py-3 rounded-xl font-semibold transition duration-300"
            >
              Update Info
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateBloodBank;
