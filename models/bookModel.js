const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        reuired: [true, 'Please enter product name']
    },
    details: {
        type: String,
        required: true
    },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;