import React, { useState } from "react";
import {
  RiHomeGearFill,
  RiHistoryFill,
  RiWallet2Fill,
  RiExchange2Fill,
  RiBus2Fill,
  
} from "@remixicon/react";
import { Link, useLocation } from "react-router-dom";

import Header from "./Header";

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const isActive = (path) => {
    return location.pathname == path ? "text-black" : "text-gray-500";
  };

  const isActiveDesktop = (path) => {
    return location.pathname == path ? "text-[#3F713E]" : "text-white";
  };

  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* Content and sidebar */}
      <div className="lg:hidden z-10 sticky top-0">
        <Header />
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar (always open on larger screens) */}
        <aside
          className={`w-64 bg-[#000] text-white ${
            isSidebarOpen ? "" : "hidden"
          } lg:block`}
        >
          {/* Sidebar content */}
          <div className="p-4">
            <h1 className="text-xl font-semibold">CampusGo</h1>
            <ul className="mt-4 ml-4">
              <li>
                <Link
                  className={`py-3 flex gap-4 font-al-medium items-center font-normal text-md cursor-pointer ${isActiveDesktop(
                    "/"
                  )}`}
                  to="/"
                >
                  <RiHomeGearFill className="text-xl" />
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className={`py-3 flex gap-4 font-al-medium items-center font-normal text-md cursor-pointer ${isActiveDesktop(
                    "/wallet"
                  )}`}
                  to="/wallet"
                >
                  <RiWallet2Fill className="text-xl" />
                  Wallet
                </Link>
              </li>
              <li>
                <Link
                  className={`py-3 flex gap-4 font-al-medium items-center font-normal text-md cursor-pointer ${isActiveDesktop(
                    "/rides"
                  )}`}
                  to="/rides"
                >
                  <RiBus2Fill className="text-xl" />
                  Rides
                </Link>
              </li>
              <li>
                <Link
                  className={`py-3 flex gap-4 font-al-medium items-center font-normal text-md cursor-pointer ${isActiveDesktop(
                    "/transfer"
                  )}`}
                  to="/transfer"
                >
                  <RiExchange2Fill className="text-xl" />
                  Transfer
                </Link>
              </li>
              <li>
                <Link
                  className={`py-3 flex gap-4 font-al-medium items-center font-normal text-md cursor-pointer ${isActiveDesktop(
                    "/history"
                  )}`}
                  to="/history"
                >
                  <RiHistoryFill className="text-xl" />
                  History
                </Link>
              </li>
            </ul>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 w-full bg-gray-200 overflow-y-auto">
          <div className="hidden lg:block">
            <Header />
          </div>
          {children}
        </main>
      </div>

      {/* Bottom navigation (visible on smaller screens) */}
      <nav className="bg-white z-10 px-4 md:px-12 lg:hidden sticky bottom-0">
        <ul className="flex justify-between mt-1">
          <li>
            <Link
              to="/"
              className={`py-3 flex flex-col text-gray-500 hover:text-black font-al-medium items-center font-normal text-sm cursor-pointer ${isActive(
                "/"
              )}`}
            >
              <RiHomeGearFill className="text-sm" />
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/wallet"
              className={`py-3 flex flex-col text-gray-500 hover:text-black font-al-medium items-center font-normal text-sm cursor-pointer ${isActive(
                "/wallet"
              )}`}
            >
              <RiWallet2Fill className="text-xl" />
              Wallet
            </Link>
          </li>
          <li>
            <Link
              to="/rides"
              className={`py-3 flex flex-col text-gray-500 hover:text-black font-al-medium items-center font-normal text-sm cursor-pointer ${isActive(
                "/rides"
              )}`}
            >
              <RiBus2Fill className="text-xl" />
              Rides
            </Link>
          </li>
          <li>
            <Link
              to="/transfer"
              className={`py-3 flex flex-col text-gray-500 hover:text-black font-al-medium items-center font-normal text-sm cursor-pointer ${isActive(
                "/transfer"
              )}`}
            >
              <RiExchange2Fill className="text-xl" />
              Transfer
            </Link>
          </li>
          <li>
            <Link
              to="/history"
              className={`py-3 flex flex-col text-gray-500 hover:text-black font-al-medium items-center font-normal text-sm cursor-pointer ${isActive(
                "/history"
              )}`}
            >
              <RiHistoryFill className="text-xl" />
              History
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Layout;
