const mongoose =require("mongoose");

const problem =new mongoose.Schema({
      name:{
          type:String,
          required:true
      },
      username:{
          type:String,
          required:true
      },
      problem:String,
      suggestions:{
          type:Array
      }
},{timestamps:true});

const Problem = mongoose.model('Problem',problem);

module.exports = Problem;