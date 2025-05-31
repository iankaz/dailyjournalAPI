const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { findUserByEmail, findUserByUsername, addUser } = require('../data/users');

// Register a new user
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    if (findUserByEmail(email) || findUserByUsername(username)) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = {
      id: Date.now().toString(), // Simple ID generation
      username,
      email,
      password: hashedPassword,
      createdAt: new Date()
    };

    // Add user to store
    addUser(user);

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '1d' });

    res.status(201).json({
      user: {
        id: user.id,
        username,
        email
      },
      token
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: error.message });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '1d' });

    res.json({
      user: {
        id: user.id,
        username: user.username,
        email
      },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: error.message });
  }
};

// Logout user (client-side token removal)
exports.logout = (req, res) => {
  res.json({ message: 'Logged out successfully' });
}; 