export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-white to-blue-50 px-4 ">
      <div className="text-center max-w-2xl p-8 bg-white shadow-xl rounded-2xl border border-gray-200">
        <h1 className="text-4xl font-extrabold text-red-600 tracking-tight leading-tight mb-4">
          Welcome to Blood Donation Dashboard
        </h1>
        <p className="text-lg text-gray-600">
          Manage donors, blood requests, and events with ease. Empower lives,
          one drop at a time.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <a href="/dashboard/donateBlood">
            <button className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition">
              Donate Now
            </button>
          </a>
          <a href="/dashboard/aboutPage">
            <button className="border border-red-600 text-red-600 px-6 py-2 rounded-full hover:bg-red-50 transition">
              Learn More
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
