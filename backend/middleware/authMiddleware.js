const User = require('../models/User'); 
const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    console.log('Received token:', token);

    try {
      // Verify the token using the correct secret
      const decoded = jwt.verify(token, 'fRwD8ZcX#k5H*J!yN&2G@pQbS9v6E$tA'); 
      console.log('Decoded token:', decoded);

      // Add the user object to the request
      const user = await User.findById(decoded.userId);
      req.user = user;

      next(); // Continue with the next middleware or route
    } catch (verifyError) {
      console.error('JWT Verification Error:', verifyError);
      throw verifyError;
    }
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({ error: 'Please authenticate' });
  }
};

module.exports = authMiddleware;
