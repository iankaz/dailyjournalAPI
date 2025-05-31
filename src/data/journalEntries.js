// In-memory storage for journal entries
const journalEntries = [
  {
    id: '1748398124960',
    userId: '1748398124959',
    title: 'My First Entry',
    content: 'This is my first journal entry.',
    mood: 'happy',
    tags: ['first', 'personal'],
    location: {
      city: 'New York',
      country: 'USA'
    },
    weather: {
      condition: 'sunny',
      temperature: 72
    },
    isPrivate: false,
    wordCount: 7,
    readingTime: 1,
    createdAt: '2024-03-25T12:00:00Z',
    updatedAt: '2024-03-25T12:00:00Z'
  }
];

// Helper functions
const findById = (id) => journalEntries.find(entry => entry.id === id);
const findByUserId = (userId) => journalEntries.filter(entry => entry.userId === userId);
const create = (entry) => {
  const newEntry = {
    ...entry,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  journalEntries.push(newEntry);
  return newEntry;
};
const update = (id, updates) => {
  const index = journalEntries.findIndex(entry => entry.id === id);
  if (index === -1) return null;
  
  journalEntries[index] = {
    ...journalEntries[index],
    ...updates,
    updatedAt: new Date().toISOString()
  };
  return journalEntries[index];
};
const remove = (id) => {
  const index = journalEntries.findIndex(entry => entry.id === id);
  if (index === -1) return false;
  
  journalEntries.splice(index, 1);
  return true;
};

module.exports = {
  journalEntries,
  findById,
  findByUserId,
  create,
  update,
  remove
}; 