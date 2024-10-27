
require('dotenv').config();
const express=require("express");
const cors=require("cors")
const mongoose=require("mongoose");
const userRouter=require("./routes/authRoutes.js")
const connectDB=require("./config/db.js")

//connect ot dataBase
connectDB();


const app=express();
app.use(express.json());
app.use(cors());


//routes
app.use("/api/auth",userRouter);



//start server
const PORT=process.env.PORT||3001;
app.listen(PORT,()=>{
    console.log("server running");
})