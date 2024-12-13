
import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

const HowItWorks = () => {
  return (
    <div className="bg-[#f1f3f6] py-12">
      <div className="max-w-screen-xl mx-auto px-6 flex flex-col items-center gap-12">
        <h3 className="text-3xl font-semibold text-center">How CarrierCraft Works</h3>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="bg-white flex flex-col items-center flex-1 max-w-xs h-[350px] px-8 py-6 gap-3 justify-center rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out hover:scale-105">
            <FaUserPlus className="text-[30px] text-[#2d5649]" />
            <p className="font-semibold">Create Account</p>
            <p className="text-sm text-gray-500 text-center">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Consequuntur, culpa.
            </p>
          </div>
          <div className="bg-[#18191c] text-white flex flex-col items-center flex-1 max-w-xs h-[350px] px-8 py-6 gap-3 justify-center rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out hover:scale-105">
            <MdFindInPage className="text-[30px]" />
            <p className="font-semibold">Find a Job/Post a Job</p>
            <p className="text-sm text-gray-400 text-center">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Consequuntur, culpa.
            </p>
          </div>
          <div className="bg-white flex flex-col items-center flex-1 max-w-xs h-[350px] px-8 py-6 gap-3 justify-center rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out hover:scale-105">
            <IoMdSend className="text-[30px] text-[#2d5649]" />
            <p className="font-semibold">Apply For Job/Recruit Suitable Candidates</p>
            <p className="text-sm text-gray-500 text-center">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Consequuntur, culpa.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
