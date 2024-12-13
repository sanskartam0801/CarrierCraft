
import React from "react";
import {
  MdOutlineDesignServices,
  MdOutlineWebhook,
  MdAccountBalance,
  MdOutlineAnimation,
} from "react-icons/md";
import { TbAppsFilled } from "react-icons/tb";
import { FaReact } from "react-icons/fa";
import { GiArtificialIntelligence } from "react-icons/gi";
import { IoGameController } from "react-icons/io5";

const PopularCategories = () => {
  const categories = [
    {
      id: 1,
      title: "Graphics & Design",
      subTitle: "305 Open Positions",
      icon: <MdOutlineDesignServices />,
    },
    {
      id: 2,
      title: "Mobile App Development",
      subTitle: "500 Open Positions",
      icon: <TbAppsFilled />,
    },
    {
      id: 3,
      title: "Frontend Web Development",
      subTitle: "200 Open Positions",
      icon: <MdOutlineWebhook />,
    },
    {
      id: 4,
      title: "MERN STACK Development",
      subTitle: "1000+ Open Positions",
      icon: <FaReact />,
    },
    {
      id: 5,
      title: "Account & Finance",
      subTitle: "150 Open Positions",
      icon: <MdAccountBalance />,
    },
    {
      id: 6,
      title: "Artificial Intelligence",
      subTitle: "867 Open Positions",
      icon: <GiArtificialIntelligence />,
    },
    {
      id: 7,
      title: "Video Animation",
      subTitle: "50 Open Positions",
      icon: <MdOutlineAnimation />,
    },
    {
      id: 8,
      title: "Game Development",
      subTitle: "80 Open Positions",
      icon: <IoGameController />,
    },
  ];

  return (
    <div className="categories px-6 lg:px-12 py-16 bg-gray-50">
      <h3 className="text-3xl font-semibold mb-8 text-center text-gray-800">POPULAR CATEGORIES</h3>
      <div className="banner flex flex-wrap justify-center gap-8">
        {categories.map((element) => (
          <div
            key={element.id}
            className="card flex flex-col items-center w-full sm:w-[320px] bg-gradient-to-tl from-[#cef6ed] to-[#ebf1f1] p-6 rounded-lg shadow-xl hover:scale-105 transition-all duration-300 ease-in-out transform"
          >
            <div className="icon bg-[#ffffff] p-6 rounded-full shadow-lg text-[#00838f] mb-6 transition-all duration-300 ease-in-out">
              {element.icon}
            </div>
            <div className="text text-center">
              <p className="text-xl font-semibold text-[#01579b]">{element.title}</p>
              <p className="text-sm text-gray-600 mt-2">{element.subTitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularCategories;
