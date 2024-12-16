import express from 'express';
import upload from '../middlewares/upload.js'
import {addCategory, getAllCategories} from '../controllers/categoryController.js';

const categoryRouter = express.Router()
categoryRouter.post('/add', upload.single('menu_image'), addCategory);
categoryRouter.get('/get', getAllCategories);
export { categoryRouter };
