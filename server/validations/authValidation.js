
const Joi = require('joi');

const signupValidationSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    mobileNumber: Joi.string().required(),
    dateOfBirth: Joi.date().required(),
    address: Joi.string().required(),
    gender: Joi.string().valid('Male', 'Female').required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('admin', 'doctor', 'patient').default('patient')
});

const loginValidationSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

module.exports = { signupValidationSchema, loginValidationSchema };
