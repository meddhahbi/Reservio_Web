import express from "express";
import { verifyToken, verifyUser } from "../Utils/VerifyToken.js";

const router = express.Router();


router.get("/checkauth",verifyToken,(req,res,next)=>{
    res.send("hello user, you are logged in")
})

router.get("/checkuser/:id",verifyUser, (req,res,next)=>{
    res.send("hello user, you are logged in and you can delete your account")
})

export default router