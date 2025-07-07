const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();

// Security middleware
app.use(helmet());

// CORS
app.use(cors());

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use(morgan('dev'));

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
        url: 'http://localhost:3000',
        description: 'Development server'
      }
    ]
  },
  apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Mock routes for testing without database
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running (Test Mode)',
    timestamp: new Date().toISOString(),
    environment: 'test'
  });
});

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'User Management API (Test Mode)',
    version: '1.0.0',
    documentation: '/api-docs',
    endpoints: {
      users: '/api/users',
      health: '/health'
    },
    note: 'This is running in test mode without database connection'
  });
});

// Mock user routes
app.post('/api/users', (req, res) => {
  const { name, email, phone, department, isActive } = req.body;
  
  // Basic validation
  if (!name || !email || !phone || !department) {
    return res.status(400).json({
      success: false,
      error: 'Nama, email, phone, dan department wajib diisi'
    });
  }
  
  // Mock response
  res.status(201).json({
    success: true,
    message: 'User berhasil dibuat (Test Mode)',
    data: {
      _id: 'test-id-' + Date.now(),
      name,
      email,
      phone,
      department,
      isActive: isActive !== undefined ? isActive : true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  });
});

app.get('/api/users', (req, res) => {
  // Mock users data
  const mockUsers = [
    {
      _id: 'test-id-1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '081234567890',
      department: 'IT',
      isActive: true,
      createdAt: '2023-09-01T10:00:00.000Z',
      updatedAt: '2023-09-01T10:00:00.000Z'
    },
    {
      _id: 'test-id-2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '081234567891',
      department: 'HR',
      isActive: true,
      createdAt: '2023-09-01T11:00:00.000Z',
      updatedAt: '2023-09-01T11:00:00.000Z'
    }
  ];
  
  res.status(200).json({
    success: true,
    message: 'Data users berhasil diambil (Test Mode)',
    data: mockUsers,
    pagination: {
      page: 1,
      limit: 10,
      total: 2,
      pages: 1
    }
  });
});

app.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  
  // Mock user data
  const mockUser = {
    _id: id,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '081234567890',
    department: 'IT',
    isActive: true,
    createdAt: '2023-09-01T10:00:00.000Z',
    updatedAt: '2023-09-01T10:00:00.000Z'
  };
  
  res.status(200).json({
    success: true,
    message: 'Data user berhasil diambil (Test Mode)',
    data: mockUser
  });
});

app.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  
  // Mock updated user
  const mockUpdatedUser = {
    _id: id,
    name: updateData.name || 'John Doe',
    email: updateData.email || 'john@example.com',
    phone: updateData.phone || '081234567890',
    department: updateData.department || 'IT',
    isActive: updateData.isActive !== undefined ? updateData.isActive : true,
    createdAt: '2023-09-01T10:00:00.000Z',
    updatedAt: new Date().toISOString()
  };
  
  res.status(200).json({
    success: true,
    message: 'User berhasil diperbarui (Test Mode)',
    data: mockUpdatedUser
  });
});

app.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  
  res.status(200).json({
    success: true,
    message: `User dengan ID ${id} berhasil dihapus (Test Mode)`,
    data: {}
  });
});

// Swagger documentation route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route tidak ditemukan'
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Test server running on port ${PORT}`);
  console.log(`📚 API Documentation: http://localhost:${PORT}/api-docs`);
  console.log(`🏥 Health Check: http://localhost:${PORT}/health`);
  console.log(`👥 Users API: http://localhost:${PORT}/api/users`);
  console.log(`\n💡 Note: This is running in test mode without database connection`);
  console.log(`💡 To test with real database, set MONGODB_URI and run: npm start`);
});

module.exports = app; 