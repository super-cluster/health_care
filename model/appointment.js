const mongoose =require("mongoose");

const appointmentSchema =new mongoose.Schema({
    doctorName:{
        type:String,
        required:true
    },
    doctorEmail:{
        type:String,
        required:true
    },
    appointmenttime:{
        type:String,
        required:true
    },
    healthissue:{
        type:String
    }
});

const Appointment= mongoose.Model("Appointment",appointmentSchema);
module.exports = Appointment;