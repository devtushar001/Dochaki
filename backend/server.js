import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import connectDB from './config/connectDB.js';
import accessoryRouter from './routes/accessoryRoute.js';
import userRouter from './routes/userRoute.js';
import cartRouter from './routes/cartRoute.js';
import { categoryRouter } from './routes/categoryRoute.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000; // Use PORT from .env, fallback to 8000
const mongo_url = process.env.MONDODB_URL;
app.use(express.json());
app.use(cors());

//
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())

app.get('/', (req, res) => {
    res.status(201).send({
        success: true,
        message: "Server connected successfully on port number : " + port
    });
});


// mongodb connection function running here!
connectDB(mongo_url);

// API endpoints
app.use("/api/accessory", accessoryRouter);
app.use("/images", express.static('uploads'));

// user router
app.use("/api/user", userRouter);

// cart router
app.use('/api/cart', cartRouter);

// category router
app.use('/api/category', categoryRouter);
app.use('/catupload', express.static('catupload'));
// http://localhost:8000/catupload//menu_image-1733413564680-877237691.jpeg image format



// running server on the port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
