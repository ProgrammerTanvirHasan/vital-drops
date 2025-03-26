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
        const sortedData = sortData(data);
        setPost(sortedData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    allPost();
  }, []);

  const sortData = (data) => {
    return [...data].sort((a, b) => new Date(b.time) - new Date(a.time));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 mt-2">
      <h2 className="text-2xl font-bold text-center mb-6">📢 All Posts</h2>
      <div className="grid gap-6">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div
              key={post._id}
              className="bg-white shadow-2xl rounded-2xl mb-16 p-4 flex flex-col items-center text-center"
            >
              <Image
                src={post.postImage}
                alt="Post Image"
                width={500}
                height={500}
                className="rounded-lg shadow-sm mb-4"
              />
              <h3 className="text-lg font-semibold">{post.userName}</h3>
              {post.userID && (
                <a
                  href={post.userID}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 text-sm mb-2"
                >
                  View Profile
                </a>
              )}
              <p className="text-gray-700 mt-2">{post.post}</p>
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
