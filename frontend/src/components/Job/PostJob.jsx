
import React, { useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";

const PostJob = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [salaryFrom, setSalaryFrom] = useState("");
  const [salaryTo, setSalaryTo] = useState("");
  const [fixedSalary, setFixedSalary] = useState("");
  const [salaryType, setSalaryType] = useState("default");

  const { isAuthorized, user } = useContext(Context);

  const handleJobPost = async (e) => {
    e.preventDefault();
    if (salaryType === "Fixed Salary") {
      setSalaryFrom("");
      setSalaryTo("");
    } else if (salaryType === "Ranged Salary") {
      setFixedSalary("");
    } else {
      setSalaryFrom("");
      setSalaryTo("");
      setFixedSalary("");
    }
    try {
      const payload =
        salaryType === "Fixed Salary"
          ? {
              title,
              description,
              category,
              country,
              city,
              location,
              fixedSalary,
            }
          : {
              title,
              description,
              category,
              country,
              city,
              location,
              salaryFrom,
              salaryTo,
            };

      const res = await axios.post(
        "https://carriercraft-1.onrender.com/api/v1/job/post",
        payload,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  const navigateTo = useNavigate();
  if (!isAuthorized || (user && user.role !== "Employer")) {
    navigateTo("/");
  }

  return (
    <div className="bg-gray-100 min-h-screen flex items-center">
      <div className="max-w-4xl mx-auto w-full bg-white p-8 shadow-md rounded">
        <h3 className="text-2xl font-bold text-center mb-6">Post New Job</h3>
        <form onSubmit={handleJobPost} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Job Title"
              className="border-b border-gray-400 py-2 px-4 focus:outline-none focus:border-blue-500"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border-b border-gray-400 py-2 px-4 focus:outline-none focus:border-blue-500"
            >
              <option value="">Select Category</option>
              <option value="Graphics & Design">Graphics & Design</option>
              <option value="Mobile App Development">Mobile App Development</option>
              <option value="Frontend Web Development">Frontend Web Development</option>
              <option value="MERN Stack Development">MERN Stack Development</option>
              <option value="Account & Finance">Account & Finance</option>
              <option value="Artificial Intelligence">Artificial Intelligence</option>
              <option value="Video Animation">Video Animation</option>
              <option value="MEAN Stack Development">MEAN Stack Development</option>
              <option value="MEVN Stack Development">MEVN Stack Development</option>
              <option value="Data Entry Operator">Data Entry Operator</option>
            </select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Country"
              className="border-b border-gray-400 py-2 px-4 focus:outline-none focus:border-blue-500"
            />
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
              className="border-b border-gray-400 py-2 px-4 focus:outline-none focus:border-blue-500"
            />
          </div>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
            className="border-b border-gray-400 py-2 px-4 w-full focus:outline-none focus:border-blue-500"
          />
          <div className="space-y-4">
            <select
              value={salaryType}
              onChange={(e) => setSalaryType(e.target.value)}
              className="border-b border-gray-400 py-2 px-4 w-full focus:outline-none focus:border-blue-500"
            >
              <option value="default">Select Salary Type</option>
              <option value="Fixed Salary">Fixed Salary</option>
              <option value="Ranged Salary">Ranged Salary</option>
            </select>
            {salaryType === "default" && (
              <p className="text-red-500 text-sm">Please provide Salary Type *</p>
            )}
            {salaryType === "Fixed Salary" && (
              <input
                type="number"
                placeholder="Enter Fixed Salary"
                value={fixedSalary}
                onChange={(e) => setFixedSalary(e.target.value)}
                className="border-b border-gray-400 py-2 px-4 w-full focus:outline-none focus:border-blue-500"
              />
            )}
            {salaryType === "Ranged Salary" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="number"
                  placeholder="Salary From"
                  value={salaryFrom}
                  onChange={(e) => setSalaryFrom(e.target.value)}
                  className="border-b border-gray-400 py-2 px-4 focus:outline-none focus:border-blue-500"
                />
                <input
                  type="number"
                  placeholder="Salary To"
                  value={salaryTo}
                  onChange={(e) => setSalaryTo(e.target.value)}
                  className="border-b border-gray-400 py-2 px-4 focus:outline-none focus:border-blue-500"
                />
              </div>
            )}
          </div>
          <textarea
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Job Description"
            className="border-b border-gray-400 py-2 px-4 w-full focus:outline-none focus:border-blue-500"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 text-lg font-semibold uppercase tracking-wider rounded hover:bg-green-700"
          >
            Create Job
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostJob;