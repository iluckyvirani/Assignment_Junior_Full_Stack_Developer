import express from 'express';
import { AddBook, UpdateBookById,getBookyId,getAllBooks,deleteBook } from '../controllers/BookController.js';


const router = express.Router();


router.post('/add/book', AddBook);
router.put('/updateBookById/:id', UpdateBookById);
router.get('/getBookById/:id', getBookyId);
router.get('/getall/book', getAllBooks);
router.delete('/deleteBookById/:id', deleteBook);



export default router