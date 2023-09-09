const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  username: String,
  email: String,
  firstName: String,
  lastName: String,
  bio: String,
  profileImage: String, // You can store the image URL here
  // Add more profile fields as needed
});

module.exports = mongoose.model('UserProfile', userProfileSchema);
