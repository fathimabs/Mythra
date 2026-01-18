import { useState } from 'react';
import { Link } from 'react-router-dom';

function Book() {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 bg-gradient-to-br from-[#0b0d18] via-[#0f1224] to-[#0b0d18]">
      <div className="w-full max-w-md sm:max-w-lg bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6 sm:p-7 text-zinc-100">

        {/* Brand */}
        <h1 className="text-center text-4xl font-bold bg-gradient-to-r from-yellow-400 via-purple-400 to-pink-500 bg-clip-text text-transparent mb-2">
          Mythra
        </h1>
        <p className="text-center text-zinc-400 mb-8 text-sm">
          Add a book to your journey 📚✨
        </p>

        <form className="space-y-5">

          {/* Book Cover */}
          <div>
            <label className="block text-sm text-zinc-300 mb-1">Book Cover</label>
            <input
              type="file"
              className="w-full px-4 py-2 rounded-lg bg-zinc-900/80 border border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Book Title */}
          <div>
            <label className="block text-sm text-zinc-300 mb-1">Book Title</label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-lg bg-zinc-900/80 border border-white/10 focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Author */}
          <div>
            <label className="block text-sm text-zinc-300 mb-1">Author</label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-lg bg-zinc-900/80 border border-white/10 focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Genre */}
          <div>
            <label className="block text-sm text-zinc-300 mb-1">Genre</label>
            <input
              type="text"
              placeholder="Fantasy, Romance, Thriller..."
              className="w-full px-4 py-3 rounded-lg bg-zinc-900/80 border border-white/10 focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Review */}
          <div>
            <label className="block text-sm text-zinc-300 mb-1">Review</label>
            <textarea
              rows="3"
              placeholder="Your thoughts about this book..."
              className="w-full px-4 py-3 rounded-lg bg-zinc-900/80 border border-white/10 focus:ring-2 focus:ring-purple-500 resize-none"
            />
          </div>

          {/* Toggle Button */}
          <button
            type="button"
            onClick={() => setShowMore(!showMore)}
            className="w-full py-2 rounded-lg text-sm font-medium text-purple-400 border border-purple-500/30 hover:bg-purple-500/10 transition"
          >
            {showMore ? "Hide additional details" : "+ Add more details"}
          </button>

          {/* Additional Fields */}
          {showMore && (
            <div className="space-y-5 pt-2">

              {/* Read On */}
              <div>
                <label className="block text-sm text-zinc-300 mb-1">Read On</label>
                <input
                  type="date"
                  className="w-full px-4 py-3 rounded-lg bg-zinc-900/80 border border-white/10 focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Pages */}
              <div>
                <label className="block text-sm text-zinc-300 mb-1">Pages</label>
                <input
                  type="number"
                  className="w-full px-4 py-3 rounded-lg bg-zinc-900/80 border border-white/10 focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm text-zinc-300 mb-1">Status</label>
                <select
                  defaultValue=""
                  className="w-full px-4 py-3 rounded-lg bg-zinc-900/80 border border-white/10 focus:ring-2 focus:ring-purple-500"
                >
                  <option value="" disabled>Select reading status</option>
                  <option value="to-read">📖 To Read</option>
                  <option value="reading">📘 Currently Reading</option>
                  <option value="completed">✅ Completed</option>
                </select>
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm text-zinc-300 mb-1">Your Rating</label>
                <select className="w-full px-4 py-3 rounded-lg bg-zinc-900/80 border border-white/10 focus:ring-2 focus:ring-purple-500">
                  <option value="">Rate this book</option>
                  <option value="1">⭐ 1</option>
                  <option value="2">⭐ 2</option>
                  <option value="3">⭐ 3</option>
                  <option value="4">⭐ 4</option>
                  <option value="5">⭐ 5</option>
                </select>
              </div>

            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 transition"
          >
            Add Book
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-zinc-400 mt-6 text-sm">
          <Link to="/books" className="text-yellow-400 hover:underline">
            ← Back to Books
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Book;
