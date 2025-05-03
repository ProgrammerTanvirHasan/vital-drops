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

      if (resp.status === 200) {
        Swal.fire({
          title: "Event Added Successfully",
          text: resp?.data?.message,
          icon: "success",
          confirmButtonText: "Great!",
          showConfirmButton: true,
          draggable: true,
        });
        form.reset();
      }
    } catch (error) {
      Swal.fire({
        title: "Error Occurred",
        text:
          error.response?.data?.message ||
          "Something went wrong! Please try again.",
        icon: "error",
        confirmButtonText: "Okay",
        showConfirmButton: true,
      });
    }
  };

  return (
    <div className="flex justify-center  min-h-screen  p-6">
      <div className="w-full   p-8 shadow-lg rounded-2xl bg-glass backdrop-blur-md border-2 border-gray-200">
        <h2 className="text-3xl font-semibold text-center text-red-800 mb-6">
          Add New Event
        </h2>
        <form onSubmit={handleEvent} className="space-y-5">
          <div className="form-group">
            <input
              type="text"
              name="title"
              placeholder="Event Title"
              className="w-full p-3 border border-gray-300 bg-base-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition-all"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="date"
              name="date"
              className="w-full p-3 border border-gray-300 bg-base-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition-all"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="location"
              placeholder="Event Location"
              className="w-full p-3 border border-gray-300 bg-base-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition-all"
              required
            />
          </div>
          <div className="form-group">
            <textarea
              name="description"
              placeholder="Event Description"
              className="w-full p-3 border border-gray-300 bg-base-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition-all"
              rows="4"
              required
            />
          </div>
          <div className="form-group">
            <button
              type="submit"
              className="w-full block text-center bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-2 rounded-full hover:from-cyan-600 hover:to-teal-600 transition p-2"
            >
              Submit Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
