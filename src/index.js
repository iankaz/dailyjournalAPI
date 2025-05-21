require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const cors = require('cors');
const connectDB = require('./config/database');
const journalRoutes = require('./routes/journalRoutes');

const app = express();
const DEFAULT_PORT = process.env.PORT || 3000;
const ALTERNATIVE_PORTS = [3001, 3002, 3003, 3004, 3005];

// CORS configuration
const corsOptions = {
  origin: '*', // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  credentials: true,
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.json({
    message: "Welcome to the Daily Journal API",
    endpoints: {
      getAllEntries: "/api/journal",
      getSingleEntry: "/api/journal/:id",
      createEntry: "/api/journal (POST)",
      updateEntry: "/api/journal/:id (PUT)",
      deleteEntry: "/api/journal/:id (DELETE)",
      documentation: "/api-docs"
    }
  });
});

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Daily Journal API',
      version: '1.0.0',
      description: 'A simple API for managing daily journal entries',
    },
    servers: [
      {
        url: process.env.NODE_ENV === 'production' 
          ? 'https://cse341-rlcp.onrender.com'
          : `http://localhost:${DEFAULT_PORT}`,
        description: process.env.NODE_ENV === 'production' ? 'Production server' : 'Development server'
      },
      ...ALTERNATIVE_PORTS.map(port => ({
        url: `http://localhost:${port}`,
        description: `Alternative server (port ${port})`
      }))
    ],
  },
  apis: ['./src/routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use('/api/journal', journalRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error details:', {
    message: err.message,
    stack: err.stack,
    status: err.status || 500
  });
  
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
      status: err.status || 500
    }
  });
});

// 404 handler - must be after all other routes
app.use((req, res) => {
  console.log('404 Not Found:', req.method, req.url);
  res.status(404).json({
    error: {
      message: `Cannot ${req.method} ${req.url}`,
      status: 404
    }
  });
});

// Function to try starting server on different ports
const startServer = (port) => {
  return new Promise((resolve, reject) => {
    const server = app.listen(port)
      .once('listening', () => {
        console.log(`Server is running on port ${port}`);
        console.log(`API Documentation available at http://localhost:${port}/api-docs`);
        resolve(server);
      })
      .once('error', (err) => {
        if (err.code === 'EADDRINUSE') {
          console.log(`Port ${port} is in use, trying next port...`);
          reject(err);
        } else {
          console.error('Server error:', err);
          reject(err);
        }
      });
  });
};

// Start the application
const startApp = async () => {
  try {
    // Connect to MongoDB
    await connectDB();
    
    // Try to start server on default port
    await startServer(DEFAULT_PORT)
      .catch(() => {
        // If default port fails, try alternative ports
        const tryNextPort = async (ports) => {
          if (ports.length === 0) {
            console.error('All ports are in use. Please free up a port or specify a different port in .env file.');
            process.exit(1);
          }
          try {
            await startServer(ports[0]);
          } catch (err) {
            console.log(`Trying port ${ports[1]}...`);
            await tryNextPort(ports.slice(1));
          }
        };
        tryNextPort(ALTERNATIVE_PORTS);
      });
  } catch (error) {
    console.error('Application startup error:', error);
    process.exit(1);
  }
};

startApp(); 