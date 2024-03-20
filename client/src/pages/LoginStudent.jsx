import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OnboardingLayout from "../components/OnboardingLayout";
import { useAuth } from "../context/AuthProvider";
import { toast } from "react-toastify";

import AppLogo from "../assets/images/logo-v-black.svg";

const LoginStudent = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

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
      const {
        data: { user, session },
        error,
      } = await login(email, password);
      if (error) throw error;
      if (user && session) navigate("/");
      toast.success("Login Success");
    } catch (error) {
      console.error("Error registering:", error.message);
      toast.error("Error logging in");
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <OnboardingLayout>
      <img src={AppLogo} className="w-[80%] mx-auto block lg:hidden" />
      <h2 className="text-2xl font-al-light mb-4 text-center">
        Login as Student
      </h2>
      <form className="flex flex-col space-y-2" onSubmit={handleSubmit}>
        <label className="block text-md font-medium text-gray-700">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleChange}
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
          Login
        </button>
      </form>
      <p className="mt-4 text-center">
        Don't have an account?{" "}
        <Link to="/register/student" className="text-[#3F713E]">
          Register as Student
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

export default LoginStudent;
