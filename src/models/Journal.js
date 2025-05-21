const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
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
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Journal', journalSchema); 