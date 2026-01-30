import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import mithralogo from "../assets/images/mithralogo.png";
import axios from 'axios'
import api from "../axios/axios";

function Signup() {
  let navigate = useNavigate();
  let [data, setData] = useState({
    username: "",
    email: "",
    password: ""
  })

  let [errors, setErrors] = useState({});

  let [showPassword, setShowPassword] = useState(false)

  // console.log(data);

  // Handle input change
  function getData(e) {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }


  // Validation function

  let validate = () => {
    let newErrors = {}

    // Username

    if (!data.username.trim()) {
      newErrors.username = "Username is Required"
    }
    else if (data.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters long";
    } else if (data.username.length > 20) {
      newErrors.username = "Username cannot exceed 20 characters";
    }

    // Email

    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      newErrors.email = "Invalid Email Format"
    }
    //Check storng  Password  or not

    let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/
    if (!passwordRegex.test(data.password)) {
      newErrors.password = "Password must be at least 8 characters with uppercase, lowercase, number & special character "
    }
    return newErrors
  };

  // submit Handler 

  let handleSubmit = async (e) => {
    e.preventDefault();

    let validateErrors = validate();
    // console.log(validateErrors);
    // console.log(Object.keys(validateErrors));

    setErrors(validateErrors)
    if (Object.keys(validateErrors).length > 0) {
      return;
    }

    try {
      await api.post("/user", data)

      alert("User Registration successful!");
      navigate('/login')

    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-black via-gray-900 to-black text-zinc-100 px-4">

      {/* Card */}
      <div className="w-full max-w-md rounded-2xl bg-white/10 backdrop-blur-xl 
        p-8 border border-white/20 shadow-2xl  text-white">
        <div className="text-center mb-6">
          <div className="flex justify-center items-center space-x-2">
            <img
              src={mithralogo}
              alt="Mythra Logo"
              className="h-15 rounded-full"
            />
            <h1 className="text-4xl font-bold bg-linear-to-r from-[#F5C77A]  via-purple-400 to-[#6C5CE7] bg-clip-text text-transparent">
              Mythra
            </h1>
          </div>
          <p className="text-sm text-gray-300 mt-1">
            Where Movies & Books Become Memories 🎬📚
          </p>
        </div>
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="username" className="block text-sm text-zinc-300 mb-1">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              onChange={getData}
              name="username"
              className="w-full px-4 py-3 rounded-lg bg-zinc-900/80 border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.username && (<p className="text-red-400 text-sm mt-1">{errors.username}</p>)}
          </div>


          <div>
            <label htmlFor="email" className="block text-sm text-zinc-300 mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              onChange={getData}
              name="email"
              className="w-full px-4 py-3 rounded-lg bg-zinc-900/80 border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.email && (<p className="text-red-400 text-sm mt-1">{errors.email}</p>)}
          </div>


          <div>
            <label htmlFor="password" className="block text-sm text-zinc-300 mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              onChange={getData}
              name="password"
              className="w-full px-4 py-3 rounded-lg bg-zinc-900/80 border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-10 top-92  text-zinc-400 hover:text-zinc-100"
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-4-9-7s4-7 9-7c1.39 0 2.71.33 3.875.925M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
            {errors.password && (<p className="text-red-400 text-sm mt-1">{errors.password}</p>)}
          </div>


          {/* <div>
            <label className="block text-sm text-zinc-300 mb-1">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              className="w-full px-4 py-3 rounded-lg bg-zinc-900/80 border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div> */}


          {/* CTA Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 transition"
          >
            Sign Up
          </button>
        </form>


        {/* Footer */}
        <p className="text-center text-zinc-400 mt-6 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-[#F5C77A] hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}


export default Signup;
