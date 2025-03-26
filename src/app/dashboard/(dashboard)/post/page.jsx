"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";

const yourPost = () => {
  const session = useSession();
  console.log(session);

  const handlePost = async (e) => {
    e.preventDefault();
    const form = e.target;
    const post = form.post.value;
    const imageFile = form.image.files[0];

    const time = new Date().toLocaleString();

    const formData = new FormData();
    formData.append("image", imageFile);

    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=a9b9160b05e3d4e68e60f154f621c349`,
      formData
    );

    const postImage = response?.data?.data?.display_url;

    const postData = {
      post,
      postImage,
      userName: session.data?.user?.name,
      userID: session.data?.user?.facebookProfile || "",
      email: session?.data?.user?.email,
      time,
    };

    try {
      const resp = await axios.post(
        "http://localhost:3000/dashboard/post/api",
        postData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (resp.status === 200) {
        Swal.fire({
          title: "Added",
          text: "Published you post successfully",
          icon: "success",
          draggable: true,
        });
        form.reset("");
      }
    } catch (error) {
      Swal.fire({
        title: "Error signing up",
        text: error.response?.data?.message || "Something went wrong!",
        icon: "error",
      });
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-md w-full max-w-md mx-auto">
      <p className="text-lg font-semibold mb-2">You can post here</p>
      <form onSubmit={handlePost} className="space-y-4">
        <div>
          <textarea
            name="post"
            placeholder="Write something..."
            className="textarea textarea-secondary w-full p-2 border rounded-md"
          ></textarea>
        </div>
        <div className="flex flex-col">
          <label className="font-medium">Upload Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            className="border p-2 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Submit Post
        </button>
      </form>
    </div>
  );
};
export default yourPost;
