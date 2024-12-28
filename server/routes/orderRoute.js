import express from 'express';
import isAuth from '../middlewares/auth.js'
import { deleteOrder, listOrders, placeOrder, updateStatus, userOrder, verifyOrder } from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/place", isAuth, placeOrder);
orderRouter.post("/verify", verifyOrder);
orderRouter.get("/myorders", isAuth, userOrder);
orderRouter.get("/list", listOrders);
orderRouter.post("/status", updateStatus);
orderRouter.delete("/delete", deleteOrder);

export default orderRouter;