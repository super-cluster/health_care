const passportLocalMongoose =require("passport-local-mongoose");
const mongoose =require("mongoose");

const doctorScheme = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true 
    },
    type:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true
    },
    username:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    image:{
        type:String
    },
    appointments:{
        type:Array,
        required:false
    },
    suggestion:{
        type:Array,
        required:false
    },
    notifications:{
        type:Array,
        required:false
    },
    reviews:{
        type:Array,
        required:false
    },
    qualifications:{
        type:String,
        required:true
    },
    speciality:{
        type:String,
        required:true
    }

},{timestamps:true});

doctorScheme.plugin(passportLocalMongoose);

const Doctor = mongoose.model('Doctor',doctorScheme);

module.exports = Doctor;