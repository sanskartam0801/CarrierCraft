
import React from "react";

const ResumeModal = ({ imageUrl, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative w-full h-full flex items-center justify-center">
        <button
          className="absolute top-5 right-5 text-4xl text-red-600 hover:text-red-500 focus:outline-none"
          onClick={onClose}
        >
          &times;
        </button>
        <img
          src={imageUrl}
          alt="Resume"
          className="max-w-full max-h-screen rounded-md shadow-lg"
        />
      </div>
    </div>
  );
};

export default ResumeModal;
