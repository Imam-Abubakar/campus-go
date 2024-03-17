import React from "react";
import { RiTaxiFill } from "@remixicon/react"

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

const RideHistoryList = ({ onRideClick }) => {
  // Assuming rideData contains the list of past rides
  const rideData = [
    {
      id: 1,
      driverName: "John Doe",
      amountPaid: 500,
      rideTime: "2024-03-17T08:30:00Z",
    },
    { id: 2, driverName: "Alice Smith", amountPaid: 400, rideTime: "2024-03-17T09:00:00Z" },
    { id: 3, driverName: "Bob Johnson", amountPaid: 350, rideTime: "2024-03-17T10:00:00Z" },
    { id: 4, driverName: "Emma Brown", amountPaid: 550, rideTime: "2024-03-17T11:00:00Z" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 ">
      {rideData.map((ride) => (
        <div
          key={ride.id}
          className="border rounded-lg cursor-pointer hover:bg-gray-100"
          onClick={() => onRideClick(ride)}
        >
          <div className="flex items-center bg-white p-4 rounded-lg">
              <RiTaxiFill className="text-green-500 mr-2" />
           
            <div className="text-sm flex justify-between items-center w-full">
              <div>
                {" "}
                <p className=" font-al-bolder tracking-wide">
                  {ride.driverName}
                </p>
                <p className="text-xs">{formatDate(ride.rideTime)}</p>
              </div>

              <p className=" font-al-bold">₦ {ride.amountPaid}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RideHistoryList;
