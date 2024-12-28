import express from 'express';
import { addMenuSub, addNestedCtg, categoryAll, deleteParent, deleteSubCategory } from '../../controllers/nestedCategoryController/nestedCategoryController.js';
import upload from '../../middlewares/upload.js';
const nestedCtgRouter = express.Router();

nestedCtgRouter.post("/add-menu", upload.single('menu_image'), addNestedCtg);
nestedCtgRouter.post("/add-menu-sub", addMenuSub);
nestedCtgRouter.get("/all-category", categoryAll);
nestedCtgRouter.delete("/delete-parent", deleteParent);
nestedCtgRouter.delete("/delete-sub-category", deleteSubCategory);

export default nestedCtgRouter;