var mongoose = require("mongoose");
var passportLocalMongoose = require ("passport-local-mongoose");


var NomineeSchema = new mongoose.Schema({

    fullNameN: String,
    phoneN: Number,
    emailN: String,
    aadhaarN: Number,
    relationN: String,
//     user: {
//     id:{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User"
//     },
//     username: String
// }
});




module.exports = mongoose.model("Nominee", NomineeSchema);
