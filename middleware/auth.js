const jwt = require('jsonwebtoken');
const User = require('../models/userModel');


const auth = async (req, res, next) => {
  try {
    console.log('Auth middleware started');
    
    const authHeader = req.header('Authorization');
    
    if (!authHeader) {
      throw new Error('Authorization header not present');
    }
    
    const token = authHeader.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded.id });

    if (!user) {
      throw new Error('User not found');
    }

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    console.log('Auth middleware error:', error);
    res.status(401).json({ message: 'Authentication failed' });
  }
};

module.exports = auth;

