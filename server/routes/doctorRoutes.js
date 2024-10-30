const express=require("express");
const router=express.Router();
const {createDoctor,getDoctors,getDoctorById,deleteDoctor,updateDoctor}=require('../controllers/doctorController.js');
const{verifyTokenAndAdmin}=require("../middleWares/verfiyToken.js")

router.post('/', verifyTokenAndAdmin , createDoctor);


router.get('/', verifyTokenAndAdmin ,getDoctors);


router.route("/:id").get(verifyTokenAndAdmin,getDoctorById)
.put( verifyTokenAndAdmin,updateDoctor)
.delete(verifyTokenAndAdmin,deleteDoctor)


module.exports = router;