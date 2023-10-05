const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const UserProfile = require('../models/UserProfile');
const nodemailer = require('nodemailer');
const validator = require('validator'); // Import validator package
require('dotenv').config();
const dns = require('dns');

router.post('/', async (req, res) => {
  try {
    const { username, email, password, firstName, lastName, bio, profileImage } = req.body;

    // Basic email format validation using validator package
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Check if the domain has valid MX records (email server)
    const [, domain] = email.split('@');
    dns.resolveMx(domain, async (err, addresses) => {
      if (err || !addresses || addresses.length === 0) {
        return res.status(400).json({ message: 'Invalid email domain' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = new User({ username, email, password: hashedPassword });
      await newUser.save();

      // Create a user profile for the new user with additional information
      const newUserProfile = new UserProfile({
        user: newUser._id,
        username,
        email,
        firstName,
        lastName,
        bio,
        profileImage,
      });

      await newUserProfile.save();

      // Send a welcome email
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.EMAIL_ADDRESS,
          pass: process.env.EMAIL_PASSWORD,
        },
      });


      const mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to: email,
        subject: 'Welcome to Eduxcel - Your Learning Journey Begins Here!',
        html: `
        <html>
          <head>
            <style>
              /* Add your CSS styles here for better email formatting */
              body {
                font-family: 'Arial', sans-serif;
                background-color: #f7f7f7;
                margin: 0;
                padding: 0;
              }
    
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #ffffff;
                border-radius: 10px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              }
    
              h2 {
                font-size: 28px;
                color: #333;
                margin-bottom: 20px;
              }
    
              p {
                font-size: 16px;
                color: #555;
                margin-bottom: 16px;
              }
    
              ul {
                margin: 16px 0;
                padding-left: 20px;
              }
    
              li {
                font-size: 16px;
                color: #555;
                margin-bottom: 8px;
              }
    
              .button {
                display: inline-block;
                padding: 10px 20px;
                background-color: #007BFF;
                color: #ffffff;
                text-decoration: none;
                border-radius: 5px;
              }
    
              .button:hover {
                background-color: #0056b3;
              }
    
              .signature {
                font-size: 18px;
                font-weight: bold;
                margin-top: 20px;
              }
    
              /* Style for the image */
              .header-image {
                width: 100%;
                max-height: 200px; /* Adjust the max-height as needed */
                object-fit: cover;
                border-top-left-radius: 10px;
                border-top-right-radius: 10px;
              }
            </style>
          </head>
          <body>
            <div class="container">
             <img class="header-image" src="https://sanjaybasket.s3.ap-south-1.amazonaws.com/logo.png" alt="Welcome to Eduxcel">
              <h2>Dear ${username},</h2>
              <p>Welcome to <strong>Eduxcel</strong>! We are thrilled to have you as a part of our vibrant learning community.</p>
              <p>Your journey towards knowledge and growth begins now!</p>
              <p>Here are a few things you can do:</p>
              <ul>
                <li>Explore our wide range of courses and learning resources.</li>
                <li>Connect with instructors and fellow learners.</li>
                <li>Bookmark your favorite courses for easy access.</li>
                <li>Track your progress and achievements.</li>
              </ul>
              <p>If you have any questions or need assistance, please feel free to <a href="mailto:support@eduxcel.com" class="button">Contact Us</a>. Our dedicated support team is here to help you succeed.</p>
              <p>Stay curious, stay motivated, and keep learning!</p>
              <p class="signature">Sanjay Patidar</p>
              <p>Founder, Eduxcel</p>
              <!-- You can add more images, buttons, or links here -->
            </div>
          </body>
        </html>
      `,
    };
    


      await transporter.sendMail(mailOptions);

      res.status(201).json({ message: 'User created successfully' });
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Error creating user' });
  }
});

module.exports = router;
