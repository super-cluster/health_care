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
    var email =req.body.email;
    var password =req.body.password;
    var dob =req.body.dob;
    var gender =req.body.gender;
    var bloodgroup =req.body.bloodgroup;

    console.log(req.body.name);

    const user =new Patient({
        name:name,
        email:email,
        dob:dob,
        gender:gender,
        bloodgroup:bloodgroup,
        username:email,
        type:"patient"
        
    });

    Patient.register(user, password, function(err, user) { 
        if (err) { 
          res.status(500).json({message:err.message});
        }else{ 
            passport.authenticate("local")(req,res,()=>{
                res.status(200).json({user});
            })
        } 
      }); 
})

app.post("/register/doctor",(req,res)=>{
    var name =req.body.name;
    var email =req.body.email;
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
                res.status(200).json({user});
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
            })
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
                })
            }
        });

    
})



app.get('/',(req,res)=>{
       res.sendFile(__dirname+"/index.html");
});


app.get("/profile",(req,res)=>{
    if(req.isAuthenticated()){
            res.render("profile");
    }else{
        console.log("Something happened");
    }
});

app.get("/dashboard",(req,res)=>{
<<<<<<< HEAD
    // if(req.isAuthenticated()){
            res.render("dashboard");
    // }
    // else{
    //         res.send("Error");
    // }

    // }else{
    //         res.redirect("/");
    // }

=======
    if(req.isAuthenticated()){
            res.render("dashboard");
    }else{
            res.redirect("/");
    }
>>>>>>> b2de09720717037f5fd3726bdcd087b4d1d433f4
});

app.post("/getDoctors",(req,res)=>{

});

app.get("/searchHospital",(req,res)=>{
    if(req.isAuthenticated()){
        res.render("hospitals");
    }else{
        res.redirect("/");
}
});

app.get("/searchResources",(req,res)=>{
    if(req.isAuthenticated()){
        res.render("searchMedical");
    }else{
        res.redirect("/");
   } 
})

app.get("/feed",(req,res)=>{
    if(req.isAuthenticated()){
        res.render("feed")
}else{
        res.redirect("/");
}
})

app.get("/searchHospitals",(req,res)=>{

});

app.get("/searchDoctors",(req,res)=>{
    if(req.isAuthenticated()){
        res.render("doctors")
    }else{
        res.redirect("/");
    }
});









app.listen(process.env.PORT||PORT,()=>{
    console.log("Medicare has been started on server 3000 -> http://localhost:3000/");
});