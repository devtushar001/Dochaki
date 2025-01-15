import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import connectDB from './config/connectDB.js';
import accessoryRouter from './routes/accessoryRoute.js';
import userRouter from './routes/userRoute.js';
import cartRouter from './routes/cartRoute.js';
import { categoryRouter } from './routes/categoryRoute.js';
import orderRouter from './routes/orderRoute.js';
import nestedCtgRouter from './routes/nestedCtgRoute/nestedCtgRoute.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Load Environment Variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5000; // Use .env PORT or fallback to 5000
const mongo_url = process.env.MONGODB_URL;

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connection
connectDB(mongo_url);

// API Endpoints
app.use("/api/accessory", accessoryRouter);
app.use("/images", express.static('uploads'));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/category", categoryRouter);
app.use("/api/nested-category", nestedCtgRouter); // Adjusted route to avoid conflicts
app.use("/catupload", express.static('catupload'));

// Example: http://localhost:8000/catupload/menu_image-1733413564680-877237691.jpeg

app.use("/api/order", orderRouter);

// deployment process goes from here
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname);

app.use(express.static(path.join(__dirname, '/client/dist')));

// handling for all other routes..
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/dist/index.html'));
});

// listenning server on port ...
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
