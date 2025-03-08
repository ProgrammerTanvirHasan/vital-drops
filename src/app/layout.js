import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/shared/Navbar";
import AuthProvider from "@/services/AuthProvider";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Vital Drops - Donate Blood, Save Lives",
    template: "%s | Vital Drops",
  },
  description:
    "Join Vital Drops to donate blood and save lives. Find nearby donation centers and help those in need today.",
  keywords: ["blod", "donate", "saveLife", "Vital Drops "],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
        
            <Navbar></Navbar>
            <div className="pt-24">{children}</div>

            <Footer></Footer>
          
        </AuthProvider>
      </body>
    </html>
  );
}
