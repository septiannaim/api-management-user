const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nama wajib diisi'],
    trim: true,
    minlength: [2, 'Nama minimal 2 karakter'],
    maxlength: [50, 'Nama maksimal 50 karakter']
  },
  email: {
    type: String,
    required: [true, 'Email wajib diisi'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Format email tidak valid'
    ]
  },
  phone: {
    type: String,
    required: [true, 'Nomor telepon wajib diisi'],
    trim: true,
    match: [
      /^[0-9]{10,}$/,
      'Nomor telepon hanya boleh mengandung angka dan minimal 10 karakter'
    ]
  },
  isActive: {
    type: Boolean,
    default: true
  },
  department: {
    type: String,
    required: [true, 'Departemen wajib diisi'],
    trim: true,
    minlength: [2, 'Departemen minimal 2 karakter'],
    maxlength: [50, 'Departemen maksimal 50 karakter']
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Index untuk optimasi query
userSchema.index({ email: 1 });
userSchema.index({ isActive: 1 });

module.exports = mongoose.model('User', userSchema); 