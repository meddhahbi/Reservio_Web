import express from "express";

const router = express.Router();


router.get("/register",(req,res)=>{
    res.send("Hello from auth routes")
})

export default router