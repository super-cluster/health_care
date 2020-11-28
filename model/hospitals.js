const mongoose =require("mongoose");

const hospitalSchema =new mongoose.Schema({
      name:String,
      address:String,
      ratings:Number,
      contactnumber:String,
      vaccantbed:Number,
      nodoctors:Number,
      website:String,
      lat:Number,
      long:Number
});

const Hospital = mongoose.model('Hospital',hospitalSchema);

module.exports = Hospital;