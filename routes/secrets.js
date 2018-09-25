var express = require("express");
var router  = express.Router();
var Secret = require("../models/secret");
var middleware = require("../middleware");
var multer = require('multer');

//multer
var storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});

//imageFilter
var imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};


var upload = multer({ storage: storage, fileFilter: imageFilter})


//cloudinary
var cloudinary = require('cloudinary');
cloudinary.config({ 
  cloud_name: 'dnoh0xcfl', 
  api_key: 311875872916176, 
  api_secret: '3G3-AE3ViyMBCzK6huRL9S8vISk'
});




//INDEX - hompage
router.get("/", function(req, res){
    
    Secret.find({}, function(err, allSecrets){
       if(err){
           console.log(err);
       } else {
          res.render("secrets/index",{secrets:allSecrets});
       }
    });
});



//CREATE - add new secret to DB
router.post("/", middleware.isLoggedIn,function(req, res){
        Secret.create(req.body.secret, function(err, secret) {
          if (err) {
            req.flash('error', err.message);
            return res.redirect('back');
          }

          res.redirect('/secrets/' + secret.id);
        });
      });




//NEW - show form to create new secret
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("secrets/new"); 
});




// SHOW - shows more info about one secret
router.get("/:id", function(req, res){
    
    //find the secret with provided ID
    Secret.findById(req.params.id, function(err, foundSecret){
        if(err){
            console.log(err);
        } else {
            console.log(foundSecret)
            //render show template with that secret
            res.render("secrets/show", {secret: foundSecret});
        }
    });
});



// EDIT SECRET ROUTE
router.get("/:id/edit", middleware.checkSecretOwnership, function(req, res){
    Secret.findById(req.params.id, function(err, foundSecret){
        res.render("secrets/edit", {secret: foundSecret});
    });
});

// UPDATE SECRET ROUTE



// DESTROY SECRET ROUTE
router.delete("/:id",middleware.checkSecretOwnership, function(req, res){
   Secret.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/homepage");
      } else {
          res.redirect("/homepage");
      }
   });
});


module.exports = router;
