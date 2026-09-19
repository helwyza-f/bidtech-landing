# IDCloudHost Domain Service

Service untuk integrasi pencarian dan pengecekan ketersediaan domain via **IDCloudHost SRS Reseller API**.

---

## Lokasi File

```
app/Services/Domain/
└── IdCloudHostDomainService.php   ← Service utama
```

---

## Cara Kerja

Service ini bekerja dalam **2 mode otomatis**:

| Mode | Kondisi | Keterangan |
|---|---|---|
| 🟢 **Live API** | API Key IDCloudHost valid di `.env` | Harga real-time dari IDCloudHost, sudah termasuk PPN 11% |
| 🟡 **Fallback DNS** | API Key kosong / tidak valid | Cek ketersediaan via DNS lookup + harga estimasi katalog |

Pergantian mode terjadi **otomatis** — tidak perlu konfigurasi tambahan.

---

## Konfigurasi `.env`

```env
# URL backend API SRS IDCloudHost (jangan diubah)
IDCLOUDHOST_API_URL=https://api.srs.idch.co.id/v1

# API Key dari portal reseller IDCloudHost
# Settings → API Keys → Generate
# Format token: rsl_live_<32 karakter>
IDCLOUDHOST_API_KEY=rsl_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### Cara Mendapatkan API Key

1. Login ke [https://app.srs.idch.co.id](https://app.srs.idch.co.id)
2. Buka **Settings → API Keys**
3. Klik **Generate**
4. **Salin key segera** — key hanya tampil sekali, setelah itu disimpan sebagai hash
5. Jika hilang, generate baru + revoke yang lama

---

## Markup Harga Domain

Bidtech dapat menambahkan margin keuntungan di atas harga resmi IDCloudHost.

### Lokasi Pengaturan

Di dalam `IdCloudHostDomainService.php`, baris paling atas class:

```php
const MARKUP_HARGA_DOMAIN = 0;
```

### Cara Mengubah Markup

Cukup ganti angkanya (dalam Rupiah):

```php
const MARKUP_HARGA_DOMAIN = 0;       // tidak ada tambahan
const MARKUP_HARGA_DOMAIN = 5000;    // tambah Rp 5.000 per domain
const MARKUP_HARGA_DOMAIN = 10000;   // tambah Rp 10.000 per domain
const MARKUP_HARGA_DOMAIN = 50000;   // tambah Rp 50.000 per domain
```

### Contoh Perhitungan

```
Harga IDCloudHost Live (.com)  = Rp 238.650  (sudah termasuk PPN 11%)
MARKUP_HARGA_DOMAIN            = Rp   5.000
                                 ─────────────
Harga ke Pembeli               = Rp 243.650
```

> **Catatan:** Markup berlaku sama untuk semua ekstensi (.com, .id, .my.id, .co.id).
> Jika ingin markup berbeda per ekstensi, ubah konstanta menjadi array.

---

## Ekstensi Domain yang Didukung

| Ekstensi | Harga Default Fallback |
|---|---|
| `.com` | Rp 185.000 / tahun |
| `.id` | Rp 225.000 / tahun |
| `.my.id` | Rp 25.000 / tahun |
| `.co.id` | Rp 275.000 / tahun |

> Harga fallback digunakan hanya saat mode DNS (API tidak aktif).
> Saat mode Live, harga otomatis diambil dari `grand_total_idr` IDCloudHost (termasuk PPN).

---

## Struktur Data Domain Result

Setiap item dalam array hasil pencarian memiliki field berikut:

```php
[
    'domain'       => 'namabisnis.com',   // Nama domain lengkap
    'available'    => true,               // true = tersedia, false = sudah dipakai
    'price'        => 243650,             // Harga ke pembeli (IDCloudHost + markup)
    'price_base'   => 238650,             // Harga asli IDCloudHost (sebelum markup)
    'markup'       => 5000,               // Nilai markup yang diterapkan
    'includes_tax' => true,               // true jika harga sudah termasuk PPN 11%
    'extension'    => 'com',              // Ekstensi domain saja
    'is_premium'   => false,              // true jika domain premium (harga lebih mahal)
]
```

---

## Endpoint API IDCloudHost yang Digunakan

| Endpoint | Method | Fungsi |
|---|---|---|
| `/v1/pricing/quote` | GET | Ambil harga domain per ekstensi (termasuk PPN) |
| DNS `checkdnsrr()` | — | Cek ketersediaan domain via DNS (NS/A/SOA record) |

---

## Troubleshooting

| Gejala | Penyebab | Solusi |
|---|---|---|
| Badge 🟡 Kuning (Fallback) | API Key salah / tidak cocok | Pastikan key format `rsl_live_...` dari portal SRS |
| Badge 🔘 Abu-abu (Standby) | `IDCLOUDHOST_API_KEY` kosong | Isi key di `.env` lalu `php artisan config:clear` |
| Harga tidak update | Config ter-cache | Jalankan `php artisan config:clear` |
| Timeout | Koneksi ke IDCloudHost lambat | Service otomatis fallback ke DNS |
