const express = require('express');
const router = express.Router();

// Controllers
const {
    createBook,
    getAllBooks,
    getBookById,
    updateBookById,
    deleteBookById
} = require('../controllers/bookController');

router.post('/books', createBook);
router.get('/books', getAllBooks);
router.get('/books/:id', getBookById);
router.put('/books/:id', updateBookById);
router.delete('/books/:id', deleteBookById);

module.exports = router;