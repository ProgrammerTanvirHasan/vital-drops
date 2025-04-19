"use client";

import axios from "axios";
import Swal from "sweetalert2";

const page = () => {
  const handleEvent = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const dateInput = form.date.value;
    const dateObj = new Date(dateInput);

    const date = dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const location = form.location.value;
    const description = form.description.value;
    const events = { title, date, location, description };

    try {
      const resp = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/addEvents/api`,
        events,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (resp.status == 200) {
        Swal.fire({
          title: "Added",
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
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md p-6 shadow-lg rounded-2xl bg-gray-500">
        <h2 className="text-2xl font-semibold text-center mb-4">Add Event</h2>
        <form onSubmit={handleEvent} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Event Title"
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="date"
            name="date"
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Event Location"
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
          <textarea
            name="description"
            placeholder="Event Description"
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
          >
            Submit Event
          </button>
        </form>
      </div>
    </div>
  );
};
export default page;
