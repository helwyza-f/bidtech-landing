# Panduan Deployment NadimTrans RentCar (nadimtrans.com)

Panduan ini menjelaskan langkah demi langkah untuk melakukan deploy aplikasi Next.js **NadimTrans RentCar** ke VPS (Ubuntu / Debian) menggunakan **Docker**, **Docker Compose**, dan **Reverse Proxy Nginx** dengan SSL (HTTPS) dari Let's Encrypt.

---

## 1. Arsitektur Deployment

```
[ Internet / Pengunjung ]
          │
          ▼ (Port 80 / 443 - SSL HTTPS)
[ NGINX Reverse Proxy pada VPS Host ]
   ├── Menangani SSL Termination (Let's Encrypt / Certbot)
   ├── Kompresi Gzip
   ├── Caching Aset Statis (/_next/static & /images)
   ├── Security Headers (HSTS, CSP, X-Frame, dll.)
   └── Proxy Pass ke: 127.0.0.1:3040
          │
          ▼
[ Docker Container: nadimtrans-web ]
   └── Next.js 14 Standalone Mode (Node 20 Alpine, Non-root user `nextjs`)
```

---

## 2. Persiapan Server VPS

Pastikan domain `nadimtrans.com` dan `www.nadimtrans.com` sudah diarahkan (DNS A Record) ke **IP Publik VPS Anda**.

Masuk ke VPS via SSH lalu instal paket yang dibutuhkan:

```bash
# Update sistem
sudo apt update && sudo apt upgrade -y

# Instal Nginx, Certbot, dan Git
sudo apt install -y nginx certbot python3-certbot-nginx git curl

# Instal Docker & Docker Compose Plugin (jika belum terpasang)
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
newgrp docker
```

---

## 3. Deployment Container via CI/CD

Deployment produksi dikelola otomatis oleh workflow `.github/workflows/deploy-nadimtrans.yml`. GitHub Actions membangun image satu kali, mengujinya, lalu memublikasikan image `ghcr.io/<owner>/nadimtrans` dengan tag commit dan `latest`. VPS hanya menerima file Compose di `/opt/nadimtrans`, menarik image yang sudah jadi, lalu menjalankan container; tidak ada clone repository atau build source di VPS.

Setelah workflow deploy selesai:

1. Periksa status container:

   ```bash
   docker ps
   # Container 'nadimtrans-web' akan berstatus Up dan port 127.0.0.1:3040->3040/tcp
   ```
2. Uji koneksi lokal Next.js di dalam VPS:

   ```bash
   curl -I http://127.0.0.1:3040
   # Respon harus berupa HTTP/1.1 200 OK
   ```

---

## 4. Konfigurasi Nginx & Penerbitan SSL

### Langkah A: Setup Awal Nginx untuk Penerbitan Sertifikat (HTTP)

Sebelum sertifikat SSL diterbitkan, buat konfigurasi sementara agar Certbot dapat memverifikasi domain Anda:

```bash
sudo nano /etc/nginx/sites-available/nadimtrans.com.conf
```

Tempelkan konfigurasi port 80 berikut:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name nadimtrans.com www.nadimtrans.com;

    location / {
        proxy_pass http://127.0.0.1:3040;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Aktifkan konfigurasi dan restart Nginx:

```bash
sudo ln -s /etc/nginx/sites-available/nadimtrans.com.conf /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Langkah B: Dapatkan Sertifikat SSL Gratis dengan Certbot

Jalankan perintah berikut:

```bash
sudo certbot --nginx -d nadimtrans.com -d www.nadimtrans.com
```

*Ikuti petunjuk di layar (masukkan email dan setujui ToS).*

### Langkah C: Terapkan Konfigurasi Produksi Lengkap

Setelah sertifikat berhasil diterbitkan, ganti file `/etc/nginx/sites-available/nadimtrans.com.conf` dengan template produksi yang sudah disediakan di proyek ini:

```bash
# Salin konfigurasi produksi dari repository
sudo cp /opt/nadimtrans/nginx/nadimtrans.com.conf /etc/nginx/sites-available/nadimtrans.com.conf

# Test konfigurasi
sudo nginx -t

# Muat ulang Nginx
sudo systemctl reload nginx
```

---

## 5. Pembaruan Aplikasi

Push perubahan ke branch `main` untuk memicu build, smoke test, publikasi image GHCR, dan deploy otomatis ke `/opt/nadimtrans`. Untuk menjalankan ulang deployment dari commit `main` yang sama tanpa perubahan kode, buka workflow **Nadim Trans CI/CD Pipeline** di GitHub Actions lalu pilih **Run workflow** (`workflow_dispatch`).

VPS tidak memakai checkout Git dan tidak membangun image. Workflow selalu menarik image `ghcr.io/<owner>/nadimtrans:<commit-sha>` yang sudah lolos job build.

### Cache Cloudflare (wajib setelah deploy)

Di **Caching → Cache Rules**, buat dua rule untuk `nadimtrans.com`:

1. Path `/_next/image`: jadikan **Eligible for cache**, gunakan cache key yang menyertakan **seluruh query string**, dan pilih **Respect existing headers** untuk browser serta edge TTL.
2. Path yang diawali `/_next/static/`, `/images/`, atau `/icons/`: jadikan **Eligible for cache** dan pilih **Respect existing headers**.

Nginx dan Next.js pada repository ini mengirim `Cache-Control: public, max-age=31536000, immutable` untuk aset tersebut. Saat mengganti gambar, gunakan nama file/URL baru dan perbarui referensinya di kode agar pengunjung tidak menerima gambar lama dari cache satu tahun.

---

## 6. Verifikasi SEO, AEO, dan GEO

Setelah situs live di `https://nadimtrans.com`:

- **Sitemap**: Buka `https://nadimtrans.com/sitemap.xml` dan submit ke **Google Search Console**.
- **Robots.txt**: Buka `https://nadimtrans.com/robots.txt`.
- **AEO / LLM Crawler**: Buka `https://nadimtrans.com/llms.txt`.
- **Schema Validator**: Uji URL di [Google Rich Results Test](https://search.google.com/test/rich-results) untuk memverifikasi JSON-LD `AutoRental`, `FAQPage`, `BreadcrumbList`, dan `Vehicle`.
- **PageSpeed & Performance**: Uji di [Google PageSpeed Insights](https://pagespeed.web.dev/).
