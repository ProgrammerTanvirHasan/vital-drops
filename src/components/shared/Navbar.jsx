import Link from "next/link";

import { BiSolidDonateBlood } from "react-icons/bi";
import { RiMenu2Line } from "react-icons/ri";
const Navbar = () => {
  const links = [
    {
      title: "Donate_Blood",
      path: "/DonateBlood",
    },
    {
      title: "Find a Donor",
      path: "/Donor",
    },
    {
      title: "Blood_Banks",
      path: "/BloodBanks",
    },
    {
      title: "Dashboard ",
      path: "/Dashboard",
    },
  ];

  return (
    <div className="navbar  bg-[#3E5879] text-white fixed">
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
              <Link key={link.path} href={`/${link.path}`}>
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
            <Link key={link.path} href={`/${link.path}`}>
              {link.title}
            </Link>
          ))}
        </ul>
      </div>
      <div className="navbar-end">
        <a href="/login" className="btn">
          LogIn
        </a>
      </div>
    </div>
  );
};

export default Navbar;
