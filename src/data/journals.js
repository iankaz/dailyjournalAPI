// In-memory journal store
const journals = [];

// Helper functions
const getAllJournals = () => [...journals];
const getJournalById = (id) => journals.find(journal => journal.id === id);
const createJournal = (journal) => {
  const newJournal = {
    id: Date.now().toString(),
    ...journal,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  journals.push(newJournal);
  return newJournal;
};
const updateJournal = (id, updates) => {
  const index = journals.findIndex(journal => journal.id === id);
  if (index === -1) return null;
  
  journals[index] = {
    ...journals[index],
    ...updates,
    updatedAt: new Date()
  };
  return journals[index];
};
const deleteJournal = (id) => {
  const index = journals.findIndex(journal => journal.id === id);
  if (index === -1) return false;
  
  journals.splice(index, 1);
  return true;
};

module.exports = {
  journals,
  getAllJournals,
  getJournalById,
  createJournal,
  updateJournal,
  deleteJournal
}; 