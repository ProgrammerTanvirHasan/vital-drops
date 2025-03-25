"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const AllEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const resp = await fetch(
          "http://localhost:3000/dashboard/addEvents/api"
        );
        const data = await resp.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const handleDelete = async (id) => {
    setLoading(true);

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const resp = await fetch(
          `http://localhost:3000/dashboard/deletedItems/${id}`,
          {
            method: "DELETE",
          }
        );

        if (resp.ok) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });

          setEvents(events.filter((event) => event._id !== id));
        } else {
          Swal.fire({
            title: "Error!",
            text: "Something went wrong.",
            icon: "error",
          });
        }
      } catch (error) {
        console.error("Error deleting event:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      {loading && (
        <div className="text-center text-white font-semibold bg-green-700 py-2 rounded-lg mb-4">
          Loading...
        </div>
      )}

      <h1 className="text-3xl font-bold text-green-900 text-center mb-6">
        All Events Here
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div
            key={event._id}
            className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200"
          >
            <h2 className="text-xl font-semibold text-green-800 mb-2">
              {event.title}
            </h2>
            <p className="text-gray-600 font-medium">📅 {event.date}</p>
            <p className="text-gray-600 font-medium">📍 {event.location}</p>
            <button
              onClick={() => handleDelete(event._id)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              disabled={loading}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllEvents;
