const Books = require("../models/bookModel");
const { Readable } = require("stream");

let cloudinary = require('cloudinary').v2

require('../config/cloudinary')

let addBook = async (req, res) => {
    const { title, author, genre, pages, readOn, rating, review } = req.body;
    const { userId } = req.params;

    try {
        if (!userId) {
            return res.status(400).json({ message: "User ID missing" });
        }

        if (!req.file) {
            return res.status(400).json({ message: "Image is required" });
        }

        // Check if book already exists FIRST
        const isBookExist = await Books.findOne({ title, userId });
        if (isBookExist) {
            return res
                .status(409)
                .json({ message: "Book already exists for this user" });
        }

        // Upload image buffer to Cloudinary
        const uploadResult = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: "books",
                    resource_type: "image",
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );

            Readable.from(req.file.buffer).pipe(uploadStream);
        });

        console.log(uploadResult);


        // Save book with Cloudinary image URL
        const newBook = new Books({
            userId,
            imageUrl: uploadResult.secure_url,
            title,
            author,
            genre,
            pages,
            readOn,
            rating,
            review,
        });

        await newBook.save();

        res.status(201).json({
            message: "Book added successfully",
            book: newBook,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }

}

let getBooks = async (req, res) => {
    try {
        let userId = req.params.userId
        let data = {}
        // console.log(userId);

        if (userId) {
            data.userId = userId
        }
        let bookData = await Books.find({ userId })
        // console.log(bookData);

        res.status(200).json({
            message: "Books fetched successfully",
            books: bookData
        });

    } catch (error) {
        console.error("Get Books Error:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

let getBookById = async (req, res) => {
    try {
        bookId = req.params.id
        let bookView = await Books.findById(bookId)
        if (!bookView) {
            return res.status(404).json({ message: "Book Not Found" })
        }
        res.status(200).json({
            message: "Book fetched successfully",
            books: bookView
        });
    } catch (error) {
        console.error("Get Book By ID Error:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

let updateBook = async (req, res) => {
    let bookId = req.params.id
    try {
        let updateData = req.body
        let bookUpdate = await Books.findByIdAndUpdate(bookId, updateData,
            {
                new: true,
                runValidators: true
            });
        if (!bookUpdate) {
            return res.status(404).json({ message: 'Book not found' })
        }
        res.status(200).json({
            message: "Book updated successfully", data: bookUpdate
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

let getBookCountByUser = async (req, res) => {
    try {
        let userId = req.params.userId;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        let totalBooks = await Books.countDocuments({ userId });

        res.status(200).json({
            message: "Book count fetched successfully",
            totalBooks
        });
    } catch (error) {
        console.error("Book Count Error:", error);
        res.status(500).json({ message: "Server error" });
    }
}




module.exports = { addBook, getBooks, getBookById, updateBook, getBookCountByUser }