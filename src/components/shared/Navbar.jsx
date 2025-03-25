"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { BiSolidDonateBlood } from "react-icons/bi";
import { RiMenu2Line } from "react-icons/ri";
const Navbar = () => {
  const pathName = usePathname();

  const session = useSession();

  return (
    <div className="navbar  bg-[#3E5879] text-white fixed lg:py-4">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <RiMenu2Line className="text-3xl"></RiMenu2Line>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100  mt-3 w-36 p-2 text-green-900  "
          >
            {links.map((link) => (
              <Link
                className={`${pathName === link?.path && "text-orange-600"}`}
                key={link.path}
                href={link.path}
              >
                {link.title}
              </Link>
            ))}
          </ul>
        </div>
        <a href="/" className="">
          <BiSolidDonateBlood className="text-4xl text-red-300"></BiSolidDonateBlood>
          <p className="text-green-400 text-xl">Vital_Drops</p>
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-4">
          {links.map((link) => (
            <Link
              className={`${pathName === link?.path && "text-cyan-300"}`}
              key={link.path}
              href={link.path}
            >
              {link.title}
            </Link>
          ))}
        </ul>
      </div>

      {session.status === "loading" ? (
        <h1>Loading...</h1>
      ) : session.status === "authenticated" ? (
        <div className="navbar-end">
          <button
            onClick={() => signOut()}
            className="btn bg-orange-900 text-white hover:bg-black"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <div className="navbar-end">
          <a
            href="/login"
            className="btn bg-green-600 text-white hover:bg-black text-lg"
          >
            Sign In
          </a>
        </div>
      )}
    </div>
  );
};
const links = [
  {
    title: "All Post",
    path: "/allPost",
  },
  {
    title: "Find a Donor",
    path: "/donor",
  },
  {
    title: "Blood_Banks",
    path: "/bloodBanks",
  },
  {
    title: "Todays patient",
    path: "/todaysBloodRequest",
  },
  {
    title: "Dashboard ",
    path: "/dashboard",
  },
];

export default Navbar;
