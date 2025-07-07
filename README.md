# User Management API

API untuk aplikasi manajemen user dengan fitur CRUD (Create, Read, Update, Delete) yang dibangun menggunakan Node.js, Express.js, dan MongoDB.

## 🚀 Fitur

- ✅ **CRUD Operations**: Create, Read, Update, Delete user
- ✅ **Validasi Input**: Email format, phone number validation
- ✅ **Error Handling**: Pesan error yang informatif
- ✅ **Dokumentasi API**: Swagger/OpenAPI documentation
- ✅ **Pagination**: Pagination untuk list users
- ✅ **Filtering & Search**: Filter by status, department, dan search
- ✅ **Security**: Helmet, CORS, input sanitization
- ✅ **Ready for Vercel**: Konfigurasi untuk deployment di Vercel

## 📋 Requirements

- Node.js (versi 16 atau lebih tinggi)
- MongoDB Atlas account (untuk database cloud)
- npm atau yarn

## 🛠️ Instalasi

### 1. Clone Repository
```bash
git clone <repository-url>
cd user-management-api
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Buat file `.env` berdasarkan `env.example`:
```bash
cp env.example .env
```

Isi file `.env` dengan konfigurasi yang sesuai:
```env
# MongoDB Connection String (dari MongoDB Atlas)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/user-management?retryWrites=true&w=majority

# Port untuk development
PORT=3000

# Environment
NODE_ENV=development
```

### 4. Setup MongoDB Atlas
1. Buat account di [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Buat cluster baru
3. Buat database user dengan password
4. Whitelist IP address (0.0.0.0/0 untuk development)
5. Copy connection string dan paste ke `MONGODB_URI`

### 5. Jalankan Aplikasi

**Development mode:**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

Server akan berjalan di `http://localhost:3000`

## 📚 Dokumentasi API

### Base URL
- **Development**: `http://localhost:3000`
- **Production**: `https://your-app.vercel.app`

### Swagger Documentation
Akses dokumentasi lengkap di: `/api-docs`

### Endpoints

#### 1. Create User
```http
POST /api/users
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "081234567890",
  "department": "IT",
  "isActive": true
}
```

**Response:**
```json
{
  "success": true,
  "message": "User berhasil dibuat",
  "data": {
    "_id": "64f1a2b3c4d5e6f7g8h9i0j1",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "081234567890",
    "department": "IT",
    "isActive": true,
    "createdAt": "2023-09-01T10:00:00.000Z",
    "updatedAt": "2023-09-01T10:00:00.000Z"
  }
}
```

#### 2. Get All Users
```http
GET /api/users
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `isActive` (optional): Filter by active status (true/false)
- `department` (optional): Filter by department
- `search` (optional): Search in name, email, or department

**Example:**
```http
GET /api/users?page=1&limit=5&isActive=true&department=IT&search=john
```

#### 3. Get User by ID
```http
GET /api/users/:id
```

#### 4. Update User
```http
PUT /api/users/:id
```

**Request Body:**
```json
{
  "name": "John Doe Updated",
  "email": "john.updated@example.com",
  "phone": "081234567891",
  "department": "HR",
  "isActive": false
}
```

#### 5. Delete User
```http
DELETE /api/users/:id
```

### Validasi

#### Email
- Format email yang valid
- Unique (tidak boleh duplikat)

#### Phone Number
- Hanya boleh mengandung angka
- Minimal 10 karakter

#### Name & Department
- Minimal 2 karakter
- Maksimal 50 karakter

## 🚀 Deployment ke Vercel

### 1. Push ke GitHub
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. Deploy di Vercel
1. Buka [Vercel](https://vercel.com)
2. Login dengan GitHub account
3. Klik "New Project"
4. Import repository dari GitHub
5. Konfigurasi environment variables:
   - `MONGODB_URI`: Connection string MongoDB Atlas
   - `NODE_ENV`: `production`
6. Klik "Deploy"

### 3. Environment Variables di Vercel
Di dashboard Vercel, tambahkan environment variables:
- `MONGODB_URI`: MongoDB Atlas connection string
- `NODE_ENV`: `production`

## 📁 Struktur Project

```
user-management-api/
├── config/
│   └── database.js          # Database configuration
├── controllers/
│   └── userController.js    # User CRUD operations
├── middleware/
│   ├── errorHandler.js      # Error handling middleware
│   └── validate.js          # Input validation
├── models/
│   └── User.js              # User model schema
├── routes/
│   └── users.js             # User routes
├── index.js                 # Main server file
├── package.json             # Dependencies
├── vercel.json              # Vercel configuration
├── env.example              # Environment variables example
└── README.md                # Documentation
```

## 🧪 Testing API

### Menggunakan cURL

**Create User:**
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "081234567890",
    "department": "IT",
    "isActive": true
  }'
```

**Get All Users:**
```bash
curl http://localhost:3000/api/users
```

**Get User by ID:**
```bash
curl http://localhost:3000/api/users/USER_ID
```

**Update User:**
```bash
curl -X PUT http://localhost:3000/api/users/USER_ID \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe Updated",
    "department": "HR"
  }'
```

**Delete User:**
```bash
curl -X DELETE http://localhost:3000/api/users/USER_ID
```

### Menggunakan Postman
1. Import collection dari file `postman_collection.json` (jika ada)
2. Atau buat request manual dengan endpoint di atas

## 🔧 Development

### Scripts
```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
```

### Logs
- Development: Logs akan muncul di console
- Production: Logs tersedia di Vercel dashboard

## 🛡️ Security Features

- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing
- **Input Validation**: Express-validator
- **Error Handling**: Custom error handler
- **Rate Limiting**: Bisa ditambahkan jika diperlukan

## 📝 License

MIT License

## 🤝 Contributing

1. Fork repository
2. Buat feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📞 Support

Jika ada pertanyaan atau masalah, silakan buat issue di repository ini.

---

**Happy Coding! 🎉** 