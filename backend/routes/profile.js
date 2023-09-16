const path = require('path');
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const UserProfile = require('../models/UserProfile');
const multer = require('multer');
const fs = require('fs'); // Require the 'fs' module

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the directory where uploaded images will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Set the filename to be unique
  },
});

const upload = multer({ storage: storage });

// Fetch user profile route
router.get('/', authMiddleware, async (req, res) => {
  try {
    console.log('Received a request to fetch user profile');
    console.log('User ID:', req.user._id);

    const userProfile = await UserProfile.findOne({ user: req.user._id });

    if (!userProfile) {
      console.log('User profile not found');
      return res.status(404).json({ message: 'User profile not found' });
    }

    console.log('Fetched user profile:', userProfile);
    res.status(200).json(userProfile);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Error fetching user profile' });
  }
});

// Update user profile route with file upload
router.put('/', authMiddleware, upload.single('profileImage'), async (req, res) => {
  try {
    console.log('Received a request to update user profile');
    console.log('User ID:', req.user._id);
    console.log('Request Body:', req.body);

    const userProfile = await UserProfile.findOne({ user: req.user._id });

    if (!userProfile) {
      console.log('User profile not found');
      return res.status(404).json({ message: 'User profile not found' });
    }

    // Remove the old profile image if it exists
    if (userProfile.profileImage) {
      const imagePath = path.join(__dirname, '..', userProfile.profileImage);
      fs.unlinkSync(imagePath); // Remove the old image
    }

    userProfile.firstName = req.body.firstName || '';
    userProfile.lastName = req.body.lastName || '';
    userProfile.bio = req.body.bio || '';
    
    if (req.file) {
      userProfile.profileImage = path.join('uploads', req.file.filename);
    }

    // Save the updated user profile
    await userProfile.save();

    console.log('Updated user profile:', userProfile);
    res.status(200).json(userProfile);
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: 'Error updating user profile' });
  }
});

module.exports = router;
