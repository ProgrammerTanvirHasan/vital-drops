const Events = () => {
  const events = [
    {
      id: 1,
      title: "Blood Donation Camp",
      date: "March 10, 2025",
      location: "Dhaka Medical College Hospital, Dhaka",
      description:
        "Join us for a life-saving event! Free health check-ups included.",
    },
    {
      id: 2,
      title: "Blood Awareness Drive",
      date: "March 15, 2025",
      location: "Chittagong Medical College, Chittagong",
      description:
        "Learn about the benefits of blood donation and how you can save lives.",
    },
    {
      id: 3,
      title: "Emergency Blood Drive",
      date: "March 20, 2025",
      location: "Rajshahi Medical College, Rajshahi",
      description:
        "Urgent call for donors! Help replenish blood supplies in hospitals.",
    },
    {
      id: 4,
      title: "University Blood Donation Day",
      date: "March 25, 2025",
      location: "University of Dhaka, Dhaka",
      description:
        "Students & faculty are invited to donate blood and support the cause.",
    },
    {
      id: 5,
      title: "Corporate Blood Donation Camp",
      date: "April 5, 2025",
      location: "Bashundhara City, Dhaka",
      description:
        "Partnered with top companies to encourage employees to donate.",
    },
    {
      id: 6,
      title: "World Blood Donor Day Celebration",
      date: "June 14, 2025",
      location: "Bangladesh Red Crescent Society, Dhaka",
      description:
        "A special event to honor blood donors and spread awareness.",
    },
  ];
  return (
    <div>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-green-900 text-center mb-6">
          Upcoming Events....
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event.id} className="border p-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold">{event.title}</h2>
              <p className="text-gray-600 italic ">
                {event.date} - {event.location}
              </p>
              <p className="mt-2 ">{event.description}</p>
              <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
                Register
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Events;
