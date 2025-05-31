const { users, findUserByEmail, findUserByUsername, addUser } = require('../data/users');

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    console.log('Fetching all users');
    // Return all users without passwords
    const usersWithoutPasswords = users.map(user => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
    console.log(`Found ${usersWithoutPasswords.length} users`);
    res.json(usersWithoutPasswords);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get a single user
exports.getUserById = async (req, res) => {
  try {
    console.log(`Fetching user with id: ${req.params.id}`);
    const user = users.find(u => u.id === req.params.id);
    if (!user) {
      console.log('User not found');
      return res.status(404).json({ error: 'User not found' });
    }
    // Remove password from response
    const { password, ...userWithoutPassword } = user;
    console.log('User found:', userWithoutPassword);
    res.json(userWithoutPassword);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: error.message });
  }
};

// Create a new user
exports.createUser = async (req, res) => {
  try {
    console.log('Creating new user:', req.body);
    const { username, email, password } = req.body;

    // Check if user already exists
    if (findUserByEmail(email) || findUserByUsername(username)) {
      return res.status(400).json({ error: 'Username or email already exists' });
    }

    const user = {
      id: Date.now().toString(),
      username,
      email,
      password,
      createdAt: new Date()
    };

    addUser(user);
    console.log('User created successfully:', user);

    // Don't send password in response
    const { password: _, ...userWithoutPassword } = user;
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: error.message });
  }
};

// Update a user
exports.updateUser = async (req, res) => {
  try {
    console.log(`Updating user with id: ${req.params.id}`);
    console.log('Update data:', req.body);
    
    const index = users.findIndex(u => u.id === req.params.id);
    if (index === -1) {
      console.log('User not found for update');
      return res.status(404).json({ error: 'User not found' });
    }

    // Update user
    users[index] = {
      ...users[index],
      ...req.body,
      id: req.params.id, // Preserve the original ID
      updatedAt: new Date()
    };

    // Don't send password in response
    const { password, ...userWithoutPassword } = users[index];
    console.log('User updated successfully:', userWithoutPassword);
    res.json(userWithoutPassword);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: error.message });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    console.log(`Deleting user with id: ${req.params.id}`);
    const index = users.findIndex(u => u.id === req.params.id);
    if (index === -1) {
      console.log('User not found for deletion');
      return res.status(404).json({ error: 'User not found' });
    }
    
    users.splice(index, 1);
    console.log('User deleted successfully');
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: error.message });
  }
}; 