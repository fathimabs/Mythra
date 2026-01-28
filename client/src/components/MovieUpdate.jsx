import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../axios/axios";
import Navbar from "./Navbar";
import Footer from "./Footer";



function MovieUpdate() {

  let { id } = useParams();
  // console.log(id);

  let navigate = useNavigate();

  let [data, setData] = useState({
    imageUrl: null,
    title: "",
    director: "",
    genre: "",
    duration: "",
    watchedOn: "",
    status: "",
    review: "",
  });
  let [rating, setRating] = useState(0);
  let [showMore, setShowMore] = useState(false);
  let [errors, setErrors] = useState({});

  useEffect(() => {
    let fetchMovie = async () => {
      try {
        let res = await api.get(`/movie/movie-detail/${id}`);
        let movie = res.data.movies;

        setData({
          imageUrl: null,
          title: movie.title ?? "",
          director: movie.director ?? "",
          genre: movie.genre ?? "",
          duration: movie.duration ?? "",
          watchedOn: movie.watchedOn ?? "",
          status: movie.status ?? "",
          review: movie.review ?? "",
        });
        setRating(movie.rating || 0);
        setShowMore(!!(movie.duration || movie.watchedOn || movie.status));
      } catch (err) {
        console.error(err);
        alert("Failed to fetch movie data.");
      }
    };

    fetchMovie();
  }, [id]);

  let handleChange = (e) => {
    let { name, value, files } = e.target;
    if (files) {
      setData({ ...data, imageUrl: files[0] });
    } else {
      setData({ ...data, [name]: value });
    }
  };

  let validate = () => {
    let newErrors = {};
    if (!data.title) newErrors.title = "Title is required";
    if (!data.director) newErrors.director = "Director is required";
    if (!data.genre) newErrors.genre = "Genre is required";
    if (!data.review) newErrors.review = "Review is required";
    return newErrors;
  };

  let handleSubmit = async (e) => {
    e.preventDefault();

    let validateErrors = validate();
    setErrors(validateErrors);

    if (Object.keys(validateErrors).length > 0) return;

    try {
      let formData = new FormData()
      formData.append("imageUrl", data.imageUrl);
      formData.append("title", data.title);
      formData.append("director", data.director);
      formData.append("genre", data.genre);
      formData.append("duration", data.duration);
      formData.append("watchedOn", data.watchedOn);
      formData.append("status", data.status);
      formData.append("review", data.review);
      formData.append("rating", rating);

      await api.patch(`/movie/update/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Movie updated successfully!");
      navigate("/movie");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };


  return (
    <div className="relative min-h-screen w-full bg-[#0b0d18] text-zinc-100 overflow-hidden">
      <Navbar />

      <div className="flex justify-center px-4 py-12">
        <div className="w-full max-w-lg bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6 sm:p-8 text-zinc-100">
          <h1 className="text-center text-4xl font-bold bg-gradient-to-r from-[#F5C77A] via-purple-400 to-[#6C5CE7] bg-clip-text text-transparent mb-4">
            ✏️ Update Movie
          </h1>
          <p className="text-center text-zinc-400 mb-8 text-sm">
            Edit your movie details 🎬✨
          </p>

          <form className="space-y-5" onSubmit={handleSubmit}>


            {/* Movie Poster */}
            <div>
              <label className="block text-sm text-zinc-300 mb-1">Movie Poster</label>
              <input
                type="file"
                name="imageUrl"
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-zinc-900/80 border border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Movie Title */}
            <div>
              <label className="block text-sm text-zinc-300 mb-1">Movie Title</label>
              <input
                type="text"
                name="title"
                value={data.title}
                onChange={handleChange}
                placeholder="Enter movie title"
                className="w-full px-4 py-3 rounded-lg bg-zinc-900/80 border border-white/10 focus:ring-2 focus:ring-purple-500 placeholder-zinc-500"
              />
              {errors.title && <p className="text-red-400 text-sm mt-1">{errors.title}</p>}
            </div>

            {/* Director */}
            <div>
              <label className="block text-sm text-zinc-300 mb-1">Director</label>
              <input
                type="text"
                name="director"
                value={data.director}
                onChange={handleChange}
                placeholder="Enter director name"
                className="w-full px-4 py-3 rounded-lg bg-zinc-900/80 border border-white/10 focus:ring-2 focus:ring-purple-500 placeholder-zinc-500"
              />
              {errors.director && <p className="text-red-400 text-sm mt-1">{errors.director}</p>}
            </div>

            {/* Genre */}
            <div>
              <label className="block text-sm text-zinc-300 mb-1">Genre</label>
              <input
                type="text"
                name="genre"
                value={data.genre}
                onChange={handleChange}
                placeholder="Action, Drama, Sci-Fi..."
                className="w-full px-4 py-3 rounded-lg bg-zinc-900/80 border border-white/10 focus:ring-2 focus:ring-purple-500 placeholder-zinc-500"
              />
              {errors.genre && <p className="text-red-400 text-sm mt-1">{errors.genre}</p>}
            </div>

            {/* Review */}
            <div>
              <label className="block text-sm text-zinc-300 mb-1">Review</label>
              <textarea
                rows="3"
                name="review"
                value={data.review}
                onChange={handleChange}
                placeholder="Your thoughts about this movie..."
                className="w-full px-4 py-3 rounded-lg bg-zinc-900/80 border border-white/10 focus:ring-2 focus:ring-purple-500 resize-none placeholder-zinc-500"
              />
              {errors.review && <p className="text-red-400 text-sm mt-1">{errors.review}</p>}
            </div>

            {/* Star Rating */}
            <div>
              <label className="block text-sm text-zinc-300 mb-1">Your Rating</label>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`text-xl ${star <= rating ? "text-purple-400" : "text-zinc-500"} transition-colors`}
                  >
                    ★
                  </button>
                ))}
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
                    name="watchedOn"
                    value={data.watchedOn}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-zinc-900/80 border border-white/10 focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                {/* Duration */}
                <div>
                  <label className="block text-sm text-zinc-300 mb-1">Duration (minutes)</label>
                  <input
                    type="number"
                    name="duration"
                    value={data.duration}
                    onChange={handleChange}
                    placeholder="Enter duration"
                    className="w-full px-4 py-3 rounded-lg bg-zinc-900/80 border border-white/10 focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm text-zinc-300 mb-1">Status</label>
                  <select
                    name="status"
                    value={data.status}
                    onChange={handleChange}
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


export default MovieUpdate;
