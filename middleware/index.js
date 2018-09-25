var Secret = require("../models/secret");

// all the middlweare goes here
var middlewareObj = {};

middlewareObj.checkSecretOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Secret.findById(req.params.id, function(err, foundSecret){
           if(err){
               res.redirect("back");
           }  else {
               // does user own the secret?
            if(foundSecret.author.id.equals(req.user._id) || req.user.isAdmin) {
                next();
            } else {
                res.redirect("back");
            }
           }
        });
    } else {
        req.flash('error',"You need to be logged in to do that")
        res.redirect("back");
    }
}



// middlewareObj.checkCommentOwnership = function(req, res, next) {
//  if(req.isAuthenticated()){
//         Comment.findById(req.params.comment_id, function(err, foundComment){
//            if(err){
//                req.flash('error','Campground not found')
//                res.redirect("back");
//            }  else {
//                // does user own the comment?
//             if(foundComment.author.id.equals(req.user._id) || req.user.isAdmin) {
//                 //console.log(req.user._id)
//                 next();
//             } else {
//                 req.flash('error','You are not authorized to do that')
//                 res.redirect("back");
//             }
//            }
//         });
//     } else {
//         res.redirect("back");
//     }
// }



middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    //flash messages
    req.flash('error','You nned to be logged in to do that')
    res.redirect("/login");
}

module.exports = middlewareObj;