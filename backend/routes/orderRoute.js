import express from 'express';
import isAuth from '../middlewares/auth.js'
import { placeOrder } from "../controllers/orderController.js";

const orderRouter = express.Router()

orderRouter.post("/place", isAuth, placeOrder);

export default orderRouter;