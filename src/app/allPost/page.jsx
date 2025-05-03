"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const AllPost = () => {
  const [posts, setPost] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const allPost = async () => {
      try {
        const resp = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/allPost/api`
        );
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
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center space-y-4">
          <div className="w-10 h-10 border-4 border-rose-300 border-t-rose-600 rounded-full animate-spin mx-auto" />
          <p className="text-rose-700 font-medium">
            Loading community voices...
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <h2 className="text-3xl font-bold text-center text-rose-900 mb-12">
        🗣️ Community Wall
      </h2>

      <div className="relative pl-6 border-l-4 border-rose-400 space-y-10">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div
              key={post._id}
              className="relative bg-white rounded-xl shadow-md p-6 ml-2 group hover:shadow-lg transition"
            >
              <div className="absolute -left-3.5 top-6 w-5 h-5 bg-rose-500 rounded-full border-4 border-white"></div>

              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-gray-800">
                    {post.userName}
                  </h3>
                  <span className="text-xs text-gray-400">
                    {new Date(post.time).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>

                {post.userID && (
                  <a
                    href={post.userID}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:underline"
                  >
                    Visit Profile ↗
                  </a>
                )}

                <p className="text-gray-700 text-sm leading-relaxed">
                  {post.post}
                </p>

                {post.postImage && (
                  <div className="w-full h-96 relative rounded-md overflow-hidden border border-gray-200">
                    <Image
                      src={post.postImage}
                      alt="Post"
                      fill
                      className="object-cover object-center"
                    />
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No posts found yet.</p>
        )}
      </div>
    </section>
  );
};

export default AllPost;
