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
    
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, // Increased timeout
      socketTimeoutMS: 45000,
      connectTimeoutMS: 30000, // Added connection timeout
      retryWrites: true,
      w: 'majority',
      dbName: 'dailyjournal' // Explicitly set the database name
    };
    
    // Try to connect to MongoDB
    await mongoose.connect(MONGODB_URI, options);
    
    // If we get here, connection was successful
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
    console.log('\nTroubleshooting steps:');
    console.log('1. Check if your MongoDB URI is correct in .env file');
    console.log('2. If using MongoDB Atlas:');
    console.log('   - Verify your IP address is whitelisted');
    console.log('   - Check if your username and password are correct');
    console.log('   - Ensure your cluster is running');
    console.log('3. If using local MongoDB:');
    console.log('   - Make sure MongoDB service is running');
    console.log('   - Check if the port is correct (default: 27017)');
    console.log('\nYour current MONGODB_URI (with credentials hidden):');
    console.log(process.env.MONGODB_URI.replace(/\/\/[^:]+:[^@]+@/, '//****:****@'));
    process.exit(1);
  }
};

module.exports = connectDB; 