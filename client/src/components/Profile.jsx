import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import api from "../axios/axios";

function Profile() {

  let navigate = useNavigate();


  let [formData, setFormData] = useState({
    username: "",
    email: ""
  }); 

  let [errors, setErrors] = useState({})
  let userId = localStorage.getItem("userId");

  useEffect((() => {
    
    let getUser = async () => {
      try {
        let response = await api.get(`/user/profile/${userId}`)
        // console.log(response);

        let userData = response.data
        setFormData({
          username: userData.username,
          email: userData.email
        })
      } catch (error) {
        console.error("Failed to fetch user:", error);
        navigate("/login");
      }

    }
    getUser()
  }), [navigate])


  let handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  let handleSubmit = async (e) => {
    e.preventDefault();
    let userId = localStorage.getItem("userId");
    if (!userId) {
      console.error("No userId found, cannot update");
      return;
    }
    try {
      await api.patch(`/user/update/${userId}`, formData)
      // console.log("Profile updated Successfully", formData);
      alert("Profile Updated Successfully!");

      navigate('/')

    } catch (error) {
      console.error("Update failed:", error);
      setErrors(error.response?.data || {});
    }


  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0b0d18] via-[#0f1224] to-[#0b0d18] text-zinc-100">
      <Navbar />

      <div className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6 sm:p-8 text-zinc-100">

          {/* Header */}
          <h1 className="text-center text-4xl font-bold bg-gradient-to-r from-[#F5C77A] via-purple-400 to-[#6C5CE7] bg-clip-text text-transparent mb-4">
            Edit Profile
          </h1>
          <p className="text-center text-zinc-400 mb-8 text-sm">
            Update your account details ✏️
          </p>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>

            <div>
              <label className="block text-sm text-zinc-300 mb-1">Username</label>
              <input
                type="text"
                placeholder="Enter your username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-zinc-900/80 border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-zinc-500"
              />
            </div>

            <div>
              <label className="block text-sm text-zinc-300 mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-zinc-900/80 border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-zinc-500"
              />
            </div>

            {/* <div>
              <label className="block text-sm text-zinc-300 mb-1">
                New Password <span className="text-zinc-500">(optional)</span>
              </label>
              <input
                type="password"
                placeholder="Enter new password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-zinc-900/80 border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-zinc-500"
              />
            </div>

            <div>
              <label className="block text-sm text-zinc-300 mb-1">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm new password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-zinc-900/80 border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-zinc-500"
              />
            </div> */}

            {/* Buttons */}
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

      <Footer />
    </div>
  );
}

export default Profile;
