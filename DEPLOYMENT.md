# Deployment Guide - Vercel

## 🚀 Langkah-langkah Deployment ke Vercel

### 1. Persiapan Repository

Pastikan semua file sudah di-commit ke GitHub:

```bash
git add .
git commit -m "Initial commit: User Management API"
git push origin main
```

### 2. Setup MongoDB Atlas

1. **Buat Account MongoDB Atlas**
   - Kunjungi [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Sign up dengan email atau GitHub

2. **Buat Cluster**
   - Pilih "Build a Database"
   - Pilih "FREE" tier (M0)
   - Pilih cloud provider (AWS/Google Cloud/Azure)
   - Pilih region terdekat
   - Klik "Create"

3. **Setup Database Access**
   - Di sidebar, klik "Database Access"
   - Klik "Add New Database User"
   - Username: `user-management-api`
   - Password: Buat password yang kuat
   - Role: "Read and write to any database"
   - Klik "Add User"

4. **Setup Network Access**
   - Di sidebar, klik "Network Access"
   - Klik "Add IP Address"
   - Klik "Allow Access from Anywhere" (0.0.0.0/0)
   - Klik "Confirm"

5. **Get Connection String**
   - Kembali ke "Database"
   - Klik "Connect"
   - Pilih "Connect your application"
   - Copy connection string
   - Ganti `<password>` dengan password yang dibuat
   - Ganti `<dbname>` dengan `user-management`

### 3. Deploy ke Vercel

1. **Buka Vercel**
   - Kunjungi [Vercel](https://vercel.com)
   - Login dengan GitHub account

2. **Import Project**
   - Klik "New Project"
   - Pilih repository dari GitHub
   - Klik "Import"

3. **Konfigurasi Project**
   - Framework Preset: `Node.js`
   - Root Directory: `./` (default)
   - Build Command: `npm install` (default)
   - Output Directory: `./` (default)
   - Install Command: `npm install` (default)

4. **Environment Variables**
   - Klik "Environment Variables"
   - Tambahkan variable:
     - **Name**: `MONGODB_URI`
     - **Value**: Connection string dari MongoDB Atlas
     - **Environment**: Production, Preview, Development
   - Tambahkan variable:
     - **Name**: `NODE_ENV`
     - **Value**: `production`
     - **Environment**: Production, Preview, Development

5. **Deploy**
   - Klik "Deploy"
   - Tunggu proses deployment selesai

### 4. Verifikasi Deployment

1. **Test Health Check**
   ```bash
   curl https://your-app.vercel.app/health
   ```

2. **Test API Info**
   ```bash
   curl https://your-app.vercel.app/
   ```

3. **Test Create User**
   ```bash
   curl -X POST https://your-app.vercel.app/api/users \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Test User",
       "email": "test@example.com",
       "phone": "081234567890",
       "department": "IT",
       "isActive": true
     }'
   ```

### 5. Update Vercel Configuration

Setelah deployment berhasil, update `vercel.json` dengan URL yang benar:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.js"
    }
  ]
}
```

### 6. Custom Domain (Optional)

1. Di dashboard Vercel, klik project
2. Klik "Settings" → "Domains"
3. Tambahkan custom domain jika diperlukan

## 🔧 Troubleshooting

### Error: MongoDB Connection Failed
- Pastikan connection string benar
- Pastikan IP address sudah di-whitelist di MongoDB Atlas
- Pastikan username dan password benar

### Error: Environment Variables Not Found
- Pastikan environment variables sudah ditambahkan di Vercel
- Pastikan nama variable sama persis dengan yang ada di kode

### Error: Build Failed
- Pastikan semua dependencies ada di `package.json`
- Pastikan Node.js version compatible (16+)

## 📊 Monitoring

### Vercel Analytics
- Di dashboard Vercel, klik "Analytics"
- Monitor traffic, performance, dan errors

### MongoDB Atlas Monitoring
- Di dashboard MongoDB Atlas, monitor:
  - Database performance
  - Connection count
  - Storage usage

## 🔄 Continuous Deployment

Setiap kali push ke branch `main`, Vercel akan otomatis deploy ulang.

## 📝 Notes

- Vercel menggunakan serverless functions
- Cold start mungkin terjadi pada request pertama
- Environment variables harus di-set manual di Vercel dashboard
- Database connection akan dibuat ulang setiap request (normal untuk serverless)

---

**Happy Deploying! 🚀** 