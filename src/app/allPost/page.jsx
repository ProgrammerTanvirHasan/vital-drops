"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const AllPost = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likedPosts, setLikedPosts] = useState({});

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const resp = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/allPost/api`
        );
        const data = await resp.json();
        const sorted = sortData(data);
        setPosts(sorted);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const sortData = (data) => {
    return [...data].sort((a, b) => new Date(b.time) - new Date(a.time));
  };

  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const postDate = new Date(dateString);
    const diff = Math.floor((now - postDate) / 1000);

    if (diff < 60) return `${diff} seconds ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    if (diff < 604800) return `${Math.floor(diff / 86400)} days ago`;

    return postDate.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const toggleLike = (id) => {
    setLikedPosts((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-rose-50 to-white">
        <div className="text-center space-y-5">
          <div className="relative w-16 h-16 mx-auto">
            <div className="w-16 h-16 rounded-full border-4 border-rose-200 border-t-rose-500 animate-spin"></div>
            <div className="absolute top-0 left-0 w-16 h-16 flex items-center justify-center">
              <span className="text-2xl">🗣️</span>
            </div>
          </div>
          <p className="text-rose-700 font-medium animate-pulse">
            Loading community voices...
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12 bg-gradient-to-br from-rose-50/50 to-white rounded-xl my-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-rose-900 inline-block relative">
          <span className="relative z-10">🗣️ Community Wall</span>
        </h2>
        <p className="text-rose-600 mt-3 max-w-lg mx-auto">
          Join the conversation and share your thoughts with our growing
          community
        </p>
      </div>

      <div className="relative pl-8 md:pl-10 space-y-12">
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <div
              key={post._id}
              className="relative bg-white rounded-xl shadow-md hover:shadow-lg  overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute -left-10 top-8 w-6 h-6 bg-gradient-to-br from-rose-500 to-rose-400 rounded-full border-4 border-white shadow-md z-10"></div>
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-rose-400 to-rose-300"></div>

              <div className="p-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-4 border-b border-gray-100 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-300 to-pink-200 flex items-center justify-center text-white font-bold">
                      {post.userName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 leading-tight">
                        {post.userName}
                      </h3>
                      {post.userID && (
                        <a
                          href={post.userID}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-rose-500 hover:text-rose-700 hover:underline inline-flex items-center gap-1 mt-0.5"
                        >
                          <span>Visit Profile</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3 w-3"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                  <span className="text-xs font-medium text-gray-400 bg-gray-50 px-2 py-1 rounded-full">
                    {formatTimeAgo(post.time)}
                  </span>
                </div>

                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">{post.post}</p>

                  {post.postImage && (
                    <div className="mt-4 rounded-lg overflow-hidden border border-gray-100 shadow-sm group">
                      <div className="w-full h-80 md:h-96 relative transition-transform duration-700 transform group-hover:scale-105">
                        <Image
                          src={post.postImage}
                          alt={`Image shared by ${post.userName}`}
                          fill
                          className="object-cover object-center"
                          sizes="(max-width: 768px) 100vw, 768px"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-4 pt-2 text-gray-500 text-sm">
                    <button
                      className={`flex items-center gap-1 transition-colors ${
                        likedPosts[post._id] ? "text-rose-500" : "text-gray-500"
                      }`}
                      onClick={() => toggleLike(post._id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                      <span>Like</span>
                    </button>
                    <button className="flex items-center gap-1 hover:text-rose-500 transition-colors">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                      <span>Comment</span>
                    </button>
                    <button className="flex items-center gap-1 hover:text-rose-500 transition-colors">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                        />
                      </svg>
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-xl shadow-md p-10 text-center">
            <div className="mx-auto w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">📝</span>
            </div>
            <p className="text-gray-600 mb-3">No posts found yet.</p>
            <p className="text-rose-500 text-sm">
              Be the first to share your thoughts!
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default AllPost;
