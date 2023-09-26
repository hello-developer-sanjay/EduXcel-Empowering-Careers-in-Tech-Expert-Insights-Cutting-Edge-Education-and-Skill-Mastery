const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: String, // Keep the password field
  googleId: String, // Add a field to store Google ID
  resetToken: String,
  resetTokenExpiration: Date,
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', userSchema);
