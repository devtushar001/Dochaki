import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/connectDB.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000; // Use PORT from .env, fallback to 8000
const mongo_url = process.env.MONDODB_URL;
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.status(201).send({
        success: true,
        message: "Server connected successfully on port number : " + port
    });
});


// mongodb connection function running here!
connectDB(mongo_url);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
