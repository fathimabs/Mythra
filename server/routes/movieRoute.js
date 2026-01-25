let express = require('express')
const { addMovie, getAllMovie, getMovieById, updateMovie, getMovieCountByUser } = require('../controller/movieController')


let movieRoute = express.Router()

movieRoute.post('/addmovie/:id', addMovie)
movieRoute.get('/all-movie/:id', getAllMovie)
movieRoute.get('/movie-detail/:id', getMovieById)
movieRoute.patch('/update/:id', updateMovie)
movieRoute.get("/count/:userId", getMovieCountByUser);
module.exports = movieRoute
