const { getAllJournals, getJournalById, createJournal, updateJournal, deleteJournal } = require('../data/journals');

// Get all journal entries
exports.getAllEntries = async (req, res) => {
  try {
    console.log('Fetching all journal entries');
    const entries = getAllJournals();
    console.log(`Found ${entries.length} entries`);
    res.json(entries);
  } catch (error) {
    console.error('Error fetching entries:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get a single journal entry
exports.getEntryById = async (req, res) => {
  try {
    console.log(`Fetching journal entry with id: ${req.params.id}`);
    const entry = getJournalById(req.params.id);
    if (!entry) {
      console.log('Entry not found');
      return res.status(404).json({ error: 'Journal entry not found' });
    }
    console.log('Entry found:', entry);
    res.json(entry);
  } catch (error) {
    console.error('Error fetching entry:', error);
    res.status(500).json({ error: error.message });
  }
};

// Create a new journal entry
exports.createEntry = async (req, res) => {
  try {
    console.log('Creating new journal entry:', req.body);
    const entry = createJournal({
      ...req.body,
      userId: req.user.id // Associate entry with the authenticated user
    });
    console.log('Entry created successfully:', entry);
    res.status(201).json(entry);
  } catch (error) {
    console.error('Error creating entry:', error);
    res.status(500).json({ error: error.message });
  }
};

// Update a journal entry
exports.updateEntry = async (req, res) => {
  try {
    console.log(`Updating journal entry with id: ${req.params.id}`);
    console.log('Update data:', req.body);
    
    const entry = updateJournal(req.params.id, req.body);
    if (!entry) {
      console.log('Entry not found for update');
      return res.status(404).json({ error: 'Journal entry not found' });
    }

    console.log('Entry updated successfully:', entry);
    res.json(entry);
  } catch (error) {
    console.error('Error updating entry:', error);
    res.status(500).json({ error: error.message });
  }
};

// Delete a journal entry
exports.deleteEntry = async (req, res) => {
  try {
    console.log(`Deleting journal entry with id: ${req.params.id}`);
    const success = deleteJournal(req.params.id);
    if (!success) {
      console.log('Entry not found for deletion');
      return res.status(404).json({ error: 'Journal entry not found' });
    }
    console.log('Entry deleted successfully');
    res.json({ message: 'Journal entry deleted successfully' });
  } catch (error) {
    console.error('Error deleting entry:', error);
    res.status(500).json({ error: error.message });
  }
}; 