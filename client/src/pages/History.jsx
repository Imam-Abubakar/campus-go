import React, { useState } from "react";
import { RiArrowUpCircleFill, RiArrowDownCircleFill } from "@remixicon/react";

const sampleTransactions = [
    { 
      id: 1, 
      type: "incoming", 
      amount: 50, 
      recipientName: "John Doe",
      recipientUsername: "johndoe123",
      dateTime: "2024-03-18T08:00:00Z",
      description: "Bus ride payment",
      fee: 0,
      uniqueId: "abc123"
    },
    { 
      id: 2, 
      type: "outgoing", 
      amount: 20, 
      recipientName: "Alice Smith",
      recipientUsername: "alice123",
      dateTime: "2024-03-17T12:30:00Z",
      description: "Transfer to user",
      fee: 1,
      uniqueId: "def456"
    },
    { 
      id: 3, 
      type: "incoming", 
      amount: 30, 
      recipientName: "Bob Johnson",
      recipientUsername: "bob123",
      dateTime: "2024-03-16T10:15:00Z",
      description: "Wallet top-up",
      fee: 0,
      uniqueId: "ghi789"
    },
    { 
      id: 4, 
      type: "outgoing", 
      amount: 10, 
      recipientName: "Emily Brown",
      recipientUsername: "emily456",
      dateTime: "2024-03-15T14:45:00Z",
      description: "Withdrawal",
      fee: 0.5,
      uniqueId: "jkl012"
    },
    { 
      id: 5, 
      type: "incoming", 
      amount: 25, 
      recipientName: "Charlie Davis",
      recipientUsername: "charlie789",
      dateTime: "2024-03-14T11:30:00Z",
      description: "Bus ride payment",
      fee: 0,
      uniqueId: "mno345"
    },
    { 
      id: 6, 
      type: "outgoing", 
      amount: 15, 
      recipientName: "Ella Wilson",
      recipientUsername: "ella987",
      dateTime: "2024-03-13T09:20:00Z",
      description: "Transfer to user",
      fee: 1.5,
      uniqueId: "pqr678"
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
    // Implement logic to download receipt as image or PDF
  };

  const handleShareTransaction = () => {
    // Implement logic to share transaction with others
  };

  const filteredTransactions = filter === "all"
    ? transactions
    : transactions.filter(transaction => transaction.type === filter);

  return (
    <div className="container mx-auto p-4">
      {/* Overhead Switcher */}
      <div className="flex justify-between mb-4">
        <button
          className={`px-4 py-2 rounded ${filter === "all" ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-800"}`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={`px-4 py-2 rounded ${filter === "incoming" ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-800"}`}
          onClick={() => setFilter("incoming")}
        >
          Incoming
        </button>
        <button
          className={`px-4 py-2 rounded ${filter === "outgoing" ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-800"}`}
          onClick={() => setFilter("outgoing")}
        >
          Outgoing
        </button>
      </div>

      {/* Transaction List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTransactions.map(transaction => (
          <div
            key={transaction.id}
            className="p-4 border rounded-lg cursor-pointer hover:bg-gray-100"
            onClick={() => handleTransactionClick(transaction)}
          >
            <div className="flex items-center">
              {transaction.type === "incoming" ? (
                <RiArrowUpCircleFill className="text-green-500 mr-2" />
              ) : (
                <RiArrowDownCircleFill className="text-red-500 mr-2" />
              )}
              <div>
                <p>{transaction.description}</p>
                <p>{transaction.type === "incoming" ? "+" : "-"} ${transaction.amount}</p>
                <p>Recipient: {transaction.recipientName} ({transaction.recipientUsername})</p>
                <p>Date: {new Date(transaction.dateTime).toLocaleString()}</p>
                <p>Transaction ID: {transaction.uniqueId}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Transaction Details Popup */}
      {selectedTransaction && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg">
            <p>{selectedTransaction.description}</p>
            <p>{selectedTransaction.type === "incoming" ? "Incoming" : "Outgoing"} ${selectedTransaction.amount}</p>
            <p>Recipient: {selectedTransaction.recipientName} ({selectedTransaction.recipientUsername})</p>
            <p>Date: {new Date(selectedTransaction.dateTime).toLocaleString()}</p>
            <p>Transaction ID: {selectedTransaction.uniqueId}</p>
            <button onClick={handleDownloadReceipt}>Download Receipt</button>
            <button onClick={handleShareTransaction}>Share Transaction</button>
            <button onClick={() => setSelectedTransaction(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
