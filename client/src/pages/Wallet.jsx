import React, { useState } from "react";
import ICLogo from "../assets/images/ic.svg";

const Wallet = () => {
  const [isAccountDetailsOpen, setIsAccountDetailsOpen] = useState(false);
  const [recentTransactions, setRecentTransactions] = useState([
    // Sample recent transactions data
    { id: 1, type: "Deposit", amount: 100, date: new Date() },
    { id: 2, type: "Transfer", amount: -50, date: new Date() },
    // Add more recent transactions as needed
  ]);

  // Placeholder user data
  const userData = {
    username: "john_doe",
    accountName: "John Doe",
    walletAddress: "0x1234...5678",
    depositInstructions:
      "To deposit BFT tokens, send them to the provided wallet address.",
    bftTokenExplanation:
      "BFT tokens are the native tokens of our platform used for transactions.",
  };

  // Calculate total balance and Naira equivalent
  const totalBalance = recentTransactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  const nairaEquivalent = totalBalance * 450; // Assuming 1 BFT = 450 NGN

  const handleToggleAccountDetails = () => {
    setIsAccountDetailsOpen(!isAccountDetailsOpen);
  };

  return (
    <div className="md:mt-8 py-4 px-4 md:px-12 w-full lg:w-[70%] mx-auto flex flex-col">
      <div className="bg-white rounded-lg shadow-md p-6 my-2 flex justify-center items-center flex-col gap-2">
        <div className="flex gap-4 items-center">
          <div className="rounded-full bg-gray-200 text-black p-2 w-12 h-12 font-black  font-al-bolder flex items-center justify-center">
            <img src={ICLogo} className="w-64"/>
          </div>
          <div className="text-black flex flex-col gap-1 text-md  tracking-wide font-al-bold">
           BFT Account
           <span className="text-black/70 text-sm font-al-light">{userData.walletAddress}</span>
          </div>
        </div>
        <p className="text-lg font-bold mb-2">Username: {userData.username}</p>
        <p className="text-lg font-bold">Balance: {totalBalance} BFT</p>
        <p className="text-lg font-bold">
          Naira Equivalent: {nairaEquivalent} NGN
        </p>
      </div>

      <div className="text-center mb-4">
        <button
          onClick={handleToggleAccountDetails}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Deposit BFT Tokens
        </button>
      </div>

      {isAccountDetailsOpen && (
        <div className="border border-gray-300 p-4 mb-4">
          <p className="text-lg font-bold mb-2">Account Details</p>
          <p className="mb-2">Account Name: {userData.accountName}</p>
          <p className="mb-2">Wallet Address: {userData.walletAddress}</p>
          <p className="mb-2">
            How to deposit BFT: {userData.depositInstructions}
          </p>
          <p>What are BFT Tokens: {userData.bftTokenExplanation}</p>
        </div>
      )}

      <div>
        <h2 className="text-2xl font-bold mb-2">Recent Transactions</h2>
        <ul>
          {recentTransactions.map((transaction) => (
            <li key={transaction.id} className="mb-2">
              {transaction.type}: {transaction.amount} BFT -{" "}
              {transaction.date.toLocaleString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Wallet;
