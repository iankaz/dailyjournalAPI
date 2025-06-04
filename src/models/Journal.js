const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  mood: {
    type: String,
    enum: [
      // Positive moods
      'happy', 'joyful', 'excited', 'enthusiastic', 'grateful', 'peaceful',
      'content', 'energetic', 'inspired', 'proud', 'optimistic', 'relaxed',
      'motivated', 'confident', 'cheerful', 'loved', 'blessed', 'accomplished',
      
      // Neutral moods
      'neutral', 'calm', 'focused', 'thoughtful', 'contemplative', 'balanced',
      'mindful', 'present', 'centered', 'curious', 'reflective',
      
      // Challenging moods
      'sad', 'angry', 'frustrated', 'anxious', 'stressed', 'tired',
      'overwhelmed', 'disappointed', 'worried', 'confused', 'lonely',
      'nervous', 'irritable', 'restless', 'melancholy', 'exhausted'
    ],
    default: 'neutral'
  },
  date: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Add index for faster queries
journalSchema.index({ userId: 1, date: -1 });

const Journal = mongoose.model('Journal', journalSchema);

module.exports = Journal; 