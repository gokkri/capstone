var express = require("express");
var router  = express.Router({mergeParams:true});
var Secret = require("../models/secret");
var Request = require('../models/request')
var middleware = require("../middleware");
var multer = require('multer');

//INDEX - show all secret requests to admin
router.get("/", function(req, res){
    // Get all secrets from DB
    
    Secret.find({}, function(err, allSecrets){
       if(err){
           console.log(err);
       } else {

          res.json(allSecrets);
       }
    });
});






//CREATE - add new secret to DB
 router.post('/',/*middleware.isLoggedIn,*/(req,res)=>{
     var name = req.body.name;
      var image = req.body.image;
      var description = req.body.description;
      var yourAadhaar = req.body.youraadhaar;
      var nominee = req.body.nominee
      var nomineeAadhaar = req.body.nomineeaadhaar
      var NomineeEmail = req.body.nomineeemail 
    //   var author = {
    //       id : req.user._id,
    //       username : req.user.username 
    //  }
     
      var newSecret = {name: name, image: image, description: description,yourAadhaar:yourAadhaar,nominee:nominee,nomineeAadhaar:nomineeAadhaar,NomineeEmail:NomineeEmail,/*author:author*/}
    //save data to db
    Secret.create(newSecret,(err,newlyCreatedSecret)=>{
        if(err) {
            console.log(err)
        }
        else {
            //redirect to secret page
            res.json(newlyCreatedSecret)
        }
    })
})








//NEW - show form to create new secret
// router.get("/new", /*middleware.isLoggedIn*/ function(req, res){
//    res.json("secrets/new"); 
// });




// SHOW - shows more info about one secret
router.get("/:id",/*middleware.isLoggedIn,*/ function(req, res){
    //find the secret with provided ID
    Secret.findById(req.params.id,function(err, foundSecret){
        if(err){
            console.log(err);
        } else {
            console.log(foundSecret)
            //render show template with that secret
            res.json(foundSecret);
        }
    });
});






// EDIT secret ROUTE
router.get("/:id/edit", middleware.checkSecretOwnership, function(req, res){
    Secret.findById(req.params.id, function(err, foundSecret){
        res.json(foundSecret);
    });
});



// UPDATE secret ROUTE
router.put('/:id',middleware.checkSecretOwnership,(req,res)=>{
    Secret.findByIdAndUpdate(req.params.id,req.body.secret,(err,updatedSecret)=>{
        if(err) {
            console.log(err);
        }
        else {
            res.json(updatedSecret)
        }
    })
}) 



// DESTROY secret ROUTE
router.delete('/:id',middleware.checkSecretOwnership,(req,res)=>{
    Secret.findByIdAndRemove(req.params.id,(err)=>{
       if(err) {
        console.log(err);
    }
       else {
        console.log("success");
       }
   })
})






module.exports = router;

