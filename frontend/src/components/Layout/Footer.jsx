
import React, { useContext } from "react";
import { Context } from "../../main";
import { Link } from "react-router-dom";
import { FaFacebookF, FaYoutube, FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

const Footer = () => {
  const { isAuthorized } = useContext(Context);
  return (
    <footer
      className={`${
        isAuthorized ? "flex justify-between items-center bg-gray-900 text-gray-200 py-6 px-28" : "hidden"
      } md:px-12 sm:flex-col sm:text-center sm:gap-6`}
    >
      <div className="text-sm sm:order-2">&copy; All Rights Reserved By Sanskar Tamrakar.</div>
      <div className="flex gap-4 text-lg sm:order-1">
        <Link to={"/"} target="_blank" className="hover:text-green-700 transition-transform transform hover:scale-110">
          <FaFacebookF />
        </Link>
        <Link to={"/"} target="_blank" className="hover:text-green-700 transition-transform transform hover:scale-110">
          <FaYoutube />
        </Link>
        <Link to={"/"} target="_blank" className="hover:text-green-700 transition-transform transform hover:scale-110">
          <FaLinkedin />
        </Link>
        <Link to={"/"} target="_blank" className="hover:text-green-700 transition-transform transform hover:scale-110">
          <RiInstagramFill />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
