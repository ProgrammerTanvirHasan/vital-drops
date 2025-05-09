"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

const SocialSignIn = () => {
  const searchParams = useSearchParams();
  const path = searchParams.get("redirect");

  const handleSocialSign = async (provider) => {
    await signIn(provider, {
      redirect: true,
      callbackUrl: path ? path : "/",
    });
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center items-center gap-4 pt-4">
      <button
        onClick={() => handleSocialSign("google")}
        type="button"
        className="w-64 px-6 py-3 text-white bg-red-500 hover:bg-red-600 rounded-xl shadow-lg transition duration-200"
      >
        Google
      </button>
      <button
        onClick={() => handleSocialSign("facebook")}
        type="button"
        className="w-64 px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-lg transition duration-200"
      >
        Facebook
      </button>
      <button
        onClick={() => handleSocialSign("github")}
        type="button"
        className="w-64 px-6 py-3 text-white bg-gray-800 hover:bg-gray-900 rounded-xl shadow-lg transition duration-200"
      >
        GitHub
      </button>
    </div>
  );
};

export default SocialSignIn;
