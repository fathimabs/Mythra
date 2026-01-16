import React from 'react'
import mithralogo from "../assets/images/mithralogo.png";
import { Link } from 'react-router-dom';
import Signup from './Signup';


function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-black via-gray-900 to-black px-4">

      {/* Card */}
      <div className="w-full max-w-md rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl p-8 text-white">

        {/* Logo / Title */}
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

          <p className="mt-4 text-xl font-semibold">
            Welcome back to Mythra
          </p>
          <p className="text-sm text-gray-300 mt-1">
            Where Movies & Books Become Memories 🎬📚
          </p>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block mb-1 text-sm">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 rounded-lg bg-black/30 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block mb-1 text-sm">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full px-4 py-2 rounded-lg bg-black/30 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Remember & Forgot */}
        <div className="flex items-center justify-between text-sm mb-6">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="accent-[#6C5CE7]" />
            Remember me
          </label>
          <a href="#" className="text-[#F5C77A] hover:underline">
            <Link to={'/forgot-password'}> Forgot password?</Link>
          </a>
        </div>

        {/* Button */}
        <button className="w-full py-3 rounded-lg 
        font-semibold text-lg bg-linear-to-r from-purple-600 to-[#6C5CE7] hover:opacity-90 transition">
         <Link to={'/home'}> Log In</Link>
        </button>

        {/* Signup */}
        <p className="text-center text-sm text-gray-300 mt-6">
          Don’t have an account?{" "}
          <span className="text-[#F5C77A] cursor-pointer hover:underline">
            <Link to={'/signup'}> Sign up</Link>
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login