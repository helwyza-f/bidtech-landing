# Bidtech Client Portal & Checkout Backend

Backend portal klien dan sistem transaksi terpadu untuk platform layanan digitalisasi website **Bidtech**.

## Fitur Utama

- **Pemecahan Harga Paket Template**: Pemisahan transparan antara Harga Template, Server Hosting, dan Layanan Setup.
- **Sistem Kode Promo & Diskon Mitra**: Diskon persentase/nominal dengan atribusi komisi mitra/afiliasi dan validasi AJAX realtime.
- **RESTful API Publik & Single Source of Truth**: Menyajikan data katalog template dinamis langsung ke frontend Next.js.
- **View Counter Tracking**: Pelacakan otomatis jumlah pengunjung per template website.
- **Admin CMS Dashboard**: Pengelolaan master template (tambah, edit, upload thumbnail) **100% tanpa koding**.
- **Integrasi Xendit Payment Gateway**: Invoice virtual account, QRIS, e-wallet, dan kartu kredit.
- **Pencarian Domain Realtime**: Terhubung ke API IDCloudHost untuk pencarian domain otomatis.

## 📖 Dokumentasi Teknis

- 📘 **Dokumentasi Lengkap API**: Silakan buka [README_API.md](./README_API.md) untuk spesifikasi endpoint, format JSON, dan panduan integrasi.
- 🎟️ **Dokumentasi Kode Promo & Mitra**: Silakan buka [DOKUMENTASI_PROMO.md](./DOKUMENTASI_PROMO.md) untuk daftar voucher, tipe diskon, dan pelacakan komisi mitra.
- 🌐 **Endpoint API Utama**:
  - `GET /api/templates`: Katalog template dinamis dan rincian harga 3 komponen.
  - `POST /templates/view/{id}`: Tracking penayangan/view counter template.
  - `GET /api/domain/search`: Cek ketersediaan nama domain.
  - `POST /checkout/{template}/promo/apply`: Terapkan kode promo & mitra.
- 🎛️ **Admin CMS Template**: Akses di `http://localhost:8000/admin/templates`.
