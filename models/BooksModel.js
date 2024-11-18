import mongoose from 'mongoose';

const { Schema } = mongoose;

const BookSchema = new Schema(
    {
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
            required: true,
            minlength: 3,
            maxlength: 100
        },
        published_year: {
            type: Number,
            required: true,
            min: 1800,
            max: new Date().getFullYear()
        },
    },
    { timestamps: true }
);

const BookModel = mongoose.model('Book', BookSchema);

export default BookModel;
