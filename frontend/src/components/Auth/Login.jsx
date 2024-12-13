
import React, { useContext, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const { isAuthorized, setIsAuthorized } = useContext(Context);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/login",
        { email, password, role },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setEmail("");
      setPassword("");
      setRole("");
      setIsAuthorized(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (isAuthorized) {
    return <Navigate to={"/"} />;
  }

  return (
    <section className="flex min-h-screen bg-gray-100 py-10 px-5 md:px-10">
      <div className="flex-1 flex flex-col justify-center bg-white rounded-lg shadow-lg p-8 mx-auto max-w-lg">
        <div className="text-center mb-8">
          <h2 className="text-black text-3xl font-semibold mb-4">
            Carrier<span className="text-red-500">Craft</span>
          </h2>
          <h3 className="text-lg text-gray-600">Login to your account</h3>
        </div>

        <form className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Login As</label>
            <div className="relative">
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="bg-gray-200 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select Role</option>
                <option value="Employer">Employer</option>
                <option value="Job Seeker">Job Seeker</option>
              </select>
              <FaRegUser className="absolute top-3 right-3 text-gray-500" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Email Address</label>
            <div className="relative">
              <input
                type="email"
                placeholder="zk@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-200 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <MdOutlineMailOutline className="absolute top-3 right-3 text-gray-500" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Password</label>
            <div className="relative">
              <input
                type="password"
                placeholder="Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-200 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <RiLock2Fill className="absolute top-3 right-3 text-gray-500" />
            </div>
          </div>

          <button
            type="submit"
            onClick={handleLogin}
            className="bg-green-700 text-white font-bold text-lg rounded-md py-3 mt-6 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Login
          </button>

          <Link
            to={"/register"}
            className="text-green-700 border border-green-700 font-bold text-lg rounded-md py-3 text-center mt-6 hover:bg-green-700 hover:text-white transition"
          >
            Register Now
          </Link>
        </form>
      </div>

      <div className="flex-1 hidden md:flex justify-center items-center overflow-hidden">
        <img
          src="/login.png"
          alt="login illustration"
          className="w-full h-full object-cover rounded-lg shadow-xl"
        />
      </div>
    </section>
  );
};

export default Login;
