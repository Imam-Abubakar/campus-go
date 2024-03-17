import React from "react";

const TransferModal = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed z-20 inset-0 flex items-center flex-col gap-2  justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 lg:px-32 rounded-lg flex flex-col justify-center items-center">
            <div className="flex justify-center flex-col gap-2 items-center font-al-bold text-md">{children}</div>

            <button
              onClick={onClose}
              className="p-2 text-xs mt-2 w-full border text-red-900 bg-red-100 border-red-900 text-md rounded-lg hover:bg-red-900 hover:text-red-100"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default TransferModal;
