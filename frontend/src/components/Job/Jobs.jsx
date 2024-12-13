
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    try {
      axios
        .get("https://carriercraft-1.onrender.com/api/v1/job/getall", {
          withCredentials: true,
        })
        .then((res) => {
          setJobs(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  if (!isAuthorized) {
    navigateTo("/");
  }

  return (
    <section className="jobs bg-[#f1f3f6] min-h-screen py-12 px-4">
      <div className="container mx-auto flex flex-col items-center gap-8 px-4">
        <h1 className="text-3xl font-semibold text-center text-gray-800">
          ALL AVAILABLE JOBS
        </h1>
        <div className="banner grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full max-w-screen-xl">
          {jobs.jobs &&
            jobs.jobs.map((element) => (
              <div
                className="card bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 flex flex-col justify-between h-full"
                key={element._id}
              >
                <div className="card-content flex-grow">
                  <h3 className="text-2xl font-bold text-gray-800">
                    {element.title}
                  </h3>
                  <p className="text-lg text-[#2d5649] font-semibold">
                    {element.category}
                  </p>
                  <p className="text-sm text-gray-600">{element.country}</p>
                  <p className="text-sm text-gray-500 italic">{element.city}</p>
                </div>
                <div className="text-center mt-4">
                  <Link
                    to={`/job/${element._id}`}
                    className="inline-block bg-[#2d5649] text-white py-2 px-6 rounded-md text-lg font-semibold hover:bg-[#1c3b2b] transition-all duration-300"
                  >
                    Job Details
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Jobs;
