# Panduan Deployment Nadim Trans RentCar (nadimstrans.com)

Panduan ini menjelaskan langkah demi langkah untuk melakukan deploy aplikasi Next.js **Nadim Trans RentCar** ke VPS (Ubuntu / Debian) menggunakan **Docker**, **Docker Compose**, dan **Reverse Proxy Nginx** dengan SSL (HTTPS) dari Let's Encrypt.

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
   └── Proxy Pass ke: 127.0.0.1:3000
          │
          ▼
[ Docker Container: nadimtrans-web ]
   └── Next.js 14 Standalone Mode (Node 20 Alpine, Non-root user `nextjs`)
```

---

## 2. Persiapan Server VPS

Pastikan domain `nadimstrans.com` dan `www.nadimstrans.com` sudah diarahkan (DNS A Record) ke **IP Publik VPS Anda**.

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

## 3. Clone Repository & Build Container

1. Masuk ke direktori kerja di VPS (misal `/var/www/nadimstrans`):
   ```bash
   cd /var/www
   git clone https://github.com/helwyza-f/bidtech-landing.git nadimstrans
   cd nadimstrans/projects/nadim-trans-rentcar
   ```

2. Jalankan container dengan Docker Compose:
   ```bash
   # Build image dan jalankan di background
   docker compose up -d --build
   ```

3. Periksa status container:
   ```bash
   docker ps
   # Container 'nadimtrans-web' akan berstatus Up dan port 127.0.0.1:3000->3000/tcp
   ```

4. Uji koneksi lokal Next.js di dalam VPS:
   ```bash
   curl -I http://127.0.0.1:3000
   # Respon harus berupa HTTP/1.1 200 OK
   ```

---

## 4. Konfigurasi Nginx & Penerbitan SSL

### Langkah A: Setup Awal Nginx untuk Penerbitan Sertifikat (HTTP)
Sebelum sertifikat SSL diterbitkan, buat konfigurasi sementara agar Certbot dapat memverifikasi domain Anda:

```bash
sudo nano /etc/nginx/sites-available/nadimstrans.com.conf
```

Tempelkan konfigurasi port 80 berikut:
```nginx
server {
    listen 80;
    listen [::]:80;
    server_name nadimstrans.com www.nadimstrans.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
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
sudo ln -s /etc/nginx/sites-available/nadimstrans.com.conf /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Langkah B: Dapatkan Sertifikat SSL Gratis dengan Certbot
Jalankan perintah berikut:
```bash
sudo certbot --nginx -d nadimstrans.com -d www.nadimstrans.com
```
*Ikuti petunjuk di layar (masukkan email dan setujui ToS).*

### Langkah C: Terapkan Konfigurasi Produksi Lengkap
Setelah sertifikat berhasil diterbitkan, ganti file `/etc/nginx/sites-available/nadimstrans.com.conf` dengan template produksi yang sudah disediakan di proyek ini:

```bash
# Salin konfigurasi produksi dari repository
sudo cp /var/www/nadimstrans/projects/nadim-trans-rentcar/nginx/nadimstrans.com.conf /etc/nginx/sites-available/nadimstrans.com.conf

# Test konfigurasi
sudo nginx -t

# Muat ulang Nginx
sudo systemctl reload nginx
```

---

## 5. Pembaruan Aplikasi (CI/CD atau Manual Update)

Ketika ada update kode di branch `satria` atau `main`:

```bash
cd /var/www/nadimstrans/projects/nadim-trans-rentcar
git pull
docker compose up -d --build
```
*Zero downtime: Docker akan mem-build image baru dan menggantikan container lama secara otomatis.*

---

## 6. Verifikasi SEO, AEO, dan GEO

Setelah situs live di `https://nadimstrans.com`:
- **Sitemap**: Buka `https://nadimstrans.com/sitemap.xml` dan submit ke **Google Search Console**.
- **Robots.txt**: Buka `https://nadimstrans.com/robots.txt`.
- **AEO / LLM Crawler**: Buka `https://nadimstrans.com/llms.txt`.
- **Schema Validator**: Uji URL di [Google Rich Results Test](https://search.google.com/test/rich-results) untuk memverifikasi JSON-LD `AutoRental`, `FAQPage`, `BreadcrumbList`, dan `Vehicle`.
- **PageSpeed & Performance**: Uji di [Google PageSpeed Insights](https://pagespeed.web.dev/).
