const express = require ("express");
const router = express.Router({mergeParams:true});
const passport = require ("passport");
const User = require("../models/user");
const Secret = require("../models/secret");


//homepage
router.get("/", function(req, res){
    res.render('homepage');
});


//show registration form
router.get("/register", (req, res)=> {
    res.render("register");
});




//post registration data to database
router.post('/register', (req, res)=>{
        var newUser = new User({

            username: req.body.username,
            aadhaar: req.body.aadhaar,
        })

            User.register(newUser,req.body.password, (err, user)=>{
                if(err){
                    console.log(err);
                    res.render('./register')
                }
                passport.authenticate('local')(req, res, function(){
                    res.redirect('/secrets')
                })
})

})



//user login
router.get('/login', (req, res)=>{
    res.render('login')
})

router.post('/login', passport.authenticate('local', {
    successRedirect: '/secrets',
    failureRedirect: '/login'
}),
(req, res)=>{
})



//logout
router.get('/logout',(req,res)=>{
    req.logout()
    req.flash('success','logged out out')
    res.redirect('/homepage')
})



//user profile
router.get('/users/:id',(req,res)=>{
    User.findById(req.params.id,(err,foundUser)=>{
        if(err) {
            req.flash('error','something went wrong')
            res.redirect('/')
        }
        Secret.find().where('author.id').equals(foundUser._id).exec(function(err, secrets){
            if (err){
                req.flash('error', 'something went wrong abbai')
                res.redirect('/')
                }
         res.render('users/show', {user:foundUser, secrets: secrets})
   
        })
    })    
})

function isLoggedIn (req, res, next){
    if (req.isAuthenticated()){
        return next()
    }
    res.redirect('/login')
}


module.exports = router