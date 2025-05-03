"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Swal from "sweetalert2";
import { RxEyeOpen } from "react-icons/rx";
import { FaRegEyeSlash } from "react-icons/fa";
import SocialSignIn from "@/components/shared/SocialSignIn";

const Login = () => {
  const searchParams = useSearchParams();
  const path = searchParams.get("redirect");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const resp = await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: path ? path : "/",
    });

    if (resp?.error) {
      Swal.fire({
        title: "Login Failed",
        text: resp.error,
        icon: "error",
      });
    } else {
      Swal.fire({
        title: "Logged In",
        text: "Credential login successful",
        icon: "success",
      });
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-base-300 pt-4 pb-12">
      <div className="w-[75vh] h-[100vh] border rounded-md shadow-md flex flex-col justify-center px-10 py-6">
        <h2 className="text-2xl font-bold text-center text-red-800 mb-6 ">
          Welcome Back!
        </h2>
        <form onSubmit={handleLogin} className="space-y-5 ">
          <div>
            <label className="text-sm font-semibold text-gray-600">
              E-mail
            </label>
            <input
              type="email"
              name="email"
              required
              className="w-full border-b-2 border-gray-300 outline-none py-2 focus:border-red-500"
            />
          </div>
          <div className="relative">
            <label className="text-sm font-semibold text-gray-600">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              className="w-full border-b-2 border-gray-300 outline-none py-2 pr-10 focus:border-red-500"
            />
            <div
              className="absolute right-2 top-9 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaRegEyeSlash /> : <RxEyeOpen />}
            </div>
          </div>

          <div className="text-right">
            <Link
              href="/forgot-password"
              className="text-sm text-red-600 font-semibold"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-full transition"
          >
            Login
          </button>

          <div className="flex items-center gap-2">
            <div className="flex-grow border-t"></div>
            <span className="text-sm text-gray-500">
              ........................................or......................................
            </span>
            <div className="flex-grow border-t"></div>
          </div>

          <SocialSignIn />

          <p className="text-center text-sm text-gray-700">
            Don’t have an account?{" "}
            <Link href="/signUp" className="text-red-600 font-semibold">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
