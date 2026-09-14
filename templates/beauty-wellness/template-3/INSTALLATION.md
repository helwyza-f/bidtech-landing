# Panduan Instalasi & Deployment — Agak Rapi (Template 3)

Panduan langkah demi langkah untuk menginstal, menjalankan, dan melakukan deploy template **Agak Rapi (Beauty & Wellness Template 3)**.

---

## 1. Prasyarat Sistem

- **Node.js:** Versi 18.18.0 atau lebih baru (Disarankan Node.js 20+)
- **NPM:** Versi 9.0.0 atau lebih baru (atau yarn / pnpm)

---

## 2. Instalasi Lokal

```bash
# Masuk ke folder template
cd templates/beauty-wellness/template-3

# Install dependencies
npm install

# Salin environment file
cp .env.example .env.local

# Jalankan development server
npm run dev
```

Buka peramban Anda di [http://localhost:3000](http://localhost:3000).

---

## 3. Script NPM yang Tersedia

| Command | Fungsi |
|---|---|
| `npm run dev` | Menjalankan Next.js development server dengan Hot Reload |
| `npm run build` | Melakukan compile dan build production bundle |
| `npm run build:demo` | Melakukan static export untuk demo portal Bidtech |
| `npm run start` | Menjalankan server Next.js production setelah build |
| `npm run lint` | Menjalankan linter untuk memeriksa kualitas kode |

---

## 4. Konfigurasi Produksi & Deployment

### Vercel (Rekomendasi)
1. Hubungkan repositori Git Anda ke dashboard Vercel.
2. Atur **Root Directory** ke: `templates/beauty-wellness/template-3`.
3. Framework Preset akan otomatis terdeteksi sebagai **Next.js**.
4. Klik **Deploy**.

### Static HTML Export (Shared Hosting / GitHub Pages)
Template ini mendukung static HTML export secara out-of-the-box:
```bash
npm run build:demo
```
Folder hasil ekspor statis akan berada di dalam direktori `out/`.
