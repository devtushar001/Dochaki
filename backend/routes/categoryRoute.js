import express from 'express';
import upload from '../middlewares/upload.js'
import addCategory from '../controllers/categoryController.js';

const categoryRouter = express.Router()
categoryRouter.post('/add', upload.single('menu_image'), addCategory)
export { categoryRouter };
