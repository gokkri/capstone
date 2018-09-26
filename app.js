//require modules

const express = require ('express'),
app = express(),
bodyParser = require('body-parser'),
mongoose = require("mongoose"),
flash = require ("connect-flash"),
passport = require("passport"),
localStrategy = require("passport-local"),
methodOverride = require("method-override");
import env from 'dotenv/config';





//models
const User = require("./models/user");
const Nominee = require("./models/nominee");
const Request = require("./models/request");




//routes
var secretRoutes = require('./routes/secrets')
var indexRoutes = require('./routes/index')



//mongoose connection
mongoose.connect("process.env.MONGOURL");


app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(flash());
app.use(express.static(__dirname + "/public"));
app.set('view engine', 'ejs');


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
app.use('/', indexRoutes)
app.use('/secrets', secretRoutes)



//listen on port
app.listen(process.env.PORT || 2222, ()=>{
    console.log("listening on port 2222")
})