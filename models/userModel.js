const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name : {type:String, required:true},
    email: {type:String, required:true},
    phone: {type:Number, required:true},
    password: {type:String, required:true},
    is_admin: {type:Boolean, default: false }
});

module.exports = mongoose.model("User", userSchema);