let mongoose = require('mongoose')

let bookSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    imageUrl: {
        type: String,
        default: ""
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        default: "Unknown"
    },
    pages: {
        type: String,
        default: "0"
    },
    readOn: Date,
    rating: {
        type: Number,
        default: 0
    },
    review: {
        type: String,
        default: ""
    },
    isFavorite: {
        type: Boolean,
        default: false,
    },

},
    {
        timestamps: true
    })

let Books = new mongoose.model('books', bookSchema)

module.exports = Books
