const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Assuming a reference to the User model
  email: { type: String, required: true }, // Make sure these fields are marked as required if needed
  username: { type: String, required: true },
  firstName: String,
  lastName: String,
  bio: String,
  profileImage: String,
});

module.exports = mongoose.model('UserProfile', userProfileSchema);
