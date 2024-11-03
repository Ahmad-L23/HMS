const Appointment = require('../models/Appointment.js');

const Doctor = require('../models/Doctor.js');
const asyncHandler = require('express-async-handler');
// Create a new appointment, checking doctor's working hours
exports.createAppointment = asyncHandler(async (req, res) => {
    // Validate the request body
   
    

    // const { doctor, date, time } = req.body;

    // // Find the doctor
    // const doctorData = await Doctor.findById(doctor);
    // if (!doctorData) return res.status(404).json({ message: "Doctor not found" });

    // // Determine the day of the week from the appointment date
    // const dayOfWeek = new Date(date).toLocaleString('en-US', { weekday: 'long' });
    // const workingHours = doctorData.workingHours.find(h => h.day === dayOfWeek);

    // // Check if the doctor has working hours for that day
    // if (!workingHours || workingHours.startTime === "Closed" || workingHours.endTime === "Closed") {
    //     return res.status(400).json({ message: "Doctor is not available on this day." });
    // }

    // // Check if the requested time is within working hours
    // const [startHour, startMinute] = workingHours.startTime.split(':').map(Number);
    // const [endHour, endMinute] = workingHours.endTime.split(':').map(Number);
    
    // const appointmentTime = new Date(date);
    // const requestedHour = parseInt(time.split(':')[0], 10);
    // const requestedMinute = parseInt(time.split(':')[1], 10);

    // // Set appointment time based on the request
    // appointmentTime.setHours(requestedHour, requestedMinute, 0);

    // // Create start and end times for the doctor's working hours
    // const startWorkingTime = new Date(date);
    // startWorkingTime.setHours(startHour, startMinute, 0);

    // const endWorkingTime = new Date(date);
    // endWorkingTime.setHours(endHour, endMinute, 0);

    // // Check if the requested time is within the doctor's working hours
    // if (appointmentTime < startWorkingTime || appointmentTime >= endWorkingTime) {
    //     return res.status(400).json({ message: "Requested time is outside of the doctor's working hours." });
    // }

    // // Check for existing appointments for the doctor at the same date and time
    // const existingAppointment = await Appointment.findOne({
    //     doctor: doctor,
    //     date: date,
    //     time: time
    // });

    // if (existingAppointment) {
    //     return res.status(400).json({ message: "There is already an appointment scheduled for this doctor at the selected time." });
    // }

    // Create the new appointment
    const newAppointment = new Appointment(req.body);
    await newAppointment.save();
    res.status(201).json(newAppointment);
});


// Get all appointments
exports.getAllAppointments = asyncHandler(async (req, res) => {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
});

// Get an appointment by ID
exports.getAppointmentById = asyncHandler(async (req, res) => {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ message: "Appointment not found" });
    res.status(200).json(appointment);
});

// Update appointment and validate against doctor's working hours
exports.updateAppointment = asyncHandler(async (req, res) => {
    
    const { doctor, date, time } = req.body;
    const doctorData = await Doctor.findById(doctor);
    if (!doctorData) return res.status(404).json({ message: "Doctor not found" });

    const dayOfWeek = new Date(date).toLocaleString('en-US', { weekday: 'long' });
    const workingHours = doctorData.workingHours.find(h => h.day === dayOfWeek);

    if (!workingHours || time < workingHours.startTime || time > workingHours.endTime) {
        return res.status(400).json({ message: "Appointment time is outside doctor's working hours" });
    }

    const updatedAppointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedAppointment) return res.status(404).json({ message: "Appointment not found" });
    res.status(200).json(updatedAppointment);
});

// Delete an appointment
exports.deleteAppointment = asyncHandler(async (req, res) => {
    const deletedAppointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!deletedAppointment) return res.status(404).json({ message: "Appointment not found" });
    res.status(200).json({ message: "Appointment deleted" });
});

