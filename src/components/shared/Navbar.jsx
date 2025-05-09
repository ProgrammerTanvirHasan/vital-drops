"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { RiMenu2Line } from "react-icons/ri";
import { useState } from "react";

const Navbar = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="backdrop-blur-md bg-cyan-800  shadow-lg text-white transition-all duration-300">
      <div className="flex justify-end text-xl"></div>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center space-x-2 group">
          <span className="text-xl font-bold  tracking-wider group-hover:text-orange-400 transition">
            Vital Drops
          </span>
        </Link>
        <ul className="hidden lg:flex items-center space-x-8 font-medium text-lg">
          {links.map((link) => (
            <li key={link.path}>
              <Link
                href={link.path}
                className={`hover:text-pink-300 transition duration-200 ${
                  pathname === link.path ? "text-cyan-300" : ""
                }`}
              >
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
        <div className="hidden lg:block">
          {status === "loading" ? (
            <p className="text-sm animate-pulse">Loading...</p>
          ) : status === "authenticated" ? (
            <button
              onClick={() => signOut()}
              className="block text-center bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-2 rounded-full hover:from-cyan-600 hover:to-teal-600 transition p-2"
            >
              Sign Out
            </button>
          ) : (
            <Link
              href="/login"
              className="block text-center bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-2 rounded-full hover:from-cyan-600 hover:to-teal-600 transition p-2"
            >
              Sign In
            </Link>
          )}
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-3xl"
        >
          <RiMenu2Line />
        </button>
      </div>

      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        } px-6`}
      >
        <ul className="space-y-4 py-4 text-lg font-medium text-green-100">
          {links.map((link) => (
            <li key={link.path}>
              <Link
                href={link.path}
                className={`block py-1 px-2 rounded hover:bg-white/10 transition ${
                  pathname === link.path ? "text-orange-400" : ""
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
        <div className="pb-4">
          {status === "authenticated" ? (
            <button
              onClick={() => signOut()}
              className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-2 rounded-full hover:from-red-500 hover:to-orange-600 transition"
            >
              Sign Out
            </button>
          ) : (
            <Link
              href="/login"
              className="block text-center bg-gradient-to-r from-green-500 to-teal-500 text-white py-2 rounded-full hover:from-teal-500 hover:to-green-600 transition"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

const links = [
  { title: "Home", path: "/" },
  { title: "Find a Donor", path: "/donor" },
  { title: "Blood Banks", path: "/bloodBanks" },
  { title: "Today's Patient", path: "/todaysBloodRequest" },
  { title: "All Post", path: "/allPost" },
  { title: "Dashboard", path: "/dashboard" },
];

export default Navbar;
