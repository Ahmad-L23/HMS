const mongoose=require("mongoose");


const doctorSchema = new mongoose.Schema({
    name:{type:String,required:true},
    specialty:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    phone:{type:String,required:true},
    availability:{type:String,required:true},
    appointments:[{patientId:{type:mongoose.Schema.Types.ObjectId,ref:"patient"},date:Date,notes:String}],
    createdAt:{type:Date,default:Date.now},
});

module.exports=mongoose.model("Doctor",doctorSchema);