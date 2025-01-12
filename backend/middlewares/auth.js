const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'User not found. Please log in again.' });
    }

    req.user = user; // Attach user to request
    next();
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed. Please log in.' });
  }
};

module.exports = authMiddleware;
