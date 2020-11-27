require("dotenv").config();
const express=require("express");
const BodyParser=require("body-parser");
const ejs=require('ejs');
const mongoose=require("mongoose");
const passport=require("passport");
const passportLocalMongoose=require("passport-local-mongoose");
const session=require("express-session");
const Patient=require('./model/patient');
const Doctor=require('./model/doctor');

const app=express();
app.use(session({
    secret:"Medicare Secret",
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(Patient.createStrategy());
passport.serializeUser(Patient.serializeUser());
passport.deserializeUser(Patient.deserializeUser());



mongoose.connect("mongodb://localhost:27017/MediCareDb",{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    console.log("MongoDb is Connected");
})



app.use(express.static(__dirname+"/public"));
app.set('view engine', 'ejs'); 
app.use(BodyParser.urlencoded({extended:true}));


//validation is required remember it

app.post("/register/patient",(req,res)=>{
    var name =req.body.name;
    var email =req.body.username;
    var password =req.body.password;
    var dob =req.body.dob;
    var gender =req.body.gender;
    var bloodgroup =req.body.bloodgroup;

    console.log(req.body.username);

    const user =new Patient({
        name:name,
        email:email,
        dob:dob,
        gender:gender,
        bloodgroup:bloodgroup,
        username:email,
        type:"patient"
        
    });
    console.log(user);

    Patient.register(user, password, function(err, user) { 
        if (err) { 
          res.status(500).json({message:err});
        }else{ 
            passport.authenticate("local")(req,res,()=>{
                res.redirect("/dashboard");
            })
        } 
      }); 
})

app.post("/register/doctor",(req,res)=>{
    var name =req.body.name;
    var email =req.body.username;
    var password =req.body.password;
    var gender =req.body.gender;
    var qualifications =req.body.qualifications;

    console.log(req.body.name);

    const user =new Doctor({
        name:name,
        email:email,
        gender:gender,
        username:email,
        qualifications:qualifications,
        type:"doctor"
        
    });

    Doctor.register(user, password, function(err, user) { 
        if (err) { 
          res.status(500).json({message:err.message});
        }else{ 
            passport.authenticate("local")(req,res,()=>{
                res.redirect("/dashboard");
            })
        } 
      }); 
});


app.post("/login/patient",(req,res)=>{

    const user =new Patient({
        username:req.body.username,
        password:req.body.password
    });

    req.login(user,function(err){
        if(err){
            res.json({message:err.message});
        }else{
            passport.authenticate("local")(req,res,()=>{
                res.redirect("/dashboard");
            });
        }
    });

});


    app.post("/login/doctor",(req,res)=>{

        const user =new Doctor({
            username:req.body.username,
            password:req.body.password
        });
    
        req.login(user,function(err){
            if(err){
                res.json({message:err.message});
            }else{
                passport.authenticate("local")(req,res,()=>{
                    res.redirect("/dashboard");
                });
            }
        });

    
})



app.get('/',(req,res)=>{
       res.sendFile(__dirname+"/index.html");
});


app.get("/profile/:username",(req,res)=>{
    if(req.isAuthenticated()){
            console.log(req.user);
    }else{
        console.log("Something happened");
    }
});

app.get("/dashboard",(req,res)=>{
    if(req.isAuthenticated()){
            res.render("dashboard")
    }else{
            res.send("Error");
    }
});

app.post("/getDoctors",(req,res)=>{

});

app.post("/searchHospitals",(req,res)=>{

});

app.get("/feed",(req,res)=>{

})

app.get("/searchHospitals",(req,res)=>{

});

app.get("/searchDoctors",(req,res)=>{

});









app.listen(process.env.PORT||PORT,()=>{
    console.log("Medicare has been started on server 3000 -> http://localhost:3000/");
});