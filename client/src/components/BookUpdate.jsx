import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import api from '../axios/axios'
import { useRef } from 'react';

function BookUpdate() {
  

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0b0d18] via-[#0f1224] to-[#0b0d18] text-zinc-100">
      <Navbar />

      <div className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6 sm:p-8 text-zinc-100">

          {/* Logo */}
          <h1 className="text-center text-4xl font-bold bg-gradient-to-r from-[#F5C77A] via-purple-400 to-[#6C5CE7] bg-clip-text text-transparent mb-4">
            Mythra
          </h1>
          <p className="text-center text-zinc-400 mb-8 text-sm">
            Add a book to your journey 📚✨
          </p>

          <form className="space-y-5" ref={formRefresh} onSubmit={handleSubmit}>

            {/* Book Cover */}
            <div>
              <label className="block text-sm text-zinc-300 mb-1">Book Cover</label>
              <input
                type="file"
                onChange={getData}
                name="imageUrl"
                className="w-full px-4 py-2 rounded-lg bg-zinc-900/80 border border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              {errors.imageUrl && (<p className="text-red-400 text-sm mt-1">{errors.imageUrl}</p>)}
            </div>

            {/* Book Title */}
            <div>
              <label className="block text-sm text-zinc-300 mb-1">Book Title</label>
              <input
                type="text"
                placeholder="Enter book title"
                onChange={getData}
                name="title"
                className="w-full px-4 py-3 rounded-lg bg-zinc-900/80 border border-white/10 focus:ring-2 focus:ring-purple-500 placeholder-zinc-500"
              />
              {errors.title && (<p className="text-red-400 text-sm mt-1">{errors.title}</p>)}
            </div>

            {/* Author */}
            <div>
              <label className="block text-sm text-zinc-300 mb-1">Author</label>
              <input
                type="text"
                placeholder="Enter author name"
                onChange={getData}
                name="author"
                className="w-full px-4 py-3 rounded-lg bg-zinc-900/80 border border-white/10 focus:ring-2 focus:ring-purple-500 placeholder-zinc-500"
              />
              {errors.author && (<p className="text-red-400 text-sm mt-1">{errors.author}</p>)}
            </div>

            {/* Genre */}
            <div>
              <label className="block text-sm text-zinc-300 mb-1">Genre</label>
              <input
                type="text"
                placeholder="Fantasy, Romance, Thriller..."
                onChange={getData}
                name="genre"
                className="w-full px-4 py-3 rounded-lg bg-zinc-900/80 border border-white/10 focus:ring-2 focus:ring-purple-500 placeholder-zinc-500"
              />
              {errors.genre && (<p className="text-red-400 text-sm mt-1">{errors.genre}</p>)}
            </div>

            {/* Review */}
            <div>
              <label className="block text-sm text-zinc-300 mb-1">Review</label>
              <textarea
                rows="3"
                placeholder="Your thoughts about this book..."
                onChange={getData}
                name="review"
                className="w-full px-4 py-3 rounded-lg bg-zinc-900/80 border border-white/10 focus:ring-2 focus:ring-purple-500 resize-none placeholder-zinc-500"
              />
              {errors.review && (<p className="text-red-400 text-sm mt-1">{errors.review}</p>)}
            </div>
            {/* Rating */}
            <div>
              <label className="block text-sm text-zinc-300 mb-1">Your Rating</label>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    name='rating'
                    onClick={() => setRating(star)}
                    className={`text-xl ${star <= rating ? 'text-yellow-400' : 'text-zinc-500'
                      } transition-colors`}
                  >

                    ★
                  </button>
                ))}
                {errors.rating && (<p className="text-red-400 text-sm mt-1">{errors.rating}</p>)}
              </div>
            </div>

            {/* Toggle Additional Details */}
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

                <div>
                  <label className="block text-sm text-zinc-300 mb-1">Read On</label>
                  <input
                    type="date"
                    onChange={getData}
                    name='readOn'
                    className="w-full px-4 py-3 rounded-lg bg-zinc-900/80 border border-white/10 focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-zinc-300 mb-1">Pages</label>
                  <input
                    type="number"
                    placeholder="Number of pages"
                    onChange={getData}
                    name='pages'
                    className="w-full px-4 py-3 rounded-lg bg-zinc-900/80 border border-white/10 focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-zinc-300 mb-1">Status</label>
                  <select
                    defaultValue=""
                    onChange={getData}
                    name='status'
                    className="w-full px-4 py-3 rounded-lg bg-zinc-900/80 border border-white/10 focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="" disabled>Select reading status</option>
                    <option value="to-read">📖 To Read</option>
                    <option value="reading">📘 Currently Reading</option>
                    <option value="completed">✅ Completed</option>
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
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default BookUpdate;
