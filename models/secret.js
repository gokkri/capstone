var mongoose = require("mongoose");
var passportLocalMongoose = require ("passport-local-mongoose");


var SecretSchema = new mongoose.Schema({
    secret: String,
    // author :{
    //     id:{
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref : "User"
    //     },
    //     aadhaar: Number
    // },
    })




module.exports = mongoose.model("Secret", SecretSchema);
