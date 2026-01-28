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

    useEffect(() => {
        if (!userId) {
            navigate("/");
            return;
        }

        let fetchBookData = async () => {
            setError("");
            try {
                let res = await api.get(`/book/allbook/${userId}?limit=50`);
                setBooks(res.data.books || []);
            } catch (err) {
                console.error("Failed to fetch books:", err);
                setError("Failed to load books");
            }
        };

        fetchBookData();
    }, [userId, navigate]);

    let filteredBooks = useMemo(() => {
        return books.filter((book) =>
            (book.title || "").toLowerCase().includes(search.toLowerCase())
        );
    }, [search, books]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-zinc-100 flex flex-col">
            <Navbar />

            <div className="w-full max-w-7xl mx-auto px-6 py-10 flex-1">
                {/* Top Bar */}
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

                {/* Search */}
                <div className="mb-8">
                    <input
                        type="text"
                        placeholder="Search books..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-zinc-400"
                    />
                </div>

                {/* Error */}
                {error && (
                    <div className="text-red-400 text-center mb-6">{error}</div>
                )}

                {/* Book Cards */}
                {filteredBooks.length === 0 ? (
                    <div className="text-center text-zinc-400 mt-20">
                        No books found.
                    </div>
                ) : (
                    <div className="flex flex-wrap gap-6">
                        {filteredBooks.map((book) => (
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
                                    <p className="text-sm text-zinc-400">{book.author}</p>
                                </div>

                                <div className="text-yellow-400 text-sm">
                                    {"⭐".repeat(Math.min(book.rating || 0, 5))}
                                </div>

                                <div className="mt-auto pt-4 border-t border-white/10 flex gap-3">
                                    <Link
                                        to={`/bookupdate/${book._id || book.id}`}
                                        className="w-full text-center py-2.5 px-4 rounded-2xl shadow-lg bg-gradient-to-r from-purple-600 to-indigo-500 hover:opacity-90 transition font-medium text-sm"
                                    >
                                        Edit
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
}

export default Book;
