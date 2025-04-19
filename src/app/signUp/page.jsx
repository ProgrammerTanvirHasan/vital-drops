"use client";

import Link from "next/link";
import { useState } from "react";
import { FaUser, FaLock, FaRegEyeSlash } from "react-icons/fa";
import { RxEyeOpen } from "react-icons/rx";
import { MdEmail } from "react-icons/md";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import axios from "axios";
import SocialSignIn from "@/components/shared/socialSignIn";

const signUp = () => {
  const router = useRouter();
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

    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=a9b9160b05e3d4e68e60f154f621c349`,
      formData
    );

    const image = response?.data?.data?.display_url;

    const user = { name, email, password, role, image };

    try {
      const resp = await axios.post("http://localhost:3000/signUp/api", user, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (resp.status == 200) {
        Swal.fire({
          title: "Welcome",
          text: resp?.data?.message,
          icon: "success",
          draggable: true,
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

  const [showPassword, setShowPassword] = useState(false);
  return (
    <div
      style={{ backgroundImage: "url('/image/image.png')" }}
      className="min-h-screen  flex items-center justify-center bg-cover"
    >
      <div className="bg-white shadow-lg rounded-lg min-w-[500px] p-6">
        <div
          style={{ backgroundImage: "url('/image/image.png')" }}
          className="text-center  p-12 min-h-80"
        >
          <h2 className="text-2xl font-bold text-white">Welcome</h2>
          <p className="text-2xl font-bold text-white">To SignUp Page</p>
          <p className="text-gray-500 text-sm">SignUp to create a new user</p>
          <button className="text-blue-600 font-semibold mt-2 hover:underline">
            Create A New Account
          </button>
        </div>

        <div className="mt-6">
          <h3 className="text-center text-gray-700 font-semibold mb-2">
            USER SIGN UP
          </h3>

          <form onSubmit={handleSignUp}>
            <div className="relative mb-4">
              <FaUser className="absolute left-3 top-3 text-gray-400" />
              <input
                name="name"
                type="text"
                placeholder="UserName"
                className="w-full pl-10 p-2  bg-orange-900 border focus:ring-2 focus:ring-blue-400 text-white rounded-md  outline-none"
              />
            </div>

            <div className="relative mb-4">
              <input
                name="image"
                type="file"
                className=" w-full p-2  bg-orange-900  focus:ring-2 focus:ring-blue-400 text-white rounded-md  outline-none"
              />
            </div>

            <div className="relative mb-4">
              <select
                defaultValue="User"
                name="role"
                className=" mb-4 w-full p-2  bg-orange-900 border focus:ring-2 focus:ring-blue-400 text-white rounded-md  outline-none"
              >
                <option disabled={true}>User</option>
                <option>Admin</option>
                <option>User</option>
              </select>
            </div>

            <div className="relative mb-4">
              <MdEmail className="absolute left-3 top-3 text-gray-400"></MdEmail>
              <input
                type="email"
                name="email"
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
              SIGN UP
            </button>

            <SocialSignIn></SocialSignIn>
          </form>
        </div>

        <p className="p-4 text-black bg-white px-2 rounded-b-xl rounded-l-xl ">
          If sign Up completed ? please sign in!{" "}
          <Link href={"/login"}>
            <span className="font-bold text-orange-400 border border-b-orange-400">
              Sign In
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default signUp;
