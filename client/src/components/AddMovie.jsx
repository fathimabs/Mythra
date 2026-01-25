import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

function AddMovie() {
  let [showMore, setShowMore] = useState(false);
  let [rating, setRating] = useState(0);
  let [errors, setErrors] = useState({});

  let formRefresh = useRef()

  let userId = localStorage.getItem("userId");


  let [data, setData] = useState({
    imageUrl: "",
    title: "",
    director: "",
    genre: "",
    duration: 0,
    watchedOn: "",
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
      newErrors.imageUrl = "Mview poster  is Required"
    } else {
      let allowTypes = ["image/jpeg", "image/png"]
      if (!allowTypes.includes(data.imageUrl.type)) {
        newErrors.imageUrl = "Only JPG, PNG, or WEBP images are allowed";
      }
    }
    if (!data.title) newErrors.title = "Movie title is Required"

    if (!data.director) newErrors.director = "Director name is Required"

    if (!data.genre) newErrors.genre = "genre is Required"

    if (!data.review) newErrors.review = "Movie review is Required"

    if (!data.rating) newErrors.rating = "rating is Required"

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
      formData.append("director", data.director);
      formData.append("genre", data.genre);
      formData.append("duration", data.duration);
      formData.append("watchedOn", data.watchedOn);
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

    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert("Failed to add book");
    }
  }

  return (
    <div className="relative min-h-screen w-full bg-[#0b0d18] text-zinc-100 overflow-hidden">

      {/* Navbar */}
      <Navbar />

      {/* Form  */}
      <div className="relative z-10 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6 sm:p-8 text-zinc-100">

          {/* Logo */}
          <h1 className="text-center text-4xl font-bold bg-linear-to-r from-[#F5C77A] via-purple-400 to-[#6C5CE7] bg-clip-text text-transparent mb-4">
            Mythra
          </h1>
          <p className="text-center text-zinc-400 mb-8 text-sm">
            Add a movie to your journey 🎬✨
          </p>

          <form className="space-y-5" ref={formRefresh} onSubmit={handleSubmit}>

            {/* Movie Poster */}
            <div>
              <label className="block text-sm text-zinc-300 mb-1">Movie Poster</label>
              <input
                type="file"
                name='imageUrl'
                onChange={getData}
                className="w-full px-4 py-2 rounded-lg bg-zinc-900/80 border border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              {errors.imageUrl && (<p className="text-red-400 text-sm mt-1">{errors.imageUrl}</p>)}
            </div>

            {/* Movie Title */}
            <div>
              <label className="block text-sm text-zinc-300 mb-1">Movie Title</label>
              <input
                type="text"
                onChange={getData}
                name='title'
                placeholder="Enter movie title"
                className="w-full px-4 py-3 rounded-lg bg-zinc-900/80 border border-white/10 focus:ring-2 focus:ring-purple-500 placeholder-zinc-500"
              />
              {errors.title && (<p className="text-red-400 text-sm mt-1">{errors.title}</p>)}
            </div>

            {/* Director */}
            <div>
              <label className="block text-sm text-zinc-300 mb-1">Director</label>
              <input
                type="text"
                onChange={getData}
                name='director'
                placeholder="Enter director name"
                className="w-full px-4 py-3 rounded-lg bg-zinc-900/80 border border-white/10 focus:ring-2 focus:ring-purple-500 placeholder-zinc-500"
              />
              {errors.director && (<p className="text-red-400 text-sm mt-1">{errors.director}</p>)}
            </div>

            {/* Genre */}
            <div>
              <label className="block text-sm text-zinc-300 mb-1">Genre</label>
              <input
                type="text"
                onChange={getData}
                name='genre'
                placeholder="Action, Drama, Sci-Fi..."
                className="w-full px-4 py-3 rounded-lg bg-zinc-900/80 border border-white/10 focus:ring-2 focus:ring-purple-500 placeholder-zinc-500"
              />
              {errors.genre && (<p className="text-red-400 text-sm mt-1">{errors.genre}</p>)}
            </div>

            {/* Review */}
            <div>
              <label className="block text-sm text-zinc-300 mb-1">Review</label>
              <textarea
                rows="3"
                name='review'
                onChange={getData}
                placeholder="Your thoughts about this movie..."
                className="w-full px-4 py-3 rounded-lg bg-zinc-900/80 border border-white/10 focus:ring-2 focus:ring-purple-500 resize-none placeholder-zinc-500"
              />
              {errors.review && (<p className="text-red-400 text-sm mt-1">{errors.review}</p>)}
            </div>
            {/* Star Rating */}
            <div>
              <label className="block text-sm text-zinc-300 mb-1">Your Rating</label>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    name='rating'
                    onChange={getData}
                    onClick={() => setRating(star)}
                    className={`text-xl ${star <= rating ? 'text-purple-400' : 'text-zinc-500'
                      } transition-colors`}
                  >
                    ★
                  </button>
                ))}
                {errors.rating && (<p className="text-red-400 text-sm mt-1">{errors.rating}</p>)}
              </div>
            </div>
            {/* Toggle Additional Fields */}
            <button
              type="button"
              onClick={() => setShowMore(!showMore)}
              className="w-full py-2 rounded-lg text-sm font-medium text-purple-400 border border-purple-500/30 hover:bg-purple-500/10 transition"
            >
              {showMore ? "Hide additional details" : "+ Add more details"}
            </button>

            {showMore && (
              <div className="space-y-5 pt-2">

                {/* Watched On */}
                <div>
                  <label className="block text-sm text-zinc-300 mb-1">Watched On</label>
                  <input
                    type="date"
                    name='watchedOn'
                    onChange={getData}
                    className="w-full px-4 py-3 rounded-lg bg-zinc-900/80 border border-white/10 focus:ring-2 focus:ring-purple-500"
                  />

                </div>

                {/* Duration */}
                <div>
                  <label className="block text-sm text-zinc-300 mb-1">Duration (minutes)</label>
                  <input
                    type="number"
                    name='duration'
                    onChange={getData}
                    placeholder="Enter duration"
                    className="w-full px-4 py-3 rounded-lg bg-zinc-900/80 border border-white/10 focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm text-zinc-300 mb-1">Status</label>
                  <select
                    defaultValue=""
                    name='status'
                    onChange={getData}
                    className="w-full px-4 py-3 rounded-lg bg-zinc-900/80 border border-white/10 focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="" disabled>Select watching status</option>
                    <option value="to-watch">🎞️ To Watch</option>
                    <option value="watching">👀 Watching</option>
                    <option value="completed">✅ Watched</option>
                  </select>
                </div>



              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 rounded-lg font-semibold text-white bg-linear-to-r from-purple-600 to-indigo-600 hover:opacity-90 transition"
            >
              Add Movie
            </button>

          </form>

          {/* Back Link */}
          {/* <p className="text-center text-zinc-400 mt-6 text-sm">
            <Link to="/movies" className="text-yellow-400 hover:underline">
              ← Back to Movies
            </Link>
          </p> */}

        </div>
      </div>

      <Footer />
    </div>
  );
}

export default AddMovie;
