var mongoose = require("mongoose");
var passportLocalMongoose = require ("passport-local-mongoose");


var ReqSchema = new mongoose.Schema({
    
//deceased
    fullName: String,
    phone: Number,
    email: String,
    aadhaar: Number,
    relation: String,
    deathCertificate: String,     //(image)
    deathCertificateId: String    //(imageid)

// //requester
//     fullNameN: Number,
//     emailN: String,
//     aadhaarN: Number,
//     relation: String,
//     aadhaarN: String,


})




module.exports = mongoose.model("req", ReqSchema);
