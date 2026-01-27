let express = require('express')
let { addBook, getBooks, getBookById, updateBook, getBookCountByUser } = require('../controller/bookController')
let upload = require('../config/multer')

let bookRoute = express.Router()

 

bookRoute.post('/addbook/:userId', upload.single('imageUrl'), addBook)
bookRoute.get('/allbook/:userId', getBooks)
bookRoute.get('/bookdetail/:id', getBookById)
bookRoute.patch('/update/:id', updateBook)
bookRoute.get("/count/:userId", getBookCountByUser);


module.exports = bookRoute
