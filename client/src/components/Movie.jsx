import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import api from "../axios/axios";

let BASE_URL = import.meta.env.VITE_BASE_URL + '/api/image'

function Movie() {

    let navigate = useNavigate();
    let userId = localStorage.getItem("userId");

    let [search, setSearch] = useState("");
    let [movies, setMovies] = useState([]);
    let [error, setError] = useState("");

    //Filters
    let [genre, setGenre] = useState("");
    let [ratingFilter, setRatingFilter] = useState("");
    let [sort, setSort] = useState("");

    useEffect(() => {

        if (!userId) {
            navigate("/login");
            return;
        }

        let fetchMovies = async () => {
            setError("");

            try {
                let res = await api.get(`/movie/all-movie/${userId}?limit=50`);
                setMovies(res.data.movies || []);
            } catch (err) {
                console.error("Failed to fetch movies:", err);
                setError("Failed to fetch movies. Please try again later.");
            }
        };

        fetchMovies();

    }, [userId, navigate]);

    let genres = useMemo(() => {

        return [
            ...new Set(
                movies
                    .map((movie) => movie.genre)
                    .filter(Boolean)
            )
        ];

    }, [movies]);

    // Filter movies by search

    let filteredMovies = useMemo(() => {

        let result = movies.filter((movie) => {

            let matchesSearch = (movie.title || "")
                .toLowerCase()
                .includes(search.toLowerCase());

            let matchesGenre =
                genre === "" ||
                movie.genre === genre;



            let matchesRating =
                ratingFilter === "" ||
                movie.rating >= Number(ratingFilter);



            return (
                matchesSearch &&
                matchesGenre &&
                matchesRating
            );
        })

        if (sort === "az") {

            result.sort((a, b) =>
                a.title.localeCompare(b.title)
            );

        }


        else if (sort === "za") {

            result.sort((a, b) =>
                b.title.localeCompare(a.title)
            );

        }


        else if (sort === "ratingHigh") {

            result.sort((a, b) =>
                b.rating - a.rating
            );

        }


        else if (sort === "ratingLow") {

            result.sort((a, b) =>
                a.rating - b.rating
            );

        }



        return result;


    }, [search, movies, genre, ratingFilter, sort]);


    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-zinc-100 flex flex-col">
            <Navbar />

            <section className="w-full max-w-7xl mx-auto px-6 py-10 flex-1">
                {/* Top Bar */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-[#F5C77A] via-purple-400 to-[#7665f0] bg-clip-text text-transparent">
                        🎬 My Movies
                    </h1>

                    <Link
                        to="/addmovie"
                        className="px-5 py-2.5 rounded-2xl shadow-lg bg-gradient-to-r from-purple-600 to-indigo-500 hover:opacity-90 transition font-medium text-center"
                    >
                        Add Movie
                    </Link>
                </div>



                {/* Search */}

                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <input
                        type="text"
                        placeholder="Search movies..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="flex-1 px-4 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-zinc-400"
                    />
                    <select
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        className="px-4 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-zinc-200"

                    >

                        <option
                            value=""
                            className="bg-gray-900 text-zinc-200"
                        >
                            All Genres
                        </option>


                        {
                            genres.map((item) => (

                                <option
                                    key={item}
                                    value={item}
                                    className="bg-gray-900 text-zinc-200"
                                >

                                    {item}

                                </option>

                            ))
                        }


                    </select>





                    {/* Rating */}

                    <select
                        value={ratingFilter}
                        onChange={(e) => setRatingFilter(e.target.value)}
                        className="px-4 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-zinc-200"
                    >

                        <option
                            value=""
                            className="bg-gray-900 text-zinc-200"
                        >
                            All Ratings
                        </option>


                        <option
                            value="5"
                            className="bg-gray-900 text-zinc-200"
                        >
                            ⭐ 5+
                        </option>


                        <option
                            value="4"
                            className="bg-gray-900 text-zinc-200"
                        >
                            ⭐ 4+
                        </option>


                        <option
                            value="3"
                            className="bg-gray-900 text-zinc-200"
                        >
                            ⭐ 3+
                        </option>


                    </select>





                    {/* Sort */}

                    <select

                        value={sort}

                        onChange={(e) => setSort(e.target.value)}

                        className="px-4 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-zinc-200"

                    >
                        <option
                            value=""
                            className="bg-gray-900 text-zinc-200"
                        >
                            Sort By
                        </option>


                        <option
                            value="az"
                            className="bg-gray-900 text-zinc-200"
                        >
                            Title A-Z
                        </option>


                        <option
                            value="za"
                            className="bg-gray-900 text-zinc-200"
                        >
                            Title Z-A
                        </option>


                        <option
                            value="ratingHigh"
                            className="bg-gray-900 text-zinc-200"
                        >
                            Highest Rating
                        </option>


                        <option
                            value="ratingLow"
                            className="bg-gray-900 text-zinc-200"
                        >
                            Lowest Rating
                        </option>




                    </select>




                </div>

                {/* Error message */}
                {error && <div className="text-red-500 text-center mb-6">{error}</div>}

                {/* Movie Grid */}
                {filteredMovies.length === 0 && !error && (
                    <div className="text-center text-zinc-400 mt-20">No movies found.</div>
                )}

                <div className="flex flex-wrap gap-6">
                    {filteredMovies.map((movie) => (
                        <div
                            key={movie._id ?? movie.id}
                            className="w-full sm:w-[48%] lg:w-[31%] xl:w-[23%] rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg hover:scale-[1.02] transition p-4 flex flex-col gap-3"
                        >
                            {/* Poster */}
                            <div className="h-44 bg-gradient-to-br from-purple-700/40 to-indigo-700/40 rounded-xl flex items-center justify-center text-sm text-zinc-300">
                                {movie.imageUrl ? (
                                    <img
                                        src={`${BASE_URL}/${movie.imageUrl}`}
                                        alt={movie.title ?? "Movie Poster"}
                                        className="h-full w-full object-cover rounded-xl"
                                    />
                                ) : (
                                    <div className="h-full w-full flex items-center justify-center text-zinc-300">
                                        Poster
                                    </div>
                                )}
                            </div>

                            {/* Movie Info */}
                            <div>
                                <h2 className="font-semibold text-lg leading-tight">{movie.title}</h2>
                                <p className="text-sm text-zinc-400">by {movie.director || "Unknown"}</p>
                            </div>

                            {/* Rating */}
                            <div className="text-yellow-400 text-sm">
                                {"⭐".repeat(movie.rating || 0)}
                            </div>

                            <p className="text-xs text-zinc-500 mt-auto">
                                {movie.review}
                            </p>

                            {/* Actions */}
                            <div className="mt-auto pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-3">
                                <Link
                                    to={`/movieupdate/${movie._id ?? movie.id}`}
                                    className="w-full sm:flex-1 text-center py-2.5 px-4 rounded-2xl shadow-lg bg-gradient-to-r from-purple-600 to-indigo-500 hover:opacity-90 transition font-medium text-sm"
                                >
                                    Edit
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default Movie;
