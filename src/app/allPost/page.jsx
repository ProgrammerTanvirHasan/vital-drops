"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const AllPost = () => {
  const [posts, setPost] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const allPost = async () => {
      try {
        const resp = await fetch("http://localhost:3000/allPost/api");
        const data = await resp.json();
        setPost(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    allPost();
  }, []);

  if (loading) {
    return <p>loading........</p>;
  }
  return (
    <div className="max-w-4xl mx-auto p-4 mt-8">
      <h2 className="text-2xl font-bold text-center mb-6">📢 All Posts</h2>
      <div className="grid gap-6">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div
              key={post._id}
              className="bg-white shadow-2xl glass  rounded-2xl p-4 "
            >
              <div className="flex items-center space-x-3 mb-4">
                <Image
                  src={post.postImage}
                  alt="Post Image"
                  width={70}
                  height={70}
                  className="rounded-lg shadow-sm"
                />
                <div>
                  <h3 className="text-lg font-semibold">{post.userName}</h3>
                  {post.userID && (
                    <a
                      href={post.userID}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 text-sm"
                    >
                      View Profile
                    </a>
                  )}
                </div>
              </div>
              <p className="text-gray-700">{post.post}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No posts available.</p>
        )}
      </div>
    </div>
  );
};

export default AllPost;
