import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import api from "../axios/axios";


let BASE_URL = import.meta.env.VITE_BASE_URL + "/api/image";

function Book() {

    let navigate = useNavigate();
    let userId = localStorage.getItem("userId");

    let [search, setSearch] = useState("");
    let [books, setBooks] = useState([]);
    let [error, setError] = useState("");

    // Filters
    let [genre, setGenre] = useState("");
    let [ratingFilter, setRatingFilter] = useState("");
    let [sort, setSort] = useState("");



    useEffect(() => {

        if (!userId) {
            navigate("/login");
            return;
        }

        let fetchBookData = async () => {
            setError("");

            try {
                let res = await api.get(
                    `/book/allbook/${userId}?limit=50`);

                setBooks(res.data.books || []);

            } catch (err) {

                console.error("Failed to fetch books:", err);
                setError("Failed to load books");

            }

        };


        fetchBookData();


    }, [userId, navigate]);




    // Dynamic genres

    let genres = useMemo(() => {

        return [
            ...new Set(
                books
                    .map((book) => book.genre)
                    .filter(Boolean)
            )
        ];

    }, [books]);





    // Search + Filter + Sort

    let filteredBooks = useMemo(() => {


        let result = books.filter((book) => {


            let matchesSearch =
                (book.title || "")
                    .toLowerCase()
                    .includes(search.toLowerCase());



            let matchesGenre =
                genre === "" ||
                book.genre === genre;



            let matchesRating =
                ratingFilter === "" ||
                book.rating >= Number(ratingFilter);



            return (
                matchesSearch &&
                matchesGenre &&
                matchesRating
            );


        });



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


    }, [
        books,
        search,
        genre,
        ratingFilter,
        sort
    ]);





    return (

        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-zinc-100 flex flex-col">


            <Navbar />



            <div className="w-full max-w-7xl mx-auto px-6 py-10 flex-1">



                {/* Header */}

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">


                    <h1 className="text-3xl font-bold bg-gradient-to-r from-[#F5C77A] via-purple-400 to-[#7665f0] bg-clip-text text-transparent">

                        📚 My Books

                    </h1>



                    <Link

                        to="/addbook"

                        className="px-5 py-2.5 rounded-2xl shadow-lg bg-gradient-to-r from-purple-600 to-indigo-500 hover:opacity-90 transition font-medium text-center"

                    >

                        Add Book

                    </Link>


                </div>





                {/* Search and Filters */}


                <div className="flex flex-col md:flex-row gap-4 mb-8">


                    <input

                        type="text"

                        placeholder="Search books..."

                        value={search}

                        onChange={(e) => setSearch(e.target.value)}

                        className="flex-1 px-4 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-zinc-400"

                    />






                    {/* Genre */}

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





                {/* Error */}

                {
                    error && (

                        <div className="text-red-400 text-center mb-6">

                            {error}

                        </div>

                    )
                }





                {/* Books */}

                {
                    filteredBooks.length === 0 ? (

                        <div className="text-center text-zinc-400 mt-20">

                            No books found.

                        </div>


                    ) : (


                        <div className="flex flex-wrap gap-6">


                            {
                                filteredBooks.map((book) => (


                                    <div

                                        key={book._id || book.id}

                                        className="w-full sm:w-[48%] lg:w-[31%] xl:w-[23%] rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg hover:scale-[1.02] transition p-4 flex flex-col gap-3"

                                    >



                                        <img

                                            src={
                                                book.imageUrl
                                                    ? `${BASE_URL}/${book.imageUrl}`
                                                    : "/placeholder-book.jpg"
                                            }

                                            alt={book.title || "Book cover"}

                                            className="h-44 w-full object-cover rounded-xl"

                                        />




                                        <div>


                                            <h2 className="font-semibold text-lg leading-tight">

                                                {book.title}

                                            </h2>



                                            <p className="text-sm text-zinc-400">

                                                {book.author}

                                            </p>



                                            {
                                                book.genre && (

                                                    <p className="text-xs text-purple-400 mt-1">

                                                        {book.genre}

                                                    </p>

                                                )
                                            }


                                        </div>





                                        <div className="text-yellow-400 text-sm">

                                            {
                                                "⭐".repeat(
                                                    Math.min(book.rating || 0, 5)
                                                )
                                            }

                                        </div>




                                        <p className="text-xs text-zinc-500 mt-auto">

                                            {book.review}

                                        </p>





                                        <div className="mt-auto pt-4 border-t border-white/10">


                                            <Link

                                                to={`/bookupdate/${book._id || book.id}`}

                                                className="block w-full text-center py-2.5 px-4 rounded-2xl shadow-lg bg-gradient-to-r from-purple-600 to-indigo-500 hover:opacity-90 transition font-medium text-sm"

                                            >

                                                Edit

                                            </Link>


                                        </div>



                                    </div>


                                ))
                            }


                        </div>


                    )
                }



            </div>



            <Footer />


        </div>

    );

}


export default Book;