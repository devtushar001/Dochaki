import express from 'express';
import { addToCart, removeFromCart, getCart } from '../controllers/cartController.js';
import isAuth from '../middlewares/auth.js';

const cartRouter = express.Router();

cartRouter.post('/add', isAuth, addToCart);
cartRouter.post('/remove', isAuth, removeFromCart);
cartRouter.get('/get', isAuth, getCart);

export default cartRouter;