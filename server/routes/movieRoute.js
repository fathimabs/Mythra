let express = require('express')
let { addMovie, getAllMovie, getMovieById, updateMovie, getMovieCountByUser } = require('../controller/movieController')
let upload = require('../config/multer')

let movieRoute = express.Router()

movieRoute.post('/addmovie/:userId', upload.single('imageUrl'), addMovie)
movieRoute.get('/all-movie/:userId', getAllMovie)
movieRoute.get('/movie-detail/:id', getMovieById)
movieRoute.patch('/update/:id', upload.single('imageUrl'), updateMovie)
movieRoute.get("/count/:userId", getMovieCountByUser);

module.exports = movieRoute
