import Footer from "@/components/footer/Footer";
import Navbar from "@/components/shared/Navbar";
import AuthProvider from "@/services/AuthProvider";
import { FaHome } from "react-icons/fa";
import { RiAdminLine } from "react-icons/ri";
import { Poppins } from "next/font/google";

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
            <div className="pt-24 ">
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
                    <h2 className="text-orange-300">Admin dashboard</h2>
                    <a href="/announcement">
                      <button className="glass  p-2">Announcement</button>
                    </a>
                  </div>
                  <div className="flex flex-col py-2 text-sm">
                    <a href="/dashboard/bloodBanks">
                      <button className="glass mb-2">1.Add blood bank</button>
                    </a>
                    <a href="/dashboard/viewAllBloodBank">
                      <button className="glass mb-2">
                        2.intercet with bloodBank
                      </button>
                    </a>
                    <a href="/dashboard/bloodRequest">
                      <button className="glass mb-2">
                        3.View all blood request
                      </button>
                    </a>
                  </div>
                </div>

                <div className="border ">
                  <div className="flex gap-2 py-2 ">
                    <h2 className="text-orange-300">Tutor dashboard</h2>
                  </div>
                  <div className="flex flex-col py-2 text-sm">
                    <a href="/dashboard/bloodRequestForm">
                      <button className="glass mb-2">
                        1.Added you blood request
                      </button>
                    </a>
                    <a href="/dashboard/allSession">
                      <button className="glass mb-2">
                        2.View all study sessions created by a tutor
                      </button>
                    </a>
                    <a href="/dashboard/uploadMaterials">
                      <button className="glass mb-2">3.Upload materials</button>
                    </a>
                    <a href="/dashboard/viewMaterials">
                      <button className="glass mb-2">
                        4.View all material
                      </button>
                    </a>
                  </div>
                </div>

                <div className="border   ">
                  <div className="flex gap-2 py-2">
                    <h2 className="text-orange-300">Student dashboard</h2>
                  </div>
                  <div className="flex flex-col py-2 text-sm">
                    <a href="/dashboard/ViewBooked">
                      <button className="glass mb-2">
                        1.View booked session
                      </button>
                    </a>
                    <a href="/dashboard/createNote">
                      <button className="glass mb-2">2.Create note</button>
                    </a>
                    <a href="/dashboard/personalNote">
                      <button className="glass mb-2">
                        3.Manage personal notes
                      </button>
                    </a>
                    <a href="/dashboard/allStudyMaterials">
                      <button className="glass mb-2 pr-2">
                        4.View all study materials provided by the tutor
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
