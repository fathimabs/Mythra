import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Book() {
    let [search, setSearch] = useState("");
    let [book, setBook] = useState([])

    let books = [
        { id: 1, title: "Atomic Habits", author: "James Clear", rating: 5 },
        { id: 2, title: "Deep Work", author: "Cal Newport", rating: 4 },
        { id: 3, title: "The Alchemist", author: "Paulo Coelho", rating: 4 },
        { id: 4, title: "Sapiens", author: "Yuval Noah Harari", rating: 5 },
    ];

    let filteredBooks = useMemo(() => {
        return books.filter((book) =>
            book.title.toLowerCase().includes(search.toLowerCase())
        );
    }, [search]);

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

                {/* Search + Stats */}
                <div className="flex flex-col md:flex-row gap-6 mb-12">
                    {/* Search */}
                    <input
                        type="text"
                        placeholder="Search books..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="flex-1 px-4 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-zinc-400"
                    />


                </div>

                {/* Book Card*/}
                {filteredBooks.length === 0 ? (
                    <div className="text-center text-zinc-400 mt-20">No books found.</div>
                ) : (
                    <div className="flex flex-wrap gap-6">
                        {filteredBooks.map((book) => (
                            <div
                                key={book.id}
                                className="w-full sm:w-[48%] lg:w-[31%] xl:w-[23%] rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg hover:scale-[1.02] transition p-4 flex flex-col gap-3"
                            >
                                <div className="h-44 bg-gradient-to-br from-purple-700/40 to-indigo-700/40 rounded-xl flex items-center justify-center text-sm text-zinc-300">
                                    Cover
                                </div>

                                <div>
                                    <h2 className="font-semibold text-lg leading-tight">
                                        {book.title}
                                    </h2>
                                    <p className="text-sm text-zinc-400">{book.author}</p>
                                </div>

                                <div className="text-yellow-400 text-sm">
                                    {"⭐".repeat(book.rating)}
                                </div>

                                <p className="text-xs text-zinc-500 mt-auto">
                                    Personal notes about the book...
                                </p>
                                <div className="mt-auto pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-3">
                                    {/* Edit */}
                                    <Link
                                        to={`/update/${book.id}`}
                                        className="w-full sm:flex-1 text-center py-2.5 px-4 rounded-2xl shadow-lg bg-gradient-to-r from-purple-600 to-indigo-500 hover:opacity-90 transition font-medium text-sm"
                                    >
                                        Edit
                                    </Link>

                                    {/* Delete */}
                                    {/* <Link
                                        to="#"
                                        className="w-full sm:flex-1 text-center py-2.5 px-4 rounded-2xl shadow-lg bg-gradient-to-r from-pink-600 to-red-500 hover:opacity-90 transition font-medium text-sm"
                                    >
                                        Delete
                                    </Link> */}
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
