var mongoose = require("mongoose");
var passportLocalMongoose = require ("passport-local-mongoose");


var NomineeSchema = new mongoose.Schema({

    fullName: String,
    phone: Number,
    email: String,
    aadhaar: Number,
    relation: String,
    user: {
    id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    username: String
}
});




module.exports = mongoose.model("Nominee", NomineeSchema);
