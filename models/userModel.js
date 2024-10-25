const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    username: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
    },
    phone: {
        type: String,
        unique: true,
    },
    isAdmin:{
        type: Boolean,
        default: false,  
    },
    password: String,
},{
    timestamps: true,
});

module.exports = mongoose.model('User', userSchema);