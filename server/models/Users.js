const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    age: Number,
    phoneNo: String,
    password: String,
    role: Number
},{ versionKey: false });
  

module.exports = User = mongoose.model('user', UserSchema);
