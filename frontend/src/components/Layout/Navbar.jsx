
import React, { useContext, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "https://carriercraft-1.onrender.com/api/v1/user/logout",
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response.data.message), setIsAuthorized(true);
    }
  };

  return (
    <nav className={`${isAuthorized ? "block" : "hidden"} bg-gray-900 px-5`}>
      <div className="max-w-6xl mx-auto flex justify-between items-center py-4">
        {/* Logo */}
        <div className="w-44">
          <a href="/" className="text-white text-lg font-bold">
            Carrier<span className="text-red-500">Craft</span>
          </a>
        </div>

        {/* Menu */}
        <ul
          className={`${
            show ? "flex" : "hidden"
          } flex-col lg:flex-row lg:flex lg:gap-6 lg:static absolute top-20 lg:top-auto bg-gray-900 lg:bg-transparent w-full lg:w-auto left-0 lg:left-auto h-full lg:h-auto gap-4 lg:items-center px-6 lg:px-0`}
        >
          <li>
            <Link
              to="/"
              onClick={() => setShow(false)}
              className="text-white hover:text-green-600 text-base font-light transition"
            >
              HOME
            </Link>
          </li>
          <li>
            <Link
              to="/job/getall"
              onClick={() => setShow(false)}
              className="text-white hover:text-green-600 text-base font-light transition"
            >
              ALL JOBS
            </Link>
          </li>
          <li>
            <Link
              to="/applications/me"
              onClick={() => setShow(false)}
              className="text-white hover:text-green-600 text-base font-light transition"
            >
              {user && user.role === "Employer"
                ? "APPLICANT'S APPLICATIONS"
                : "MY APPLICATIONS"}
            </Link>
          </li>
          {user && user.role === "Employer" && (
            <>
              <li>
                <Link
                  to="/job/post"
                  onClick={() => setShow(false)}
                  className="text-white hover:text-green-600 text-base font-light transition"
                >
                  POST NEW JOB
                </Link>
              </li>
              <li>
                <Link
                  to="/job/me"
                  onClick={() => setShow(false)}
                  className="text-white hover:text-green-600 text-base font-light transition"
                >
                  VIEW YOUR JOBS
                </Link>
              </li>
            </>
          )}
          <button
            onClick={handleLogout}
            className="bg-transparent border border-white text-white hover:bg-green-800 hover:border-green-800 hover:text-white px-4 py-1 rounded-lg text-base font-light transition"
          >
            LOGOUT
          </button>
        </ul>

        {/* Hamburger */}
        <div
          className="text-white text-2xl cursor-pointer lg:hidden"
          onClick={() => setShow(!show)}
        >
          <GiHamburgerMenu />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
