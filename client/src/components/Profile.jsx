import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


function Profile() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "fathima_bs",
    email: "fathima@example.com",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    console.log("Updated profile:", formData);
    navigate("/profile");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-black via-gray-900 to-black text-zinc-100 px-4">

      <div className="w-full max-w-md rounded-2xl bg-white/10 backdrop-blur-xl 
        border border-white/20 shadow-2xl p-8 text-white">

        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex justify-center items-center space-x-2">
          
            <h1 className="text-4xl font-bold bg-linear-to-r from-[#F5C77A] via-purple-400 to-[#6C5CE7] bg-clip-text text-transparent">
              Edit Profile
            </h1>
          </div>
          <p className="text-sm text-gray-300 mt-1">
            Update your account details ✏️
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>

          <div>
            <label className="block text-sm text-zinc-300 mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-zinc-900/80 border border-white/10 focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm text-zinc-300 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
            
              className="w-full px-4 py-3 rounded-lg bg-zinc-900/50 border border-white/10"
            />
          </div>

          <div>
            <label className="block text-sm text-zinc-300 mb-1">
              New Password <span className="text-zinc-500">(optional)</span>
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter new password"
              className="w-full px-4 py-3 rounded-lg bg-zinc-900/80 border border-white/10 focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm text-zinc-300 mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm new password"
              className="w-full px-4 py-3 rounded-lg bg-zinc-900/80 border border-white/10 focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 py-3 rounded-lg font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 transition"
            >
              Save Changes
            </button>

            <Link
              to="/profile"
              className="flex-1 py-3 rounded-lg text-center font-semibold border border-white/20 hover:bg-white/10 transition"
            >
              Cancel
            </Link>
          </div>

        </form>
      </div>
    </div>
  );
}

export default Profile;
