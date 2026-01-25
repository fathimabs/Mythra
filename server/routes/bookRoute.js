let express = require('express')
const { addBook, getBooks, getBookById, updateBook, getBookCountByUser, getImage } = require('../controller/bookController')
const upload = require('../config/multer')

let bookRoute = express.Router()



bookRoute.post('/addbook/:userId', upload.single('imageUrl'), addBook)
bookRoute.get('/allbook/:userId', getBooks)
bookRoute.get('/bookdetail/:id', getBookById)
bookRoute.patch('/update/:id', updateBook)
bookRoute.get("/count/:userId", getBookCountByUser);


module.exports = bookRoute
