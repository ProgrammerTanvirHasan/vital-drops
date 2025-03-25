"use client";

import { useSession } from "next-auth/react";
import { use, useEffect, useState } from "react";
import Swal from "sweetalert2";

const Page = ({ params }) => {
  const { id } = use(params);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const session = useSession();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await fetch(
          `http://localhost:3000/todaysBloodRequest/api/${id}`
        );
        const result = await resp.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return <p className="text-center mt-8">Loading...</p>;
  }

  if (!data) {
    return <p className="text-center mt-8">No data found!</p>;
  }

  const handleComment = async (e) => {
    e.preventDefault();
    const comment = e.target.comment.value;
    const donorProfile =
      session?.data?.user?.facebookProfile || session?.data?.user?.email;
    const donorName = session?.data?.user?.name;
    const comments = [comment, donorProfile, donorName];

    try {
      const resp = await fetch(
        `http://localhost:3000/todaysBloodRequest/api/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            comments: comments,
          }),
        }
      );
      const result = await resp.json();
      if (result.matchedCount > 0) {
        Swal.fire({
          title: "Thank you",
          text: "Thanks for your kind response!",
          icon: "success",
        });
        e.target.reset();
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full">
        <h1 className="text-2xl font-semibold text-center text-gray-800">
          Patient Name: {data.patientName}
        </h1>
        <p className="text-center text-gray-600 mt-2">
          <strong className="text-red-500">Disease:</strong>{" "}
          {data.additionalInfo}
        </p>
        <p className="text-center font-bold text-red-500 mt-1">
          Blood Group: {data.bloodGroup}
        </p>
      </div>

      <div className="mt-8 w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold text-center text-red-500">
          Type your comment here
        </h2>
        <form
          onSubmit={handleComment}
          className="flex flex-col items-center mt-4"
        >
          <textarea
            name="comment"
            className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-red-400"
            placeholder="Write your message..."
          ></textarea>
          <button className="mt-4 px-6 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 transition">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
