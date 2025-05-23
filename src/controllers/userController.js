const User = require('../models/User');

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    console.log('Fetching all users');
    const users = await User.find().select('-password');
    console.log(`Found ${users.length} users`);
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get a single user
exports.getUserById = async (req, res) => {
  try {
    console.log(`Fetching user with id: ${req.params.id}`);
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      console.log('User not found');
      return res.status(404).json({ error: 'User not found' });
    }
    console.log('User found:', user);
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: error.message });
  }
};

// Create a new user
exports.createUser = async (req, res) => {
  try {
    console.log('Creating new user:', req.body);
    const user = new User(req.body);
    await user.save();
    console.log('User created successfully:', user);
    // Don't send password in response
    const userResponse = user.toObject();
    delete userResponse.password;
    res.status(201).json(userResponse);
  } catch (error) {
    console.error('Error creating user:', error);
    if (error.code === 11000) {
      return res.status(400).json({ 
        error: 'Username or email already exists' 
      });
    }
    res.status(500).json({ error: error.message });
  }
};

// Update a user
exports.updateUser = async (req, res) => {
  try {
    console.log(`Updating user with id: ${req.params.id}`);
    console.log('Update data:', req.body);
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      console.log('User not found for update');
      return res.status(404).json({ error: 'User not found' });
    }

    console.log('User updated successfully:', user);
    res.json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    if (error.code === 11000) {
      return res.status(400).json({ 
        error: 'Username or email already exists' 
      });
    }
    res.status(500).json({ error: error.message });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    console.log(`Deleting user with id: ${req.params.id}`);
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      console.log('User not found for deletion');
      return res.status(404).json({ error: 'User not found' });
    }
    console.log('User deleted successfully');
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: error.message });
  }
}; 