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
import instaMojoRouter from './routes/instamohoRoute.js';

dotenv.config();

const app = express();
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
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
