const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt=require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isDoctor: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.genAuthToken=function(){
    return jwt.sign(this.toJSON(),process.env.SECRET_KEY);
}

userSchema.methods.checkPassword=function(password){
    return bcrypt.compare(password,this.password);
}


module.exports = mongoose.model('User', userSchema);
