const Book = require('../models/bookModel');

// Create New Book
exports.createBook = async (req, res) => {
    try {
        // Destructure title, author, description, publishedYear from req.body
        const { title, author, description, publishedYear } = req.body;

        // Validation required field
        if (!title) {
            return res.json({ error: 'Title is required' });
        }
        if (!author) {
            return res.json({ error: 'Author is required' });
        }

        // Create new book
        const book = await new Book({
            title,
            author,
            description,
            publishedYear,
        }).save();

        if (book) {
            res.status(201).json({
                message: 'Book created successfully!'
            });
        } else {
            res.status(500).json({
                message: 'Internal Server Error!'
            });
        }
    } catch (err) {
        console.log(err);
    }
};

// Get All Books
exports.getAllBooks = async (req, res) => {
    try {
        const allBooks = await Book.find();

        if (allBooks.length === 0) {
            return res.status(404).json({
                error: `No Book Found!`
            });
        } else {
            res.json(allBooks);
        }
    } catch (err) {
        console.log(err);
    }
};

// Get Book By ID
exports.getBookById = async (req, res) => {
    try {
        const id = req.params.id;
        const bookById = await Book.findById(id);

        if (!bookById) {
            return res.status(404).json({
                error: `No Book Found by this ID: ${id}`
            });
        } else {
            res.json(bookById);
        }
    } catch (err) {
        console.log(err);
    }
};

// Update Book By ID
exports.updateBookById = async (req, res) => {
    try {
        const id = req.params.id;
        const updateBook = await Book.findByIdAndUpdate(id, req.body);

        if (!updateBook) {
            return res.status(404).json({
                error: `No Book Found by this ID: ${id}`
            });
        } else {
            return res.json({
                message: 'Book Update Successfully!'
            });
        }

    } catch (err) {
        console.log(err)
    }
}

// Delete Book By ID
exports.deleteBookById = async (req, res) => {
    try {
        const id = req.params.id;
        const deleteBook = await Book.findByIdAndDelete(id);

        if (!deleteBook) {
            return res.status(404).json({
                error: `No Book Found by this ID: ${id}`
            });
        } else {
            return res.json({
                message: 'Book Delete Successfully!'
            });
        }
    } catch (err) {
        console.log(err)
    }
}