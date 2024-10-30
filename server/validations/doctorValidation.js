const Joi = require('joi');

const doctorSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(50)
    .required()
    .messages({
      'string.empty': 'Doctor name is required',
      'string.min': 'Name must be at least 3 characters long',
      'string.max': 'Name cannot exceed 50 characters',
    }),
  specialty: Joi.string()
    .required()
    .messages({
      'string.empty': 'Specialty is required',
    }),
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Please enter a valid email address',
      'string.empty': 'Email is required',
    }),
  phone: Joi.string()
    .pattern(/^\d{10}$/)
    .required()
    .messages({
      'string.pattern.base': 'Phone number must be 10 digits',
      'string.empty': 'Phone number is required',
    }),
  availability: Joi.string()
    .required()
    .messages({
      'string.empty': 'Availability is required',
    }),
  appointments: Joi.array().items(
    Joi.object({
      patientId: Joi.string().required().messages({
        'string.empty': 'Patient ID is required for appointments',
      }),
      date: Joi.date().required().messages({
        'date.base': 'Please enter a valid appointment date',
        'any.required': 'Appointment date is required',
      }),
      notes: Joi.string()
        .max(500)
        .optional()
        .messages({
          'string.max': 'Notes cannot exceed 500 characters',
        }),
    })
  ).optional(),
});

module.exports = doctorSchema;
