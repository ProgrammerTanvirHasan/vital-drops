import AuthProvider from "@/services/AuthProvider";

import { RiAdminLine } from "react-icons/ri";
import { Poppins } from "next/font/google";
import { FaUsers } from "react-icons/fa";
import { RiDashboard2Fill } from "react-icons/ri";

const popins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <div>
      <div className={`${popins.className}`}>
        <AuthProvider>
          <div className="lg:flex gap-4 ">
            {/* sidebar */}
            <div>
              <div className=" flex flex-col  bg-cyan-800  text-white  min-h-full lg:w-80">
                <div className="bg-white text-cyan-700 font-bold p-2 rounded-l-full  ">
                  <p className="flex">
                    <RiDashboard2Fill className="text-2xl mr-2"></RiDashboard2Fill>
                    Dashboard
                  </p>
                </div>
                <div className=" ">
                  <div className="flex gap-2 py-2">
                    <RiAdminLine className="text-2xl"></RiAdminLine>
                    <h2 className="text-orange-300 underline">
                      Admin dashboard
                    </h2>
                  </div>
                  <div className="flex flex-col py-2 pl-10 text-sm">
                    <a href="/dashboard/bloodBanks">
                      <button className=" mb-4 hover:text-cyan-300 transition duration-200">
                        Add blood bank
                      </button>
                    </a>
                    <a href="/dashboard/addEvents">
                      <button className=" mb-4 hover:text-cyan-300 transition duration-200">
                        Add events
                      </button>
                    </a>
                    <a href="/dashboard/viewAllBloodBank">
                      <button className=" mb-4 hover:text-cyan-300 transition duration-200">
                        Intercet with bloodBank
                      </button>
                    </a>

                    <a href="/dashboard/allEvents">
                      <button className=" mb-4 hover:text-cyan-300 transition duration-200">
                        All Events
                      </button>
                    </a>
                  </div>
                </div>

                <div className=" ">
                  <div className="flex gap-2 py-2">
                    <FaUsers className="text-2xl"></FaUsers>
                    <h2 className="text-orange-300 underline">
                      Users dashboard
                    </h2>
                  </div>
                  <div className="flex flex-col py-2 text-sm pl-10">
                    <a href="/dashboard/bloodRequestForm">
                      <button className=" mb-4 hover:text-cyan-300 transition duration-200">
                        Blood Request Form
                      </button>
                    </a>
                    <a href="/dashboard/allSession">
                      <button className=" mb-4 hover:text-cyan-300 transition duration-200">
                        View all blood bank
                      </button>
                    </a>
                    <a href="/dashboard/donateBlood">
                      <button className=" mb-4 hover:text-cyan-300 transition duration-200">
                        Donate Blood
                      </button>
                    </a>
                    <a href="/dashboard/post">
                      <button className=" mb-4 hover:text-cyan-300 transition duration-200">
                        You can post here !
                      </button>
                    </a>

                    <a href="/dashboard/regDonor">
                      <button className=" mb-4 hover:text-cyan-300 transition duration-200">
                        All Registered Donor
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* childreen */}
            <div className="container mx-auto ">{children}</div>
          </div>
        </AuthProvider>
      </div>
    </div>
  );
}
