
import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../main";

const Application = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [resume, setResume] = useState(null);

  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  // Function to handle file input changes
  const handleFileChange = (event) => {
    const resume = event.target.files[0];
    setResume(resume);
  };

  const { id } = useParams();
  const handleApplication = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("coverLetter", coverLetter);
    formData.append("resume", resume);
    formData.append("jobId", id);

    try {
      const { data } = await axios.post(
        "https://carriercraft-1.onrender.com/api/v1/application/post",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setName("");
      setEmail("");
      setCoverLetter("");
      setPhone("");
      setAddress("");
      setResume(null);
      toast.success(data.message);
      navigateTo("/job/getall");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (!isAuthorized || (user && user.role === "Employer")) {
    navigateTo("/");
  }

  return (
    <section className="application bg-gray-100 min-h-screen flex flex-col">
      <div className="container mx-auto py-8 px-4 flex-grow md:w-full">
        <h3 className="text-2xl font-bold text-center mb-6">Application Form</h3>
        <form
          className="bg-white shadow-md rounded-lg p-8 mx-auto flex flex-col gap-6 w-full max-w-lg md:w-full"
          onSubmit={handleApplication}
        >
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-b-2 border-gray-300 focus:outline-none focus:border-green-500 py-2 text-lg"
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-b-2 border-gray-300 focus:outline-none focus:border-green-500 py-2 text-lg"
          />
          <input
            type="number"
            placeholder="Your Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border-b-2 border-gray-300 focus:outline-none focus:border-green-500 py-2 text-lg"
          />
          <input
            type="text"
            placeholder="Your Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="border-b-2 border-gray-300 focus:outline-none focus:border-green-500 py-2 text-lg"
          />
          <textarea
            placeholder="Cover Letter..."
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            className="border-2 border-gray-300 focus:outline-none focus:border-green-500 p-4 text-lg rounded-md resize-none"
          />
          <div className="flex flex-col items-start">
            <label className="text-lg mb-2">Select Resume</label>
            <input
              type="file"
              accept=".pdf, .jpg, .png"
              onChange={handleFileChange}
              className="border-2 border-gray-300 focus:outline-none focus:border-green-500 p-2 rounded-md w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white text-lg font-medium py-3 rounded-md hover:bg-green-700 transition duration-300"
          >
            Send Application
          </button>
        </form>
      </div>
    </section>
  );
};

export default Application;
