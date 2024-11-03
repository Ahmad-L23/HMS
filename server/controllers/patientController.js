const Patient = require("../models/Patient.js");
const { patientSchema } = require("../validations/patientValidation");

// Get all patients (Admin only)
exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find().populate("user doctor", "-password"); // Exclude password field in populated data
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get patient by ID (Admin or Doctor only)
exports.getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id).populate(
      "user doctor",
      "-password"
    );
    if (!patient) return res.status(404).json({ message: "Patient not found" });
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new patient (Admin only)
exports.createPatient = async (req, res) => {
  const { error } = patientSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const newPatient = new Patient(req.body);
    await newPatient.save();
    res.status(201).json(newPatient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update patient (Admin or Doctor only)
exports.updatePatient = async (req, res) => {
  const { error } = patientSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!patient) return res.status(404).json({ message: "Patient not found" });
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete patient (Admin only)
exports.deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);
    if (!patient) return res.status(404).json({ message: "Patient not found" });
    res.status(200).json({ message: "Patient deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
