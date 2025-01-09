import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import helmet from 'helmet';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/connectDB.js';
import accessoryRouter from './routes/accessoryRoute.js';
import userRouter from './routes/userRoute.js';
import cartRouter from './routes/cartRoute.js';
import { categoryRouter } from './routes/categoryRoute.js';
import orderRouter from './routes/orderRoute.js';
import nestedCtgRouter from './routes/nestedCtgRoute/nestedCtgRoute.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
<<<<<<< HEAD
const port = process.env.PORT || 5000; // Use PORT from .env, fallback to 5000
const mongo_url = process.env.MONGODB_URL; // Fixed variable name

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use("/images", express.static('uploads'));
app.use('/catupload', express.static('catupload'));

// MongoDB connection
connectDB(mongo_url);

// API endpoints
app.use("/api/accessory", accessoryRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/category", categoryRouter);
app.use('/api/nested-category', nestedCtgRouter); // Avoid overlapping routes
app.use('/api/order', orderRouter);
app.use('/api/instamojo', instaMojoRouter);

// Client app
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '/client/dist')));
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/client/dist/index.html'))
);

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ success: false, message: "Internal Server Error" });
});

// Start server
=======
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
app.use('/api/instamojo', orderRouter);

// Catch-All Route for Frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/dist/index.html'));
});

// Start Server
>>>>>>> 814b50a27ec836078124716d3dd4317b8cc031c9
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
