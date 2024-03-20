import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useUser } from "../context/UserProvider";
import { toast } from "react-toastify";

const Settings = () => {
  const { signOut } = useAuth();
  const { users, editUser } = useUser();
  const [username, setUsername] = useState("");
  const [isUsernameOpen, setIsUsernameOpen] = useState(false);
  const [transactionPin, setTransactionPin] = useState("");
  const [oldTransactionPin, setOldTransactionPin] = useState("");
  const [confirmTransactionPin, setConfirmTransactionPin] = useState("");
  const [isTransactionPinOpen, setIsTransactionPinOpen] = useState(false);
  const [showOldPin, setShowOldPin] = useState(false);
  const [showNewPin, setShowNewPin] = useState(false);
  const [showConfirmPin, setShowConfirmPin] = useState(false);

  const toggleUsernameForm = () => {
    setIsUsernameOpen(!isUsernameOpen);
    setIsTransactionPinOpen(false);
  };

  const handleUsernameChange = (e) => {
    const { value } = e.target;
    setUsername(value);
  };

  const updateUsername = async (e) => {
    e.preventDefault();
    try {
      if (username !== "") {
        if (users.username === username) {
          toast.warn("Same username as present username");
          setUsername("");
        } else {
          await editUser({ username: username }, users.email);
          toast.success("Username updated successfully");
          location.reload();
        }
      }
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("Error updating username");
    }
  };

  const handleTransactionPinChange = (e) => {
    const { value } = e.target;
    setTransactionPin(value);
  };

  const handleOldTransactionPinChange = (e) => {
    const { value } = e.target;
    setOldTransactionPin(value);
  };
  const handleConfirmTransactionPinChange = (e) => {
    const { value } = e.target;
    setConfirmTransactionPin(value);
  };

  const updateTransactionPin = async (e) => {
    e.preventDefault();
    try {
      if (transactionPin != "") {
        if (oldTransactionPin == transactionPin) {
          toast.warn("New Transaction PIN is the same as the old one");
        } else if (transactionPin != confirmTransactionPin) {
          toast.warn("New Transaction PINs does not match. Try again");
        } else if (users.pin != oldTransactionPin) {
          toast.warn("Old Transaction PIN is incorrect. Try again");
        } else {
          await editUser({ pin: transactionPin }, users.email);
          toast.success("Transaction PIN updated successfully");
          location.reload();
        }
      }
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("Error updating transaction PIN");
    }
  };

  const toggleTransactionPinForm = () => {
    setIsTransactionPinOpen(!isTransactionPinOpen);
    setIsUsernameOpen(false);
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
              name="username"
              className="block w-full  p-4 border border-black rounded-md shadow-sm mb-2"
              placeholder="New Username "
              value={username}
              onChange={handleUsernameChange}
            />
            <button
              onClick={updateUsername}
              className="bg-black text-white py-2 px-4  rounded-md hover:bg-[#3F713E] "
            >
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
              {users?.pin == 1234 && (
                <p className="text-sm text-[#3F713E] focus:outline-none">
                  {" "}
                  For new users, default transaction PIN is 1234
                </p>
              )}
              <input
                type={showOldPin ? "text" : "password"}
                className="block w-full  p-4 border border-black rounded-md shadow-sm mb-2"
                placeholder="Old Transaction PIN"
                name="oldTransactionPin"
                value={oldTransactionPin}
                onChange={handleOldTransactionPinChange}
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
                name="transactionPin"
                value={transactionPin}
                onChange={handleTransactionPinChange}
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
                name="confirmtransactionPin"
                value={confirmTransactionPin}
                onChange={handleConfirmTransactionPinChange}
              />
              <button
                type="button"
                onClick={toggleShowConfirmPin}
                className="text-sm text-[#3F713E] focus:outline-none"
              >
                {showConfirmPin ? "Hide" : "Show"}
              </button>
            </div>
            <button
              onClick={updateTransactionPin}
              className="bg-black text-white py-2 px-4  rounded-md hover:bg-[#3F713E] "
            >
              Save
            </button>
          </form>
        )}
      </div>
      <div className="mt-16">
        <button
          className="p-2 w-[40vw] border text-red-900 bg-red-100 border-red-900 text-md rounded-lg hover:bg-red-900 hover:text-red-100"
          onClick={signOut}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Settings;
