var mongoose = require("mongoose");
var passportLocalMongoose = require ("passport-local-mongoose");


var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    fullName: String,
    email: String,
    avatar: String,
    aadhaar: Number,
    phone: Number,
    isAdmin: {type: Boolean, default: false},
    isDead: {type: Boolean, default: false},
    userData: String,
    nominee: [
        {
            type:mongoose.Schema.Types.ObjectId,
        ref: "Nominee"
    }
    ]
    })




UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", UserSchema);
