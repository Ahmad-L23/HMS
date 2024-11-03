const Joi = require('joi');

// User Registration Validation
exports.registerUserSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

// User Login Validation
exports.loginUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

