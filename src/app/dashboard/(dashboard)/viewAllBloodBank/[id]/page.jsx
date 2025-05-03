"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const page = () => {
  const param = useParams();
  const [data, setData] = useState([]);
  const router = useRouter();
  const { id } = param;

  useEffect(() => {
    const bloodBank = async () => {
      try {
        const resp = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/bloodBanks/BloodBank/api/${id}`
        );
        if (!resp.ok) {
          throw new Error("Failed to fetch blood bank data");
        }
        const response = await resp.json();
        setData(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    bloodBank();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const contact = form.contact.value;
    const email = form.email.value;

    const blood_types = form.blood_types.value;
    const hours = form.hours.value;
    const FullAddress = form.FullAddress.value;
    const additional_info = form.additional_info.value;
    const cabinRent = form.cabinRent.value;
    const imageFile = form.image.files[0];

    let ourCabin = data.ourCabin;

    if (imageFile) {
      const formData = new FormData();
      formData.append("image", imageFile);
      try {
        const imgResponse = await axios.post(
          `https://api.imgbb.com/1/upload?key=a9b9160b05e3d4e68e60f154f621c349`,
          formData
        );

        if (imgResponse.data && imgResponse.data.data) {
          ourCabin = imgResponse.data.data.display_url;
        }
      } catch (error) {
        console.error("Image upload failed:", error);
      }
    }

    const bankUpdate = {
      name,
      contact,
      email,
      blood_types,
      hours,
      additional_info,
      FullAddress,
      cabinRent,
      ourCabin,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/bloodBanks/BloodBank/api/${data._id}
`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bankUpdate),
        }
      );
      if (response.status === 200) {
        Swal.fire({
          title: "UPDATED",
          text: "updated seccessfully",
          icon: "success",
        });
        router.push("/");
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Something went wrong",
        icon: "error",
      });
    }
  };
  return (
    <div>
      <h1 className="text-3xl text-red-600 text-center mb-8">
        Update Blood Bank Info
      </h1>

      <div className=" px-4">
        <form onSubmit={handleUpdate}>
          <div className="lg:flex justify-between">
            <div className="relative mb-4">
              <label>
                <p>Enter Blood Bank Name</p>
              </label>
              <input
                name="name"
                defaultValue={data.name}
                type="text"
                placeholder="Blood Bank Name"
                className="p-2 w-80 border focus:ring-2 bg-slate-700 glass ring-blue-400 text-white rounded-md outline-none"
              />
            </div>

            <div className="relative mb-4">
              <label>
                <p>Contact Number</p>
              </label>
              <input
                name="contact"
                defaultValue={data.contact}
                type="text"
                placeholder="Contact Number"
                className="p-2 w-80 border focus:ring-2 bg-slate-700 glass ring-blue-400 text-white rounded-md outline-none"
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
                defaultValue={data.email}
                type="email"
                placeholder="Email Address"
                className="p-2 w-80 border focus:ring-2 bg-slate-700 glass ring-blue-400 text-white rounded-md outline-none"
              />
            </div>

            <div className="relative mb-4">
              <label>
                <p>Cabin rent</p>
              </label>
              <input
                name="cabinRent"
                defaultValue={data.cabinRent}
                type="number"
                placeholder="Enter cabin rent"
                className="p-2 w-80 border focus:ring-2 bg-slate-700 glass ring-blue-400 text-white rounded-md outline-none"
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
                defaultValue={data.FullAddress}
                type="text"
                placeholder="Complete address"
                className="p-2 w-80 border focus:ring-2 bg-slate-700 glass ring-blue-400 text-white rounded-md outline-none"
              />
            </div>
            <div className="relative mb-4">
              <label>
                <p>Our cabin room</p>
              </label>
              <input
                name="image"
                type="file"
                className="p-2 w-80 border focus:ring-2 bg-slate-700 glass ring-blue-400 text-white rounded-md outline-none"
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
                defaultValue={data.blood_types}
                type="text"
                placeholder="Available blood types (e.g., A+, B-, O+)"
                className="p-2 w-80 border focus:ring-2 bg-slate-700 glass ring-blue-400 text-white rounded-md outline-none"
              />
            </div>
          </div>

          <div className="relative mb-4">
            <label>
              <p>Opening Hours</p>
            </label>
            <input
              name="hours"
              defaultValue={data.hours}
              type="text"
              placeholder="Enter opening hours"
              className="p-2 w-80 border focus:ring-2 bg-slate-700 glass ring-blue-400 text-white rounded-md outline-none"
            />
          </div>

          <div className="relative mb-4">
            <label>
              <p>Additional Information</p>
            </label>
            <textarea
              name="additional_info"
              defaultValue={data.additional_info}
              placeholder="Enter any additional information"
              className="p-2 w-80 h-32 border focus:ring-2 bg-slate-700 glass ring-blue-400 text-white rounded-md outline-none"
            />
          </div>

          <div className="text-center pb-4">
            <button
              type="submit"
              className="px-4 py-2 bg-cyan-800 text-white w-full rounded-md hover:bg-blue-600 "
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default page;
