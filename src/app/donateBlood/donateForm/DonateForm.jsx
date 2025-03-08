"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";

const DonateForm = () => {
  const session = useSession();
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
    const image = session.data.user.image;
    const terms = form.terms.checked;

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
      image,
      terms,
    };

    try {
      const resp = await axios.post(
        "http://localhost:3000/donateBlood/donateForm/api",
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
    <div>
      <form onSubmit={handleDonorData} className="container mx-auto">
        <div className="lg:flex justify-between">
          <div className="relative mb-4">
            <label>
              <p>Enter your name</p>
            </label>
            <input
              name="name"
              type="text"
              placeholder="Name"
              className="p-2 w-64 border focus:ring-2 bg-slate-950 glass ring-blue-400 text-white rounded-md outline-none"
            />
          </div>

          <div className="relative mb-4">
            <label>
              <p>Enter your blood group</p>
            </label>
            <select
              name="blood"
              className="p-2 w-64 border focus:ring-2 bg-slate-950 glass ring-blue-400 text-white rounded-md outline-none"
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
        </div>

        <div className="relative mb-4">
          <label>
            <p>Email</p>
          </label>
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-64 p-2 border focus:ring-2 bg-slate-950 glass ring-blue-400 text-white rounded-md outline-none"
          />
        </div>

        <div className="relative mb-4">
          <label>
            <p>Mobile number</p>
          </label>
          <input
            name="number"
            type="number"
            placeholder="Number"
            className="w-64 p-2 border focus:ring-2 bg-slate-950 glass ring-blue-400 text-white rounded-md outline-none"
          />
        </div>

        <div className="relative mb-4">
          <label>
            <p>Date of Birth</p>
          </label>
          <input
            name="dob"
            type="date"
            className="p-2 w-64 border focus:ring-2 bg-slate-950 glass ring-blue-400 text-white rounded-md outline-none"
          />
        </div>

        <div className="relative mb-4">
          <label>
            <p>Last Blood Donation Date</p>
          </label>
          <input
            name="lastDonationDate"
            type="date"
            className="p-2 w-64 border focus:ring-2 bg-slate-950  glass ring-blue-400 text-white rounded-md outline-none"
          />
        </div>

        <div className="relative mb-4">
          <label>
            <p>Select your district </p>
          </label>
          <select
            name="address"
            className="p-2 w-64 border focus:ring-2 bg-slate-950 glass ring-blue-400 text-white rounded-md outline-none"
          >
            <option value="">Select your own district</option>
            <option value="jamalpur">jamalpur</option>
            <option value="mymshing">mymshing</option>
            <option value="sherpur">sherpur</option>
            <option value="tangail">tangail</option>
            <option value="bogura">bogura</option>
            <option value="dhaka">dhaka</option>
            <option value="munshiganj">munshiganj</option>
            <option value="gajipur">gajipur</option>
          </select>
        </div>

        <div className="relative mb-4">
          <label>
            <p>Enter your address</p>
          </label>
          <textarea
            name="fullAddress"
            placeholder="Full address"
            className="w-64 p-2 border focus:ring-2 bg-slate-950 glass ring-blue-400 text-white rounded-md outline-none"
          />
        </div>

        <div className="relative mb-4">
          <label className="flex items-center">
            <input type="checkbox" name="terms" className="mr-2" />
            <span>
              I agree to the{" "}
              <a className="text-blue-400">terms and conditions</a>.
            </span>
          </label>
        </div>

        <div className="mb-4 text-center">
          <button
            type="submit"
            className="p-2 w-64 bg-red-600 text-white rounded-md focus:ring-2 ring-blue-400"
          >
            Register as a Donor
          </button>
        </div>
      </form>
    </div>
  );
};
export default DonateForm;
