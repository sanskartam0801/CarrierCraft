
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const navigateTo = useNavigate();
  const { isAuthorized, user } = useContext(Context);

  useEffect(() => {
    axios
      .get(`https://carriercraft-1.onrender.com/api/v1/job/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setJob(res.data.job);
      })
      .catch((error) => {
        navigateTo("/notfound");
      });
  }, [id]);

  if (!isAuthorized) {
    navigateTo("/login");
  }

  return (
    <section className="jobDetail bg-[#f1f3f6] py-12 px-4">
      <div className="container mx-auto max-w-screen-xl flex flex-col items-center">
        <h3 className="text-3xl font-semibold mb-8">Job Details</h3>
        <div className="banner w-full flex flex-col gap-6 p-8 bg-white rounded-lg shadow-md">
          <p className="text-lg font-bold text-[#2d5649]">
            Title: <span className="font-normal text-[#18191c]">{job.title}</span>
          </p>
          <p className="text-lg font-bold text-[#2d5649]">
            Category: <span className="font-normal text-[#18191c]">{job.category}</span>
          </p>
          <p className="text-lg font-bold text-[#2d5649]">
            Country: <span className="font-normal text-[#18191c]">{job.country}</span>
          </p>
          <p className="text-lg font-bold text-[#2d5649]">
            City: <span className="font-normal text-[#18191c]">{job.city}</span>
          </p>
          <p className="text-lg font-bold text-[#2d5649]">
            Location: <span className="font-normal text-[#18191c]">{job.location}</span>
          </p>
          <p className="text-lg font-bold text-[#2d5649]">
            Description: <span className="font-normal text-[#18191c]">{job.description}</span>
          </p>
          <p className="text-lg font-bold text-[#2d5649]">
            Job Posted On: <span className="font-normal text-[#18191c]">{job.jobPostedOn}</span>
          </p>
          <p className="text-lg font-bold text-[#2d5649]">
            Salary:{" "}
            {job.fixedSalary ? (
              <span className="font-normal text-[#18191c]">{job.fixedSalary}</span>
            ) : (
              <span className="font-normal text-[#18191c]">
                {job.salaryFrom} - {job.salaryTo}
              </span>
            )}
          </p>

          {/* Apply Button only for non-Employer users */}
          {user && user.role !== "Employer" && (
            <Link
              to={`/application/${job._id}`}
              className="bg-[#2d5649] text-[#e9f9ff] py-3 px-8 rounded-md text-center mt-6 font-semibold"
            >
              Apply Now
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default JobDetails;
