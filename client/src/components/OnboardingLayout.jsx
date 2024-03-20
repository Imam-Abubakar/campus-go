import React from "react";
import { Link, useLocation } from "react-router-dom";

import LoginImg from "../assets/images/student-login.png";
import LoginDriverImg from "../assets/images/driver-login.png";
import AppLogo from "../assets/images/logo-v-white.svg";
import AppLogoDriver from "../assets/images/logo-vd-white.svg";

const OnboardingLayout = ({ children }) => {
  const location = useLocation();
  return (
    <>
      <div className="lg:flex h-full lg:h-screen hidden">
        <div className="w-1/3 bg-black  flex-col items-center justify-center hidden lg:flex">
          {location.pathname.includes("driver") ? (
            <div className="my-8 mx-16">
              <img src={AppLogoDriver} className="w-64" />
              <h1 className="text-4xl mb-14 text-white font-al-bolder">
                Ride payment made convenient for campus drivers
              </h1>
              <img src={LoginDriverImg} className="w-[80%]" />
            </div>
          ) : (
            <div className="my-8 mx-16">
              <img src={AppLogo} className="w-64" />
              <h1 className="text-4xl mb-14 text-white font-al-bolder">
                Ride payment made easy
                <br /> for all students
              </h1>
              <img src={LoginImg} className="w-[80%]" />
            </div>
          )}
        </div>
        <div className="lg:w-2/3  bg-gray-200 p-8 flex justify-center items-center flex-col">
          <div className="lg:w-[60%] overflow-auto w-full bg-white rounded-lg shadow-md  py-20 px-20">
            {children}
          </div>
        </div>
      </div>
      <div className="lg:hidden  bg-gray-200 flex justify-center items-center flex-col">
        <div className="md:w-[60%] w-full md:my-8  md:h-max bg-white rounded-lg md:shadow-md py-10 px-8 md:py-20 md:px-20">
          {children}
        </div>
      </div>
    </>
  );
};

export default OnboardingLayout;
