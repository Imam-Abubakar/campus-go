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
import TransferModal from "../components/TransferModal";

const Transfers = () => {
  const [isSendingModalOpen, setIsSendingModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isFailureModalOpen, setIsFailureModalOpen] = useState(false);
  const [isScanMode, setIsScanMode] = useState(true);
  const [scanData, setScanData] = useState(null);

  useEffect(() => {
    if (scanData) {
      setIsScanMode(false);
    }
  }, [scanData]);

  const handleSend = (formData) => {
    const isSuccess = true;
    if (isSuccess) {
      setIsSuccessModalOpen(true);
    } else {
      setIsFailureModalOpen(true);
    }
  };

  const handleToggleScanMode = () => {
    setIsScanMode(!isScanMode);
  };

  return (
    <div className="md:mt-8 py-4 px-4 md:px-12 ">
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
