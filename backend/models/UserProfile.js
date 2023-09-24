const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  username: {
    type: String,
  
  },
  email: {
    type: String,
   
  },
  firstName: String,
  lastName: String,
  bio: String,
  profileImage: String,
});

module.exports = mongoose.model('UserProfile', userProfileSchema);
