import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import api from '../axios/axios'
import { useRef } from 'react';

function AddBook() {

  let navigate = useNavigate()
  let formRefresh = useRef()

  let userId = localStorage.getItem("userId");

  let [showMore, setShowMore] = useState(false);
  let [rating, setRating] = useState(0);
  let [errors, setErrors] = useState({});

  let [data, setData] = useState({
    imageUrl: "",
    title: "",
    author: "",
    genre: "",
    pages: 0,
    readOn: "",
    rating: 0,
    review: ""
  })

  function getData(e) {

    if (e.target.type === "file") {
      setData({
        ...data,
        imageUrl: e.target.files[0]
      })
    } else {
      setData({
        ...data,
        [e.target.name]: e.target.value
      })
    }
  }
  let validate = () => {
    let newErrors = {}


    if (!data.imageUrl) {
      newErrors.imageUrl = "Book cover is Required"
    } else {
      let allowTypes = ["image/jpeg", "image/png"]
      if (!allowTypes.includes(data.imageUrl.type)) {
        newErrors.imageUrl = "Only JPG, PNG, or WEBP images are allowed";
      }
    }
    if (!data.title) newErrors.title = "Book title is Required"

    if (!data.author) newErrors.author = "Author name is Required"

    if (!data.genre) newErrors.genre = "genre is Required"

    if (!data.review) newErrors.review = "Book review is Required"

    if (rating < 1) {
      newErrors.rating = 'Please select a rating.';
    }
    return newErrors
  }

  let handleSubmit = async (e) => {
    e.preventDefault();
    let validateErrors = validate();

    setErrors(validateErrors)
    if (Object.keys(validateErrors).length > 0) {
      return;
    }
    try {
      let formData = new FormData()
      formData.append("userId", userId)
      formData.append("imageUrl", data.imageUrl);
      formData.append("title", data.title);
      formData.append("author", data.author);
      formData.append("genre", data.genre);
      formData.append("pages", data.pages);
      formData.append("readOn", data.readOn);
      formData.append("status", data.status);
      formData.append("review", data.review);
      formData.append("rating", rating);

      await api.post(`/book/addbook/${userId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      })

      alert("Book Added Successfully!");

      formRefresh.current.reset()
      setRating(0);
      setShowMore(false);
      setErrors({});
      setData({
        imageUrl: "",
        title: "",
        author: "",
        genre: "Unknown",
        pages: 0,
        readOn: "",
        status: "",
        review: "",
      });
      navigate('/book')
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert("Failed to add book");
    }
  }

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
                    onClick={() => {
                      setRating(star);
                      setErrors((prev) => ({ ...prev, rating: "" }));
                    }}
                    className={`text-xl transition-colors ${star <= rating ? "text-yellow-400" : "text-zinc-500"
                      }`}
                  >
                    ★
                  </button>
                ))}
              </div>

              {errors.rating && (
                <p className="text-red-400 text-sm mt-1">{errors.rating}</p>
              )}
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

export default AddBook;
