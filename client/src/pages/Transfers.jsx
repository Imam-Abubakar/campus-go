import React, { useState, useEffect } from "react";
import {
  RiQrCodeFill,
  RiUserFill,
  RiCheckboxCircleFill,
  RiErrorWarningFill,
  RiProgress5Fill,
} from "@remixicon/react"; // Import icons from React Icons
import TransferForm from "../components/TransferForm";
import Scanner from "../components/Scanner";
import { toast } from "react-toastify";
import { useUser } from "../context/UserProvider";
import TransferModal from "../components/TransferModal";
import ReadContract from "../plugins/readContract.js";

import Loader from "../components/Loader.jsx";

const Transfers = () => {
  const { getUserByUsername, users } = useUser();
  const [isSendingModalOpen, setIsSendingModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isFailureModalOpen, setIsFailureModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isScanMode, setIsScanMode] = useState(true);
  const [scanData, setScanData] = useState(null);

  useEffect(() => {
    if (scanData) {
      setIsScanMode(false);
    }
  }, [scanData]);

  function generateTransactionId() {
    const timestamp = Date.now(); // Current timestamp in milliseconds
    const randomString = Math.random().toString(36).substring(2, 10); // Generate a random string
    return `${timestamp}-${randomString}`;
  }

  const handleSend = async (formData) => {
    try {
      setIsLoading(true);
      const recipientData = await getUserByUsername(formData?.recipient);
      if(!recipientData){
        toast.error("Recipient not found!");
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
        transactionType: "Transfer to user",
        description: formData?.description,
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

  const handleToggleScanMode = () => {
    setIsScanMode(!isScanMode);
  };

  return (
    <div className="md:mt-8 py-4 px-4 md:px-12 ">
      {isLoading && <Loader />}
      <div className="flex mb-4 gap-4 p-2 bg-gray-300 rounded-lg w-max mx-auto lg:mx-0 justify-center items-center text-sm">
        <button
          className={`flex flex-row gap-2 px-4 lg:px-12 py-2 rounded ${
            isScanMode ? "bg-black text-white" : "bg-gray-300 text-black"
          }`}
          onClick={handleToggleScanMode}
        >
          <RiQrCodeFill />
          QR Code
        </button>
        <button
          className={`flex flex-row gap-2 px-4 lg:px-12 py-2 rounded ${
            !isScanMode ? "bg-black text-white" : "bg-gray-300 text-black"
          }`}
          onClick={handleToggleScanMode}
        >
          <RiUserFill />
          Username
        </button>
      </div>

      {isScanMode ? (
        <Scanner setScan={setScanData} />
      ) : (
        <TransferForm onSubmit={handleSend} onScan={scanData} />
      )}

      {/* Modals */}
      <TransferModal
        isOpen={isSendingModalOpen}
        onClose={() => setIsSendingModalOpen(false)}
      >
        <RiProgress5Fill className="text-2xl text-yellow-500" />
        Sending...
      </TransferModal>
      <TransferModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
      >
        <RiCheckboxCircleFill className="text-2xl text-green-500" />
        Transfer successful
      </TransferModal>
      <TransferModal
        isOpen={isFailureModalOpen}
        onClose={() => setIsFailureModalOpen(false)}
      >
        <RiErrorWarningFill className="text-2xl text-red-500" />
        Transfer failed <br />
        <span className="font-al-light text-sm">Please try again</span>
      </TransferModal>
    </div>
  );
};

export default Transfers;
