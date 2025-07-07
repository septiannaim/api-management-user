const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();

const connectDB = require('./config/database');
const errorHandler = require('./middleware/errorHandler');

// Import routes
const userRoutes = require('./routes/users');

// Connect to database
connectDB();

const app = express();

// Security middleware
app.use(helmet());

// CORS
app.use(cors());

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'User Management API',
      version: '1.0.0',
      description: 'API untuk aplikasi manajemen user dengan CRUD operations',
      contact: {
        name: 'API Support',
        email: 'support@example.com'
      }
    },
    servers: [
      {
        url: process.env.NODE_ENV === 'production' 
          ? 'https://your-vercel-app.vercel.app' 
          : `http://localhost:${process.env.PORT || 3000}`,
        description: process.env.NODE_ENV === 'production' ? 'Production server' : 'Development server'
      }
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          required: ['name', 'email', 'phone', 'department'],
          properties: {
            _id: {
              type: 'string',
              description: 'Auto-generated user ID'
            },
            name: {
              type: 'string',
              description: 'User\'s full name',
              minLength: 2,
              maxLength: 50
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User\'s email address (unique)'
            },
            phone: {
              type: 'string',
              pattern: '^[0-9]{10,}$',
              description: 'User\'s phone number (numeric, min 10 digits)'
            },
            isActive: {
              type: 'boolean',
              default: true,
              description: 'User\'s active status'
            },
            department: {
              type: 'string',
              description: 'User\'s department',
              minLength: 2,
              maxLength: 50
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'User creation timestamp'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'User last update timestamp'
            }
          }
        }
      }
    }
  },
  apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Routes
app.use('/api/users', userRoutes);

// Swagger documentation route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Root route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'User Management API',
    version: '1.0.0',
    documentation: '/api-docs',
    endpoints: {
      users: '/api/users',
      health: '/health'
    }
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route tidak ditemukan'
  });
});

// Error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`API Documentation: http://localhost:${PORT}/api-docs`);
});

module.exports = app; 