let express = require('express')
let { addMovie, getAllMovie, getMovieById, updateMovie, getMovieCountByUser } = require('../controller/movieController')
let upload = require('../config/multer')
const tokenValidation = require('../middlewares/tokenValidation')

let movieRoute = express.Router()

movieRoute.post('/addmovie/:userId', tokenValidation, upload.single('imageUrl'), addMovie)
movieRoute.get('/all-movie/:userId', tokenValidation, getAllMovie)
movieRoute.get('/movie-detail/:id', tokenValidation, getMovieById)
movieRoute.patch('/update/:id', tokenValidation, upload.single('imageUrl'), updateMovie)
movieRoute.get("/count/:userId", tokenValidation, getMovieCountByUser);

module.exports = movieRoute
