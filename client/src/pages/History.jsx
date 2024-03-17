import React, { useState } from "react";
import { RiArrowUpCircleFill, RiArrowDownCircleFill } from "@remixicon/react";
import html2canvas from "html2canvas";

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

const sampleTransactions = [
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
  {
    id: 3,
    type: "incoming",
    amount: 300,
    recipientName: "Bob Johnson",
    recipientUsername: "bob123",
    dateTime: "2024-03-16T10:15:00Z",
    description: "Wallet top-up",
    fee: 0,
    uniqueId: "ghi789",
  },
  {
    id: 4,
    type: "outgoing",
    amount: 1000,
    recipientName: "Emily Brown",
    recipientUsername: "emily456",
    dateTime: "2024-03-15T14:45:00Z",
    description: "Withdrawal",
    fee: 0.5,
    uniqueId: "jkl012",
  },
  {
    id: 5,
    type: "incoming",
    amount: 250,
    recipientName: "Charlie Davis",
    recipientUsername: "charlie789",
    dateTime: "2024-03-14T11:30:00Z",
    description: "Bus ride payment",
    fee: 0,
    uniqueId: "mno345",
  },
  {
    id: 6,
    type: "outgoing",
    amount: 1500,
    recipientName: "Ella Wilson",
    recipientUsername: "ella987",
    dateTime: "2024-03-13T09:20:00Z",
    description: "Transfer to user",
    fee: 1.5,
    uniqueId: "pqr678",
  },
  // Add more sample transactions as needed
];

const HistoryPage = () => {
  const [transactions, setTransactions] = useState(sampleTransactions);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [filter, setFilter] = useState("all");

  const handleTransactionClick = (transaction) => {
    setSelectedTransaction(transaction);
    // Open transaction details popup or modal
  };

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

  const filteredTransactions =
    filter === "all"
      ? transactions
      : transactions.filter((transaction) => transaction.type === filter);

  return (
    <div className="md:mt-8 py-4 px-4 md:px-12 ">
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
            filter === "incoming"
              ? "bg-black text-white"
              : "bg-gray-300 text-black"
          }`}
          onClick={() => setFilter("incoming")}
        >
          Incoming
        </button>
        <button
          className={`px-4 lg:px-12 py-2 rounded ${
            filter === "outgoing"
              ? "bg-black text-white"
              : "bg-gray-300 text-black"
          }`}
          onClick={() => setFilter("outgoing")}
        >
          Outgoing
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
        {filteredTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="border rounded-lg cursor-pointer hover:bg-gray-100"
            onClick={() => handleTransactionClick(transaction)}
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

      {selectedTransaction && (
        <div
          id="transaction-details"
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        >
          <div className="w-[85vw] lg:w-[30vw]">
            <p className="bg-gray-200 px-4 py-4 rounded-t-lg font-al-bolder text-lg">
              Transaction Details
            </p>
            <div className="bg-white  py-4 rounded-b-lg">
              <div className="flex px-6 mt-2 justify-between flex-col lg:flex-row">
                <p className="font-al-bold text-md ">
                  {selectedTransaction.description}
                </p>
                <p className="font-al-lighter">
                  {formatDate(selectedTransaction.dateTime)}
                </p>
              </div>
              <div className="px-6 flex flex-col justify-center items-center py-6 my-6 bg-gray-200">
                <p className="text-xl font-al-light">
                  Transfer of{" "}
                  <span className="font-al-bold">
                    ₦{selectedTransaction.amount}
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
