
const User = require('../models/User');
const { signupValidationSchema , loginValidationSchema} = require('../validations/authValidation.js');
const asyncHandler = require('express-async-handler');



/**
 *  @desc    signup New User
 *  @route   /api/auth/signup
 *  @method  POST
 *  @access  public
 */

exports.signup = asyncHandler(async (req, res) => {
    try {
        const { error } = signupValidationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { firstName, lastName, email, mobileNumber, dateOfBirth, address, gender, role } = req.body;
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'Invalid Email or password' });
        }

    
        user = new User({
            firstName,
            lastName,
            email,
            mobileNumber,
            dateOfBirth,
            address,
            gender,
            password:req.body.password,
            role
        });

        const result=await user.save();
        const token=user.genAuthToken();

        const {password ,...other}=result._doc;

        res.status(201).send(token);
    } catch (error) {
       
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});



exports.login = asyncHandler(async (req, res) => {
    try {
        const { error } = loginValidationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch=await user.checkPassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = user.genAuthToken();

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});