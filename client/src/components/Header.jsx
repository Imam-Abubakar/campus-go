import React from "react";
import {
  RiNotification2Line,
  RiUser3Fill,
  RiSettings2Fill,
} from "@remixicon/react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  // Get the current location using useLocation hook
  const location = useLocation();

  // Extract the page name from the pathname
  const getPageName = () => {
    const pathname = location.pathname;
    switch (pathname) {
      case "/":
        return "Home";
      case "/profile":
        return "Profile";
      case "/settings":
        return "Settings";
      case "/history":
        return "Transaction History";
      case "/transfer":
        return "Transfer";
      case "/wallet":
        return "Wallet";
      case "/rides":
        return "Rides";
      default:
        return "";
    }
  };

  return (
    <div className="flex justify-between items-center py-4 md:px-8 bg-white border">
      {/* Display the dynamically determined page name */}
      <div className="font-bold font-al-bold mx-4 text-lg">{getPageName()}</div>
      <div className="flex justify-between items-center gap-2 mx-4">
        <Link
          to="/profile"
          className="border border-black rounded-full p-2 w-max"
        >
          <RiUser3Fill />
        </Link>{" "}
        <Link
          to="/settings"
          className="border border-black rounded-full p-2 w-max"
        >
          <RiSettings2Fill />
        </Link>{" "}
      </div>
    </div>
  );
};

export default Header;
