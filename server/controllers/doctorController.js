const Doctor=require("../models/Doctor.js");
const asyncHandler=require("express-async-handler");
const doctorValidation=require("../validations/doctorValidation.js")

/**
 *  @desc    Create New Doctor
 *  @route   /api/doctor
 *  @method  POST
 *  @access  private 
 */

exports.createDoctor=asyncHandler(async(req,res)=>{
    const { error } = doctorValidation.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    try {
        const newDoctor=new Doctor(req.body);
        await newDoctor.save();
        res.status(201).json(newDoctor);
    } catch (err) {
        res.status(500).json({message:err.message})
    }
})


/**
 *  @desc    Get All Doctors
 *  @route   /api/doctor
 *  @method  get
 *  @access  public 
 */

exports.getDoctors=asyncHandler(async(req,res)=>{
    try {
        const doctors=await Doctor.find({});
        res.status(200).json(doctors);
    } catch (err) {
        res.status(500).json({message:err.message})
    }
})


/**
 *  @desc    Get Doctor by id
 *  @route   /api/doctor
 *  @method  get
 *  @access  public 
 */

exports.getDoctorById=asyncHandler(async(req,res)=>{
    try {
        const doctor = await Doctor.findById(req.params.id);
        if(!doctor){
            return res.status(404).json({ message: 'Doctor not found' });
        }
        res.status(200).json(doctor);
    } catch (err) {
        res.status(400).json({message:err.message})
    }
})


/**
 *  @desc    update Doctor
 *  @route   /api/doctor
 *  @method  put
 *  @access  private 
 */
exports.updateDoctor=asyncHandler(async(req,res)=>{
    try {
        const updatedDoctor=await Doctor.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if (!updatedDoctor) {
            return res.status(404).json({ message: 'Doctor not found' });
          }
          res.status(404).json(updatedDoctor);
    } catch (err) {
        res.status(400).json({message:err.message});
    }
});


/**
 *  @desc    update Doctor
 *  @route   /api/doctor
 *  @method  put
 *  @access  private 
 */


exports.deleteDoctor=asyncHandler(async(req,res)=>{
    try {
        const deletedDoctor= await Doctor.findByIdAndDelete(req.params.id);
        if(!deletedDoctor){
            return res.status(404).json({message:"Doctor not found"});
        }
        res.status(200).json({message:"Doctor deleted"})
    } catch (err) {
        res.status(500).json({message:err.message});
    }
   
});
