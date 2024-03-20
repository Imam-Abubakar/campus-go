import React, { useState, useEffect } from "react";
import { RiArrowUpCircleFill, RiArrowDownCircleFill } from "@remixicon/react";
import html2canvas from "html2canvas";
import Loader from "../components/Loader.jsx";
import { useAuth } from "../context/AuthProvider";
import { useUser } from "../context/UserProvider";
import ReadContract from "../plugins/readContract.js";
import { utils } from "ethers";

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

const HistoryPage = () => {
  const { user, auth } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const { getUserByUsername, fetchUser, users } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [filter, setFilter] = useState("all");

  const nairaEquivalent = 4.5;

  const handleTransactionClick = (transaction) => {
    setSelectedTransaction(transaction);
  };

  useEffect(() => {
    getTransactionHistory();
  }, []);

  const handleDownloadReceipt = () => {
    // Select the transaction details modal element
    const modalElement = document.getElementById("transaction-details");

    // Get the width and height of the modal element
    const width = modalElement.offsetWidth;
    const height = modalElement.offsetHeight;

    // Use html2canvas to capture the modal content as an image with the specified dimensions
    html2canvas(modalElement, { width, height }).then((canvas) => {
      // Convert the canvas to a data URL representing the image
      const dataURL = canvas.toDataURL();

      // Create an anchor element to download the image
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = "transaction_receipt.png"; // Change the filename as needed
      link.click();
    });
  };

  const handleShareTransaction = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Transaction Details",
          text: `CampusGo Transaction\nTransaction ID: ${
            selectedTransaction.uniqueId
          }\n Description: ${selectedTransaction.description}\nAmount: ₦${
            selectedTransaction.amount
          }\nRecipient: ${selectedTransaction.recipientName} (@${
            selectedTransaction.recipientUsername
          })\nDate: ${formatDate(selectedTransaction.dateTime)}`,
        })
        .then(() => console.log("Transaction shared successfully"))
        .catch((error) => console.error("Error sharing transaction:", error));
    } else {
      // Fallback logic if Web Share API is not supported
      alert("Sharing is not supported in this browser.");
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
    setTransactions(filteredHistory);
  };

  // console.log(transactions);

  const filteredTransactions =
    filter === "all"
      ? transactions
      : transactions.filter(
          (transaction) =>
            (transaction.senderAddress != users.wallet_address) == filter
        );

  return (
    <div className="md:mt-8 py-4 px-4 md:px-12 ">
      {isLoading && <Loader />}
      <div className="flex mb-4 gap-4 p-2 bg-gray-300 rounded-lg w-max mx-auto lg:mx-0 justify-center items-center text-sm">
        <button
          className={`px-4 lg:px-12 py-2 rounded ${
            filter === "all" ? "bg-black text-white" : "bg-gray-300 text-black"
          }`}
          onClick={() => setFilter("all")}
        >
          All
        </button>

        <button
          className={`px-4 lg:px-12 py-2 rounded ${
            filter === true ? "bg-black text-white" : "bg-gray-300 text-black"
          }`}
          onClick={() => setFilter(true)}
        >
          Incoming
        </button>
        <button
          className={`px-4 lg:px-12 py-2 rounded ${
            filter === false ? "bg-black text-white" : "bg-gray-300 text-black"
          }`}
          onClick={() => setFilter(false)}
        >
          Outgoing
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 ">
        {filteredTransactions?.map((transaction) => (
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

       
      </div>
      {filteredTransactions.length == 0 && (
          <p className="my-2 text-center">No transactions yet</p>
        )}

      {selectedTransaction && (
        <div className="fixed z-20 inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div id="transaction-details" className="w-[85vw] lg:w-[30vw]">
            <p className="bg-gray-200 px-4 py-4 rounded-t-lg font-al-bolder text-lg">
              Transaction Details
            </p>
            <div className="bg-white  py-4 rounded-b-lg">
              <div className="flex px-6 mt-2 justify-between flex-col lg:flex-row">
                <p className="font-al-bold text-md ">
                  {selectedTransaction.transactionType}
                </p>
                <p className="font-al-lighter">
                  {selectedTransaction.dateTime != ""
                    ? formatDate(selectedTransaction.dateTime)
                    : formatDate("2024-03-18T08:00:00Z")}
                </p>
              </div>
              <div className="px-6 flex flex-col justify-center items-center py-6 my-6 bg-gray-200">
                <p className="text-xl font-al-light">
                  Transfer of{" "}
                  <span className="font-al-bold">
                    ₦
                    {utils.formatEther(selectedTransaction.amount.toString()) *
                      nairaEquivalent}
                  </span>
                </p>
                <p className="p-1 border text-[#3F713E] bg-green-100 border-[#3F713E] text-xs rounded-full">
                  Completed
                </p>
              </div>
              <div className="px-6">
                <p className="font-al-light text-black/70 flex flex-col lg:flex-row justify-between items-center">
                  Recipient:{" "}
                  <span className="text-black font-al-medium">
                    {selectedTransaction.recipientName} (@
                    {selectedTransaction.recipientUsername})
                  </span>
                </p>

                <p className="font-al-light mt-2 text-black/70 flex flex-col lg:flex-row justify-between items-center">
                  Transaction ID:{" "}
                  <span className="text-black font-al-medium">
                    {selectedTransaction.uniqueId}
                  </span>
                </p>
              </div>

              <div className="w-[80%] my-4 flex flex-col gap-2 mx-auto">
                <button
                  className="p-2 w-full border text-[#3F713E] bg-green-100 border-[#3F713E] text-md rounded-lg hover:bg-[#3F713E] hover:text-green-100"
                  onClick={handleDownloadReceipt}
                >
                  Download Receipt
                </button>
                <button
                  className="p-2 w-full border text-[#3F713E] bg-green-100 border-[#3F713E] text-md rounded-lg hover:bg-[#3F713E] hover:text-green-100"
                  onClick={handleShareTransaction}
                >
                  Share Transaction
                </button>
                <button
                  className="p-2 w-full border text-red-900 bg-red-100 border-red-900 text-md rounded-lg hover:bg-red-900 hover:text-red-100"
                  onClick={() => setSelectedTransaction(null)}
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

export default HistoryPage;
