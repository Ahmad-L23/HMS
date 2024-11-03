const Doctor = require("../models/Doctor.js");
const User = require("../models/User.js");
const Appointment = require("../models/Appointment.js")
const asyncHandler = require("express-async-handler");
const { doctorSchema } = require("../validations/doctorValidation.js");

/**
 *  @desc    Create New Doctor
 *  @route   /api/doctor
 *  @method  POST
 *  @access  private(Only Admin)
 */

exports.createDoctor = asyncHandler(async (req, res) => {
  // const { error } = doctorSchema.validate(req.body);
  // if (error) return res.status(400).json({ message: error.details[0].message });
  
  try {
    const { email, password, name } = req.body;
    // Update user role to doctor
    const user = new User({
      name: name,
      isDoctor: true,
      email: email,
      password: password,
    });

    await user.save();

    // Create new doctor with validated request data
    const newDoctor = new Doctor({
      name,
      email,
      password,
      user: req.body.user,
      specialty: req.body.specialty,
      yearsOfExperience: req.body.yearsOfExperience,
      workingHours: req.body.workingHours,
    });

    await newDoctor.save();
    res.status(201).send(newDoctor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 *  @desc    Get All Doctors
 *  @route   /api/doctor
 *  @method  get
 *  @access  public
 */

exports.getAllDoctors = asyncHandler(async (req, res) => {
  const doctors = await Doctor.find();
  res.status(200).json(doctors);
});

// Get a doctor by ID
exports.getDoctorById = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findById(req.params.id);
  if (!doctor) return res.status(404).json({ message: "Doctor not found" });
  res.status(200).json(doctor);
});

// Update doctor and adjust appointments if necessary
exports.updateDoctor = asyncHandler(async (req, res) => {
  const updatedDoctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updatedDoctor) return res.status(404).json({ message: "Doctor not found" });
  
  const doctorWorkingHours = updatedDoctor.workingHours;
  const appointments = await Appointment.find({ doctor: req.params.id, status: 'Scheduled' });

  for (let appointment of appointments) {
      const dayOfWeek = new Date(appointment.date).toLocaleString('en-US', { weekday: 'long' });
      const doctorSchedule = doctorWorkingHours.find(hour => hour.day === dayOfWeek);

      if (doctorSchedule && (appointment.time < doctorSchedule.startTime || appointment.time > doctorSchedule.endTime)) {
          appointment.status = 'Cancelled';
          await appointment.save();
      }
  }

  res.status(200).json(updatedDoctor);
});

/**
 *  @desc    update Doctor
 *  @route   /api/doctor
 *  @method  put
 *  @access  private
 */

exports.deleteDoctor = asyncHandler(async (req, res) => {
  try {
    const deletedDoctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!deletedDoctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Update appointments with this doctor to "Cancelled" status
    // await Appointment.updateMany(
    //   { doctor: deletedDoctor._id , status: 'Scheduled' },
    //   { status: 'Cancelled' }
    // );

    res.status(200).json({ message: "Doctor deleted and associated appointments cancelled" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
