import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import mithralogo from "../assets/images/mithralogo.png";
import { userContext } from "../App";

function Navbar() {
  let [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  let navigate = useNavigate()

  // let { user } = useContext(userContext)

  let user = JSON.parse(localStorage.getItem("user"))

  // Generate an array for stars/dots
  let starsAndDots = Array.from({ length: 150 }); // 100 items, adjust density
  let onHandleLogout = () => {
    localStorage.clear();
    navigate('/login')
  }
  return (
    <nav className="relative  top-0 z-50 bg-black border-b border-white/10 overflow-hidden">

      {/* Galaxy background */}
      <div className="absolute inset-0 pointer-events-none">
        {starsAndDots.map((_, i) => {
          let isStar = Math.random() > 0.85; // ~15% stars
          let top = Math.random() * 100;
          let left = Math.random() * 100;
          return (
            <span
              key={i}
              className={isStar ? "animate-blink text-purple-400" : "text-white/30"}
              style={{
                position: "absolute",
                top: `${top}%`,
                left: `${left}%`,
                fontSize: isStar
                  ? `${Math.random() * 6 + 4}px` // stars 4-10px
                  : `${Math.random() * 3 + 1}px`, // dots 1-4px
                lineHeight: 0,
              }}
            >
              {isStar ? "★" : "•"}
            </span>
          );
        })}
      </div>

      {/* Navbar content */}
      <div className="relative max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <div className="flex justify-center items-center space-x-5">
          <img
            src={mithralogo}
            alt="Mythra Logo"
            className="h-16 rounded-full"
          />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#F5C77A] via-purple-400 to-[#6C5CE7] bg-clip-text text-transparent">
            Mythra
          </h1>
        </div>

        {/* Desktop Links */}
        <div className="hidden sm:flex gap-8 text-sm text-zinc-300">
          <Link to="/" className="hover:text-purple-400 transition">Home</Link>
          <Link to="/book" className="hover:text-purple-400 transition">Books</Link>
          <Link to="/movie" className="hover:text-purple-400 transition">Movies</Link>
          <Link to="/profile" className="hover:text-purple-400 transition">Profile</Link>
          <button onClick={onHandleLogout} className="hover:text-purple-400 transition">Logout</button>

          <h1>{user?.username}</h1>

        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="sm:hidden text-zinc-300 hover:text-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400 rounded"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-black/80 border-t border-white/10 px-6 py-4 space-y-4 text-center text-zinc-300 relative z-10">
          <Link to="/home" onClick={() => setMobileMenuOpen(false)} className="block hover:text-purple-400 transition">Home</Link>
          <Link to="/books" onClick={() => setMobileMenuOpen(false)} className="block hover:text-purple-400 transition">Books</Link>
          <Link to="/movies" onClick={() => setMobileMenuOpen(false)} className="block hover:text-purple-400 transition">Movies</Link>
          <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="block hover:text-purple-400 transition">Profile</Link>
        </div>
      )}

      {/* Blinking animation */}
      <style>
        {`
          @keyframes blink {
            0%, 50%, 100% { opacity: 1; }
            25%, 75% { opacity: 0.2; }
          }
          .animate-blink {
            animation: blink 2s infinite;
          }
        `}
      </style>
    </nav>
  );
}

export default Navbar;
