import express from 'express';
import isAuth from '../middlewares/auth.js'
import { listOrders, placeOrder, updateStatus, userOrder, verifyOrder } from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/place", isAuth, placeOrder);
orderRouter.post("/verify", verifyOrder);
orderRouter.get("/myorders", isAuth, userOrder);
orderRouter.get("/list", listOrders);
orderRouter.post("/status", updateStatus);

export default orderRouter;