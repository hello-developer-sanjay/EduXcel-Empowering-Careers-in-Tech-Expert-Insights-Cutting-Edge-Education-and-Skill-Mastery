const path = require('path');
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const UserProfile = require('../models/UserProfile');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const AWS = require('aws-sdk'); // Import AWS SDK
const multerS3 = require('multer-s3');

const s3 = new AWS.S3({
  accessKeyId: 'YOUR_ACCESS_KEY_ID',
  secretAccessKey: 'YOUR_SECRET_ACCESS_KEY',
  region: 'YOUR_S3_REGION',
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'YOUR_S3_BUCKET_NAME', // Replace with your S3 bucket name
    acl: 'public-read', // Set the appropriate ACL
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, 'profileImages/' + uuidv4() + '-' + file.originalname);
    },
  }),
  fileFilter: (req, file, callback) => {
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif']; // Add allowed extensions
    const ext = path.extname(file.originalname);
    if (!allowedExtensions.includes(ext)) {
      return callback(new Error('Only image files are allowed.'));
    }
    callback(null, true);
  },
});

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

    const userProfile = await UserProfile.findOneAndUpdate(
      { user: req.user._id },
      {
        firstName: req.body.firstName || '',
        lastName: req.body.lastName || '',
        bio: req.body.bio || '',
        profileImage: req.file ? req.file.location : '', // Use the S3 object URL
      },
      { new: true } // Use the { new: true } option to get the updated document
    );

    if (!userProfile) {
      console.log('User profile not found');
      return res.status(404).json({ message: 'User profile not found' });
    }

    console.log('Updated user profile:', userProfile);
    res.status(200).json(userProfile);
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: 'Error updating user profile' });
  }
});

module.exports = router;
