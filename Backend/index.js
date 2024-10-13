import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.route.js";
import messageRoute from "./routes/message.route.js";
import { app, server } from "./SocketIO/server.js";

dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:[process.env.ORIGIN],
    methods:["GET","POST","PUT","PATCH","DELETE"],
    credentials:true,
}))

const PORT = process.env.PORT || 3001;
const URI = process.env.DATABASE_URL;

console.log(URI);

app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);

server.listen(PORT,()=>{
    console.log(`Server Started at Port${PORT}`)
})



mongoose.connect(URI)
.then(()=>console.log("Connection Success with DataBase"))
.catch((err)=>{
    console.log(err.message);
})
