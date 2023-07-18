import express from "express";
import User from "../Models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';



const router = express.Router();


router.post("/register",async(req,res)=>{
    try{

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            username:req.body.username,
            email : req.body.email,
            password : hash,
        })

        await newUser.save();
        res.status(200).send("User has been created");

    }catch(err){
        res.status(500).json(err);
    }


})



router.post("/login",async(req,res)=>{
    try{
        const user = await User.findOne({
            username:req.body.username
        })
        if(!user){
            res.status(404).send("User not found");
        }else{
            const isPasswordCorrect = await bcrypt.compare(req.body.password,user.password)
            if(!isPasswordCorrect){
                res.status(400).send("Wrong Password or Username")
            }else{
                const token = jwt.sign({
                    id:user._id,
                    isAdmin:user.isAdmin
                },
                process.env.JWT)
                const {password,isAdmin, ...otherDetails} =user._doc;
                res.cookie("access_token",token,{
                    httpOnly:true,
                }).status(200).send({...otherDetails});
                console.log(token)
            }
        }
       

    }catch(err){
        res.status(500).json(err);
    }


})

export default router