import express from 'express';
import { addAccessory } from '../controllers/accessoryController.js';
import multer from 'multer';

const accessoryRouter = express.Router();
accessoryRouter.post("/add", addAccessory);



export default accessoryRouter;