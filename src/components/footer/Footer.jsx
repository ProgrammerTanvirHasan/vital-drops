import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-[#3E5879] mt-4 rounded-b-xl">
      <footer className="footer footer-center rounded p-10 text-white h-80">
        <nav className="grid grid-flow-col gap-4 text-xl">
          <a className="link link-hover text-lg font-semibold hover:text-blue-300 transition duration-300">
            About Us
          </a>
          <a className="link link-hover text-lg font-semibold hover:text-blue-300transition duration-300">
            Contact
          </a>
          <a className="link link-hover text-lg font-semibold hover:text-blue-300 transition duration-300">
            Volunteer
          </a>
          <a className="link link-hover text-lg font-semibold hover:text-blue-300 transition duration-300">
            Our Impact
          </a>
        </nav>

        <nav>
          <div className="grid grid-flow-col gap-4 text-3xl mt-6">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="text-white hover:text-blue-400 transition duration-300" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube className="text-white hover:text-red-600 transition duration-300" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="text-white hover:text-blue-600 transition duration-300" />
            </a>
          </div>
        </nav>

      
        <aside>
          <p className="border-t-2 pt-4 text-sm text-center font-light">
            ❤️ Join us in the mission to save lives! ❤️
          </p>
          <p className="mt-2 text-xs">
            Copyright © {new Date().getFullYear()} - All rights reserved by
            Blood Donation Foundation.
          </p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
