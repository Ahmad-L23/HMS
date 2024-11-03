const Joi = require('joi');

exports.appointmentSchema = Joi.object({
    patient: Joi.string().required().messages({
        'string.empty': 'Patient ID is required.'
    }),
    doctor: Joi.string().required().messages({
        'string.empty': 'Doctor ID is required.'
    }),
    date: Joi.date().required().messages({
        'date.base': 'Date must be a valid date.',
        'any.required': 'Date is required.'
    }),
    time: Joi.string()
        .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/) // Format: HH:mm, 24-hour
        .required()
        .messages({
            'string.pattern.base': 'Time must be in HH:mm format (24-hour).',
            'any.required': 'Time is required.'
        }),
    description: Joi.string().allow('').optional().messages({
        'string.base': 'Description must be a string.'
    }),
    status: Joi.string()
        .valid('Scheduled', 'Completed', 'Cancelled')
        .default('Scheduled')
        .messages({
            'any.only': 'Status must be one of Scheduled, Completed, or Cancelled.'
        })
});
