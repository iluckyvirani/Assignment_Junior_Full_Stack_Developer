import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";


dotenv.config();

const app = express();
const port = process.env.PORT || 8080; 
const mongodbURI = process.env.MONGOOSE_URI;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev')); 

// Database configuration
mongoose.connect(mongodbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Successfully Connected"))
    .catch(err => console.error("MongoDB connection error:", err));


app.get('/', (req, res) => {
    res.status(200).json("GET request successful");
});

// Error handling middleware
app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    console.error(err.stack); 
    res.status(500).send({ message: 'Something went wrong!' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
