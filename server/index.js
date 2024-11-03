
require('dotenv').config();
const express=require("express");
const cors=require("cors")
const mongoose=require("mongoose");
const authRouter=require("./routes/authRoutes.js")
const doctorRouter=require("./routes/doctorRoutes.js");
const usersRouter = require("./routes/userRoutes.js");
const PatientRouter = require("./routes/patientRoutes.js")
const appointmentRouter = require("./routes/appointmetnRoutes.js")
const connectDB=require("./config/db.js")

//connect ot dataBase
connectDB();


const app=express();
app.use(express.json());
app.use(cors());


//routes
app.use("/api/auth",authRouter);
app.use("/api/doctors",doctorRouter);
app.use("/api/users",usersRouter);
app.use("/api/patients",PatientRouter);
app.use("/api/appointments",appointmentRouter);



//start server
const PORT=process.env.PORT||3001;
app.listen(PORT,()=>{
    console.log("server running");
})