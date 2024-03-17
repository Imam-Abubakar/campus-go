import React from "react";
import FeedbackForm from "./FeedbackForm";

const formatDate = (dateTimeString) => {
  const options = {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  return new Date(dateTimeString).toLocaleString("en-US", options);
};

const RideModal = ({ ride, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-[85vw] lg:w-[30vw]">
        <p className="bg-gray-200 px-4 py-4 rounded-t-lg font-al-bolder text-lg">
          Ride Details
        </p>
        <div className="bg-white  py-4 rounded-b-lg">
          <div className="flex px-6 mt-2 justify-between flex-col lg:flex-row">
            <p className="font-al-bold text-md ">{ride.driverName}</p>
            <p className="font-al-lighter">{formatDate(ride.rideTime)}</p>
          </div>
          <div className="px-6 flex flex-col justify-center items-center py-6 my-6 bg-gray-200">
            <p className="text-xl font-al-light">
              Payment of{" "}
              <span className="font-al-bold">₦{ride.amountPaid}</span>
            </p>
            <p className="p-1 border text-[#3F713E] bg-green-100 border-[#3F713E] text-xs rounded-full">
              Completed
            </p>
          </div>

          <FeedbackForm ride={ride} onClose={onClose} />

          <div className="w-[80%] my-4 flex flex-col gap-2 mx-auto">
            <button
              className="p-2 w-full border text-red-900 bg-red-100 border-red-900 text-md rounded-lg hover:bg-red-900 hover:text-red-100"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RideModal;
