const mongoose = require('mongoose');

//Student schema

const Student = mongoose.model('Student', {
    name: {
        type:String,
        required:true
    },
    matNumber: {
        type:String,
        required:true
    },
    department: {
        type:String,
        required:true
    },
    faculty: {
        type:String,
        required:true
    },
    phoneNumber: {
        type:String,
        required:true
    },
    address: {
        type:String,
        required:true
    },
    image:{
        type:Buffer
    }
        
});

module.exports = { Student }