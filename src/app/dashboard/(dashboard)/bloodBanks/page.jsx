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
    const address = form.address.value.toLowerCase();
    const blood_types = form.blood_types.value;
    const hours = form.hours.value;
    const FullAddress = form.FullAddress.value;
    const additional_info = form.additional_info.value;

    const bankInfo = {
      name,
      contact,
      email,
      address,
      blood_types,
      hours,
      additional_info,
      FullAddress,
    };

    try {
      const resp = await axios.post(
        "http://localhost:3000/dashboard/bloodBanks/api",
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
                <p>Enter District</p>
              </label>
              <input
                name="address"
                type="text"
                placeholder="district"
                className="p-2 w-80 border focus:ring-2 bg-slate-950 glass ring-blue-400 text-white rounded-md outline-none"
              />
            </div>
          </div>

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
