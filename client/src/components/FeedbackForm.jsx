import React, { useState } from "react";

const FeedbackForm = ({ ride, onClose }) => {
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle feedback submission
    console.log("Feedback submitted:", feedback);
    onClose();
  };

  return (
    <form className="px-6 font-al-light" onSubmit={handleSubmit}>
      <p className="text-md font-bold mb-2">Feedback/Complaint</p>
      <textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        className="w-full h-24 border border-black rounded-lg text-sm mb-4 p-2"
        placeholder="Have any issue with your driver? Forgot something on the bus? Leave your feedback here..."
      ></textarea>
      <div className="w-[93%] my-4 flex flex-col gap-2 mx-auto">
        <button
          type="submit"
          className="p-2 w-full border text-[#3F713E] bg-green-100 border-[#3F713E] text-md rounded-lg hover:bg-[#3F713E] hover:text-green-100"
        >
          Submit Feedback
        </button>
      </div>
    </form>
  );
};

export default FeedbackForm;
