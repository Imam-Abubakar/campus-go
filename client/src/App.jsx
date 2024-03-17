import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Wallet from "./pages/Wallet";
import History from "./pages/History";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import Feedback from "./pages/Feedback";
import Transfers from "./pages/Transfers";
import Rides from "./pages/Rides";
import Layout from "./components/Layout";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import "./App.css";

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Layout>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/wallet" element={<Wallet />} />
          <Route exact path="/history" element={<History />} />
          <Route exact path="/settings" element={<Settings />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/feedback" element={<Feedback />} />
          <Route exact path="/transfer" element={<Transfers />} />
          <Route exact path="/rides" element={<Rides />} />
        </Routes>
      </Layout>
    </div>
  );
};

export default App;
