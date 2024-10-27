const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt=require("jsonwebtoken")
const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobileNumber: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    address: { type: String, required: true },
    gender: { type: String, required: true, enum: ['Male', 'Female'] },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'doctor', 'patient'], default: 'patient' }
});


userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.genAuthToken=function(){
    return jwt.sign({ id: this._id, role: this.role},process.env.SECRET_KEY);
}

userSchema.methods.checkPassword=function(password){
    return bcrypt.compare(password,this.password);
}


module.exports = mongoose.model('User', userSchema);
