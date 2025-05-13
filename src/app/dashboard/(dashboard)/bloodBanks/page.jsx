"use client";

import axios from "axios";
import Swal from "sweetalert2";

const Bank = () => {
  const handleCreateBloodBank = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const contact = form.contact.value;
    const email = form.email.value;
    const district = form.district.value.toLowerCase();
    const blood_types = form.blood_types.value;
    const hours = form.hours.value;
    const FullAddress = form.FullAddress.value;
    const additional_info = form.additional_info.value;
    const cabinRent = form.cabinRent.value;
    const imageFile = form.image.files[0];

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const imageResponse = await axios.post(
        `https://api.imgbb.com/1/upload?key=a9b9160b05e3d4e68e60f154f621c349`,
        formData
      );

      const ourCabin = imageResponse?.data?.data?.display_url;

      const bankInfo = {
        name,
        contact,
        email,
        district,
        blood_types,
        hours,
        additional_info,
        FullAddress,
        cabinRent,
        ourCabin,
      };

      const resp = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/bloodBanks/api`,
        bankInfo,
        { headers: { "Content-Type": "application/json" } }
      );

      if (resp.status === 200) {
        Swal.fire({
          title: "Success!",
          text: "Blood bank added successfully.",
          icon: "success",
        });
        form.reset();
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.response?.data?.message || "Something went wrong!",
        icon: "error",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-center text-red-600 mb-8">
        🩸 Add a Blood Bank
      </h1>

      <form
        onSubmit={handleCreateBloodBank}
        className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-gray-300 shadow-lg space-y-8"
      >
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className="block mb-1 font-medium ">Blood Bank Name</label>
            <input
              name="name"
              type="text"
              required
              className="w-full p-3   rounded-md border border-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-500"
              placeholder="E.g. Red Cross Center"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium ">Contact Number</label>
            <input
              name="contact"
              type="text"
              required
              className="w-full p-3  rounded-md border border-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-500"
              placeholder="+8801XXXXXXXXX"
            />
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className="block mb-1 font-medium ">Email Address</label>
            <input
              name="email"
              type="email"
              required
              className="w-full p-3  rounded-md border border-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-500"
              placeholder="example@mail.com"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium ">Cabin Rent</label>
            <input
              name="cabinRent"
              type="number"
              className="w-full p-3  rounded-md border border-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-500"
              placeholder="৳ 500"
            />
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className="block mb-1 font-medium ">Full Address</label>
            <input
              name="FullAddress"
              type="text"
              required
              className="w-full p-3  rounded-md border border-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-500"
              placeholder="123 Street, Area, District"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium ">Cabin Room Photo</label>
            <input
              name="image"
              type="file"
              accept="image/*"
              required
              className="w-full p-3  rounded-md border border-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className="block mb-1 font-medium ">
              Available Blood Types
            </label>
            <input
              name="blood_types"
              type="text"
              required
              className="w-full p-3  rounded-md border border-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-500"
              placeholder="A+, B-, O+, etc."
            />
          </div>
          <div>
            <label className="block mb-1 font-medium ">District</label>
            <select
              name="district"
              required
              className="w-full p-3  rounded-md border border-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-500"
            >
              <option value="">Select a location</option>
              <option value="jamalpur">Jamalpur</option>
              <option value="mymensingh">Mymensingh</option>
              <option value="sherpur">Sherpur</option>
              <option value="tangail">Tangail</option>
              <option value="bogura">Bogura</option>
              <option value="dhaka">Dhaka</option>
              <option value="munshiganj">Munshiganj</option>
              <option value="gajipur">Gajipur</option>
            </select>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className="block mb-1 font-medium ">Opening Hours</label>
            <input
              name="hours"
              type="text"
              required
              className="w-full p-3  rounded-md border border-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-500"
              placeholder="E.g. 9am - 5pm"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium ">Additional Info</label>
            <textarea
              name="additional_info"
              rows={4}
              className="w-full p-3  rounded-md border border-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-500"
              placeholder="Any other information..."
            />
          </div>
        </div>

        <div className="pt-6">
          <button
            type="submit"
            className=" w-full block text-center bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-2 rounded-full hover:from-cyan-600 hover:to-teal-600 transition p-2"
          >
            ➕ Add Blood Bank
          </button>
        </div>
      </form>
    </div>
  );
};

export default Bank;
