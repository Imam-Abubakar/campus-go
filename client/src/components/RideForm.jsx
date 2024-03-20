import React, { useState } from "react";

const RideForm = ({ onSubmit, onScan }) => {
  const [formData, setFormData] = useState({
    amount: 0,
    recipient: onScan,
  });

  // console.log("TRANSFER FORM", onScan);

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
          Driver Username
        </label>
        <input
          type="text"
          id="recipient"
          name="recipient"
          placeholder="abubakardev"
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
          Ride Amount (BFT)
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
          Equivalent NGN: {formData.amount * 4.5} NGN
        </p>
      </div>

      <button
        type="submit"
        className="bg-black text-white py-2 px-4  rounded-md hover:bg-[#3F713E] "
      >
        Pay for ride
      </button>
    </form>
  );
};

export default RideForm;
