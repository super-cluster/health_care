const mongoose =require("mongoose");

const speciality =new mongoose.Schema({
   speciality:{
    type:String
   }
});

const Speciality = mongoose.model('Speciality',speciality);

module.exports = Speciality;