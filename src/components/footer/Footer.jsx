import {
  FaTwitter,
  FaYoutube,
  FaFacebook,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div className="backdrop-blur-md bg-cyan-800 shadow-lg border boder-t-2 rounded-b-xl">
      <footer className="footer footer-center rounded p-10 text-white h-auto w-full max-w-7xl mx-auto">
        <nav className="grid grid-flow-col gap-4 text-xl">
          <a className="link link-hover text-lg font-semibold hover:text-blue-300 transition duration-300">
            About Us
          </a>
          <a className="link link-hover text-lg font-semibold hover:text-blue-300 transition duration-300">
            Contact
          </a>
          <a className="link link-hover text-lg font-semibold hover:text-blue-300 transition duration-300">
            Volunteer
          </a>
          <a className="link link-hover text-lg font-semibold hover:text-blue-300 transition duration-300">
            Our Impact
          </a>
        </nav>

        <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-5xl mt-6">
          <nav className="flex gap-6 text-3xl">
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
          </nav>

          <div className="text-center md:text-right mt-6 md:mt-0">
            <p className="text-lg font-semibold">Contact Us</p>
            <p className="flex items-center justify-center md:justify-end gap-2 text-sm">
              <FaMapMarkerAlt /> 123 Blood Drive Avenue, Dhaka, Bangladesh
            </p>
            <p className="flex items-center justify-center md:justify-end gap-2 text-sm mt-1">
              <FaPhone /> +880 1234-567890
            </p>
          </div>
        </div>

        <aside className="mt-6 w-full max-w-5xl">
          <p className="border-t-2 pt-4 text-sm text-center font-light">
            ❤️ Join us in the mission to save lives! ❤️
          </p>
          <p className="mt-2 text-xs text-center">
            Copyright © {new Date().getFullYear()} - All rights reserved by
            Blood Donation Foundation.
          </p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
