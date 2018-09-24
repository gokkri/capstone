var mongoose = require("mongoose");
var passportLocalMongoose = require ("passport-local-mongoose");


var ReqSchema = new mongoose.Schema({
    
//deceased
    fullNameD: String,
    phoneD: Number,
    emailD: String,
    aadhaarD: Number,
    relation: String,
    deathCertificateD: String,

// //requester
//     fullNameN: Number,
//     emailN: String,
//     aadhaarN: Number,
//     relation: String,
//     aadhaarN: String,


})




module.exports = mongoose.model("req", ReqSchema);
