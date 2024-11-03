const Joi = require('joi');

exports.patientSchema = Joi.object({
    user: Joi.string().required(), // User ID as a string
    dateOfBirth: Joi.date().iso().required(), // ISO date format for date of birth
    medicalHistory: Joi.string().allow('').optional(), // Optional, defaults to empty string if not provided
    doctor: Joi.string().required() // Doctor ID as a string, required field
});
