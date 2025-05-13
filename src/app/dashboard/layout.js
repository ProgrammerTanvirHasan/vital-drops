"use client";

import AuthProvider from "@/services/AuthProvider";
import { usePathname } from "next/navigation";
import { RiAdminLine, RiDashboard2Fill } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
import { Poppins } from "next/font/google";
import Link from "next/link";

const popins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const pathname = usePathname();

  const adminLinks = [
    { label: "Add blood bank", href: "/dashboard/bloodBanks" },
    { label: "Add events", href: "/dashboard/addEvents" },
    { label: "Interact with bloodBank", href: "/dashboard/viewAllBloodBank" },
    { label: "All Events", href: "/dashboard/allEvents" },
  ];

  const userLinks = [
    { label: "Blood Request Form", href: "/dashboard/bloodRequestForm" },
    { label: "View all blood bank", href: "/dashboard/allSession" },
    { label: "Donate Blood", href: "/dashboard/donateBlood" },
    { label: "You can post here !", href: "/dashboard/post" },
    { label: "All Registered Donor", href: "/dashboard/regDonor" },
  ];

  return (
    <div className={popins.className}>
      <AuthProvider>
        <div className="lg:flex">
          {/* Sidebar */}
          <div className="flex flex-col bg-cyan-800 text-white min-h-screen lg:w-80 shadow-lg">
            {/* Dashboard Title */}
            <div className="bg-white text-cyan-700 font-bold p-4 rounded-l-full shadow mb-4">
              <p className="flex items-center">
                <RiDashboard2Fill className="text-2xl mr-2" />
                Dashboard
              </p>
            </div>

            {/* Admin Links */}
            <div className="px-4">
              <div className="flex gap-2 py-2 items-center">
                <RiAdminLine className="text-2xl" />
                <h2 className="text-orange-300 underline text-lg font-semibold">
                  Admin Dashboard
                </h2>
              </div>

              <div className="flex flex-col py-2 pl-6 text-sm">
                {adminLinks.map((link) => (
                  <Link key={link.href} href={link.href}>
                    <button
                      className={`mb-3 text-left transition duration-200 ${
                        pathname === link.href
                          ? "text-cyan-300 font-semibold"
                          : "hover:text-cyan-300"
                      }`}
                    >
                      {link.label}
                    </button>
                  </Link>
                ))}
              </div>
            </div>

            {/* User Links */}
            <div className="px-4">
              <div className="flex gap-2 py-2 items-center">
                <FaUsers className="text-2xl" />
                <h2 className="text-orange-300 underline text-lg font-semibold">
                  Users Dashboard
                </h2>
              </div>

              <div className="flex flex-col py-2 pl-6 text-sm">
                {userLinks.map((link) => (
                  <Link key={link.href} href={link.href}>
                    <button
                      className={`mb-3 text-left transition duration-200 ${
                        pathname === link.href
                          ? "text-cyan-300 font-semibold"
                          : "hover:text-cyan-300"
                      }`}
                    >
                      {link.label}
                    </button>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-gray-100 min-h-screen p-4">{children}</div>
        </div>
      </AuthProvider>
    </div>
  );
}
