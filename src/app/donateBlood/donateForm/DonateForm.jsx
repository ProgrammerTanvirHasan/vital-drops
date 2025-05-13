"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import { useState } from "react";

const DonateForm = () => {
  const { data: session } = useSession();
  const defaultName = session?.user?.name || "";
  const defaultEmail = session?.user?.email || "";

  const [submitting, setSubmitting] = useState(false);

  const handleDonorData = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const form = e.target;

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const blood = form.blood.value;
    const number = form.number.value.trim();
    const dob = form.dob.value;
    const lastDonationDate = form.lastDonationDate.value;
    const address = form.address.value;
    const fullAddress = form.fullAddress.value.trim();
    const currentDate = new Date().toLocaleDateString();
    const terms = form.terms.checked;
    const imageFile = form.image.files[0];

    // Basic validation
    if (
      !name ||
      !email ||
      !blood ||
      !number ||
      !dob ||
      !address ||
      !fullAddress ||
      !terms
    ) {
      Swal.fire({
        title: "Missing Information",
        text: "Please fill all required fields and accept the terms.",
        icon: "warning",
      });
      setSubmitting(false);
      return;
    }

    if (!imageFile) {
      Swal.fire({
        title: "Missing Photo",
        text: "Please upload a photo.",
        icon: "warning",
      });
      setSubmitting(false);
      return;
    }

    let image = "";
    try {
      const formData = new FormData();
      formData.append("image", imageFile);

      const imgRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=a9b9160b05e3d4e68e60f154f621c349`,
        formData
      );

      image = imgRes?.data?.data?.display_url;
    } catch (err) {
      console.error("Image upload error:", err);
      Swal.fire({
        title: "Image Upload Failed",
        text: "Please try again later or use a smaller image.",
        icon: "error",
      });
      setSubmitting(false);
      return;
    }

    const donor = {
      name,
      email,
      blood,
      number,
      dob,
      lastDonationDate,
      address,
      fullAddress,
      currentDate,
      terms,
      image,
    };

    try {
      const resp = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/donateBlood/donateForm/api`,
        donor,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (resp.status === 200) {
        Swal.fire({
          title: "Success!",
          text:
            resp?.data?.message || "Donor information submitted successfully.",
          icon: "success",
        });
        form.reset();
      }
    } catch (error) {
      console.error("Submission error:", error);
      Swal.fire({
        title: "Submission Failed",
        text: error?.response?.data?.message || "Something went wrong.",
        icon: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
        <form onSubmit={handleDonorData} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-1 font-semibold">Full Name</label>
              <input
                defaultValue={defaultName}
                name="name"
                type="text"
                className="w-full p-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400"
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Blood Group</label>
              <select
                name="blood"
                className="w-full p-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400"
              >
                <option value="">Select your blood group</option>
                <option value="AB+">AB+</option>
                <option value="A+">A+</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB-">AB-</option>
                <option value="A-">A-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 font-semibold">Email</label>
              <input
                defaultValue={defaultEmail}
                name="email"
                type="email"
                className="w-full p-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400"
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Upload Photo</label>
              <input
                name="image"
                type="file"
                accept="image/*"
                className="w-full p-2.5 text-black border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Mobile Number</label>
              <input
                name="number"
                type="text"
                placeholder="01XXXXXXXXX"
                className="w-full p-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400"
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Date of Birth</label>
              <input
                name="dob"
                type="date"
                className="w-full p-3 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400"
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">
                Last Donation Date
              </label>
              <input
                name="lastDonationDate"
                type="date"
                className="w-full text-black p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400"
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">District</label>
              <select
                name="address"
                className="w-full p-3 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400"
              >
                <option value="">Select your district</option>
                <option value="jamalpur">Jamalpur</option>
                <option value="mymensingh">Mymensingh</option>
                <option value="sherpur">Sherpur</option>
                <option value="tangail">Tangail</option>
                <option value="bogura">Bogura</option>
                <option value="dhaka">Dhaka</option>
                <option value="munshiganj">Munshiganj</option>
                <option value="gazipur">Gazipur</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block mb-1 font-semibold">Full Address</label>
            <textarea
              name="fullAddress"
              rows="3"
              className="w-full p-3 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400"
            />
          </div>

          <div className="flex items-start gap-2">
            <input type="checkbox" name="terms" className="mt-1" />
            <label className="text-sm text-gray-600">
              I agree to the{" "}
              <span className="text-blue-600 underline">
                terms and conditions
              </span>
              .
            </label>
          </div>

          <div className="text-center pt-4">
            <button
              type="submit"
              disabled={submitting}
              className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-2 px-6 rounded-full hover:from-cyan-600 hover:to-teal-600 transition"
            >
              {submitting ? "Submitting..." : "Submit Donor Info"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DonateForm;
