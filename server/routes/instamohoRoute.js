import express from 'express';
import { homeController, placeOrder } from '../controllers/instamojoController.js';
const instaMojoRouter = express.Router();

instaMojoRouter.get('/home',  homeController);
instaMojoRouter.post('/place-order', placeOrder);

export default instaMojoRouter;