
const User = require('../models/User');
const { registerUserSchema , loginUserSchema} = require('../validations/authValidation.js');
const asyncHandler = require('express-async-handler');



/**
 *  @desc    signup New User
 *  @route   /api/auth/signup
 *  @method  POST
 *  @access  public
 */

exports.registerUser = async (req, res) => {
    const { error } = registerUserSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const { name, email, password} = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'invalid user name or password' });

        const newUser = new User({ name, email, password});
        await newUser.save();
        const token = newUser.genAuthToken();
        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login User
exports.loginUser = async (req, res) => {
    const { error } = loginUserSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await user.checkPassword(password))) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = user.genAuthToken();
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};