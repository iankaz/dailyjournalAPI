const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Get the MongoDB URI from environment variable
    const MONGODB_URI = process.env.MONGODB_URI;
    
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }
    
    console.log('Environment:', process.env.NODE_ENV);
    console.log('Attempting to connect to MongoDB...');
    console.log('MongoDB URI:', MONGODB_URI.replace(/\/\/[^:]+:[^@]+@/, '//****:****@')); // Hide credentials in logs
    
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };
    
    await mongoose.connect(MONGODB_URI, options);
    console.log('Connected to MongoDB successfully');
    console.log('Using database:', mongoose.connection.name);
    
    // Verify we're connected to the correct database
    if (mongoose.connection.name !== 'dailyjournal') {
      console.warn(`Warning: Connected to database '${mongoose.connection.name}' instead of 'dailyjournal'`);
    }
    
    // Log connection state
    console.log('MongoDB connection state:', mongoose.connection.readyState);
    
    // Add connection event listeners
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });
    
    mongoose.connection.on('reconnected', () => {
      console.log('MongoDB reconnected');
    });
    
  } catch (error) {
    console.error('MongoDB connection error:', error);
    console.log('Please make sure MongoDB is running and the connection string is correct.');
    console.log('You can set the MONGODB_URI in your .env file or use the default local connection.');
    process.exit(1);
  }
};

module.exports = connectDB; 