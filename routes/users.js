const express = require('express');
const router = express.Router();
const {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser
} = require('../controllers/userController');
const { validateCreateUser, validateUpdateUser } = require('../middleware/validate');

// Create user
router.post('/', validateCreateUser, createUser);

// Get all users
router.get('/', getUsers);

// Get single user
router.get('/:id', getUser);

// Update user
router.put('/:id', validateUpdateUser, updateUser);

// Delete user
router.delete('/:id', deleteUser);

module.exports = router; 