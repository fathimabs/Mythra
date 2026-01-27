import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import api from "../axios/axios";

let BASE_URL = import.meta.env.VITE_BASE_URL + '/api/image'


function Home() {
  let userId = localStorage.getItem("userId");

  let [bookCount, setBookCount] = useState(0);
  let [movieCount, setMovieCount] = useState(0)
  let [recentBooks, setRecentBooks] = useState([]);
  let [recentMovies, setRecentMovies] = useState([]);

  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      try {

        let booCountRes = await api.get(`/book/count/${userId}`);
        setBookCount(booCountRes.data.totalBooks);

        let movieCountRes = await api.get(`/movie/count/${userId}`)
        setMovieCount(movieCountRes.data.totalMovies)


        let bookRes = await api.get(`/book/allbook/${userId}?limit=3`);
        setRecentBooks(bookRes.data.books);

        let movieRes = await api.get(`/movie/all-movie/${userId}?limit=3`);
        setRecentMovies(movieRes.data.movies);      

      } catch (error) {
        console.error("Dashboard fetch error", error);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-black text-zinc-100">
      <Navbar />

      {/* HERO */}
      <section className="flex items-center justify-center text-center px-6 py-28">
        <div className="max-w-3xl">
          <h2 className="text-4xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-[#F5C77A] via-purple-400 to-[#7665f0] bg-clip-text text-transparent">
            Where Movies & Books <br /> Become Memories
          </h2>

          <p className="text-zinc-400 max-w-xl mx-auto mb-10">
            From Pages and Screens to Your Heart,
            <span className="block">Where your Stories Live !!</span>
          </p>

          <Link
            to="/movie"
            className="inline-block px-8 py-4 rounded-xl font-semibold bg-gradient-to-r from-purple-600 to-indigo-500 hover:opacity-90 transition shadow-xl"
          >
            Start Tracking →
          </Link>
        </div>
      </section>

      {/* QUICK STATS */}
      <section className="max-w-6xl mx-auto px-6 mb-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl text-center">
          <p className="text-zinc-400 text-sm">Movies Watched</p>
          <h3 className="text-3xl font-semibold mt-2">{movieCount} 🎬</h3>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl text-center">
          <p className="text-zinc-400 text-sm">Books Read</p>
          <h3 className="text-3xl font-semibold mt-2">{bookCount} 📚</h3>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl text-center">
          <p className="text-zinc-400 text-sm">Favorites</p>
          <h3 className="text-3xl font-semibold mt-2">0⭐</h3>
        </div>
      </section>

      {/* RECENTLY ADDED BOOKS */}
      <section className="max-w-6xl mx-auto px-6 mb-24">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-semibold">Recently Added Books</h3>
          <Link to="/book" className="text-purple-400 hover:underline text-sm">
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {recentBooks.map((book) => (
            <div
              key={book._id}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden hover:scale-[1.02] transition shadow-lg"
            >
              <div className="h-48 bg-gradient-to-br from-purple-700/40 to-indigo-700/40 flex items-center justify-center text-zinc-300 px-2">
                {book.imageUrl ? (
                  <img
                    src={`${BASE_URL}/${book.imageUrl}`}
                    alt={book.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-lg font-semibold text-center">
                    {book.title}
                  </span>
                )}
              </div>
              <div className="p-4">
                <h4 className="font-medium text-lg">{book.title}</h4>
                <p className="text-zinc-400 text-sm">by {book.author}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* RECENTLY ADDED MOVIES */}
      <section className="max-w-6xl mx-auto px-6 mb-24">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-semibold">Recently Added Movies</h3>
          <Link to="/movie" className="text-purple-400 hover:underline text-sm">
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {recentMovies.map((movie) => (
            <div
              key={movie._id}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden hover:scale-[1.02] transition shadow-lg"
            >
              <div className="h-48 bg-gradient-to-br from-indigo-700/40 to-purple-700/40 flex items-center justify-center text-zinc-300 px-2">
                {movie.imageUrl ? (
                  <img
                    src={`${BASE_URL}/${movie.imageUrl}`}
                    alt={movie.title}
                    className="h-full w-full object-cover"
                  />

                ) : (
                  <span className="text-lg font-semibold text-center">
                    {movie.title}
                  </span>
                )}
              </div>

              <div className="p-4">
                <h4 className="font-medium text-lg">{movie.title}</h4>
                <p className="text-zinc-400 text-sm">Directed by {movie.director}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;
