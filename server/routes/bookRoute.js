let express = require('express')
let { addBook, getBooks, getBookById, updateBook, getBookCountByUser } = require('../controller/bookController')
let upload = require('../config/multer')
const tokenValidation = require('../middlewares/tokenValidation')

let bookRoute = express.Router()


bookRoute.post('/addbook/:userId', tokenValidation, upload.single('imageUrl'), addBook)
bookRoute.get('/allbook/:userId', tokenValidation, getBooks)
bookRoute.get('/bookdetail/:id', tokenValidation, getBookById)
bookRoute.patch('/update/:id', tokenValidation, upload.single('imageUrl'), updateBook,)
bookRoute.get("/count/:userId", tokenValidation, getBookCountByUser);


module.exports = bookRoute
