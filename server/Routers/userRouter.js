import express from "express";
import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';

const router = express.Router();

// localhost:3000/users/signup POST isteği
router.post("/signup", async (req, res)=>{
    try {
        const { fullname,  email, password } = req.body;
        const userExists = await User.findOne({ email })
        if(userExists)
            return res.status(400).json({ message: 'User already exists.'})
        const hashedPassword = await bcrypt.hash(password, 10)
        const createdUser = await User.create({
            fullname,
            email,
            password: hashedPassword,
        })
        return res.status(201).json(createdUser);
    } catch (error) {
        console.log(error)
        return res.json({message: "create user failed"})
    }
})
// localhost:3000/users/signin POST request
router.post("/signin", async (req,res)=>{
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email})
        if(!user)
            return res.status(400).json({message: "user does not exist"})
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if(!isPasswordCorrect)
            return res.status(400).json({message: "Wrong Password"})
        return res.status(200).json({ user, message: 'Authentication successful' })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
})
export default router;