const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../models/User'); // Import the User model
require('dotenv').config(); // Import and configure dotenv for environment variables

router.post('/', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate a reset token and set its expiration time
    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetToken = resetToken;
    user.resetTokenExpiration = Date.now() + 3600000; // Token expires in 1 hour

    await user.save();

    // Create and configure a transporter for sending emails
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // Use Gmail as your email service provider
      auth: {
        user: process.env.EMAIL_ADDRESS, // Use the email address from your environment variables
        pass: process.env.EMAIL_PASSWORD, // Use the email password from your environment variables
      },
    });

    // Define email content
    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: email,
      subject: 'Password Reset Request from Eduxcel',
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
              <img class="header-image" src="https://sanjaybasket.s3.ap-south-1.amazonaws.com/logo.png" alt="Password Reset Request">
              <h2>Dear Eduxcel User,</h2>
              <p>You are receiving this email because you (or someone else) has requested a password reset for your Eduxcel account.</p>
              <p>Your reset token is: <strong>${resetToken}</strong></p>
              <p>To complete the password reset process, please click on the following link:</p>
              <p><a href="https://eduxcel.vercel.app/reset?token=${resetToken}" class="button">Reset Password</a></p>
              <p>If you did not make this request, please disregard this email, and your password will remain unchanged.</p>
              <p>Thank you for choosing Eduxcel for your learning needs.</p>
              <p class="signature">Sanjay Patidar</p>
              <p>Founder, Eduxcel</p>
              <!-- You can add more images, buttons, or links here -->
            </div>
          </body>
        </html>
      `,
    };
    
    
    // Send the email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Password reset email sent successfully' });
  } catch (error) {
    console.error('Forgot Password error:', error);
    res.status(500).json({ message: 'Error sending password reset email' });
  }
});

module.exports = router;
