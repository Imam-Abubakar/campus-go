import React from "react";

const Profile = () => {
  return (
    <div className="md:mt-8 py-4 px-4 md:px-12">
      <div className="bg-white rounded-lg shadow-md p-6 my-2 flex gap-4 items-center">
        <div className="rounded-full bg-gray-400 text-black p-4 w-12 h-12 font-black text-lg font-al-bolder flex items-center justify-center">
          IA
        </div>
        <div className="text-black text-lg font-semibold tracking-wide font-al-bold">
          IMAM ABUBAKAR
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 my-2">
        <p className="text-gray-800 font-al-bold text-sm">
          Personal Information
        </p>
        <div className="lg:w-[50%]">
          <p className="font-al-light font-medium text-md ">
            This information has been verified. Any updates will require
            re-verification of your identity. Email us at{" "}
            <a href="mailto:abubakar@sqaleup.xyz" className="text-blue-400">
              contact@campusgo.com
            </a>{" "}
            to update your identity information.
          </p>
          <div className="mt-4 flex flex-wrap flex-col lg:flex-row lg:gap-10">
            <div className="text-md  lg:flex-col lg:justify-start lg:items-start flex justify-between items-center">
              <span className="font-bold">First Name:</span>
              <span className="italic">Imam</span>
            </div>
            <div className="text-md lg:flex-col lg:justify-start lg:items-start flex justify-between items-center">
              <span className="font-bold">Last Name:</span>
              <span className="italic">Abubakar</span>
            </div>
            <div className="text-md  lg:flex-col lg:justify-start lg:items-start flex justify-between items-center">
              <span className="font-bold">Institution:</span>
              <span className="italic">University of Ilorin</span>
            </div>
            <div className="text-md lg:flex-col lg:justify-start lg:items-start flex justify-between items-center">
              <span className="font-bold">Matric Number:</span>
              <span className="italic">18/53HA088</span>
            </div>
            <div className="text-md lg:flex-col lg:justify-start lg:items-start flex justify-between items-center">
              <span className="font-bold">Email Address:</span>
              <span className="italic">abubakar@sqaleup.xyz</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
