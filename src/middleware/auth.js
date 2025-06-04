const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to authenticate JWT token
exports.authenticateJWT = passport.authenticate('jwt', { session: false });

// Middleware to check if user is authenticated
exports.isAuthenticated = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  next();
};

// Middleware to verify refresh token
exports.verifyRefreshToken = async (req, res, next) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ error: 'Refresh token is required' });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key');
    const user = await User.findById(decoded.id);

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(401).json({ error: 'Invalid refresh token' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid refresh token' });
  }
};

// Middleware to handle OAuth errors
exports.handleOAuthError = (err, req, res, next) => {
  console.error('OAuth Error:', err);
  res.status(401).json({
    error: 'Authentication failed',
    message: err.message
  });
};

// Middleware to check if user is admin
exports.isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

module.exports = {
  authenticateJWT: exports.authenticateJWT,
  isAuthenticated: exports.isAuthenticated,
  verifyRefreshToken: exports.verifyRefreshToken,
  handleOAuthError: exports.handleOAuthError,
  isAdmin: exports.isAdmin
}; 