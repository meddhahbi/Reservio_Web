import express from "express";
import { verifyAdmin, verifyToken, verifyUser } from "../Utils/VerifyToken.js";
import User from "../Models/User.js";

const router = express.Router();


router.get("/checkauth",verifyToken,(req,res,next)=>{
    res.send("hello user, you are logged in")
})

router.get("/checkuser/:id",verifyUser, (req,res,next)=>{
    res.send("hello user, you are logged in and you can delete your account")
})



router.get("/checkadmin/:id",verifyAdmin, (req,res,next)=>{
    res.send("hello admin, you are logged in and you can delete all accounts")
})






router.put("/:id",verifyUser, async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  
  
  
  router.delete("/:id",verifyUser, async (req, res) => {
      try {
         await User.findByIdAndDelete(
          req.params.id
        );
        res.status(200).json("User has been deleted");
      } catch (err) {
        res.status(500).json(err);
      }
    });
  
  
  
  
    router.get("/:id",verifyUser, async (req, res) => {
      try {
        const user = await User.findById(
          req.params.id
        );
        res.status(200).json(user);
      } catch (err) {
        res.status(500).json(err);
      }
    });
  
  
  
  
  
  
  
    router.get("/",verifyAdmin, async (req, res) => {
      try {
        const users = await User.find();
        res.status(200).json(users);
      } catch (err) {
        res.status(500).json(err);
      }
    });

export default router