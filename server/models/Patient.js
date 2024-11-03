const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    medicalHistory: {
        type: String,
        default: ""
    },
    doctor:{type:mongoose.Schema.Types.ObjectId , ref:'Doctor' , required:true}
}, { timestamps: true });

module.exports = mongoose.model('Patient', patientSchema);
