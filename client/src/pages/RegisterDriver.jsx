import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import OnboardingLayout from "../components/OnboardingLayout";
import { supportedInstitutions } from "../assets/data/institutions";
import { toast } from "react-toastify";
import { supabase } from "../supabaseClient";
import { ethers } from "ethers";
import { useUser } from "../context/UserProvider";

import AppLogo from "../assets/images/logo-vd-black.svg";

const RegisterDriver = () => {
  const navigate = useNavigate();
  const { addUser } = useUser();

  const [formData, setFormData] = useState({
    institution: "",
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    role: "driver",
  });

  const { institution, firstName, lastName, username, email, password } =
    formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { user, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
      await createUser();
    } catch (error) {
      console.error("Error registering:", error.message);
    }
  };

  const createUser = async () => {
    try {
      const newUserWallet = generateWallet();

      const userData = {
        firstname: firstName,
        lastname: lastName,
        wallet_address: newUserWallet.address,
        username: username,
        email: email,
        institution: institution,
        role: "DRIVER",
        private_key: newUserWallet.privateKey,
        mnemonic_keys: newUserWallet.mnemonic,
        pin: "1234",
      };

      await addUser(userData);
      toast.success(
        "Driver Account Registered Successfully!. Note that we are skipping verification due to demo purposes"
      );
      navigate("/login/driver");
    } catch (error) {
      console.error("Error registering:", error.message);
      toast.error("Error Registering Driver");
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const generateWallet = () => {
    const wallet = ethers.Wallet.createRandom();

    return {
      address: wallet.address,
      privateKey: wallet.privateKey,
      mnemonic: wallet.mnemonic.phrase,
    };
  };

  return (
    <OnboardingLayout>
      <img src={AppLogo} className="w-[80%] mx-auto block lg:hidden" />
      <h2 className="text-2xl font-al-light mb-4 text-center">
        Register as Student
      </h2>
      <form className="flex flex-col space-y-2" onSubmit={handleSubmit}>
        <label className="block text-md font-medium text-gray-700">
          Select your Institution <span className="text-red-500">*</span>
        </label>
        <select
          name="institution"
          value={institution}
          onChange={handleChange}
          className="block w-full  p-4 border border-black rounded-md shadow-sm mb-2"
          required
        >
          <option value="" disabled>
            Select Institution
          </option>
          {supportedInstitutions.map((institution, index) => (
            <option key={index} value={institution}>
              {institution}
            </option>
          ))}
        </select>
        <label className="block text-md font-medium text-gray-700">
          First Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="firstName"
          value={firstName}
          onChange={handleChange}
          placeholder="First Name"
          className="block w-full  p-3 border border-black rounded-md shadow-sm mb-2"
          required
        />
        <label className="block text-md font-medium text-gray-700">
          Last Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="lastName"
          value={lastName}
          onChange={handleChange}
          placeholder="Last Name"
          className="block w-full  p-4 border border-black rounded-md shadow-sm mb-2"
          required
        />
        <label className="block text-md font-medium text-gray-700">
          Username <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleChange}
          placeholder="Username"
          className="block w-full  p-4 border border-black rounded-md shadow-sm mb-2"
          required
        />

        <label className="block text-md font-medium text-gray-700">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          placeholder="Email"
          className="block w-full  p-4 border border-black rounded-md shadow-sm mb-2"
          required
        />
        <label className="block text-md font-medium text-gray-700">
          Password <span className="text-red-500">*</span>
        </label>
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          value={password}
          onChange={handleChange}
          placeholder="Password"
          className="block w-full  p-4 border border-black rounded-md shadow-sm "
          required
        />
        <button
          type="button"
          onClick={toggleShowPassword}
          className="text-sm text-[#3F713E] mb-8 text-left focus:outline-none"
        >
          {showPassword ? "Hide" : "Show"}
        </button>
        <button
          className="p-2 w-full border text-[#3F713E] mt-4 bg-green-100 border-[#3F713E] text-md rounded-lg hover:bg-[#3F713E] hover:text-green-100"
          type="submit"
        >
          Register
        </button>
      </form>
      <p className="mt-4 text-center">
        Already have an account?{" "}
        <Link to="/login/student" className="text-[#3F713E]">
          Login as Student
        </Link>
      </p>
      <p className="mt-2 text-center">
        Not a student?{" "}
        <Link to="/login/driver" className="text-[#3F713E]">
          Login as Driver
        </Link>
      </p>
    </OnboardingLayout>
  );
};

export default RegisterDriver;
