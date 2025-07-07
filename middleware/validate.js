const { body, validationResult } = require('express-validator');

// Middleware untuk menangani hasil validasi
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation Error');
    error.array = () => errors.array();
    return next(error);
  }
  next();
};

// Validasi untuk create user
const validateCreateUser = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Nama minimal 2 karakter dan maksimal 50 karakter'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Format email tidak valid'),
  
  body('phone')
    .matches(/^[0-9]{10,}$/)
    .withMessage('Nomor telepon hanya boleh mengandung angka dan minimal 10 karakter'),
  
  body('department')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Departemen minimal 2 karakter dan maksimal 50 karakter'),
  
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('Status aktif harus berupa boolean'),
  
  handleValidationErrors
];

// Validasi untuk update user
const validateUpdateUser = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Nama minimal 2 karakter dan maksimal 50 karakter'),
  
  body('email')
    .optional()
    .isEmail()
    .normalizeEmail()
    .withMessage('Format email tidak valid'),
  
  body('phone')
    .optional()
    .matches(/^[0-9]{10,}$/)
    .withMessage('Nomor telepon hanya boleh mengandung angka dan minimal 10 karakter'),
  
  body('department')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Departemen minimal 2 karakter dan maksimal 50 karakter'),
  
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('Status aktif harus berupa boolean'),
  
  handleValidationErrors
];

module.exports = {
  validateCreateUser,
  validateUpdateUser
}; 