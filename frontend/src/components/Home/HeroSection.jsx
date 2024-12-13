
import React from "react";
import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";

const HeroSection = () => {
  const details = [
    {
      id: 1,
      title: "1,23,441",
      subTitle: "Live Job",
      icon: <FaSuitcase />,
    },
    {
      id: 2,
      title: "91220",
      subTitle: "Companies",
      icon: <FaBuilding />,
    },
    {
      id: 3,
      title: "2,34,200",
      subTitle: "Job Seekers",
      icon: <FaUsers />,
    },
    {
      id: 4,
      title: "1,03,761",
      subTitle: "Employers",
      icon: <FaUserPlus />,
    },
  ];

  return (
    <div className="heroSection flex flex-col py-16">
      <div className="container mx-auto px-6 lg:px-12 flex flex-col md:flex-row h-auto md:h-[450px] mb-12">
        <div className="title flex flex-col justify-center md:flex-1">
          <h1 className="text-3xl font-semibold max-w-[600px] text-gray-800">
            Find a job that suits
          </h1>
          <h1 className="text-3xl font-semibold max-w-[600px] text-gray-800">
            your interests and skills
          </h1>
          <p className="mt-6 max-w-[600px] text-lg text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
            voluptate repellat modi quidem aliquid eaque ducimus ipsa et, facere
            mollitia!
          </p>
        </div>
        {/* Image section */}
        <div className="image flex-1 mt-8 md:mt-0 overflow-hidden bg-cover bg-center md:w-auto w-full h-full md:bg-none"
          style={{
            backgroundImage: 'url("/heroS.jpg")',
          }}>
          {/* On smaller screens, the image will become a background */}
          <img className="w-full h-full object-cover md:hidden" src="/heroS.jpg" alt="hero" />
        </div>
      </div>
      <div className="details flex flex-wrap justify-center gap-6 py-12">
        {details.map((element) => (
          <div
            key={element.id}
            className="card flex flex-col items-center bg-gradient-to-r from-[#cef6ed] to-[#eceff0] w-[250px] p-6 rounded-lg shadow-xl hover:scale-105 transition-all duration-300 ease-in-out transform"
          >
            <div className="icon bg-[#e9f9ff] p-4 rounded-full text-[#0077b6] shadow-lg mb-4">
              {element.icon}
            </div>
            <div className="content text-center">
              <p className="font-semibold text-2xl text-[#243751]">{element.title}</p>
              <p className="text-sm text-gray-600 mt-2">{element.subTitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;