"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";

const DonateForm = () => {
  const session = useSession();
  const name = session?.data?.user?.name;
  const email = session?.data?.user?.email;

  const handleDonorData = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const blood = form.blood.value;
    const number = form.number.value;
    const dob = form.dob.value;
    const lastDonationDate = form.lastDonationDate.value;
    const address = form.address.value;
    const fullAddress = form.fullAddress.value;
    const currentDate = new Date().toLocaleDateString();
    const terms = form.terms.checked;
    const imageFile = form.image.files[0];

    const formData = new FormData();
    formData.append("image", imageFile);

    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=a9b9160b05e3d4e68e60f154f621c349`,
      formData
    );

    const image = response?.data?.data?.display_url;

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
    console.log(donor, "donor");

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

      if (resp.status == 200) {
        Swal.fire({
          title: "Welcome",
          text: resp?.data?.message,
          icon: "success",
          draggable: true,
        });
        form.reset("");
      }
    } catch (error) {
      Swal.fire({
        title: "Error signing up",
        text: error.response?.data?.message || "Something went wrong!",
        icon: "error",
      });
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
        <form onSubmit={handleDonorData} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Full Name
              </label>
              <input
                defaultValue={name}
                name="name"
                type="text"
                placeholder="Enter your name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Blood Group
              </label>
              <select
                name="blood"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400"
              >
                <option value="">Select your blood group</option>
                <option value="AB_PLUS">AB+</option>
                <option value="A_PLUS">A+</option>
                <option value="B_PLUS">B+</option>
                <option value="B_MINUS">B-</option>
                <option value="AB_MINUS">AB-</option>
                <option value="A_MINUS">A-</option>
                <option value="O_PLUS">O+</option>
                <option value="O_MINUS">O-</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Email
              </label>
              <input
                defaultValue={email}
                name="email"
                type="email"
                placeholder="Enter your email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Upload Photo
              </label>
              <input
                name="image"
                type="file"
                className="w-full p-2.5 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Mobile Number
              </label>
              <input
                name="number"
                type="number"
                placeholder="01XXXXXXXXX"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Date of Birth
              </label>
              <input
                name="dob"
                type="date"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Last Donation Date
              </label>
              <input
                name="lastDonationDate"
                type="date"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                District
              </label>
              <select
                name="address"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400"
              >
                <option value="">Select your district</option>
                <option value="jamalpur">Jamalpur</option>
                <option value="mymshing">Mymensingh</option>
                <option value="sherpur">Sherpur</option>
                <option value="tangail">Tangail</option>
                <option value="bogura">Bogura</option>
                <option value="dhaka">Dhaka</option>
                <option value="munshiganj">Munshiganj</option>
                <option value="gajipur">Gazipur</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Full Address
            </label>
            <textarea
              name="fullAddress"
              rows="3"
              placeholder="Enter your full address"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400"
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
              className="   bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-2 rounded-full hover:from-cyan-600 hover:to-teal-600 transition p-2"
            >
              Submit Donor Info
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default DonateForm;
