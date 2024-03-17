import React, { useState } from "react";
import ICLogo from "../assets/images/ic.svg";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import {
  RiArrowUpCircleFill,
  RiArrowDownCircleFill,
  RiCornerRightUpLine,
  RiInformation2Line,
} from "@remixicon/react";

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
  const [isAccountDetailsOpen, setIsAccountDetailsOpen] = useState(false);
  const [recentTransactions, setRecentTransactions] = useState([
    {
      id: 1,
      type: "incoming",
      amount: 500,
      recipientName: "John Doe",
      recipientUsername: "johndoe123",
      dateTime: "2024-03-18T08:00:00Z",
      description: "Bus ride payment",
      fee: 0,
      uniqueId: "abc123",
    },
    {
      id: 2,
      type: "outgoing",
      amount: 200,
      recipientName: "Alice Smith",
      recipientUsername: "alice123",
      dateTime: "2024-03-17T12:30:00Z",
      description: "Transfer to user",
      fee: 1,
      uniqueId: "def456",
    },
  ]);

  // Placeholder user data
  const userData = {
    username: "john_doe",
    accountName: "John Doe",
    walletAddress: "0x1234...5678",
    bftTokenExplanation:
      "BFT tokens are the native tokens of our platform used for transactions.",
  };

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(userData.walletAddress);
      toast("Wallet address copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  // Calculate total balance and Naira equivalent
  const totalBalance = recentTransactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  const nairaEquivalent = totalBalance * 45; // Assuming 1 BFT = 450 NGN

  const handleToggleAccountDetails = () => {
    setIsAccountDetailsOpen(!isAccountDetailsOpen);
  };

  return (
    <div className="md:mt-8 py-4 px-4 md:px-12 w-full lg:w-[60%] mx-auto flex flex-col">
      <div className="bg-white rounded-lg shadow-md p-6 my-2 flex justify-center items-center flex-col gap-2">
        <div className="flex gap-4 items-center">
          <div className="rounded-full bg-gray-200 text-black p-2 w-12 h-12 font-black  font-al-bolder flex items-center justify-center">
            <img src={ICLogo} className="w-64" />
          </div>
          <div className="text-black flex flex-col gap-1 text-md  tracking-wide font-al-bold">
            BFT Account
            <span className="text-black/70 text-sm font-al-light">
              {userData.walletAddress}
            </span>
          </div>
        </div>
        <p className="text-4xl font-black font-al-bolder">
          {nairaEquivalent} NGN
        </p>

        <p className="text-sm font-al-medium">{totalBalance} BFT</p>
        <div className="text-center mb-4 flex flex-col lg:flex-row gap-4">
          <Link to="/transfer"
            onClick={handleToggleAccountDetails}
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
        </div>
      </div>

      {isAccountDetailsOpen && (
        <div className="bg-white rounded-lg shadow-md p-6 my-2 flex justify-center flex-col gap-2">
          <p className="text-lg font-al-bold font-bold mb-2">
            BFT Account Details
          </p>
          <p className="mb-2 text-md font-al-light">
            Account Name: {userData.accountName}
          </p>
          <p className="mb-2 text-md font-al-light">
            Wallet Address:{" "}
            <span
              className="text-blue-500 font-al-medium"
              onClick={handleCopyToClipboard}
            >
              {userData.walletAddress}
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
        {recentTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="border rounded-lg hover:bg-gray-100"
          >
            <div className="flex items-center bg-white p-4 rounded-lg">
              {transaction.type === "incoming" ? (
                <RiArrowUpCircleFill className="text-green-500 mr-2" />
              ) : (
                <RiArrowDownCircleFill className="text-red-500 mr-2" />
              )}
              <div className="text-sm flex justify-between items-center w-full">
                <div>
                  {" "}
                  <p className=" font-al-bolder tracking-wide">
                    {transaction.description}
                  </p>
                  <p className="text-xs">{formatDate(transaction.dateTime)}</p>
                </div>

                <p className=" font-al-bold">
                  {transaction.type === "incoming" ? "+" : "-"} ₦
                  {transaction.amount}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Link
        to="/history"
        className="py-2 px-4 flex gap-1 justify-center mx-auto w-24 mt-4 border text-[#3F713E] bg-white border-[#3F713E] text-md rounded-lg  hover:bg-[#3F713E] hover:text-white"
      >
        Show all
      </Link>
    </div>
  );
};

export default Wallet;
