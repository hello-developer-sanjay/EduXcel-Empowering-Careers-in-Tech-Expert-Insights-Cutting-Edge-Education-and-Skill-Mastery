const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true }, // Change 'username' to 'email'
  // Other user properties as needed
  googleId: String, // Add this field for Google OAuth
  resetToken: String,
  resetTokenExpiration: Date,
});

// Use passportLocalMongoose and configure it to use 'email' as the usernameField
userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

module.exports = mongoose.model('User', userSchema);
