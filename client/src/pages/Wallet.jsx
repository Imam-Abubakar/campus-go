import React, { useState, useEffect } from "react";
import ICLogo from "../assets/images/ic.svg";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { useUser } from "../context/UserProvider";
import QRCode from "qrcode.react";
import html2canvas from "html2canvas";
import ReadContract from "../plugins/readContract.js";
import { utils } from "ethers";
import Loader from "../components/Loader.jsx";

import {
  RiArrowUpCircleFill,
  RiArrowDownCircleFill,
  RiCornerRightUpLine,
  RiInformation2Line,
  RiUserReceived2Line,
} from "@remixicon/react";

import LogoStudent from "../assets/images/logo-v-black.svg";
import LogoDriver from "../assets/images/logo-vd-black.svg";

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

const Wallet = () => {
  const { users, fetchUser } = useUser();
  const { user, auth } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAccountDetailsOpen, setIsAccountDetailsOpen] = useState(false);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    fetchBalance();
  }, [users]);

  useEffect(() => {
    getTransactionHistory();
  }, []);

  const fetchBalance = async () => {
    try {
      const walletAddress = users?.wallet_address;
      const bftBalance = await ReadContract.getBFTBalance(walletAddress);
      setBalance(parseFloat(bftBalance)?.toFixed(2));
      console.log(bftBalance);
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  const getTransactionHistory = async () => {
    if (auth) {
      fetchUser(user.email);
    }
    const transactionHistory = await ReadContract.getAllTransactions();
    setIsLoading(false);
    //console.log(transactionHistory);
    const filteredHistory = transactionHistory.filter(
      (history) =>
        history.recipientAddress == users?.wallet_address ||
        history.senderAddress == users?.wallet_address
    );

    setRecentTransactions(filteredHistory);
  };

  const shortenWalletAddress = (address) => {
    const prefix = address.substring(0, 6);
    const suffix = address.substring(address.length - 4);
    return `${prefix}...${suffix}`;
  };

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(users.wallet_address);
      toast("Wallet address copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const captureQRCodeWithCover = async () => {
    const modalContent = document.getElementById("modal-content"); // Assuming the modal content has an id of "modal-content"
    const canvas = await html2canvas(modalContent); // Capture the HTML elements as a canvas
    const url = canvas.toDataURL(); // Convert the canvas to a data URL
    const anchor = document.createElement("a"); // Create an anchor element to download the image
    anchor.href = url;
    anchor.download = `${users?.username}_campusgo_code.png`; // Set the download filename
    anchor.click(); // Trigger the download
  };

  const nairaEquivalent = 4.5;

  const handleToggleAccountDetails = () => {
    setIsAccountDetailsOpen(!isAccountDetailsOpen);
  };

  return (
    <div className="md:mt-8 py-4 px-4 md:px-12 w-full lg:w-[75%] mx-auto flex flex-col">
      {isLoading && <Loader />}

      <div className="bg-white rounded-lg shadow-md p-6 my-2 flex justify-center items-center flex-col gap-2">
        <div className="flex gap-4 items-center">
          <div className="rounded-full bg-gray-200 text-black p-2 w-12 h-12 font-black  font-al-bolder flex items-center justify-center">
            <img src={ICLogo} className="w-64" />
          </div>
          <div className="text-black flex flex-col gap-1 text-md  tracking-wide font-al-bold">
            BFT Account
            <span className="text-black/70 text-sm font-al-light">
              {users?.wallet_address &&
                shortenWalletAddress(users?.wallet_address)}
            </span>
          </div>
        </div>
        {balance ? (
          <p className="text-4xl font-black font-al-bolder">
            {(balance * nairaEquivalent)?.toFixed(2)} NGN
          </p>
        ) : (
          <p className="text-4xl font-black font-al-bolder"> --- NGN</p>
        )}

        {balance && <p className="text-sm font-al-medium"> {balance} BFT</p>}
        <div className="text-center mb-4 flex flex-col lg:flex-row gap-4">
          <Link
            to="/transfer"
            className="py-2 px-4 flex gap-1 justify-center border text-white bg-[#3F713E] border-[#3F713E] text-md rounded-lg  hover:bg-white hover:text-[#3F713E]"
          >
            <RiCornerRightUpLine />
            Transfer
          </Link>
          <button
            onClick={handleToggleAccountDetails}
            className="py-2 px-4 flex gap-1 justify-center  border text-[#3F713E] bg-white border-[#3F713E] text-md rounded-lg  hover:bg-[#3F713E] hover:text-white"
          >
            <RiInformation2Line />
            Account details
          </button>
          <button
            onClick={handleToggleModal}
            className="py-2 px-4 flex gap-1 justify-center  border text-[#3F713E] bg-white border-[#3F713E] text-md rounded-lg  hover:bg-[#3F713E] hover:text-white"
          >
            <RiUserReceived2Line />
            Receive
          </button>
        </div>
        <p className="text-xs my-1 text-[#3F713E] font-al-light text-center tracking-normal">
          Click on Receive to get your QRCode for CampusGo transfers
        </p>
      </div>

      {isModalOpen && users?.username && (
        <div className="fixed z-20 inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-[85vw] lg:w-[30vw] bg-white  py-4 rounded-lg">
            <div
              id="modal-content"
              className="flex flex-col justify-center items-center rounded-lg"
            >
              <div className="">
                {users?.role == "DRIVER" ? (
                  <img src={LogoDriver} className="w-64" />
                ) : (
                  <img src={LogoStudent} className="w-64" />
                )}
              </div>
              <div className="w-full bg-[#3F713E] text-white p-6 flex flex-col justify-center items-center">
                <p className="font-al-bold text-xl text-center tracking-normal">
                  Please pay with CampusGo
                </p>
                <div className="p-2 bg-white rounded-lg my-4">
                  <QRCode value={users?.username} />
                </div>
                <p className="text-md font-al-bold text-center tracking-normal">
                  Account Name: {users?.firstname?.toUpperCase()}{" "}
                  {users?.lastname?.toUpperCase()}
                </p>
                <p className="text-md font-al-light text-center tracking-normal">
                  Username: {users?.username}
                </p>
              </div>
              <div className="w-full bg-white text-black p-6 flex flex-col justify-center items-center">
                <p className="font-al-bold text-center text-xl tracking-normal">
                  Use CampusGo to scan
                </p>
              </div>
            </div>

            <div className="">
              <div className="w-[80%] my-4 flex flex-col gap-2 mx-auto">
                <button
                  className="p-2 w-full border text-[#3F713E] bg-green-100 border-[#3F713E] text-md rounded-lg hover:bg-[#3F713E] hover:text-green-100"
                  onClick={captureQRCodeWithCover}
                >
                  Save
                </button>
                <button
                  className="p-2 w-full border text-red-900 bg-red-100 border-red-900 text-md rounded-lg hover:bg-red-900 hover:text-red-100"
                  onClick={handleToggleModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isAccountDetailsOpen && (
        <div className="bg-white rounded-lg shadow-md p-6 my-2 overflow-auto flex justify-center flex-col gap-2">
          <p className="text-lg font-al-bold font-bold mb-2">
            BFT Account Details
          </p>
          <p className="mb-2 text-md font-al-light">
            Account Name: {users?.firstname} {users?.lastname}
          </p>
          <p className="mb-2 text-md font-al-light">
            Wallet Address:{" "}
            <span
              className="text-blue-500 font-al-medium cursor-pointer"
              onClick={handleCopyToClipboard}
            >
              {users?.wallet_address}
            </span>
          </p>
          <div className="mb-2 bg-gray-200 text-md font-al-light p-2 rounded-lg">
            <div className="font-al-medium">How to deposit BFT:</div> To deposit
            BFT tokens, send them to the above provided wallet address. Note
            that any BFT token transferred to this address will automatically
            appear in your account balance.
          </div>
          <div className="mb-2 bg-gray-200 text-md font-al-light p-2 rounded-lg">
            <div className="font-al-medium"> What are BFT Tokens: </div>
            BFT or BITFINITY is the base fee token of Bitfinity. Bitfinity is a
            blazingly-fast, next-generation EVM, built on the Internet Computer
            and serving as a Layer Two for Bitcoin and other Bitcoin on-chain
            assets.
          </div>
        </div>
      )}

      <p className="text-lg font-al-bold font-bold mb-2">Recent Transactions</p>

      <div className="grid grid-cols-1  gap-4 ">
        {recentTransactions
          ?.slice()
          .reverse()
          .slice(0, 3)
          .map((transaction) => (
            <div
              key={transaction.id}
              className="border rounded-lg cursor-pointer hover:bg-gray-100"
              onClick={() => handleTransactionClick(transaction)}
            >
              <div className="flex items-center bg-white p-4 rounded-lg">
                {transaction.senderAddress != users.wallet_address ? (
                  <RiArrowUpCircleFill className="text-green-500 mr-2" />
                ) : (
                  <RiArrowDownCircleFill className="text-red-500 mr-2" />
                )}
                <div className="text-sm flex justify-between items-center w-full">
                  <div>
                    {" "}
                    <p className=" font-al-bolder tracking-wide">
                      {transaction.transactionType}
                    </p>
                    <p className="text-xs">
                      {transaction.dateTime != ""
                        ? formatDate(transaction.dateTime)
                        : formatDate("2024-03-18T08:00:00Z")}
                    </p>
                  </div>

                  <p className=" font-al-bold">
                    {transaction.senderAddress != users.wallet_address
                      ? "+"
                      : "-"}{" "}
                    ₦
                    {utils.formatEther(transaction.amount.toString()) *
                      nairaEquivalent}
                  </p>
                </div>
              </div>
            </div>
          ))}

        {recentTransactions.length == 0 && (
          <p className="my-2 text-center">No transactions yet</p>
        )}
      </div>
      {recentTransactions.length != 0 && (
        <Link
          to="/history"
          className="py-2 px-4 flex gap-1 justify-center mx-auto w-24 mt-4 border text-[#3F713E] bg-white border-[#3F713E] text-md rounded-lg  hover:bg-[#3F713E] hover:text-white"
        >
          Show all
        </Link>
      )}
    </div>
  );
};

export default Wallet;
