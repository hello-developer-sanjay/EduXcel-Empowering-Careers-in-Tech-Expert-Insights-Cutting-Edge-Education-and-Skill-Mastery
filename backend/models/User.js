const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
   password: { type: String },
  resetToken: String, // Add resetToken field
  resetTokenExpiration: Date, // Add resetTokenExpiration field
});
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', userSchema);
