import React, { useState } from "react";

const Settings = () => {
  const [isUsernameOpen, setIsUsernameOpen] = useState(false);
  const [isTransferPinOpen, setIsTransferPinOpen] = useState(false);
  const [isTransactionPinOpen, setIsTransactionPinOpen] = useState(false);
  const [showOldPin, setShowOldPin] = useState(false);
  const [showNewPin, setShowNewPin] = useState(false);
  const [showConfirmPin, setShowConfirmPin] = useState(false);

  const toggleUsernameForm = () => {
    setIsUsernameOpen(!isUsernameOpen);
    setIsTransferPinOpen(false);
    setIsTransactionPinOpen(false);
  };

  const toggleTransferPinForm = () => {
    setIsTransferPinOpen(!isTransferPinOpen);
    setIsUsernameOpen(false);
    setIsTransactionPinOpen(false);
  };

  const toggleTransactionPinForm = () => {
    setIsTransactionPinOpen(!isTransactionPinOpen);
    setIsUsernameOpen(false);
    setIsTransferPinOpen(false);
  };

  const toggleShowOldPin = () => {
    setShowOldPin(!showOldPin);
  };

  const toggleShowNewPin = () => {
    setShowNewPin(!showNewPin);
  };

  const toggleShowConfirmPin = () => {
    setShowConfirmPin(!showConfirmPin);
  };

  return (
    <div className="md:mt-8 py-4 px-4 md:px-12 flex flex-col justify-center items-center">
      <div className="mb-4">
        <div
          className="bg-black z-100 text-white rounded-xl shadow-md py-4 w-[80vw] lg:lg:w-[40rem] my-2 flex items-center justify-between px-4 cursor-pointer"
          onClick={toggleUsernameForm}
        >
          <h2 className="text-md font-normal tracking-wide font-al-light">
            Change Username
          </h2>
          <span>{isUsernameOpen ? "▲" : "▼"}</span>
        </div>
        {isUsernameOpen && (
          <form className="bg-gray-100 p-4 mt-[-20px] border mx-auto flex flex-col border-black shadow-md rounded-b-xl">
            <input
              type="text"
              className="block w-full  p-4 border border-black rounded-md shadow-sm mb-2"
              placeholder="New Username "
            />
            <button className="bg-black text-white py-2 px-4  rounded-md hover:bg-[#3F713E] ">
              Save
            </button>
          </form>
        )}
      </div>
      <div>
        <div
          className="bg-black z-100 text-white rounded-xl shadow-md py-4 w-[80vw] lg:w-[40rem] my-2 flex items-center justify-between px-4 cursor-pointer"
          onClick={toggleTransactionPinForm}
        >
          <h2 className="text-md font-normal tracking-wide font-al-light">
            Change Transaction PIN
          </h2>
          <span>{isTransactionPinOpen ? "▲" : "▼"}</span>
        </div>
        {isTransactionPinOpen && (
          <form className="bg-gray-100 p-4 mt-[-20px] border mx-auto flex flex-col border-black shadow-md rounded-b-xl">
            <div className="mb-2">
              <input
                type={showOldPin ? "text" : "password"}
                className="block w-full  p-4 border border-black rounded-md shadow-sm mb-2"
                placeholder="Old Transaction PIN"
              />
              <button
                type="button"
                onClick={toggleShowOldPin}
                className="text-sm text-[#3F713E] focus:outline-none"
              >
                {showOldPin ? "Hide" : "Show"}
              </button>
            </div>

            <div className="mb-2">
              <input
                type={showNewPin ? "text" : "password"}
                className="block w-full  p-4 border border-black rounded-md shadow-sm mb-2"
                placeholder="New Transaction PIN"
              />
              <button
                type="button"
                onClick={toggleShowNewPin}
                className="text-sm text-[#3F713E] focus:outline-none"
              >
                {showNewPin ? "Hide" : "Show"}
              </button>
            </div>
            <div className="mb-2">
              <input
                type={showConfirmPin ? "text" : "password"}
                className="block w-full  p-4 border border-black rounded-md shadow-sm mb-2"
                placeholder="Confirm New Transaction PIN"
              />
              <button
                type="button"
                onClick={toggleShowConfirmPin}
                className="text-sm text-[#3F713E] focus:outline-none"
              >
                {showConfirmPin ? "Hide" : "Show"}
              </button>
            </div>
            <button className="bg-black text-white py-2 px-4  rounded-md hover:bg-[#3F713E] ">
              Save
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Settings;
