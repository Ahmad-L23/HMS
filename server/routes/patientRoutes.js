const express = require('express');
const {
    getAllPatients,
    getPatientById,
    createPatient,
    updatePatient,
    deletePatient
} = require('../controllers/patientController.js');
const { verifyTokenAndAdmin} = require('../middleWares/verfiyToken.js');

const router = express.Router();

// Get all patients (Admin only)
router.get('/', getAllPatients);

// Get a patient by ID (Admin only)
router.get('/:id', getPatientById);

// Create a new patient (Admin only)
router.post('/', createPatient);

// Update a patient (Admin only)
router.put('/:id', updatePatient);

// Delete a patient (Admin only)
router.delete('/:id', deletePatient);

module.exports = router;
