# Web Interface untuk User Management System

## Fitur Utama

### 🎨 Interface Modern
- Desain responsif dengan gradient background yang menarik
- UI yang clean dan user-friendly
- Animasi hover dan transisi yang smooth
- Font Inter untuk tipografi yang modern

### 👥 Manajemen User
- **Tambah User Baru**: Form lengkap dengan validasi
- **Lihat Semua User**: Grid layout yang rapi
- **Edit User**: Modal popup untuk editing
- **Hapus User**: Konfirmasi sebelum menghapus
- **Status User**: Indikator aktif/tidak aktif

### 📱 Responsive Design
- Mobile-friendly interface
- Grid layout yang adaptif
- Touch-friendly buttons dan form

## Cara Menggunakan

### 1. Menjalankan Server
```bash
npm start
# atau
npm run dev
```

### 2. Akses Web Interface
Buka browser dan kunjungi:
```
http://localhost:3000
```

### 3. Fitur yang Tersedia

#### Tambah User Baru
1. Isi form di bagian "Tambah User Baru"
2. Masukkan data lengkap:
   - Nama Lengkap
   - Email (unik)
   - Nomor Telepon (minimal 10 digit)
   - Departemen
   - Status Aktif
3. Klik "Simpan User"

#### Melihat Daftar User
- Semua user ditampilkan dalam card grid
- Informasi lengkap: nama, email, telepon, departemen, status
- Timestamp pembuatan user

#### Edit User
1. Klik tombol "Edit" pada user card
2. Modal akan terbuka dengan data user
3. Edit data yang diperlukan
4. Klik "Update User"

#### Hapus User
1. Klik tombol "Hapus" pada user card
2. Konfirmasi penghapusan
3. User akan dihapus dari database

#### Refresh Data
- Klik tombol "Refresh" untuk memuat ulang data
- Data otomatis refresh setelah operasi CRUD

## Teknologi yang Digunakan

### Frontend
- **HTML5**: Struktur halaman
- **CSS3**: Styling modern dengan Flexbox dan Grid
- **JavaScript ES6+**: Interaksi dan API calls
- **Font Awesome**: Icons
- **Google Fonts**: Tipografi Inter

### Backend Integration
- **Fetch API**: Komunikasi dengan backend
- **RESTful API**: Endpoint `/api/users`
- **JSON**: Format data exchange
- **Error Handling**: Alert system untuk feedback

## Struktur File

```
public/
└── index.html          # Web interface utama
```

## API Endpoints yang Digunakan

- `GET /api/users` - Ambil semua user
- `POST /api/users` - Buat user baru
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Hapus user

## Validasi

### Frontend Validation
- Required fields
- Email format validation
- Phone number format (minimal 10 digit)
- Department selection

### Backend Validation
- Server-side validation tetap berjalan
- Error messages ditampilkan ke user
- Duplicate email prevention

## Responsive Breakpoints

- **Desktop**: Grid 2-3 kolom
- **Tablet**: Grid 2 kolom
- **Mobile**: Grid 1 kolom, stacked layout

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Troubleshooting

### Jika data tidak muncul:
1. Pastikan server API berjalan
2. Cek console browser untuk error
3. Pastikan database terhubung
4. Cek network tab untuk API calls

### Jika form tidak berfungsi:
1. Pastikan semua field required terisi
2. Cek format email dan phone number
3. Pastikan department dipilih

## Development

Untuk development, gunakan:
```bash
npm run dev
```

Server akan restart otomatis saat ada perubahan file.

## Production

Untuk production deployment:
```bash
npm start
```

Pastikan environment variables sudah diset dengan benar. 