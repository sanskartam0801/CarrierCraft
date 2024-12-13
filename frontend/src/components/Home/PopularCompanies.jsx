
import React from "react";
import { FaMicrosoft, FaApple } from "react-icons/fa";
import { SiTesla } from "react-icons/si";

const PopularCompanies = () => {
  const companies = [
    {
      id: 1,
      title: "Microsoft",
      location: "12 Nehru Nagar , Madhya Pradesh , India",
      openPositions: 10,
      icon: <FaMicrosoft />,
    },
    {
      id: 2,
      title: "Tesla",
      location: "12 Nehru Nagar , Madhya Pradesh , India",
      openPositions: 5,
      icon: <SiTesla />,
    },
    {
      id: 3,
      title: "Apple",
      location: "12 Nehru Nagar , Madhya Pradesh , India",
      openPositions: 20,
      icon: <FaApple />,
    },
  ];

  return (
    <div className="companies py-16 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-12">
        <h3 className="text-3xl font-semibold text-center text-gray-800 mb-8">TOP COMPANIES</h3>
        <div className="banner flex flex-wrap justify-center gap-8">
          {companies.map((element) => (
            <div
              key={element.id}
              className="card flex flex-col items-center w-full sm:w-[340px] lg:w-[320px] bg-gradient-to-br from-[#cef6ed] to-[#ecf2f3] p-6 rounded-lg shadow-xl hover:scale-105 transition-all duration-300 ease-in-out transform"
            >
              <div className="content flex items-center gap-6 mb-6">
                <div className="icon bg-[#ffffff] p-6 text-[#00838f] rounded-full shadow-lg">
                  {element.icon}
                </div>
                <div className="text text-center">
                  <p className="font-semibold text-xl text-[#01579b]">{element.title}</p>
                  <p className="text-sm text-gray-600 mt-1">{element.location}</p>
                </div>
              </div>

              <button className="text-white bg-[#00838f] font-bold text-lg py-2 px-6 rounded-md shadow-lg hover:bg-[#01579b] transition-all duration-200">
                Open Positions: {element.openPositions}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularCompanies;
