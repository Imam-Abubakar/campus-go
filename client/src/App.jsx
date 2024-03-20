import React, { useState } from "react";
import { Route, Routes,  Navigate } from "react-router-dom";
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
import { useAuth } from "./context/AuthProvider";
import { useUser } from "./context/UserProvider";

import Loader from "./components/Loader";

import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import RegisterDriver from "./pages/RegisterDriver";
import RegisterStudent from "./pages/RegisterStudent";
import LoginDriver from "./pages/LoginDriver";
import LoginStudent from "./pages/LoginStudent";

const App = () => {
  const { auth } = useAuth();
  const { users } = useUser();
  return (
    <div>
      <ToastContainer />
      {auth ? (
        <Layout>
          {users?.length == 0 && <Loader />}
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/wallet" element={<Wallet />} />
            <Route exact path="/history" element={<History />} />
            <Route exact path="/settings" element={<Settings />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/feedback" element={<Feedback />} />
            <Route exact path="/transfer" element={<Transfers />} />
            <Route exact path="/rides" element={<Rides />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Layout>
      ) : (
        <Routes>
          <Route exact path="/" element={<LoginStudent />} />
          <Route exact path="/login/student" element={<LoginStudent />} />
          <Route exact path="/login/driver" element={<LoginDriver />} />
          <Route exact path="/register/driver" element={<RegisterDriver />} />
          <Route exact path="/register/student" element={<RegisterStudent />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </div>
  );
};

export default App;
