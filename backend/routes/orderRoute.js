import express from 'express';
import isAuth from '../middlewares/auth.js'
import { placeOrder, verifyOrder } from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/place", isAuth, placeOrder);
orderRouter.post("/verify", verifyOrder);

export default orderRouter;