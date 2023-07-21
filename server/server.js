import express from "express";
import dotenv from "dotenv"
import mongoose from "mongoose";
import authRoute from "./Routers/auth.js";
import usersRoute from "./Routers/Users.js";
import roomsRoute from "./Routers/Rooms.js";
import hotelsRoute from "./Routers/Hotels.js";
import cookieParser from "cookie-parser";
import cors from "cors";




const app = express();
dotenv.config();


const connect = async ()=>{
try{
    await mongoose.connect(process.env.URL);
    console.log("Connected to mongoDb")
}catch(error){
    throw error;
}

};

mongoose.connection.on("disconnected",()=>{
    console.log("mongoDb disconnected")
})


mongoose.connection.on("connected",()=>{
    console.log("mongoDb connected")
})

app.use(express.json());
app.use(cors());
app.use(cookieParser());

//? Middlewares
app.use("/auth",authRoute);
app.use("/hotels",hotelsRoute);
app.use("/rooms",roomsRoute);
app.use("/users",usersRoute);



app.listen(3001,()=>{
    connect();
    console.log("Server run in 3001")
})