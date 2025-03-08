"use client";

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800">
      <p className="w-16 h-16 text-red-500" />
      <h1 className="text-3xl font-bold mt-4">Oops! Something went wrong</h1>
      <p className="text-gray-600 mt-2">
        We couldn't process your request. Please try again later.
      </p>

      <a
        href="/"
        className="mt-6 px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
      >
        Back to Homepage
      </a>
    </div>
  );
};
export default Error;
