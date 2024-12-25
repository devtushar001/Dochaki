import express from 'express';
import { placeOrder,verifyOrder,userOrder, listOrders,updateStatus  } from '../controllers/instamojoController.js';
import isAuth from '../middlewares/auth.js';
const instaMojoRouter = express.Router();

instaMojoRouter.post('/place-order', isAuth, placeOrder);
instaMojoRouter.post('/verify-order', verifyOrder);
instaMojoRouter.get('/user-orders', userOrder);
instaMojoRouter.get('/list-orders', listOrders);
instaMojoRouter.patch('/update-status', updateStatus);

export default instaMojoRouter;