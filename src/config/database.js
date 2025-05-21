const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Get the base MongoDB URI from environment variable
    const baseMongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017';
    
    // Extract the base URI without the database name
    const baseURI = baseMongoURI.split('/').slice(0, -1).join('/');
    
    // Add the correct database name
    const MONGODB_URI = `${baseURI}/dailyjournal`;
    
    console.log('Environment:', process.env.NODE_ENV);
    console.log('Attempting to connect to MongoDB...');
    console.log('MongoDB URI:', MONGODB_URI.replace(/\/\/[^:]+:[^@]+@/, '//****:****@')); // Hide credentials in logs
    
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    };
    
    await mongoose.connect(MONGODB_URI, options);
    console.log('Connected to MongoDB successfully');
    console.log('Using database:', mongoose.connection.name);
    
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