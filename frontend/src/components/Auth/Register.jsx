
import React, { useContext, useState } from "react";
import { FaRegUser, FaPencilAlt } from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const { isAuthorized, setIsAuthorized } = useContext(Context);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/register",
        { name, phone, email, role, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
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
          <h3 className="text-lg text-gray-600">Create a new account</h3>
        </div>

        <form className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Register As</label>
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
            <label className="text-sm font-medium">Name</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Zeeshan"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-gray-200 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <FaPencilAlt className="absolute top-3 right-3 text-gray-500" />
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
            <label className="text-sm font-medium">Phone Number</label>
            <div className="relative">
              <input
                type="number"
                placeholder="12345678"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-gray-200 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <FaPhoneFlip className="absolute top-3 right-3 text-gray-500" />
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
            onClick={handleRegister}
            className="bg-green-700 text-white font-bold text-lg rounded-md py-3 mt-6 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Register
          </button>

          <Link
            to={"/login"}
            className="text-green-700 border border-green-700 font-bold text-lg rounded-md py-3 text-center mt-6 hover:bg-green-700 hover:text-white transition"
          >
            Login Now
          </Link>
        </form>
      </div>

      <div className="flex-1 hidden md:flex justify-center items-center overflow-hidden">
        <img
          src="/register.png"
          alt="register illustration"
          className="w-full h-full object-cover rounded-lg shadow-xl"
        />
      </div>
    </section>
  );
};

export default Register;
