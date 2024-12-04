import express from 'express';
import { loginUser, registerUser } from '../controllers/userController.js';

// register user route
const userRouter = express.Router();
userRouter.post("/register", registerUser)

// login user route
userRouter.post("/login", loginUser)

export default userRouter;