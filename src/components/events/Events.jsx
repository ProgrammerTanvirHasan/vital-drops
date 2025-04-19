"use client";
import { useState, useEffect } from "react";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [visibleEvents, setVisibleEvents] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const parseDate = (dateStr) => {
    const parsedDate = new Date(Date.parse(dateStr));
    return parsedDate;
  };

  useEffect(() => {
    const fetchEvents = async () => {
      const resp = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/addEvents/api`
      );
      const data = await resp.json();
      const sortedData = [...data].sort(
        (a, b) => parseDate(b.date) - parseDate(a.date)
      );
      setEvents(sortedData);
      setVisibleEvents(sortedData.slice(0, 6));
    };

    fetchEvents();
  }, []);

  const toggleShowMore = () => {
    if (showAll) {
      setVisibleEvents(events.slice(0, 6));
    } else {
      setVisibleEvents(events);
    }
    setShowAll(!showAll);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-green-900 text-center mb-6">
        Upcoming Events....
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleEvents.map((event) => (
          <div key={event._id} className="border p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold">{event.title}</h2>
            <p className="text-gray-600 italic">
              {event.date} - {event.location}
            </p>
            <p className="mt-2">{event.description}</p>
            <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
              Register
            </button>
          </div>
        ))}
      </div>

      {events.length > 6 && (
        <div className="text-center mt-6">
          <button
            onClick={toggleShowMore}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg"
          >
            {showAll ? "See Less" : "See More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Events;
