const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  googleId: String, // Store Google ID for Google-authenticated users
  resetToken: String,
  resetTokenExpiration: Date,
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', userSchema);
