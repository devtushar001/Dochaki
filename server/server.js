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
import instaMojoRouter from './routes/instamohoRoute.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const mongo_url = process.env.MONDODB_URL;
console.log(mongo_url)

// Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// MongoDB Connection
connectDB(mongo_url).catch(err => {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
});

// Default route
app.get('/', (req, res) => {
    res.status(201).send({
        success: true,
        message: `Server connected successfully on port number: ${port}`
    });
});

// Serve static files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '/client/dist')));

// API Endpoints
app.use("/api/accessory", accessoryRouter);
app.use("/images", express.static('uploads'));
app.use("/api/user", userRouter);
app.use('/api/cart', cartRouter);
app.use('/api/category', categoryRouter);
app.use('/api/category/nested', nestedCtgRouter);
app.use('/catupload', express.static('catupload'));
app.use('/api/order', orderRouter);
// app.use('/api/instamojo', instaMojoRouter);

// Catch-All Route for Frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/dist/index.html'));
});

// Start Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
