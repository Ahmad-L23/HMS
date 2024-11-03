const Joi = require('joi');

exports.doctorSchema = Joi.object({
    name: Joi.string().required().messages({
        'string.empty': 'Name is required.'
    }),
    email: Joi.string().email().required().messages({
        'string.email': 'Email must be a valid email address.',
        'string.empty': 'Email is required.'
    }),
    password: Joi.string().min(6).required().messages({
        'string.min': 'Password must be at least 6 characters long.',
        'string.empty': 'Password is required.'
    }),
    specialty: Joi.string().required().messages({
        'string.empty': 'Specialty is required.'
    }),
    yearsOfExperience: Joi.string().optional().messages({
        'string.empty': 'Years of experience should be a valid string.'
    }),
    workingHours: Joi.array().items(
        Joi.object({
            day: Joi.string()
                .valid('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')
                .required()
                .messages({ 'any.only': 'Day must be a valid day of the week.' }),
            startTime: Joi.string()
                .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/) // Format: HH:mm, 24-hour
                .required()
                .messages({ 'string.pattern.base': 'Start time must be in HH:mm format (24-hour).' }),
            endTime: Joi.string()
                .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
                .required()
                .messages({ 'string.pattern.base': 'End time must be in HH:mm format (24-hour).' })
        })
    ).unique('day').required().messages({
        'array.unique': 'Each day should only appear once in the working hours.'
    })
});
