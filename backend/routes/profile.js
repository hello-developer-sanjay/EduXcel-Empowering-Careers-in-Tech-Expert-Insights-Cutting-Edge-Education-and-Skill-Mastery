const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const UserProfile = require('../models/UserProfile');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');

const s3 = new AWS.S3({
  accessKeyId: '0EgD/s8cvM0UYF/KghYfxgYGlJzNcM3ecuRfGUyJ',
  secretAccessKey: 'AKIA5BQ4NJCXMEDIBQUS',
  region: 'ap-south-1',
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'profileusersupload',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, 'profileImages/' + uuidv4() + '-' + file.originalname);
    },
  }),
  fileFilter: (req, file, callback) => {
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
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
    const userProfile = await UserProfile.findOne({ user: req.user._id });

    if (!userProfile) {
      return res.status(404).json({ message: 'User profile not found' });
    }

    res.status(200).json(userProfile);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Error fetching user profile' });
  }
});

// Update user profile route with file upload
router.put('/', authMiddleware, upload.single('profileImage'), async (req, res) => {
  try {
    const userProfile = await UserProfile.findOneAndUpdate(
      { user: req.user._id },
      {
        firstName: req.body.firstName || '',
        lastName: req.body.lastName || '',
        bio: req.body.bio || '',
        profileImage: req.file ? req.file.location : '', // Use the S3 object URL
      },
      { new: true }
    );

    if (!userProfile) {
      return res.status(404).json({ message: 'User profile not found' });
    }

    res.status(200).json(userProfile);
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: 'Error updating user profile' });
  }
});

module.exports = router;
