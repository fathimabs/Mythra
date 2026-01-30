import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import api from "../axios/axios";

function BookUpdate() {
  let { id } = useParams();
  let navigate = useNavigate();

  let [data, setData] = useState({
    title: "",
    author: "",
    genre: "",
    review: "",
    readOn: "",
    pages: "",
    status: "",
    imageUrl: null
  });

  let [rating, setRating] = useState(0);
  let [showMore, setShowMore] = useState(false);
  let [errors, setErrors] = useState({});

  useEffect(() => {
    let fetchBook = async () => {
      try {
        let res = await api.get(`/book/bookdetail/${id}`);
        let book = res.data.books;

        setData({
          title: book.title || "",
          author: book.author || "",
          genre: book.genre || "",
          review: book.review || "",
          readOn: book.readOn ? book.readOn.split("T")[0] : "",
          pages: book.pages || "",
          status: book.status || "",
          imageUrl: null
        });

        setRating(book.rating || 0);
        setShowMore(!!(book.readOn || book.pages || book.status));
      } catch (err) {
        console.error(err);
      }
    };

    fetchBook();
  }, [id]);

  let getData = (e) => {
    let { name, value, files } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };
  let handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let formData = new FormData();

      Object.keys(data).forEach((key) => {
        if (data[key] !== null && data[key] !== "") {
          formData.append(key, data[key]);
        }
      });

      formData.append("rating", rating);

      await api.patch(`/book/update/${id}`, formData);
      navigate("/book");
    } catch (err) { 
      console.error(err);
      setErrors({ submit: "Failed to update book" });
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0b0d18] via-[#0f1224] to-[#0b0d18] text-zinc-100">
      <Navbar />

      <div className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6 sm:p-8">

          <h1 className="text-center text-4xl font-bold bg-gradient-to-r from-[#F5C77A] via-purple-400 to-[#6C5CE7] bg-clip-text text-transparent mb-4">
            ✏️ Update Book
          </h1>
          <p className="text-center text-zinc-400 mb-8 text-sm">
            Edit your movie details 🎬✨
          </p>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <input
              type="file"
              name="imageUrl"
              onChange={getData}
              className="w-full px-4 py-2 rounded-lg bg-zinc-900/80 border border-white/10"
            />

            <input
              type="text"
              name="title"
              placeholder="Title"
              value={data.title}
              onChange={getData}
              className="w-full px-4 py-3 rounded-lg bg-zinc-900/80 border border-white/10"
            />

            <input
              type="text"
              name="author"
              placeholder="Author"
              value={data.author}
              onChange={getData}
              className="w-full px-4 py-3 rounded-lg bg-zinc-900/80 border border-white/10"
            />

            <input
              type="text"
              name="genre"
              placeholder="Genre"
              value={data.genre}
              onChange={getData}
              className="w-full px-4 py-3 rounded-lg bg-zinc-900/80 border border-white/10"
            />

            <textarea
              rows="3"
              name="review"
              placeholder="Write your review..."
              value={data.review}
              onChange={getData}
              className="w-full px-4 py-3 rounded-lg bg-zinc-900/80 border border-white/10"
            />

            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`text-2xl ${star <= rating ? "text-yellow-400" : "text-zinc-600"
                    }`}
                >
                  ★
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setShowMore(!showMore)}
              className="w-full py-2 text-purple-400 border border-purple-500/30 rounded-lg"
            >
              {showMore ? "Hide additional details" : "+ Add more details"}
            </button>

            {showMore && (
              <div className="space-y-4">
                <input
                  type="date"
                  name="readOn"
                  value={data.readOn}
                  onChange={getData}
                  className="w-full px-4 py-3 rounded-lg bg-zinc-900/80 border border-white/10"
                />

                <input
                  type="number"
                  name="pages"
                  placeholder="Pages"
                  value={data.pages}
                  onChange={getData}
                  className="w-full px-4 py-3 rounded-lg bg-zinc-900/80 border border-white/10"
                />

                <select
                  name="status"
                  value={data.status}
                  onChange={getData}
                  className="w-full px-4 py-3 rounded-lg bg-zinc-900/80 border border-white/10"
                >
                  <option value="">Select status</option>
                  <option value="to-read">To Read</option>
                  <option value="reading">Reading</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 py-3 rounded-lg font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 transition"
              >
                Save Changes
              </button>

              <Link
                to="/book"
                className="flex-1 py-3 rounded-lg text-center font-semibold border border-white/20 hover:bg-white/10 transition"
              >
                Cancel
              </Link>
            </div>
            {errors.submit && (
              <p className="text-red-400 text-center">{errors.submit}</p>
            )}
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default BookUpdate;
