let Movies = require("../models/movieModel");


let addMovie = async (req, res) => {
    let { imageUrl, title, director, genre, duration, watchedOn, rating, review } = req.body
    try {
        let userId = req.params.userId
        if (!userId) {
            return res.status(400).json({ message: "User ID missing" });
        }
        // console.log(userId);

        let isMovieExist = await Movies.findOne({ title, userId });

        if (isMovieExist) {
            return res.status(409).json({ message: "Movie already exists for this user " });
        }
        let newMovie = await new Movies({
            userId,
            imageUrl: req.file?.filename || "",
            title,
            director,
            genre,
            duration,
            watchedOn,
            rating,
            review
        })
        await newMovie.save()
        res.status(201).json({
            message: "Movie added successfully"
        });

    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }

}



let getAllMovie = async (req, res) => {
    try {
        let userId = req.params.userId
        // console.log(userId);

        let data = {}

        if (userId) {
            data.userId = userId
        }
        let movieData = await Movies.find({ userId })
        // console.log(movieData);

        res.status(200).json({
            message: "Movies fetched successfully",
            movies: movieData
        });

    } catch (error) {
        console.error("Get movie Error:", error);
        res.status(500).json({ message: "Something went wrong" });
    }

}

let getMovieById = async (req, res) => {
    try {
        movieId = req.params.id
        let movieView = await Movies.findById(movieId)
        if (!movieView) {
            return res.status(404).json({ message: "Movie Not Found" })
        }
        res.status(200).json({
            message: "Movie fetched successfully",
            movies: movieView
        });
    } catch (error) {
        console.error("Get Movie By ID Error:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
}


let updateMovie = async (req, res) => {
    let movieId = req.params.id
    try {
        updateData = req.body
        let movieUpdate = await Movies.findByIdAndUpdate(movieId, updateData,
            {
                new: true,
                runValidators: true
            });
        if (!movieUpdate) {
            return res.status(404).json({ message: 'Movie not found' })
        }
        res.status(200).json({
            message: "Movie updated successfully", data: movieUpdate
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

let getMovieCountByUser = async (req, res) => {
    try {
        let userId = req.params.userId;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        let totalMovies = await Movies.countDocuments({ userId });
        // console.log(totalMovies);

        res.status(200).json({
            message: "movie count fetched successfully",
            totalMovies
        });
    } catch (error) {
        console.error("Book Count Error:", error);
        res.status(500).json({ message: "Server error" });
    }
}


module.exports = { addMovie, getAllMovie, getMovieById, updateMovie, getMovieCountByUser }