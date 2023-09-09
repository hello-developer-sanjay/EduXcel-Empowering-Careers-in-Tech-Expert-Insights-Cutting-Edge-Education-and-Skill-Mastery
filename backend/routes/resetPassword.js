// resetPassword.js
const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Import the User model
const bcrypt = require('bcrypt');
router.post('/', async (req, res) => {
    const { newPassword, token } = req.body;
  
    try {
      // Find the user with the matching reset token
      const user = await User.findOne({ resetToken: token });
  
      if (!user) {
        return res.status(404).json({ message: 'Invalid or expired token' });
      }
  
      // Check if the reset token has expired
      if (user.resetTokenExpiration < Date.now()) {
        return res.status(400).json({ message: 'Token has expired' });
      }
  
      // Hash the new password before updating
      const hashedPassword = await bcrypt.hash(newPassword, 10);
  
      // Update the user's password and reset the token
      user.password = hashedPassword;
      user.resetToken = null;
      user.resetTokenExpiration = null;
  
      await user.save();
  
      res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
      console.error('Password reset error:', error);
      res.status(500).json({ message: 'Error resetting password' });
    }
  });
module.exports = router;
