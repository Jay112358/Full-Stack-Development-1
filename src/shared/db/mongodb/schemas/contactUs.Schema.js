const mongoose = require('mongoose');
const validator = require('validator')

const contactUsSchema = new mongoose.Schema({
    fullname: {
        type: String,
        trim: true,
        required: true
    },
    email: { 
        type: String,
        trim: true,
        required: true,
    //     validate:{
    //         validator: value => validator.isEmail(value),
    //         message: '(VALUE) is not a valid email address.'
    //     }
     },
    phone: {
        type: String,
        required: true,
        // validate:{
        //     validator: value => validator.isMobilePhone(value),
        //     message: '(VALUE) is not a valid phone number.'
        // }
    },
    company_name: {
        type: String,
        trim: true,
        required: true
    },
    project_name: {
        type: String,
        trim: true,
        required: true
    },
    project_desc: {
        type: String,
        trim: true,
        required: true
        
    },
    department: {
        type: String,
        trim: true,  
    },
    message: {
        type: String,
        trim: true,  
    },
    file: {
        type: String, //string is the URL to file location
        trim: true,
    },

}, { timestamps: true })




module.exports = mongoose.model('contactUs', contactUsSchema)
