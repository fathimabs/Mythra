import { Link } from "react-router-dom";


function Footer() {
  // Generate stars/dots for the background
  const starsAndDots = Array.from({ length: 150 });

  return (
    <footer className="relative mt-24 bg-black/40 border-t border-white/10 overflow-hidden backdrop-blur-xl">
      
      {/* Galaxy background */}
      <div className="absolute inset-0 pointer-events-none">
        {starsAndDots.map((_, i) => {
          const isStar = Math.random() > 0.85; // ~15% stars
          const top = Math.random() * 100;
          const left = Math.random() * 100;
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

      <div className="relative max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-zinc-300">
        
        {/* Logo */}
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-[#F5C77A] via-purple-400 to-[#6C5CE7] bg-clip-text text-transparent mb-2 transition-transform duration-300 hover:scale-105">
            Mythra
          </h1>
          <p className="text-zinc-400/80 transition-colors duration-300 hover:text-purple-400">
            Where movies & books become memories. Track, rate, and relive your favorite stories.
          </p>
          <div className="flex gap-4 mt-4">
            {["facebook", "twitter", "instagram", "github"].map((icon) => (
              <a
                key={icon}
                href="#"
                className="text-zinc-400 hover:text-purple-400 transition-transform transform hover:scale-125 duration-300"
              >
                <i className={`fab fa-${icon}`}></i>
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2">
            {[
              { label: "Home", to: "/home" },
              { label: "Books", to: "/book" },
              { label: "Movies", to: "/movie" },
              { label: "Profile", to: "/profile" },
            ].map(({ label, to }) => (
              <li key={label}>
                <Link
                  to={to}
                  className="relative hover:text-purple-400 transition-colors duration-300 group"
                >
                  {label}
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Other Links */}
        <div>
          <h4 className="font-semibold mb-3">Other Links</h4>
          <ul className="space-y-2">
            {[
              { label: "About Us", to: "/aboutus" },
              { label: "Contact", to: "/contact" },
            ].map(({ label, to }) => (
              <li key={label}>
                {to.startsWith("/") ? (
                  <Link
                    to={to}
                    className="relative hover:text-purple-400 transition-colors duration-300 group"
                  >
                    {label}
                    <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                ) : (
                  <a
                    href={to}
                    className="relative hover:text-purple-400 transition-colors duration-300 group"
                  >
                    {label}
                    <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 mt-8 text-center py-4 text-sm text-zinc-400 relative z-10">
        © {new Date().getFullYear()} Mythra. All rights reserved.
      </div>

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
    </footer>
  );
}

export default Footer;
