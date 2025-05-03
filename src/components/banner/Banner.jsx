"use client";
import { FaHandsHelping, FaHeart, FaTint, FaUsers } from "react-icons/fa";
import Marquee from "react-fast-marquee";

import Link from "next/link";
const Banner = () => {
  return (
    <div>
      <div className="bg-gradient-to-br from-[#8B0000] to-[#C41E3A]">
        <div className=" min-h-[650px] flex items-center justify-center text-white ">
          <div className="text-center max-w-3xl px-4 shadow-xl p-4 glass">
            <h1 className="text-4xl font-bold mb-4">
              Donate Blood, Save Lives ❤️
            </h1>
            <p className="text-lg mb-6">
              Your one donation can save up to three lives. Join us in making a
              difference.
            </p>
            <p className="text-lg mb-6">
              Be a hero today—give the gift of life and inspire others to do the
              same!
            </p>
            <Link href={"/signUp"}>
              <button className="btn bg-gradient-to-r from-teal-700 to-cyan-800 mt-36 hover:from-cyan-800 hover:to-teal-900 text-white text-lg">
                SignUp
              </button>
            </Link>
          </div>
        </div>
        <div className="  text-gray-900 px-6">
          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6 text-center border-b-4 border-cyan-800">
            {statistics.map((stat) => (
              <section key={stat.id} className="shadow-lg  p-6 bg-white">
                <div className="flex flex-col items-center">
                  <div className="text-red-600 text-4xl mb-2">{stat.icon}</div>
                  <h2 className="text-2xl font-bold">{stat.value}</h2>
                  <p className="text-gray-600">{stat.title}</p>
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center py-2">
        <p className="text-3xl p-4 font-bold text-red-700 ">Lifeline Updates</p>
        <div className="bg-gradient-to-br from-[#8B0000] to-[#C41E3A] text-white py-2 mt-6 flex-1">
          <Marquee
            speed={80}
            gradient={false}
            className="text-lg font-semibold"
          >
            🩸 Donate Blood, Save Lives! 🩸 Be a Hero Today! 🩸 Your One
            Donation Can Save Three Lives! 🩸 Join the Movement Now! 🩸
          </Marquee>
        </div>
      </div>
    </div>
  );
};
const statistics = [
  {
    id: 1,
    title: "Registered Donors",
    value: "12,345",
    icon: <FaUsers />,
  },
  {
    id: 2,
    title: "Blood Donations",
    value: "8,765",
    icon: <FaTint />,
  },
  {
    id: 3,
    title: "Lives Saved",
    value: "5,432",
    icon: <FaHeart />,
  },
  {
    id: 4,
    title: "Volunteers Engaged",
    value: "2,100",
    icon: <FaHandsHelping />,
  },
];

export default Banner;
