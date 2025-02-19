"use client";

import Link from "next/link";
import { useState } from "react";
import { FaLock, FaRegEyeSlash } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RxEyeOpen } from "react-icons/rx";

const Login = () => {
  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const user = { email, password };
    console.log(user, "user");
  };
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div
      style={{ backgroundImage: "url('/image/login.png')" }}
      className="min-h-screen  flex items-center justify-center bg-cover"
    >
      <div className="bg-white shadow-lg rounded-lg  p-6 min-w-[500px]">
        <div
          style={{ backgroundImage: "url('/image/login.png')" }}
          className="text-center  p-12 min-h-80"
        >
          <h2 className="text-2xl font-bold text-white">Welcome</h2>
          <p className="text-2xl font-bold text-white">To The Website</p>
          <p className="text-gray-500 text-sm">Login to access your account.</p>
          <button className="text-blue-600 font-semibold mt-2 hover:underline">
            LOGIN ACCOUNT
          </button>
        </div>

        <div className="mt-6">
          <h3 className="text-center text-gray-700 font-semibold mb-2">
            USER LOGIN
          </h3>

          <form onSubmit={handleLogin}>
            <div className="relative mb-4">
              <MdEmail className="absolute left-3 top-3 text-gray-400"></MdEmail>
              <input
                name="email"
                type="email"
                placeholder="UserEmail"
                className="w-full pl-10 p-2 bg-orange-900 border text-white rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            <div className="relative mb-4 flex">
              <FaLock className="absolute left-3 top-3 text-gray-400" />
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full pl-10 p-2 border bg-orange-900 text-white rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
              />
              <p
                onClick={() => setShowPassword(!showPassword)}
                className="mt-3 text-xl text-white relative -ml-8"
              >
                {showPassword ? (
                  <FaRegEyeSlash></FaRegEyeSlash>
                ) : (
                  <RxEyeOpen></RxEyeOpen>
                )}
              </p>
            </div>

            <button className="w-full mt-4 bg-orange-950 text-white py-2 rounded-md hover:bg-blue-800 transition">
              LOGIN
            </button>

            <div className="flex justify-between pt-2">
              <button
                type="button"
                className="text-orange-300 bg-slate-950 glass btn"
              >
                GOOGLE LOGIN
              </button>
              <button
                type="button"
                className="text-orange-300 bg-slate-950 glass btn "
              >
                GITHUB LOGIN
              </button>
            </div>
          </form>
        </div>
        <p className="p-4 text-black bg-white px-2 rounded-b-xl rounded-l-xl ">
          If not registered? First Sign Up please!{" "}
          <Link href={"/signUp"}>
            <span className="font-bold text-orange-400 border border-b-orange-400">
              SignUp
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
