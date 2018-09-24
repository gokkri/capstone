//require modules

const express = require ('express'),
app = express(),
bodyParser = require('body-parser'),
mongoose = require("mongoose"),
flash = require ("connect-flash"),
passport = require("passport"),
localStrategy = require("passport-local"),
methodOverride = require("method-override");





//models
const User = require("./models/user");
const Nominee = require("./models/nominee");
const Request = require("./models/request");




//routes


//mongoose connection
mongoose.connect("mongodb://localhost/capstone");


app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(flash());
app.use(express.static(__dirname + "/public"));



//passport config 
app.use(require('express-session')({
    secret : "neemama",
    resave : false,
    saveUninitialized : false
}));


//session initialise
app.use (passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//render current user
app.use((req, res, next)=>{
    res.locals.currentUser =req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
    })


//use routes
// app.use()




//listen on port
app.listen(1111, ()=>{
    console.log("listening on port 1111")
})