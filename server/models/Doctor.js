const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    specialty: { type: String, required: true, trim: true },
    yearsOfExperience: { type: String },
    workingHours: [{
        day: { type: String, required: true, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] },
        startTime: { type: String, required: true },
        endTime: { type: String, required: true }
    }]
}, { timestamps: true });

module.exports = mongoose.model('Doctor', doctorSchema);
