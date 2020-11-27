const mongoose =require("mongoose");

const speciality =new mongoose.Schema({
   speciality:{
    type:String
   }
});

const Speciality= mongoose.Model("Speciality",speciality);
module.exports = Speciality;