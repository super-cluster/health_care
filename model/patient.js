const passportLocalMongoose =require("passport-local-mongoose");
const mongoose =require("mongoose");

const patientSchema = new mongoose.Schema({
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
    dob:{
        type:Date,
        required:true
    },
    bloodgoup:{
        type:String
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
    orderedResources:{
        type:Array,
        required:false,
    },
    appointments:{
        type:Array,
        required:false
    },
    posts:{
        type:Array,
        required:false
    },
    notifications:{
        type:Array,
        required:false
    }

},{timestamps:true});

patientSchema.plugin(passportLocalMongoose);

const Patient = mongoose.model('Patient',patientSchema);

module.exports = Patient;