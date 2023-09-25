const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true }, // Keep it required
  password: String, // Password field should not be required here
  resetToken: String,
  resetTokenExpiration: Date,
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', userSchema);
