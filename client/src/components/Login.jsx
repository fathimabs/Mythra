import React, { useContext, useState } from 'react';
import mithralogo from "../assets/images/mithralogo.png";
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import api from '../axios/axios';
import { userContext } from '../App';

function Login() {
  let navigate = useNavigate();
  let [serverError, setServerError] = useState("");


  // context variable

  let { user, setUser } = useContext(userContext)

  let { register, handleSubmit, formState: { errors } } = useForm();
  let [showPassword, setShowPassword] = useState(false)

  let onSubmit = async (data) => {
    setServerError(""); // Clear previous errors

    try {
      let response = await api.post("/user/login", data);

      localStorage.setItem('userId', response.data.userId);
      localStorage.setItem('user', JSON.stringify(response.data));

      localStorage.setItem('token', response.data.token)

      setUser(response.data)

      if (response.status >= 200 && response.status < 300) {

        navigate("/");

      } else {

        setServerError(response.data.message || "Login failed");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setServerError("Incorrect username or password");
      } else {
        setServerError("Something went wrong. Please try again.");
      }
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black px-4">
      <div className="w-full max-w-md rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl p-8 text-white">

        {/* Logo */}
        <div className="text-center mb-6">
          <div className="flex justify-center items-center space-x-2">
            <img src={mithralogo} alt="Mythra Logo" className="h-16 rounded-full" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#F5C77A] via-purple-400 to-[#6C5CE7] bg-clip-text text-transparent">
              Mythra
            </h1>
          </div>
          <p className="mt-4 text-xl font-semibold">Welcome back to Mythra</p>
          <p className="text-sm text-gray-300 mt-1">
            Where Movies & Books Become Memories 🎬📚
          </p>
        </div>

        {/* Server Error */}
        {serverError && (
          <p className="bg-red-500/20 text-red-400 text-sm p-2 rounded mb-4 text-center">
            {serverError}
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>

          {/* Email */}
          <div className="mb-4">
            <label className="block mb-1 text-sm">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-4 py-2 rounded-lg bg-black/30 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-4 relative">
            <label className="block mb-1 text-sm">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              {...register("password", { required: "Password is required" })}
              className="w-full px-4 py-2 pr-12 rounded-lg bg-black/30 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-9 text-zinc-400 hover:text-zinc-100"
            >
              {showPassword ? (
                // eye-off
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.585 10.585A2 2 0 0012 14a2 2 0 001.414-.586" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c2.042 0 3.982.627 5.542 1.691" />
                </svg>
              ) : (
                // eye
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Remember Me / Forgot Password */}
          {/* <div className="flex items-center justify-between text-sm mb-6">

            <Link to="/forgot-password" className="text-[#F5C77A] hover:underline">
              Forgot password?
            </Link>
          </div> */}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg font-semibold text-lg bg-gradient-to-r from-purple-600 to-[#6C5CE7] hover:opacity-90 transition"
          >
            Login
          </button>

          {/* Signup Link */}
          <p className="text-center text-sm text-gray-300 mt-6">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-[#F5C77A] hover:underline">
              Sign up
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
}

export default Login;
