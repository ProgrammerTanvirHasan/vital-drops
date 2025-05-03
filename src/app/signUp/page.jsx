"use client";

import Link from "next/link";
import { useState } from "react";
import { FaUser, FaLock, FaRegEyeSlash } from "react-icons/fa";
import { RxEyeOpen } from "react-icons/rx";
import { MdEmail } from "react-icons/md";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import axios from "axios";
import SocialSignIn from "@/components/shared/SocialSignIn";

const SignUp = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const role = form.role.value;
    const imageFile = form.image.files[0];

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=a9b9160b05e3d4e68e60f154f621c349`,
        formData
      );

      const image = response?.data?.data?.display_url;
      const user = { name, email, password, role, image };

      const resp = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/signUp/api`,
        user,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (resp.status === 200) {
        Swal.fire({
          title: "Welcome",
          text: resp?.data?.message,
          icon: "success",
        });
        router.push("/login");
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
    <div className="flex justify-center  bg-base-300 items-center min-h-screen">
      <div className="w-[75vh] h-[75vh] bg-white rounded-lg shadow-md flex flex-col justify-center px-10 py-6 overflow-auto">
        <h2 className="text-2xl font-bold text-center text-red-800 mb-4">
          Create Account
        </h2>
        <form onSubmit={handleSignUp} className="space-y-4">
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-gray-400" />
            <input
              name="name"
              type="text"
              placeholder="Username"
              required
              className="w-full pl-10 p-2 border-b-2 border-gray-300 bg-transparent text-gray-700 focus:outline-none focus:border-red-500"
            />
          </div>

          <div>
            <input
              name="image"
              type="file"
              required
              className="w-full p-2 border-b-2 border-gray-300 bg-transparent text-gray-700 focus:outline-none focus:border-red-500"
            />
          </div>

          <div>
            <select
              defaultValue="User"
              name="role"
              className="w-full p-2 border-b-2 border-gray-300 bg-transparent text-gray-700 focus:outline-none focus:border-red-500"
            >
              <option disabled>User</option>
              <option>Admin</option>
              <option>User</option>
            </select>
          </div>

          <div className="relative">
            <MdEmail className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              className="w-full pl-10 p-2 border-b-2 border-gray-300 bg-transparent text-gray-700 focus:outline-none focus:border-red-500"
            />
          </div>

          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-400" />
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              className="w-full pl-10 pr-10 p-2 border-b-2 border-gray-300 bg-transparent text-gray-700 focus:outline-none focus:border-red-500"
            />
            <div
              className="absolute right-3 top-3 text-gray-500 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaRegEyeSlash /> : <RxEyeOpen />}
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-2 bg-red-600 hover:bg-red-700 text-white py-2 rounded-full transition"
          >
            SIGN UP
          </button>

          <div className="flex items-center gap-2">
            <div className="flex-grow border-t"></div>
            <span className="text-sm text-gray-500">or</span>
            <div className="flex-grow border-t"></div>
          </div>

          <SocialSignIn />
        </form>

        <p className="text-center text-sm mt-4 text-gray-700">
          Already have an account?{" "}
          <Link href="/login" className="text-red-600 font-semibold">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
