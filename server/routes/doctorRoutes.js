const express=require("express");
const router=express.Router();
const {createDoctor,getAllDoctors , getDoctorById , updateDoctor , deleteDoctor}=require('../controllers/doctorController.js');
const{verifyTokenAndAdmin}=require("../middleWares/verfiyToken.js")

router.post('/',  createDoctor);


router.get('/',getAllDoctors);


router.route("/:id").get(getDoctorById)
.put(updateDoctor)
.delete(deleteDoctor)


module.exports = router;