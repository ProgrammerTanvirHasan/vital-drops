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
          `${process.env.NEXT_PUBLIC_BASE_URL}/todaysBloodRequest/api/${id}`
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
    return (
      <div className="flex flex-col items-center justify-center py-10 min-h-screen">
        <div className="relative w-24 h-24">
          <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-rose-200 border-t-rose-600 rounded-full animate-spin"></div>
          </div>
          <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
            <div className="w-6 h-6 bg-white rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    );
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
        `${process.env.NEXT_PUBLIC_BASE_URL}/todaysBloodRequest/api/${id}`,
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
          <div className="mt-4">
            <button className="block text-center bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-2 rounded-full hover:from-cyan-600 hover:to-teal-600 transition p-4">
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
