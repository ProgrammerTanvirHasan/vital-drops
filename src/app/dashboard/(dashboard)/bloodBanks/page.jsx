"use client";

import axios from "axios";
import Swal from "sweetalert2";

const bank = () => {
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

    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=a9b9160b05e3d4e68e60f154f621c349`,
      formData
    );

    const ourCabin = response?.data?.data?.display_url;

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

    try {
      const resp = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/bloodBanks/api`,
        bankInfo,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (resp.status == 200) {
        Swal.fire({
          title: "Added",
          text: "Blood bank added to the website",
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
    <div>
      <h1 className="text-3xl text-red-600 text-center">Add Blood Bank</h1>

      <div className=" px-4">
        <form onSubmit={handleCreateBloodBank}>
          <div className="lg:flex justify-between">
            <div className="relative mb-4">
              <label>
                <p>Enter Blood Bank Name</p>
              </label>
              <input
                name="name"
                type="text"
                placeholder="Blood Bank Name"
                className="p-2 w-80 border focus:ring-2 bg-slate-950 glass ring-blue-400 text-white rounded-md outline-none"
              />
            </div>

            <div className="relative mb-4">
              <label>
                <p>Contact Number</p>
              </label>
              <input
                name="contact"
                type="text"
                placeholder="Contact Number"
                className="p-2 w-80 border focus:ring-2 bg-slate-950 glass ring-blue-400 text-white rounded-md outline-none"
              />
            </div>
          </div>

          <div className="lg:flex justify-between">
            <div className="relative mb-4">
              <label>
                <p>Email Address</p>
              </label>
              <input
                name="email"
                type="email"
                placeholder="Email Address"
                className="p-2 w-80 border focus:ring-2 bg-slate-950 glass ring-blue-400 text-white rounded-md outline-none"
              />
            </div>

            <div className="relative mb-4">
              <label>
                <p>Cabin rent</p>
              </label>
              <input
                name="cabinRent"
                type="number"
                placeholder="Enter cabin rent"
                className="p-2 w-80 border focus:ring-2 bg-slate-950 glass ring-blue-400 text-white rounded-md outline-none"
              />
            </div>
          </div>

          <div className="lg:flex justify-between">
            <div className="relative mb-4">
              <label>
                <p>Complete Address</p>
              </label>
              <input
                name="FullAddress"
                type="text"
                placeholder="Complete address"
                className="p-2 w-80 border focus:ring-2 bg-slate-950 glass ring-blue-400 text-white rounded-md outline-none"
              />
            </div>
            <div className="relative mb-4">
              <label>
                <p>Our cabin room</p>
              </label>
              <input
                name="image"
                type="file"
                className="p-2 w-80 border focus:ring-2 bg-slate-950 glass ring-blue-400 text-white rounded-md outline-none"
              />
            </div>
          </div>

          <div className="lg:flex justify-between">
            <div className="relative mb-4">
              <label>
                <p>Available Blood Types</p>
              </label>
              <input
                name="blood_types"
                type="text"
                placeholder="Available blood types (e.g., A+, B-, O+)"
                className="p-2 w-80 border focus:ring-2 bg-slate-950 glass ring-blue-400 text-white rounded-md outline-none"
              />
            </div>
            <div className="relative mb-4">
              <label>
                <p>Added district</p>
              </label>
              <select
                name="district"
                className="p-2 w-80 border focus:ring-2 bg-slate-950 glass ring-blue-400 text-white rounded-md outline-none"
              >
                <option value="">Select Any location</option>
                <option value="jamalpur">jamalpur</option>
                <option value="mymensingh">mymensingh</option>
                <option value="sherpur">sherpur</option>
                <option value="tangail">tangail</option>
                <option value="bogura">bogura</option>
                <option value="dhaka">dhaka</option>
                <option value="munshiganj">munshiganj</option>
                <option value="gajipur">gajipur</option>
              </select>
            </div>
          </div>

          <div className="relative mb-4">
            <label>
              <p>Opening Hours</p>
            </label>
            <input
              name="hours"
              type="text"
              placeholder="Enter opening hours"
              className="p-2 w-80 border focus:ring-2 bg-slate-950 glass ring-blue-400 text-white rounded-md outline-none"
            />
          </div>

          <div className="relative mb-4">
            <label>
              <p>Additional Information</p>
            </label>
            <textarea
              name="additional_info"
              placeholder="Enter any additional information"
              className="p-2 w-80 h-32 border focus:ring-2 bg-slate-950 glass ring-blue-400 text-white rounded-md outline-none"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="px-4 py-2 bg-cyan-800 text-white w-full rounded-md hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default bank;
