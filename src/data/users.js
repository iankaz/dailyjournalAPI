// In-memory storage for users
const users = [
  {
    id: '1748398124959',
    username: 'testuser',
    email: 'test@example.com',
    password: '$2b$10$XOPbrlUPQdwdJUpSrIF6X.LbE14qsMmKGhM1A8W9iqDp0JxS0YyKO', // hashed 'password123'
    firstName: 'Test',
    lastName: 'User',
    role: 'user',
    isActive: true,
    lastLogin: '2024-03-25T12:00:00Z',
    preferences: {
      theme: 'light',
      notifications: true,
      language: 'en'
    },
    createdAt: '2024-03-25T12:00:00Z',
    updatedAt: '2024-03-25T12:00:00Z'
  }
];

// Helper functions
const findUserByEmail = (email) => users.find(user => user.email === email);
const findUserByUsername = (username) => users.find(user => user.username === username);
const addUser = (user) => {
  users.push(user);
  return user;
};

module.exports = {
  users,
  findUserByEmail,
  findUserByUsername,
  addUser
}; 