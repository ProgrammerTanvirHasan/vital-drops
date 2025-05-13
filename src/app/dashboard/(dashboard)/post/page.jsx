"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";

const YourPost = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="text-center py-10 min-h-screen">Please wait...</div>;
  }

  const handlePost = async (e) => {
    e.preventDefault();
    const form = e.target;
    const post = form.post.value.trim();
    const imageFile = form.image.files[0];

    if (!post) {
      return Swal.fire({
        icon: "warning",
        text: "Post cannot be empty!",
        confirmButtonText: "Okay",
      });
    }

    if (!imageFile) {
      return Swal.fire({
        icon: "warning",
        text: "Please upload an image!",
        confirmButtonText: "Okay",
      });
    }

    const time = new Date().toISOString();
    const formData = new FormData();
    formData.append("image", imageFile);

    let postImage = "";

    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=a9b9160b05e3d4e68e60f154f621c349`,
        formData
      );
      postImage = response?.data?.data?.display_url;
    } catch (err) {
      return Swal.fire({
        icon: "error",
        text: "Image upload failed! Try again later.",
        confirmButtonText: "Okay",
      });
    }

    const postData = {
      post,
      postImage,
      userName: session?.user?.name,
      userID: session?.user?.facebookProfile || "",
      email: session?.user?.email,
      time,
    };

    try {
      const resp = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/post/api`,
        postData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (resp.status === 200) {
        Swal.fire({
          title: "Success",
          text: "Your post has been published!",
          icon: "success",
          confirmButtonText: "Great!",
        });
        form.reset();
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.response?.data?.message || "Something went wrong!",
        icon: "error",
        confirmButtonText: "Okay",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-slate-100 to-slate-200 py-10 px-4">
      <div className="max-w-xl mx-auto bg-white/70 backdrop-blur-md border border-gray-200 rounded-2xl shadow-lg p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-800">
            Create a New Post
          </h2>
          <p className="text-sm text-gray-500">
            Share your thoughts or an image with the community.
          </p>
          {session?.user && (
            <div className="mt-4 text-sm text-gray-700">
              <span className="font-semibold">Logged in as:</span>{" "}
              {session.user.name} ({session.user.email})
            </div>
          )}
        </div>

        <form onSubmit={handlePost} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Post
            </label>
            <textarea
              name="post"
              rows="4"
              placeholder="What's on your mind?"
              className="w-full border text-black border-gray-300 p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none"
              required
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload an Image
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-lg file:text-sm file:font-semibold file:bg-gray-100 hover:file:bg-gray-200"
              required
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-full hover:from-cyan-600 hover:to-teal-600 transition p-3 font-semibold shadow"
            >
              Submit Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default YourPost;
