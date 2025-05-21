const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/dailyjournal';
    console.log('Attempting to connect to MongoDB...');
    console.log('MongoDB URI:', MONGODB_URI);
    
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    console.log('Please make sure MongoDB is running and the connection string is correct.');
    console.log('You can set the MONGODB_URI in your .env file or use the default local connection.');
    process.exit(1);
  }
};

module.exports = connectDB; 