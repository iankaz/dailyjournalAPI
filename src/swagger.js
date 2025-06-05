const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Daily Journal API',
      version: '1.0.0',
      description: 'A RESTful API for a daily journal application',
    },
    servers: [
      {
        url: 'https://dailyjournal-api.onrender.com',
        description: 'Production server',
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          required: ['username', 'email'],
          properties: {
            _id: {
              type: 'string',
              description: 'The auto-generated id of the user',
            },
            username: {
              type: 'string',
              description: 'The username of the user',
              minLength: 3,
              maxLength: 30,
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'The email address of the user',
            },
            role: {
              type: 'string',
              enum: ['user', 'admin'],
              default: 'user',
              description: 'The role of the user',
            },
            isActive: {
              type: 'boolean',
              default: true,
              description: 'Whether the user account is active',
            },
            lastLogin: {
              type: 'string',
              format: 'date-time',
              description: 'The last login timestamp',
            },
            preferences: {
              type: 'object',
              properties: {
                theme: {
                  type: 'string',
                  enum: ['light', 'dark'],
                  default: 'light'
                },
                notifications: {
                  type: 'boolean',
                  default: true
                },
                language: {
                  type: 'string',
                  default: 'en'
                }
              }
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'The creation timestamp'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'The last update timestamp'
            }
          }
        },
        Journal: {
          type: 'object',
          required: ['title', 'content'],
          properties: {
            _id: {
              type: 'string',
              description: 'The auto-generated id of the journal entry'
            },
            title: {
              type: 'string',
              description: 'The title of the journal entry',
              maxLength: 100
            },
            content: {
              type: 'string',
              description: 'The content of the journal entry'
            },
            mood: {
              type: 'string',
              description: 'The mood associated with the entry',
              enum: [
                'happy', 'joyful', 'excited', 'enthusiastic', 'grateful', 'peaceful',
                'content', 'energetic', 'inspired', 'proud', 'optimistic', 'relaxed',
                'motivated', 'confident', 'cheerful', 'loved', 'blessed', 'accomplished',
                'neutral', 'calm', 'focused', 'thoughtful', 'contemplative', 'balanced',
                'mindful', 'present', 'centered', 'curious', 'reflective',
                'sad', 'angry', 'frustrated', 'anxious', 'stressed', 'tired',
                'overwhelmed', 'disappointed', 'worried', 'confused', 'lonely',
                'nervous', 'irritable', 'restless', 'melancholy', 'exhausted'
              ],
              default: 'neutral'
            },
            date: {
              type: 'string',
              format: 'date-time',
              description: 'The date of the entry'
            },
            userId: {
              type: 'string',
              description: 'The ID of the user who created the entry'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'The creation timestamp'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'The last update timestamp'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Error message'
            },
            error: {
              type: 'string',
              description: 'Detailed error information'
            }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.js']
};

module.exports = swaggerJsdoc(options); 