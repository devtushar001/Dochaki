import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';
import dotenv from 'dotenv';

dotenv.config();

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
}

// console.log(createToken());
// login user 
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({
                success: false,
                message: "User not found"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({
                success: false,
                message: "Invalid credential"
            })
        }

        const token = createToken(user._id);
        return res.json({
            success: true,
            message: "User logind successfully",
            token
        })

    } catch (error) {
        return res.json({
            success: false,
            message: "Something got error"
        })
    }
}

// register user 
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        if (!name || !email || !password) {
            return res.json({
                success: false,
                message: "All fields are required"
            })
        }

        if (!validator.isEmail(email)) {
            return res.json({
                success: false,
                message: "Please enter valid email"
            })
        }

        if (password.length < 7) {
            return res.json({
                success: false,
                message: "Password should be longer than 7 character"
            })
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10); // Generate a salt with 10 rounds
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hashPassword
        });


        const existingUser = await userModel.findOne({ email });

        // checking if user allready exist
        if (existingUser) {
            return res.json({
                success: false,
                message: "User Allready Exist"
            })
        }
        const user = await newUser.save();
        const token = createToken(user._id);

        return res.json({
            success: true,
            message: "Id created successfully",
            token
        })
    } catch (error) {
        return res.json({
            success: false,
            message: "Something got register error"
        })
    }
}

export { loginUser, registerUser }