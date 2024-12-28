import express from 'express';
import { accessoryList, addAccessory, removeAccessory } from '../controllers/accessoryController.js';
import multer from 'multer';

const accessoryRouter = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });


// inserting accessory item in database
accessoryRouter.post("/add", upload.fields([
  { name: 'mainImage', maxCount: 1 },
  { name: 'secondImage', maxCount: 1 },
  { name: 'thirdImage', maxCount: 1 },
  { name: 'fourthImage', maxCount: 1 }
]), addAccessory);
// retriving all accessory list 
accessoryRouter.get("/list", accessoryList);
// remove accessory item from database
accessoryRouter.delete("/remove", removeAccessory);



export default accessoryRouter;