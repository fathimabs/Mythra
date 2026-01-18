import React from 'react'
import { Link } from 'react-router-dom';

function PageNotFound() {
   return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#0b0d18] via-[#0f1224] to-[#0b0d18] px-4">
      <div className="text-center max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8 text-zinc-100">

        {/* 404 */}
        <h1 className="text-7xl font-extrabold bg-linear-to-r from-yellow-400 via-purple-400 to-pink-500 bg-clip-text text-transparent mb-4">
          404
        </h1>

        {/* Message */}
        <h2 className="text-xl font-semibold mb-2">
          Page Not Found
        </h2>

        <p className="text-zinc-400 text-sm mb-6">
          Looks like this page doesn’t exist in your Mythra journey.
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <Link
            to="/"
            className="w-full py-3 rounded-lg font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 transition"
          >
            Go to Home
          </Link>

          {/* <Link
            to="/movies"
            className="w-full py-2 rounded-lg text-sm text-yellow-400 border border-yellow-400/30 hover:bg-yellow-400/10 transition"
          >
            Browse Movies
          </Link> */}
        </div>

      </div>
    </div>
  );
}

export default PageNotFound