# 📚 Dokumentasi Resmi RESTful API Bidtech

Dokumentasi ini mencakup seluruh spesifikasi Endpoint RESTful API yang disediakan oleh backend **Bidtech Laravel** untuk integrasi dengan **Frontend Next.js (Landing Page & Desain Library)**, **Alur Checkout & Transaksi**, serta **Panel Admin CMS**.

---

## 📑 Daftar Isi
1. [Arsitektur & Konsep Single Source of Truth](#1-arsitektur--konsep-single-source-of-truth)
2. [Konvensi & Standar API](#2-konvensi--standar-api)
3. [Daftar Endpoint](#3-daftar-endpoint)
   - [A. Katalog Template Dinamis (`GET /api/templates`)](#a-katalog-template-dinamis)
   - [B. Detail Template (`GET /api/templates/{id}`)](#b-detail-template)
   - [C. Tracking View Counter Template (`POST /templates/view/{id}`)](#c-tracking-view-counter-template)
   - [D. Pencarian Ketersediaan Domain (`GET /api/domain/search`)](#d-pencarian-ketersediaan-domain)
   - [E. Validasi & Terapkan Kode Promo (`POST /checkout/{template}/promo/apply`)](#e-validasi--terapkan-kode-promo)
   - [F. Hapus Kode Promo Aktif (`POST /checkout/{template}/promo/remove`)](#f-hapus-kode-promo-aktif)
4. [Pengelolaan Template via Admin CMS (Tanpa Koding)](#4-pengelolaan-template-via-admin-cms-tanpa-koding)
5. [Contoh Implementasi & Integrasi di Next.js](#5-contoh-implementasi--integrasi-di-nextjs)

---

## 1. Arsitektur & Konsep Single Source of Truth

```
┌─────────────────────────────────────────────────────────────┐
│               Admin CMS (Dashboard Laravel)                 │
│         URL: http://localhost:8000/admin/templates          │
│   • Tambah Template Baru (Input Form & Upload Thumbnail)   │
│   • Edit Rincian Harga Paket (Template, Server, Layanan)    │
│   • Toggle Aktif/Nonaktif & Monitoring View Counter         │
└──────────────────────────────┬──────────────────────────────┘
                               │ (Simpan ke DB)
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                 Database MySQL (`templates`)                │
│                 * SINGLE SOURCE OF TRUTH *                  │
└───────────────┬─────────────────────────────┬───────────────┘
                │                             │
       (API JSON /api/templates)      (Internal ORM)
                │                             │
                ▼                             ▼
┌──────────────────────────────┐ ┌────────────────────────────┐
│      Frontend Next.js        │ │    Alur Checkout Laravel   │
│   URL: http://localhost:3000 │ │  URL: /checkout/...        │
│   • Katalog Desain Dinamis   │ │  • Pemecahan Harga 3 Bagian│
│   • Filter Kategori Realtime │ │  • Kode Promo Umum & Mitra │
│   • Auto View Counter Track  │ │  • Payment Gateway Xendit  │
└──────────────────────────────┘ └────────────────────────────┘
```

> [!TIP]
> **Keuntungan Utama:**
> Ketika tim menginput template baru melalui Admin CMS (`/admin/templates/create`), data template beserta rincian harganya **langsung aktif dan muncul otomatis di Website Next.js maupun alur Checkout Laravel** tanpa perlu koding ulang ataupun deployment ulang server.

---

## 2. Konvensi & Standar API

### Base URL
- **Lokal (Development):** `http://localhost:8000` atau `http://127.0.0.1:8000`
- **Produksi / Staging:** Sesuai domain deployment (contoh: `https://portal.bidtech.com`)

### Headers Standar
Setiap permintaan (request) disarankan menyertakan header berikut:
```http
Accept: application/json
Content-Type: application/json
```

### Dukungan CORS (Cross-Origin Resource Sharing)
Endpoint publik telah dilengkapi header CORS bawaan:
```http
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, OPTIONS
Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Requested-With
```

### Format Respons Standar
#### Respons Sukses:
```json
{
  "status": "success",
  "message": "Pesan deskriptif keberhasilan",
  "data": { ... }
}
```

#### Respons Error:
```json
{
  "status": "error",
  "message": "Pesan deskriptif penyebab kegagalan"
}
```

### HTTP Status Codes:
| Kode | Makna | Keterangan |
| :--- | :--- | :--- |
| **`200 OK`** | Berhasil | Permintaan diproses dan data dikembalikan dengan sukses. |
| **`400 Bad Request`** | Parameter Salah | Input permintaan tidak valid atau kode promo kadaluarsa/tidak memenuhi syarat. |
| **`404 Not Found`** | Tidak Ditemukan | ID template atau entitas yang diminta tidak ada di database. |
| **`422 Unprocessable Entity`** | Validasi Gagal | Formulir input tidak lolos validasi server. |
| **`500 Internal Error`** | Kesalahan Server | Terjadi kendala internal pada server atau koneksi pihak ketiga. |

---

## 3. Daftar Endpoint

---

### A. Katalog Template Dinamis

Mengambil seluruh daftar template aktif yang tersimpan di database beserta kategori dan rincian harga 3 komponen (Harga Template, Harga Server, dan Harga Layanan).

- **URL:** `/api/templates`
- **Alias URL:** `/templates`
- **Method:** `GET`
- **Autentikasi:** Tidak diperlukan (Publik)

#### Parameter Query (Opsional):
| Parameter | Tipe | Contoh | Keterangan |
| :--- | :--- | :--- | :--- |
| `category` | `string` | `Otomotif` | Filter hanya template pada kategori tertentu. |
| `search` | `string` | `Mobil` | Pencarian teks bebas pada nama, deskripsi, atau tags. |
| `include_inactive` | `boolean` | `1` | Menyertakan template non-aktif (khusus untuk audit). |

#### Contoh Request:
```bash
curl -X GET "http://localhost:8000/api/templates?category=Otomotif" \
  -H "Accept: application/json"
```

#### Contoh Respons Sukses (`200 OK`):
```json
{
  "status": "success",
  "message": "Data template berhasil diambil",
  "count": 2,
  "categories": [
    { "name": "Semua Design", "count": 17 },
    { "name": "Otomotif", "count": 2 },
    { "name": "UMKM", "count": 5 },
    { "name": "Kecantikan", "count": 3 },
    { "name": "Komunitas", "count": 3 },
    { "name": "Konstruksi & Properti", "count": 2 },
    { "name": "Pendidikan", "count": 2 }
  ],
  "data": [
    {
      "id": 1,
      "name": "Rentcar - Sewa Mobil #1",
      "category": "Otomotif",
      "subcategory": "Showcase kendaraan dan penyewaan kendaraan untuk usaha Penyewaan Kendaraan",
      "description": "Showcase kendaraan dan penyewaan kendaraan untuk usaha Penyewaan Kendaraan",
      "image": "http://localhost:8000/images/design_thumbnail/rentcar.webp",
      "previewHref": "http://localhost:3000/demo/automotive",
      "demo_url": "/demo/automotive",
      "tags": ["Automotive", "Rental Mobil", "Responsive"],
      "views": 144,
      "pricing": {
        "total": 2000000,
        "formatted_total": "Rp 2.000.000",
        "template_price": 1000000,
        "server_price": 500000,
        "service_price": 500000,
        "template_desc": "Lisensi Desain UI/UX Eksklusif & Source Code Clean",
        "server_desc": "Cloud Server Hosting 1 Tahun, NVMe High Speed & Free SSL",
        "service_desc": "Setup Domain, Deployment Instan & Garansi Pemeliharaan"
      },
      "is_active": true,
      "checkout_url": "http://localhost:8000/checkout/pilih-template?template=1"
    }
  ]
}
```

---

### B. Detail Template

Mengambil rincian lengkap dari satu template spesifik berdasarkan ID.

- **URL:** `/api/templates/{id}`
- **Method:** `GET`
- **Autentikasi:** Tidak diperlukan (Publik)

#### Parameter URL:
| Parameter | Tipe | Keterangan |
| :--- | :--- | :--- |
| `id` | `integer` | ID unik template di database (contoh: `1`). |

#### Contoh Request:
```bash
curl -X GET "http://localhost:8000/api/templates/1" \
  -H "Accept: application/json"
```

#### Contoh Respons Sukses (`200 OK`):
```json
{
  "status": "success",
  "data": {
    "id": 1,
    "name": "Rentcar - Sewa Mobil #1",
    "category": "Otomotif",
    "subcategory": "Showcase kendaraan dan penyewaan kendaraan untuk usaha Penyewaan Kendaraan",
    "description": "Showcase kendaraan dan penyewaan kendaraan untuk usaha Penyewaan Kendaraan",
    "image": "http://localhost:8000/images/design_thumbnail/rentcar.webp",
    "previewHref": "http://localhost:3000/demo/automotive",
    "demo_url": "/demo/automotive",
    "tags": ["Automotive", "Rental Mobil", "Responsive"],
    "views": 144,
    "pricing": {
      "total": 2000000,
      "formatted_total": "Rp 2.000.000",
      "template_price": 1000000,
      "server_price": 500000,
      "service_price": 500000,
      "template_desc": "Lisensi Desain UI/UX Eksklusif & Source Code Clean",
      "server_desc": "Cloud Server Hosting 1 Tahun, NVMe High Speed & Free SSL",
      "service_desc": "Setup Domain, Deployment Instan & Garansi Pemeliharaan"
    },
    "is_active": true,
    "checkout_url": "http://localhost:8000/checkout/pilih-template?template=1"
  }
}
```

#### Contoh Respons Gagal (`404 Not Found`):
```json
{
  "status": "error",
  "message": "Template tidak ditemukan"
}
```

---

### C. Tracking View Counter Template

Menambah counter penayangan/kunjungan (`views`) sebesar **+1** secara *atomic* di database setiap kali pengunjung mengklik tombol **"Lihat"** atau membuka halaman live demo template di website Next.js.

- **URL:** `/templates/view/{id}`
- **Alias URL:** `/api/templates/view/{id}`
- **Method:** `POST`
- **CSRF Token:** **Dikecualikan (Exempted)** — Dapat dipanggil langsung dari client-side JavaScript / Next.js tanpa token CSRF.

#### Parameter URL:
| Parameter | Tipe | Keterangan |
| :--- | :--- | :--- |
| `id` | `integer` | ID unik template yang sedang dilihat. |

#### Contoh Request:
```bash
curl -X POST "http://localhost:8000/templates/view/1" \
  -H "Accept: application/json"
```

#### Contoh Respons Sukses (`200 OK`):
```json
{
  "status": "success",
  "message": "View count berhasil diperbarui",
  "id": 1,
  "name": "Rentcar - Sewa Mobil #1",
  "views": 145
}
```

---

### D. Pencarian Ketersediaan Domain

Memeriksa ketersediaan nama domain pilihan calon klien secara realtime yang terhubung ke provider IDCloudHost (dengan fallback mock otomatis saat pengujian).

- **URL:** `/api/domain/search`
- **Method:** `GET`
- **Autentikasi:** Tidak diperlukan (Publik)

#### Parameter Query:
| Parameter | Tipe | Wajib? | Contoh | Keterangan |
| :--- | :--- | :--- | :--- | :--- |
| `domain` atau `q` | `string` | **Ya** | `tokoberkah.com` | Nama domain atau kata kunci nama website yang dicari. |

#### Contoh Request:
```bash
curl -X GET "http://localhost:8000/api/domain/search?domain=tokoberkah.com" \
  -H "Accept: application/json"
```
*(Atau menggunakan parameter `q`: `http://localhost:8000/api/domain/search?q=tokoberkah.com`)*

#### Contoh Respons Sukses (`200 OK`):
```json
{
  "status": "success",
  "query": "tokoberkah.com",
  "domains": [
    {
      "domain": "tokoberkah.com",
      "available": true,
      "price": 165000,
      "formatted_price": "Rp 165.000",
      "extension": ".com"
    }
  ],
  "is_live_api": true,
  "source": "idcloudhost"
}
```

#### Contoh Respons Gagal (Jika parameter kosong) (`400 Bad Request`):
```json
{
  "status": "error",
  "message": "Kata kunci pencarian domain tidak boleh kosong.",
  "domains": []
}
```

---

### E. Validasi & Terapkan Kode Promo

Memvalidasi dan menerapkan kode diskon pada sesi checkout pesanan. Mendukung promo umum (persentase / nominal flat) dan **kode promo mitra/afiliasi** (disertai identitas nama mitra).

> [!TIP]
> Panduan lengkap daftar seluruh kode promo aktif, kalkulasi diskon per scope, dan pelacakan komisi kemitraan dapat dilihat pada dokumen: [DOKUMENTASI_PROMO.md](./DOKUMENTASI_PROMO.md).

- **URL:** `/checkout/{template}/promo/apply`
- **Method:** `POST`
- **Autentikasi:** Sesi Checkout Aktif

#### Request Body (JSON / Form Data):
```json
{
  "promo_code": "MITRABATAM"
}
```

#### Contoh Respons Sukses (`200 OK`):
```json
{
  "status": "success",
  "message": "Kode promo MITRABATAM berhasil diterapkan!",
  "data": {
    "code": "MITRABATAM",
    "name": "Diskon Spesial Mitra Batam",
    "type": "fixed",
    "discount_amount": 250000,
    "formatted_discount": "Rp 250.000",
    "is_partner": true,
    "partner_name": "PT Batam Digital Partner",
    "package_subtotal": 2000000,
    "domain_price": 165000,
    "new_total": 1915000,
    "formatted_new_total": "Rp 1.915.000",
    "breakdown": {
      "template_price": 1000000,
      "server_price": 500000,
      "service_price": 500000
    }
  }
}
```

#### Contoh Respons Gagal (`400 Bad Request`):
```json
{
  "status": "error",
  "message": "Kode promo sudah melewati batas masa berlaku."
}
```

---

### F. Hapus Kode Promo Aktif

Membatalkan kode promo yang sedang terpasang di sesi checkout dan mengembalikan total pembayaran ke harga normal.

- **URL:** `/checkout/{template}/promo/remove`
- **Method:** `POST`
- **Autentikasi:** Sesi Checkout Aktif

#### Contoh Respons Sukses (`200 OK`):
```json
{
  "status": "success",
  "message": "Kode promo berhasil dihapus.",
  "data": {
    "new_total": 2165000,
    "formatted_new_total": "Rp 2.165.000"
  }
}
```

---

## 4. Pengelolaan Template via Admin CMS (Tanpa Koding)

Semua operasi penambahan, pengubahan, dan penghapusan katalog template dapat dilakukan melalui antarmuka visual Admin Dashboard Bidtech.

### Akses Panel CMS:
- **Daftar Template:** `http://localhost:8000/admin/templates`
- **Formulir Tambah:** `http://localhost:8000/admin/templates/create`
- **Formulir Edit:** `http://localhost:8000/admin/templates/{id}/edit`

### Fitur-Fitur Utama CMS:
1. **Pemecahan Otomatis 3 Komponen Harga:**
   - Masukkan *Harga Template* (contoh: Rp 1.000.000).
   - Masukkan *Harga Server* (contoh: Rp 500.000).
   - Masukkan *Harga Layanan* (contoh: Rp 500.000).
   - Sistem secara otomatis menghitung dan mengunci total harga paket Rp 2.000.000.
2. **Upload Thumbnail Desain:**
   - Admin cukup memilih file gambar (WEBP, PNG, JPG).
   - File otomatis disimpan ke direktori aset publik (`images/design_thumbnail/`) dan terhubung langsung ke URL preview.
3. **Toggle Status Aktif / Non-Aktif:**
   - Menghidupkan atau mematikan penayangan template di website publik hanya dengan 1 kali klik.
4. **Monitoring Penayangan (Views):**
   - Melihat metrik berapa banyak pengunjung yang tertarik dan menekan tombol demo template tersebut.

---

## 5. Contoh Implementasi & Integrasi di Next.js

### Helper Service (`frontend/lib/api/template-api.ts`)
```typescript
import { fetchTemplates, recordTemplateView } from "@/lib/api/template-api";

// 1. Mengambil data template secara dinamis di Client Component
useEffect(() => {
  async function loadData() {
    const { templates, categories } = await fetchTemplates();
    setTemplates(templates);
    setCategories(categories);
  }
  loadData();
}, []);

// 2. Memicu view counter saat tombol "Lihat" ditekan
<Link
  href={template.previewHref}
  target="_blank"
  onClick={() => recordTemplateView(template.id)}
>
  Lihat Demo
</Link>
```

---

*Dokumen ini dibuat dan dikelola secara resmi oleh Tim Rekayasa Sistem Bidtech.*
