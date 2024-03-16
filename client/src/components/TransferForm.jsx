import React, { useState } from "react";

const TransferForm = ({ onSubmit, onScan }) => {
  const [formData, setFormData] = useState({
    amount: 0,
    recipient: onScan, // Default value
    description: "",
  });

  console.log("TRANSFER FORM", onScan);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-100 p-4 border mt-4 mx-auto flex flex-col border-black shadow-md rounded-xl"
    >
      <div className="mb-4">
        <label
          htmlFor="recipient"
          className="block text-sm font-medium text-gray-700"
        >
          Recipient Username
        </label>
        <input
          type="text"
          id="recipient"
          name="recipient"
          placeholder="@abubakardev"
          value={formData.recipient}
          onChange={handleChange}
          className="block w-full  p-4 border border-black rounded-md shadow-sm mb-2"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="amount"
          className="block text-sm font-medium text-gray-700"
        >
          Amount (BFT)
        </label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          className="block w-full  p-4 border border-black rounded-md shadow-sm mb-2"
          required
        />
        <p className="text-sm text-gray-500 mt-1">
          Equivalent NGN: {formData.amount * 450} NGN
        </p>
      </div>
      <div className="mb-4">
        <label
          htmlFor="type"
          className="block text-sm font-medium text-gray-700"
        >
          Type
        </label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="block w-full  p-4 border border-black rounded-md shadow-sm mb-2"
          required
        >
          <option value="Bus ride payment">Bus ride payment</option>
          <option value="Transfer to other user">Transfer to other user</option>
          {/* Add more options as needed */}
        </select>
      </div>
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description (Optional)
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="block w-full  p-4 border border-black rounded-md shadow-sm mb-2"
          rows="3"
        ></textarea>
      </div>
      <button
        type="submit"
        className="bg-black text-white py-2 px-4  rounded-md hover:bg-[#3F713E] "
      >
        Send
      </button>
    </form>
  );
};

export default TransferForm;
