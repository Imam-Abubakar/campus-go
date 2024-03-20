import React, { useState, useEffect } from "react";
import Scanner from "../components/Scanner";
import RideModal from "../components/RideModal";
import { RiTaxiFill } from "@remixicon/react";
import { useUser } from "../context/UserProvider";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthProvider";
import ReadContract from "../plugins/readContract.js";
import RideForm from "../components/RideForm.jsx";
import { utils } from "ethers";
import FeedbackForm from "../components/FeedbackForm.jsx";

import Loader from "../components/Loader.jsx";

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

const Rides = () => {
  const { user, auth } = useAuth();
  const [rideData, setRideData] = useState([]);
  const [selectedRide, setSelectedRide] = useState(null);
  const { getUserByUsername, fetchUser, users } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [isScanMode, setIsScanMode] = useState(true);
  const [scanData, setScanData] = useState(null);

  const nairaEquivalent = 4.5;

  useEffect(() => {
    if (scanData) {
      setIsScanMode(false);
    }
    if (users) {
      getRideHistory();
    }
  }, [scanData]);

  function generateTransactionId() {
    const timestamp = Date.now(); // Current timestamp in milliseconds
    const randomString = Math.random().toString(36).substring(2, 10); // Generate a random string
    return `${timestamp}-${randomString}`;
  }

  const getRideHistory = async () => {
    if (auth) {
      fetchUser(user.email);
    }
    const rideHistory = await ReadContract.getAllTransactions();
    const filteredHistory =
      users?.role == "DRIVER"
        ? rideHistory.filter(
            (history) =>
              history.recipientAddress == users?.wallet_address &&
              history.transactionType == "Ride Payment"
          )
        : rideHistory.filter(
            (history) =>
              history.senderAddress == users?.wallet_address &&
              history.transactionType == "Ride Payment"
          );

    console.log(filteredHistory);
    setRideData(filteredHistory);
    setIsLoading(false);
  };

  const handleSend = async (formData) => {
    try {
      setIsLoading(true);
      const recipientData = await getUserByUsername(formData?.recipient);
      if (!recipientData) {
        toast.error("Recipient not found!");
        setIsLoading(false);
        return;
      }
      if (recipientData.role == "STUDENT") {
        toast.error("Transaction Failed! Recepient is not a driver");
        setIsLoading(false);
        return;
      }
      const currentDate = new Date(); // Get current date and time
      const formattedDate = currentDate.toISOString();
      const transactionData = {
        privateKey: users.private_key,
        recipientName: `${recipientData.firstname} ${recipientData.lastname}`,
        recipientUsername: recipientData.username,
        recipientAddress: recipientData.wallet_address,
        senderUsername: users.username,
        senderName: `${users.firstname} ${users.lastname}`,
        dateTime: formattedDate,
        transactionType: "Ride Payment",
        description: "",
        uniqueId: generateTransactionId(),
        value: formData?.amount.toString(),
      };
      const transfer = await ReadContract.recordTransaction(
        transactionData.privateKey,
        transactionData.recipientName,
        transactionData.recipientUsername,
        transactionData.recipientAddress,
        transactionData.senderUsername,
        transactionData.senderName,
        transactionData.dateTime,
        transactionData.transactionType,
        transactionData.description,
        transactionData.uniqueId,
        transactionData.value
      );
      console.log(transfer);
      setIsLoading(false);
      toast.success("Transaction Successful!");
    } catch (error) {
      setIsLoading(false);
      console.error("Transaction failed:", error);
      toast.error("Transaction Failed!");
      throw error;
    }
  };

  const handleRideClick = (ride) => {
    setSelectedRide(ride);
  };

  const handleCloseModal = () => {
    setSelectedRide(null);
  };

  return (
    <div className="md:mt-8 py-4 px-4 md:px-12">
      {isLoading && <Loader />}
      {users?.role == "STUDENT" && (
        <>
          {isScanMode ? (
            <Scanner setScan={setScanData} />
          ) : (
            <RideForm onSubmit={handleSend} onScan={scanData} />
          )}
        </>
      )}
      <h2 className="text-2xl font-bold mt-4 mb-4">Ride History</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 ">
        {rideData.map((ride) => (
          <div
            key={ride.id}
            className="border rounded-lg cursor-pointer hover:bg-gray-100"
            onClick={() => handleRideClick(ride)}
          >
            <div className="flex items-center bg-white p-4 rounded-lg">
              <RiTaxiFill className="text-green-500 mr-2" />

              <div className="text-sm flex justify-between items-center w-full">
                <div>
                  {" "}
                  <p className=" font-al-bolder tracking-wide">
                    {ride.recipientName}
                  </p>
                  <p className="text-xs">
                    {ride.dateTime != ""
                      ? formatDate(ride.dateTime)
                      : formatDate("2024-03-18T08:00:00Z")}
                  </p>
                </div>

                <p className=" font-al-bold">
                  ₦ {utils.formatEther(ride.amount.toString()) * nairaEquivalent}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {rideData.length == 0 && (
          <p className="my-2 text-center">No rides yet</p>
        )}
      {selectedRide && (
        <div className="fixed z-20 inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-[85vw] lg:w-[30vw]">
            <p className="bg-gray-200 px-4 py-4 rounded-t-lg font-al-bolder text-lg">
              Ride Details
            </p>
            <div className="bg-white  py-4 rounded-b-lg">
              <div className="flex px-6 mt-2 justify-between flex-col lg:flex-row">
                <p className="font-al-bold text-md ">
                  {selectedRide.recipientName}
                </p>
                <p className="font-al-lighter">
                  {selectedRide.dateTime != ""
                    ? formatDate(selectedRide.dateTime)
                    : formatDate("2024-03-18T08:00:00Z")}
                </p>
              </div>
              <div className="px-6 flex flex-col justify-center items-center py-6 my-6 bg-gray-200">
                <p className="text-xl font-al-light">
                  {users?.role == "DRIVER"
                    ? "Recieved Payment of"
                    : "Payment of"}{" "}
                  <span className="font-al-bold">
                    ₦{utils.formatEther(selectedRide.amount.toString()) * nairaEquivalent}
                  </span>
                </p>
                <p className="p-1 border text-[#3F713E] bg-green-100 border-[#3F713E] text-xs rounded-full">
                  Completed
                </p>
              </div>
              {users?.role == "STUDENT" && (
                <FeedbackForm ride={selectedRide} onClose={handleCloseModal} />
              )}

              <div className="w-[80%] my-4 flex flex-col gap-2 mx-auto">
                <button
                  className="p-2 w-full border text-red-900 bg-red-100 border-red-900 text-md rounded-lg hover:bg-red-900 hover:text-red-100"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rides;
