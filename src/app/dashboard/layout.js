import Footer from "@/components/footer/Footer";
import Navbar from "@/components/shared/Navbar";
import AuthProvider from "@/services/AuthProvider";
import { FaHome } from "react-icons/fa";
import { RiAdminLine } from "react-icons/ri";
import { Poppins } from "next/font/google";
import { FaUsers } from "react-icons/fa";

const popins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${popins.className}`}>
        <AuthProvider>
          <Navbar></Navbar>

          <div className="lg:flex gap-4 lg:ml-4">
            {/* sidebar */}
            <div className="pt-24 min-h-screen">
              <div className=" flex flex-col  bg-cyan-800  text-white pl-4  min-h-full lg:w-80">
                <div className="text-2xl border flex gap-2 py-2">
                  <FaHome className="text-3xl"></FaHome>
                  <a href="/" className="text-orange-300">
                    Home
                  </a>
                </div>

                <div className="border ">
                  <div className="flex gap-2 py-2">
                    <RiAdminLine className="text-2xl"></RiAdminLine>
                    <h2 className="text-orange-300 underline">
                      Admin dashboard
                    </h2>
                  </div>
                  <div className="flex flex-col py-2 text-sm">
                    <a href="/dashboard/bloodBanks">
                      <button className="glass mb-4">1.Add blood bank</button>
                    </a>
                    <a href="/dashboard/addEvents">
                      <button className="glass mb-4">2.Add events</button>
                    </a>
                    <a href="/dashboard/viewAllBloodBank">
                      <button className="glass mb-4">
                        3.Intercet with bloodBank
                      </button>
                    </a>

                    <a href="/dashboard/allEvents">
                      <button className="glass mb-4">3.All Events</button>
                    </a>
                  </div>
                </div>

                <div className="border ">
                  <div className="flex gap-2 py-2">
                    <FaUsers className="text-2xl"></FaUsers>
                    <h2 className="text-orange-300 underline">
                      Users dashboard
                    </h2>
                  </div>
                  <div className="flex flex-col py-2 text-sm">
                    <a href="/dashboard/bloodRequestForm">
                      <button className="glass mb-4">
                        1.Added you blood request
                      </button>
                    </a>
                    <a href="/dashboard/allSession">
                      <button className="glass mb-4">
                        2.View all blood bank
                      </button>
                    </a>
                    <a href="/dashboard/donateBlood">
                      <button className="glass mb-4">3.Donate Blood</button>
                    </a>
                    <a href="/dashboard/post">
                      <button className="glass mb-4">
                        4.You can post here !
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* childreen */}
            <div className="pt-4 lg:pt-24 container mx-auto ">{children}</div>
          </div>
          <Footer></Footer>
        </AuthProvider>
      </body>
    </html>
  );
}
