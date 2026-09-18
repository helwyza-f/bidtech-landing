# Panduan Instalasi: Template-2 Construction & Industrial

Panduan langkah demi langkah untuk menjalankan dan mengintegrasikan template ke dalam lingkungan pengembangan Anda.

## Prasyarat
- Node.js versi 18.17 atau lebih baru
- npm / yarn / pnpm

## Langkah Setup

### 1. Masuk ke Direktori Template
```bash
cd templates/construction-industrial/template-2
```

### 2. Instalasi Dependensi
```bash
npm install
```

### 3. Konfigurasi Lingkungan (.env)
Salin file `.env.example` menjadi `.env.local`:
```bash
cp .env.example .env.local
```

### 4. Menjalankan Server Pengembangan
```bash
npm run dev
```
Buka browser di `http://localhost:3000`.

### 5. Build Produksi
Untuk memastikan seluruh style Tailwind dan kode TypeScript terkompilasi optimal:
```bash
npm run build
npm run start
```
