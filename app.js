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
const Hospital=require('./model/hospitals');
const Speciality=require('./model/speciality');
const Problem=require("./model/postproblems");
const LocalStrategy = require('passport-local').Strategy;

const app=express();
app.use(session({
    secret:"Medicare Secret",
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname+"/public"));
app.set('view engine', 'ejs'); 
app.use(BodyParser.urlencoded({extended:true}));

passport.use('patientLocal', new LocalStrategy(Patient.authenticate()));
passport.use('doctorLocal', new LocalStrategy(Doctor.authenticate()));

// passport.use(Patient.createStrategy());
// passport.serializeUser(Patient.serializeUser());
// passport.deserializeUser(Patient.deserializeUser());

// passport.use(Doctor.createStrategy());
// passport.serializeUser(Doctor.serializeUser());
// passport.deserializeUser(Doctor.deserializeUser());

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(obj, done) {
      console.log("deserialize"+obj);
    done(null, obj);
  });



mongoose.connect("mongodb://localhost:27017/MediCareDb",{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    console.log("MongoDb is Connected");
})






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
            passport.authenticate("patientLocal")(req,res,()=>{
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
    var qualifications =req.body.qualification;

    console.log(req.body.name);

    const user =new Doctor({
        name:name,
        email:email,
        gender:gender,
        username:email,
        qualifications:qualifications,
        type:"doctor",
        speciality:req.body.speciality
        
    });

    Doctor.register(user, password, function(err, user) { 
        if (err) { 
          res.status(500).json({message:err.message});
        }else{ 
            passport.authenticate("doctorLocal")(req,res,()=>{
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
            passport.authenticate("patientLocal")(req,res,()=>{
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
                passport.authenticate("doctorLocal")(req,res,()=>{
                    res.redirect("/dashboard");
                })
            }
        });

    
})


app.post("/getHospitals",(req,res)=>{
    if(req.isAuthenticated){
        
    }else{
        res.send({message:"error"})
    }
})


app.get('/',(req,res)=>{

    Speciality.find({},(err,list)=>{
        if(err){
            res.render("index",{speciality:""});
        }else{
            console.log(list);
            res.render("index",{speciality:list});
        }
    })
});


app.get("/profile",(req,res)=>{
    if(req.isAuthenticated()){
        res.render("profile",{user:req.user});
    }else{
        console.log("Something happened");
    }
});

app.get("/dashboard",(req,res)=>{
    if(req.isAuthenticated()){
            console.log(req.user);
            if(req.user.type==="patient"){
                res.render("dashboard",{user:req.user});
            }else{
                res.render("doctordashboard",{user:req.user});
            }
           
    }else{
            res.redirect("/");
    }
});

app.post("/getHospital",(req,res)=>{
    Hospital.find({}, function (err, docs) {
        if(err){
            res.send({message:"error"});
        }else{
            res.send({message:"succes",array:docs});
        }
    });
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
        Problem.find({},(err,post)=>{
            if(err){
                console.log(err);
            }else{
                res.render("feed",{post:post});
            }
        })
}else{
        res.redirect("/");
}
})

app.get("/searchHospitals",(req,res)=>{

});

app.get("/searchDoctors",(req,res)=>{
    if(req.isAuthenticated()){
        Speciality.find({},(err,list)=>{
            if(err){
                res.render("doctors",{speciality:""});
            }else{
                console.log(list);
                res.render("doctors",{speciality:list});
            }
        })
    }else{
        res.redirect("/");
    }
});

app.get("/lab",(req,res)=>{
    if(req.isAuthenticated()){
        res.render("lab")
    }else{
        res.redirect("/");
    }
})


app.post("/filterDoctor",(req,res)=>{
    if(req.isAuthenticated()){
        console.log(req.body.speciality);
        Doctor.find({speciality:req.body.speciality},(err,doctor)=>{
            if(err){
                res.send({message:err.message,array:""});
            }else{
                res.send({message:"success",array:doctor});
            }
        });
    }else{
        res.send({message:"Unathorized"});
    }
});

app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });


app.post("/postProblem",(req,res)=>{
    if(req.isAuthenticated()){
        const problem =new Problem({
            name:req.user.name,
            username:req.user.username,
            problem:req.body.problem
        })
        problem.save((err)=>{
            if(err){
                console.log(err.message);
            }else{
                console.log("saved successfully!!");
            }
        })
    }else{
        res.send("Unauthorized");
    }
})







app.listen(process.env.PORT||PORT,()=>{
    console.log("Medicare has been started on server 3000 -> http://localhost:3000/");
});