"use client";

import { useState, useEffect } from "react";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [visibleEvents, setVisibleEvents] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const parseDate = (dateStr) => {
    const parsedDate = new Date(Date.parse(dateStr));
    // Handle case where the date is invalid (e.g., NaN)
    if (isNaN(parsedDate)) {
      return null; // Or handle in some way, like defaulting to the current date
    }
    return parsedDate;
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const resp = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/allEvent/api`
        );

        if (!resp.ok) {
          throw new Error("Failed to fetch events.");
        }

        const data = await resp.json();
        const sortedData = [...data]
          .filter((event) => parseDate(event.date) !== null) // filter out invalid dates
          .sort((a, b) => parseDate(b.date) - parseDate(a.date));

        setEvents(sortedData);
        setVisibleEvents(sortedData.slice(0, 6));
      } catch (error) {
        console.error("Error fetching events:", error);
        setError(
          "There was an error fetching the events. Please try again later."
        );
      } finally {
        setLoading(false);
      }
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
      <h1 className="text-3xl font-bold text-blue-400 text-center mb-6">
        Upcoming Events...
      </h1>

      {loading ? (
        <div className="text-center py-10">
          <div
            className="animate-spin inline-block w-10 h-10 border-4 border-current border-t-transparent text-blue-600 rounded-full"
            role="status"
          />
          <p className="mt-2 text-gray-500">Loading events...</p>
        </div>
      ) : error ? (
        <div className="text-center py-10 text-red-500">
          <p>{error}</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleEvents.map((event, index) => (
              <div
                key={event._id || index} // Ensure unique key, use index if _id is missing
                className="flex flex-col border hover:bg-[#387B94] hover:text-orange-200 p-4 rounded-lg shadow-lg h-full"
              >
                <div className="flex-grow">
                  <h2 className="text-xl font-semibold">{event.title}</h2>
                  <p className="text-gray-600 italic mt-1">
                    {event.date} - {event.location}
                  </p>
                  <p className="mt-2">{event.description}</p>
                </div>
              </div>
            ))}
          </div>

          {events.length > 6 && (
            <div className="text-center mt-6">
              <button
                onClick={toggleShowMore}
                className="btn bg-gradient-to-r from-teal-700 to-cyan-800 text-white hover:from-cyan-800 hover:to-teal-900"
              >
                {showAll ? "See Less" : "See More"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Events;
