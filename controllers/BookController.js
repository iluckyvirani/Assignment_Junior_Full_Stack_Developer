import BookModel from '../models/BooksModel.js'

// Create a new mockTest
export const AddBook = async (req, res) => {
    const { title, author, genre, published_year } = req.body;

    if (!title || !author || !genre || !published_year) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const book = await BookModel.create({
            title,
            author,
            genre,
            published_year,
        });

        res.status(201).json({ message: 'Book added successfully', book });
    } catch (error) {
        console.error('Failed to add Book:', error);
        res.status(500).json({ message: 'Failed to add Book', error });
    }
};




export const UpdateBookById = async (req, res) => {
    const { id } = req.params;
    const { title, author, genre, published_year } = req.body;

    try {
        const updatedBook = await BookModel.findByIdAndUpdate(
            id,
            { title, author, genre, published_year },
            { new: true, runValidators: true } 
        );

        if (!updatedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json({ message: 'Book updated successfully', updatedBook });
    } catch (error) {
        console.error('Failed to update Book:', error);
        res.status(500).json({ message: 'Failed to update Book', error });
    }
};






export const getBookyId = async (req, res) => {
    const { id } = req.params;
    try {
        const book = await BookModel.findById(id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json({ message: 'Book found successfully', book });
    } catch (error) {
        res.status(500).json({ message: 'Failed to get book', error: error.message });
    }
};




export const getAllBooks = async (req, res) => {
    try {
        const { page = 1, limit = 10, search = "" } = req.query; 

        const searchFilter = search
            ? { title: { $regex: search, $options: "i" } }
            : {};

        const totalItems = await BookModel.countDocuments(searchFilter);

        const skip = (page - 1) * limit;

        const books = await BookModel.find(searchFilter)
            .skip(skip)
            .limit(parseInt(limit))
            .sort({ createdAt: -1 }); 

        res.status(200).json({
            message: 'Books fetched successfully',
            totalItems,
            totalPages: Math.ceil(totalItems / limit),
            currentPage: parseInt(page),
            books,
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to get books', error: error.message });
    }
};





export const deleteBook = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedBook = await BookModel.findByIdAndDelete(id);
        if (!deletedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json({ message: 'Book deleted successfully', deletedBook });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete book', error: error.message });
    }
};
