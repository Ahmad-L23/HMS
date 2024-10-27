
const mongoose=require("mongoose");

// MongoDB Connection
const connectDB=()=>{
mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("connected");
}).catch((err)=>{
    console.log("there was an error",err);
})

}


module.exports=connectDB;
