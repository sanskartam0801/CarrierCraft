
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <section className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <div className="text-center">
        <img
          src="/notfound.png"
          alt="Page not found"
          className="max-w-full h-auto mx-auto mb-8"
        />
        <Link
          to={'/'}
          className="inline-block text-lg font-medium px-6 py-3 border border-green-700 text-green-700 bg-transparent rounded-md hover:bg-green-700 hover:text-white transition duration-300"
        >
          RETURN TO HOME PAGE
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
