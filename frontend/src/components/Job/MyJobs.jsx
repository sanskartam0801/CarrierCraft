
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaEdit, FaTrashAlt, FaCheck, FaTimes } from "react-icons/fa";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";

const MyJobs = () => {
  const [myJobs, setMyJobs] = useState([]);
  const [editingMode, setEditingMode] = useState(null);
  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get(
          "https://carriercraft-1.onrender.com/api/v1/job/getmyjobs",
          { withCredentials: true }
        );
        setMyJobs(data.myJobs);
      } catch (error) {
        toast.error(error.response.data.message);
        setMyJobs([]);
      }
    };
    fetchJobs();
  }, []);

  if (!isAuthorized || (user && user.role !== "Employer")) {
    navigateTo("/");
  }

  const handleEnableEdit = (jobId) => setEditingMode(jobId);
  const handleDisableEdit = () => setEditingMode(null);

  const handleUpdateJob = async (jobId) => {
    const updatedJob = myJobs.find((job) => job._id === jobId);
    try {
      const { data } = await axios.put(
        `https://carriercraft-1.onrender.com/api/v1/job/update/${jobId}`,
        updatedJob,
        { withCredentials: true }
      );
      toast.success(data.message);
      setEditingMode(null);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleDeleteJob = async (jobId) => {
    try {
      const { data } = await axios.delete(
        `https://carriercraft-1.onrender.com/api/v1/job/delete/${jobId}`,
        { withCredentials: true }
      );
      toast.success(data.message);
      setMyJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleInputChange = (jobId, field, value) => {
    setMyJobs((prevJobs) =>
      prevJobs.map((job) =>
        job._id === jobId ? { ...job, [field]: value } : job
      )
    );
  };

  return (
    <div className="myJobs page bg-gray-50 py-12 min-h-screen">
      <div className="container max-w-screen-lg mx-auto flex flex-col gap-8">
        <h1 className="text-4xl font-bold text-center text-gray-800">
          Your Posted Jobs
        </h1>
        {myJobs.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {myJobs.map((job) => (
              <div
                className="bg-white shadow-md hover:shadow-lg rounded-lg p-6 flex flex-col justify-between h-full"
                key={job._id}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-800">
                      {editingMode === job._id ? (
                        <input
                          type="text"
                          className="border-b border-gray-300 focus:outline-none"
                          value={job.title}
                          onChange={(e) =>
                            handleInputChange(job._id, "title", e.target.value)
                          }
                        />
                      ) : (
                        job.title
                      )}
                    </h2>
                    <div className="flex gap-2">
                      {editingMode === job._id ? (
                        <>
                          <button
                            onClick={() => handleUpdateJob(job._id)}
                            className="text-green-500 hover:text-green-600"
                          >
                            <FaCheck />
                          </button>
                          <button
                            onClick={handleDisableEdit}
                            className="text-gray-500 hover:text-gray-600"
                          >
                            <FaTimes />
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => handleEnableEdit(job._id)}
                          className="text-blue-500 hover:text-blue-600"
                        >
                          <FaEdit />
                        </button>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-600 mt-2">
                    <strong>Category:</strong> {job.category}
                  </p>
                  <p className="text-gray-600">
                    <strong>Location:</strong> {job.city}, {job.country}
                  </p>
                  <p className="text-gray-600">
                    <strong>Salary:</strong>{" "}
                    {job.fixedSalary
                      ? `$${job.fixedSalary}`
                      : `$${job.salaryFrom} - $${job.salaryTo}`}
                  </p>
                  <p className="text-gray-600">
                    <strong>Expired:</strong> {job.expired ? "Yes" : "No"}
                  </p>
                  <p className="text-gray-600 mt-2">
                    <strong>Description:</strong>{" "}
                    {editingMode === job._id ? (
                      <textarea
                        className="w-full border-b border-gray-300 focus:outline-none"
                        value={job.description}
                        onChange={(e) =>
                          handleInputChange(
                            job._id,
                            "description",
                            e.target.value
                          )
                        }
                      />
                    ) : (
                      <span className="line-clamp-2">{job.description}</span>
                    )}
                  </p>
                </div>
                <button
                  onClick={() => handleDeleteJob(job._id)}
                  className="mt-4 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-all"
                >
                  <FaTrashAlt className="inline mr-2" /> Delete Job
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 text-xl">
            You have not posted any jobs yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default MyJobs;
