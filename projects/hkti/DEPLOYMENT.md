# Deployment — hktikotabatam.org

Situs ini adalah **static export** Next.js (`output: "export"`), dikemas jadi image Docker yang menjalankan nginx internal di **port 3020**. nginx di host VPS (di luar Docker) yang men-terminate TLS dan reverse-proxy ke container ini — bukan menyajikan `out/` langsung.

Arsitektur: `Cloudflare (proxied, Full Strict) → nginx host (443, TLS) → 127.0.0.1:3020 → container Docker (nginx internal, serve out/)`.

## Build & deploy via CI/CD

Deployment produksi dikelola oleh `.github/workflows/deploy-hkti.yml`. GitHub Actions menyalin `.env.example` menjadi `.env` untuk build, membangun dan menguji image satu kali, lalu memublikasikannya sebagai `ghcr.io/<owner>/hktibatam`. VPS hanya menerima file Compose di `/opt/hkti`, menarik image berdasarkan tag commit, dan menjalankan container tanpa checkout Git atau build source.

Catatan penting: `NEXT_PUBLIC_*` di-inline ke HTML/JS **saat build**, bukan saat container berjalan. Untuk mengganti nilainya, edit `projects/hkti/.env.example`, commit, lalu push ke `main` agar CI membangun dan men-deploy image baru. Menjalankan ulang commit yang sudah ada dapat dilakukan melalui **Run workflow** (`workflow_dispatch`). Mengedit `.env` langsung di VPS atau me-restart container tidak berpengaruh.

Cek container di VPS dengan `docker logs -f hkti-batam` dan `curl -I http://127.0.0.1:3020/`.

File terkait: [Dockerfile](Dockerfile) (multi-stage: build Next.js → runtime nginx:alpine), [docker/nginx.conf](docker/nginx.conf) (nginx di dalam container), [compose.yml](compose.yml), dan [compose.prod.yml](compose.prod.yml).

### Build manual tanpa Docker (opsional, untuk debug)

```bash
npm ci
npm run build      # menghasilkan folder out/
npm run serve      # preview lokal out/ di http://localhost:3000
```

## DNS & Cloudflare (Dewaweb → Cloudflare → VPS)

- [ ] Domain `hktikotabatam.org` di Dewaweb: ubah nameserver ke Cloudflare.
- [ ] Di Cloudflare: tambah DNS record `A` (root `@` dan `www`) mengarah ke IP VPS. Proxy status: **Proxied** (ikon oranye) supaya dapat proteksi & caching Cloudflare.
- [ ] SSL/TLS mode: **Full (Strict)** — VPS harus punya sertifikat valid (mis. Let's Encrypt via certbot), jangan pakai "Flexible" (rawan redirect loop).
- [ ] Aktifkan **Always Use HTTPS** di Cloudflare (SSL/TLS → Edge Certificates).
- [ ] Putuskan domain kanonik: `hktikotabatam.org` atau `www.hktikotabatam.org`, lalu buat **Page Rule / Redirect Rule** di Cloudflare supaya varian lain 301-redirect ke yang kanonik (mencegah duplicate content).

## nginx di VPS (reverse proxy ke container)

Next.js `headers()`/`redirects()` **tidak berlaku** untuk static export, dan container hanya expose port 3020 secara lokal — TLS & routing publik diatur di nginx host.

Contoh siap pakai: [deploy/nginx-reverse-proxy.conf.example](deploy/nginx-reverse-proxy.conf.example).

- [ ] Pasang sertifikat TLS (certbot: `certbot certonly --nginx -d hktikotabatam.org -d www.hktikotabatam.org`).
- [ ] Salin `deploy/nginx-reverse-proxy.conf.example` ke `/etc/nginx/sites-available/hktikotabatam.org.conf`, sesuaikan path sertifikat, lalu `ln -s` ke `sites-enabled/`.
- [ ] `nginx -t && systemctl reload nginx`.
- [ ] Pastikan `docker compose up -d` sudah jalan duluan supaya `127.0.0.1:3020` merespons sebelum reverse proxy diaktifkan.

Caching, gzip, dan security header untuk aset statis (`/_next/static/`, `/images/`) **sudah diatur di [docker/nginx.conf](docker/nginx.conf)** (nginx di dalam container) — nginx host tidak perlu mengulanginya, cukup reverse-proxy polos seperti contoh di atas.

## Setelah domain live

- [ ] Submit `https://hktikotabatam.org/sitemap.xml` ke **Google Search Console** dan **Bing Webmaster Tools**.
- [ ] Isi `NEXT_PUBLIC_GSC_VERIFICATION` / `NEXT_PUBLIC_BING_VERIFICATION` di `projects/hkti/.env.example` (dari properti yang didaftarkan), lalu commit dan biarkan CI rebuild serta redeploy.
- [ ] Isi `NEXT_PUBLIC_GA_ID` di `projects/hkti/.env.example` setelah punya properti GA4, lalu deploy melalui CI.
- [ ] Validasi structured data: tempel HTML hasil `curl https://hktikotabatam.org/` ke [Google Rich Results Test](https://search.google.com/test/rich-results).
- [ ] Cek `sameAs` di `constants/index.ts` (`SOCIAL_LINKS`) — lengkapi Facebook/YouTube begitu link resmi didapat, lalu rebuild.
