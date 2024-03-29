import React, { useState, useEffect } from "react";
import HideText from "../components/HideText";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserProvider";
import ReadContract from "../plugins/readContract.js";

import scanImg from "../assets/images/scan.png";
import receiptImg from "../assets/images/receipt.png";
import depositImg from "../assets/images/deposit.png";

const Home = () => {
  const { users } = useUser();
  const [isHidden, setIsHidden] = useState(true);
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    fetchBalance();
  }, [users]);

  const nairaEquivalent = 4.5;

  const fetchBalance = async () => {
    try {
      const walletAddress = users?.wallet_address;
      const bftBalance = await ReadContract.getBFTBalance(walletAddress);
      setBalance(parseFloat(bftBalance)?.toFixed(2));
     // console.log(bftBalance);
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  const toggleHidden = () => {
    setIsHidden(!isHidden);
  };

  return (
    <div className="md:mt-8 py-4 px-4 md:px-12">
      <div>
        <div className="font-al-medium text-xl md:text-md">
          Welcome,{" "}
          <span className="font-al-bold font-semibold ">
            {users?.firstname?.toUpperCase()} {users?.lastname?.toUpperCase()}
          </span>{" "}
          👋
        </div>
        <div className="font-al-medium">What would you like to do today?</div>
      </div>
      <div>
        <div className="flex gap-2 mt-4 md:mt-8 items-center">
          <div className="font-al-light font-bold text-sm">Wallet Overview</div>
          {isHidden ? (
            <button onClick={toggleHidden}>👀</button>
          ) : (
            <button onClick={toggleHidden}>🙈</button>
          )}
        </div>
        <div className="flex flex-col md:flex-row gap-2 md:gap-4">
          <div className="bg-white rounded-lg shadow-md pl-6 pr-12 py-6 md:w-72 my-2">
            <h2 className="text-sm font-normal font-al-medium mb-2">
              NGN Balance
            </h2>
            {balance ? (
              <p className="text-xl font-bold font-al-bold">
                <HideText
                  text={`₦ ${(balance * nairaEquivalent)?.toFixed(2)}`}
                  isHidden={isHidden}
                />
              </p>
            ) : (
              <p className="text-xl font-bold font-al-bold">
                <HideText text={`₦ 00.0`} isHidden={isHidden} />
              </p>
            )}
          </div>
          <div className="bg-[#3F713E] rounded-lg shadow-md pl-6 pr-12 py-6 md:w-72 my-2">
            <h2 className="text-sm text-white font-normal font-al-medium mb-2">
              Exchange Rate
            </h2>
            <p className="text-xl font-bold font-al-bold text-white">
              1 BFT = ₦ {nairaEquivalent}
            </p>
          </div>
        </div>
      </div>
      <div>
        <div className="flex gap-2 mt-2 md:mt-6 align-items">
          <div className="font-al-light font-bold text-sm">
            Try out these features
          </div>
        </div>
        <div className="flex gap-2 md:gap-4 flex-wrap">
          <Link
            to="/rides"
            className="bg-black rounded-lg shadow-md px-6 py-6 md:w-96 my-2 text-white flex justify-between items-center"
          >
            <div className="text-lg font-normal font-al-medium tracking-wide md:w-64">
              {users?.role == "DRIVER"
                ? "Download and share your special QRCode to receive ride payments"
                : "Scan your driver's special QRCode to make ride payments"}{" "}
              
            </div>
            <img src={scanImg} className="w-24" alt="scan" />
          </Link>
          <Link
            to="/history"
            className="bg-black rounded-lg shadow-md px-6 py-6 md:w-96 my-2 text-white flex justify-between items-center"
          >
            <div className="text-lg font-normal font-al-medium tracking-wide md:w-64">
              You can now generate receipts for your rides and transactions
            </div>
            <img src={receiptImg} className="w-24" alt="scan" />
          </Link>
          <div className="bg-black rounded-lg shadow-md px-6 py-6 md:w-96 my-2 text-white flex justify-between items-center">
            <div className="text-lg font-normal font-al-medium tracking-wide md:w-64">
              <div className="text-xs bg-[#3F713E] py-1 px-2 border w-max rounded-full mb-2">
                Coming Soon
              </div>
              Withdraw your BFT directly to your Naira Bank Account
            </div>
            <img src={depositImg} className="w-24" alt="scan" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
