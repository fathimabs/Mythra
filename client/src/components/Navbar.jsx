import { useState, useEffect, useRef, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUserCircle,
} from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";

import mithralogo from "../assets/images/mithralogo.png";

function Navbar() {
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const profileRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user"));

  const starsAndDots = useMemo(() => {
    return Array.from({ length: 150 }, () => ({
      isStar: Math.random() > 0.85,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random(),
    }));
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const onHandleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const getInitials = () => {
    if (!user?.username) return "U";

    return user.username
      .trim()
      .split(" ")
      .map((word) => word[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <nav className="relative z-[9999] bg-black border-b border-white/10">

      {/* Galaxy Background */}

      <div className="absolute inset-0 pointer-events-none overflow-hidden">

        {starsAndDots.map((item, index) => (
          <span
            key={index}
            className={
              item.isStar
                ? "animate-blink text-purple-400"
                : "text-white/30"
            }
            style={{
              position: "absolute",
              top: `${item.top}%`,
              left: `${item.left}%`,
              fontSize: item.isStar
                ? `${item.size * 6 + 4}px`
                : `${item.size * 3 + 1}px`,
              lineHeight: 0,
            }}
          >
            {item.isStar ? "★" : "•"}
          </span>
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}

        <div className="flex items-center gap-5">

          <Link to="/">
            <img
              src={mithralogo}
              alt="Mythra"
              className="h-16 rounded-full"
            />
          </Link>

          <h1
            className="
            text-4xl
            font-bold
            bg-gradient-to-r
            from-[#F5C77A]
            via-purple-400
            to-[#6C5CE7]
            bg-clip-text
            text-transparent
            "
          >
            Mythra
          </h1>

        </div>

        {/* Desktop Menu */}

        <div className="hidden sm:flex items-center gap-8 text-zinc-300">

          <Link
            to="/"
            className="hover:text-purple-400 transition"
          >
            Home
          </Link>

          <Link
            to="/book"
            className="hover:text-purple-400 transition"
          >
            Books
          </Link>

          <Link
            to="/movie"
            className="hover:text-purple-400 transition"
          >
            Movies
          </Link>

          {/* Profile */}

          <div
            ref={profileRef}
            className="relative"
          >

            <button
              onClick={() =>
                setProfileOpen(!profileOpen)
              }
              className="
              rounded-full
              transition-all
              duration-300
              hover:scale-105
              hover:ring-2
              hover:ring-purple-500/40
              "
            >

              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt="profile"
                  className="
                  w-11
                  h-11
                  rounded-full
                  object-cover
                  border-2
                  border-purple-500
                  "
                />
              ) : (
                <div
                  className="
                  w-11
                  h-11
                  rounded-full
                  bg-gradient-to-br
                  from-purple-500
                  via-fuchsia-500
                  to-pink-500
                  flex
                  items-center
                  justify-center
                  text-white
                  font-bold
                  shadow-lg
                  shadow-purple-500/30
                  transition-all
                  duration-300
                  hover:rotate-6
                  "
                >
                  {getInitials()}
                </div>
              )}

            </button>
                        {/* Animated Dropdown */}

            <div
              className={`
                absolute
                right-0
                top-16

                w-[320px]
                sm:w-[320px]

                rounded-2xl
                bg-[#111827]/95
                backdrop-blur-xl

                border
                border-white/10

                shadow-2xl
                shadow-purple-500/20

                overflow-hidden

                origin-top-right

                transition-all
                duration-300
                ease-out

                z-[9999]

                ${
                  profileOpen
                    ? "opacity-100 scale-100 translate-y-0 visible"
                    : "opacity-0 scale-95 -translate-y-3 invisible pointer-events-none"
                }
              `}
            >

              {/* Header */}

              <div className="px-6 py-6 flex flex-col sm:flex-row items-center gap-4">

                {user?.avatar ? (

                  <img
                    src={user.avatar}
                    alt="profile"
                    className="
                    w-16
                    h-16
                    rounded-full
                    object-cover
                    border-2
                    border-purple-500
                    shadow-lg
                    shadow-purple-500/30
                    "
                  />

                ) : (

                  <div
                    className="
                    w-16
                    h-16
                    rounded-full

                    bg-gradient-to-br
                    from-purple-500
                    via-fuchsia-500
                    to-pink-500

                    flex
                    items-center
                    justify-center

                    text-white
                    text-2xl
                    font-bold

                    shadow-xl
                    shadow-purple-500/30

                    transition-all
                    duration-300

                    hover:scale-110
                    hover:rotate-6
                    "
                  >
                    {getInitials()}
                  </div>

                )}

                <div className="text-center sm:text-left">

                  <p className="text-zinc-400 text-sm">
                    Hello,
                  </p>

                  <h2 className="text-white text-lg font-semibold">
                    {user?.username}
                  </h2>

                  {user?.email && (

                    <p className="text-xs text-zinc-500 break-all mt-1">
                      {user.email}
                    </p>

                  )}

                </div>

              </div>

              <div className="border-t border-white/10"></div>

              {/* Profile */}

              <button
                onClick={() => {
                  setProfileOpen(false);
                  navigate("/profile");
                }}
                className="
                w-full

                flex
                items-center
                gap-4

                px-6
                py-4

                text-zinc-300

                transition-all
                duration-300

                hover:bg-purple-500/10
                hover:text-purple-400
                hover:pl-8
                "
              >

                <FaUserCircle size={20} />

                <span className="font-medium">
                  Profile
                </span>

              </button>

              <div className="border-t border-white/10"></div>

              {/* Logout */}

              <button
                onClick={() => {
                  setProfileOpen(false);
                  onHandleLogout();
                }}
                className="
                w-full

                flex
                items-center
                gap-4

                px-6
                py-4

                text-zinc-300

                transition-all
                duration-300

                hover:bg-red-500/10
                hover:text-red-400
                hover:pl-8
                "
              >

                <FiLogOut size={20} />

                <span className="font-medium">
                  Logout
                </span>

              </button>

            </div>

          </div>

        </div>

        {/* Mobile Menu Button */}

        <button
          onClick={() =>
            setMobileMenuOpen(!mobileMenuOpen)
          }
          className="
          sm:hidden

          text-zinc-300

          hover:text-purple-400

          transition
          "
        >

          {mobileMenuOpen ? (
            <IoClose size={30} />
          ) : (
            <HiOutlineMenuAlt3 size={30} />
          )}

        </button>

      </div>
            {/* Mobile Menu */}

      <div
        className={`
          sm:hidden
          transition-all
          duration-300
          ease-in-out
          overflow-hidden
          ${
            mobileMenuOpen
              ? "max-h-[600px] opacity-100"
              : "max-h-0 opacity-0"
          }
        `}
      >
        <div className="bg-black/95 backdrop-blur-xl border-t border-white/10 px-6 py-6">

          {/* Navigation */}

          <div className="space-y-5 text-zinc-300">

            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block hover:text-purple-400 transition"
            >
              Home
            </Link>

            <Link
              to="/book"
              onClick={() => setMobileMenuOpen(false)}
              className="block hover:text-purple-400 transition"
            >
              Books
            </Link>

            <Link
              to="/movie"
              onClick={() => setMobileMenuOpen(false)}
              className="block hover:text-purple-400 transition"
            >
              Movies
            </Link>

          </div>

          {/* Divider */}

          <div className="border-t border-white/10 my-6"></div>

          {/* Profile Card */}

          <div className="flex items-center gap-4">

            {user?.avatar ? (

              <img
                src={user.avatar}
                alt="profile"
                className="w-16 h-16 rounded-full object-cover border-2 border-purple-500"
              />

            ) : (

              <div
                className="
                w-16
                h-16
                rounded-full
                bg-gradient-to-br
                from-purple-500
                via-fuchsia-500
                to-pink-500
                flex
                items-center
                justify-center
                text-white
                text-xl
                font-bold
                "
              >
                {getInitials()}
              </div>

            )}

            <div>

              <h2 className="text-white font-semibold text-lg">
                {user?.username}
              </h2>

              {user?.email && (
                <p className="text-zinc-500 text-sm">
                  {user.email}
                </p>
              )}

            </div>

          </div>

          {/* Profile Button */}

          <button
            onClick={() => {
              navigate("/profile");
              setMobileMenuOpen(false);
            }}
            className="
              mt-8
              w-full
              flex
              items-center
              gap-4
              rounded-xl
              px-5
              py-4
              text-zinc-300
              hover:bg-purple-500/10
              hover:text-purple-400
              transition-all
            "
          >
            <FaUserCircle size={22} />
            <span>Profile</span>
          </button>

          {/* Logout */}

          <button
            onClick={onHandleLogout}
            className="
              mt-3
              w-full
              flex
              items-center
              gap-4
              rounded-xl
              px-5
              py-4
              text-zinc-300
              hover:bg-red-500/10
              hover:text-red-400
              transition-all
            "
          >
            <FiLogOut size={22} />
            <span>Logout</span>
          </button>

        </div>
      </div>

      {/* Animation */}

      <style>
        {`
          @keyframes blink {
            0%,50%,100%{
              opacity:1;
            }

            25%,75%{
              opacity:.2;
            }
          }

          .animate-blink{
            animation:blink 2s infinite;
          }
        `}
      </style>

    </nav>
  );
}

export default Navbar;