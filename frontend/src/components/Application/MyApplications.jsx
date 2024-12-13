
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ResumeModal from "./ResumeModal";

const MyApplications = () => {
  const { user } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const [expandedCardId, setExpandedCardId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");

  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    try {
      const endpoint =
        user && user.role === "Employer"
          ? "http://localhost:4000/api/v1/application/employer/getall"
          : "http://localhost:4000/api/v1/application/jobseeker/getall";

      axios
        .get(endpoint, { withCredentials: true })
        .then((res) => setApplications(res.data.applications));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }, [isAuthorized, user]);

  if (!isAuthorized) {
    navigateTo("/");
  }

  const deleteApplication = (id) => {
    try {
      axios
        .delete(`http://localhost:4000/api/v1/application/delete/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          toast.success(res.data.message);
          setApplications((prev) =>
            prev.filter((application) => application._id !== id)
          );
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <section className="my_applications bg-gray-100 py-12 min-h-screen">
      <div className="container mx-auto flex flex-col gap-8 px-8">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          {user?.role === "Job Seeker"
            ? "My Applications"
            : "Applications from Job Seekers"}
        </h1>
        {applications.length === 0 ? (
          <p className="text-center text-lg text-gray-500">
            No Applications Found
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {applications.map((element) => (
              <ApplicationCard
                key={element._id}
                element={element}
                role={user?.role}
                expanded={expandedCardId === element._id}
                onExpand={() =>
                  setExpandedCardId(
                    expandedCardId === element._id ? null : element._id
                  )
                }
                deleteApplication={deleteApplication}
                openModal={openModal}
              />
            ))}
          </div>
        )}
      </div>
      {modalOpen && (
        <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />
      )}
    </section>
  );
};

export default MyApplications;

const ApplicationCard = ({
  element,
  role,
  expanded,
  onExpand,
  deleteApplication,
  openModal,
}) => {
  return (
    <div
      className={`application_card bg-white shadow-md rounded-lg p-6 flex flex-col gap-4 transition transform ${
        expanded ? "scale-105" : ""
      }`}
      onClick={onExpand}
    >
      <div className="detail flex-grow">
        <p className="text-lg font-semibold text-gray-800">
          {element.name}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-bold">Email:</span> {element.email}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-bold">Phone:</span> {element.phone}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-bold">Address:</span> {element.address}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-bold">Cover Letter:</span>{" "}
          {expanded
            ? element.coverLetter
            : `${element.coverLetter.substring(0, 100)}...`}
        </p>
      </div>
      <div className="resume h-40 w-full overflow-hidden rounded-lg bg-gray-100 border border-gray-300 relative">
        <img
          src={element.resume.url}
          alt="Resume"
          onClick={(e) => {
            e.stopPropagation();
            openModal(element.resume.url);
          }}
          className="w-full h-full object-contain cursor-pointer"
        />
      </div>
      {role === "Job Seeker" && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            deleteApplication(element._id);
          }}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Delete Application
        </button>
      )}
    </div>
  );
};
