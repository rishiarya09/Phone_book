const mongoose = require("mongoose")
const  uuidv1  =  require('uuid/v4');

const contactSchema = new mongoose.Schema({
    firstname: {
        type: String,
        trim: true,
        required:true,
        maxlength: 32 
    },
    lastname: {
        type: String,
        trim: true,
        required:true,
        maxlength: 32 
    },
    email: {
        type: String,
        required: true,
    },
    imageName: {
        type: String,
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    }

}, {timestamps: true})


 module.exports = mongoose.model("contact", contactSchema)