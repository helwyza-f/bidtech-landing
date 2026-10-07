# Dokumentasi Perbaikan Switch Bahasa (i18n) di Hosting Nadim Trans
**Project:** `projects/nadim-trans-rentcar`  
**Target Domain:** `https://nadimtrans.com`  
**Tanggal:** 7 Oktober 2026  
**Status:** Resolved & Production Ready  

---

## 1. Latar Belakang Masalah (Issue Summary)

Ketika website Nadim Trans Rent Car dijalankan di server hosting produksi (VPS / Docker / Nginx reverse proxy), pengunjung yang mencoba mengganti bahasa melalui komponen `LanguageSwitcher` mengalami kendala kritis:
1. **Bahasa tidak berhasil berganti**, atau
2. **Browser langsung masuk ke halaman blank** (layar putih kosong / *Connection Refused*).

Kendala ini tidak selalu terlihat saat pengujian lokal sederhana, namun langsung muncul begitu aplikasi berjalan di balik arsitektur reverse proxy (Nginx).

---

## 2. Analisis Akar Masalah (Root Cause Analysis)

Setelah penelusuran menyeluruh pada alur request dan routing, ditemukan 4 penyebab utama:

### A. Redirect ke Port Internal Server (`http://127.0.0.1:3040/`)
- Pada implementasi sebelumnya, `LanguageSwitcher.tsx` memindahkan halaman menggunakan URL endpoint server:  
  `/api/set-locale?locale=...&redirect=...`.
- Di dalam `app/api/set-locale/route.ts`, terdapat kode:  
  ```ts
  NextResponse.redirect(new URL(safeRedirect, request.url));
  ```
- Di server produksi, Next.js berjalan di balik Nginx (upstream port `3040`). Nilai `request.url` yang diterima Node.js adalah `http://127.0.0.1:3040/api/set-locale?...`.
- Akibatnya, `NextResponse.redirect` mengirimkan header HTTP:  
  `Location: http://127.0.0.1:3040/en`
- Browser pengunjung di internet mencoba membuka `127.0.0.1:3040` (loopback komputer lokal pengguna), yang jelas tidak dapat dihubungi, sehingga menghasilkan **layar blank / error koneksi**.

### B. Pemblokiran Rute Eksplisit di `middleware.ts`
- Di dalam `middleware.ts`, terdapat logika yang memeriksa cookie bahasa lama:
  ```ts
  if (storedLocale === "id") {
    if (pathname.startsWith("/en-sg") || pathname.startsWith("/ms") || pathname.startsWith("/en")) {
      const url = request.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }
  ```
- Jika pengunjung asal Indonesia (cookie default `id`) mengklik rute bahasa Inggris (`/en` atau `/en-sg`), middleware justru memblokir akses tersebut dan memaksa redirect kembali ke `/` menggunakan host internal `request.nextUrl`. Hal ini menggagalkan pergantian bahasa.

### C. Redirect Loop Deteksi Browser di Sisi Client (`LocaleRedirect.tsx`)
- Pada `app/en/layout.tsx`, properti `detectBrowserLocale` sebelumnya diaktifkan:
  ```tsx
  <RootDocument locale="en" detectBrowserLocale>{children}</RootDocument>
  ```
- Ketika pengunjung dari Indonesia (timezone `Asia/Jakarta`) berhasil mencapai halaman `/en`, komponen `LocaleRedirect.tsx` membaca timezone Indonesia dan langsung memaksa `window.location.href = "/"` (kembali ke bahasa Indonesia). Ini memicu *infinite redirect loop*.

### D. Ketiadaan Arahan `proxy_redirect` di Nginx
- Konfigurasi `nginx/nadimtrans.com.conf` sebelumnya belum mendefinisikan `proxy_redirect http://nadimtrans_backend/ /;`, sehingga header redirect upstream yang masih memuat port backend lolos langsung ke browser pengguna.

---

## 3. Solusi & Perubahan yang Diterapkan

Berikut rincian perbaikan pada masing-masing file:

### 1. `components/layout/LanguageSwitcher.tsx`
- Mengubah navigasi agar berpindah **langsung di browser pengguna** menggunakan rute publik relatif (`window.location.assign(targetPath)`), misalnya `/en`, `/en-sg`, `/ms`, atau `/`.
- Cookie `nadimtrans-locale` dan `localStorage` langsung diperbarui seketika oleh JavaScript sebelum navigasi berlangsung.
- Panggilan ke `/api/set-locale` dilakukan secara *asynchronous background fetch* tanpa menghentikan atau me-redirect alur navigasi utama.
- Properti `href` pada tag `<a>` dropdown bahasa kini langsung mengarah ke rute bahasa tujuan (`href={targetPath}`).

### 2. `app/api/set-locale/route.ts`
- Mendukung pemanggilan background (merespons JSON `{ success: true, locale: targetLocale }` dengan Set-Cookie header).
- Jika parameter `redirect` diberikan, URL redirect disusun dari header `x-forwarded-host` dan `x-forwarded-proto` (sehingga selalu mengarah ke `https://nadimtrans.com/` dan **tidak pernah ke port internal `127.0.0.1:3040`**).

### 3. `middleware.ts`
- Menambahkan fungsi helper `getPublicOrigin(request)` yang memprioritaskan `x-forwarded-host` dan `x-forwarded-proto`.
- Menghapus aturan pemblokiran rute: Jika URL memiliki prefix bahasa eksplisit (`/en`, `/en-sg`, `/ms`), middleware **mengizinkan request langsung** dan menyinkronkan cookie preferensi.
- Redirect otomatis hanya berjalan pada halaman utama (`/`) untuk pengunjung baru dari Singapura (SG) atau Malaysia (MY) yang belum memiliki preferensi manual.

### 4. `components/providers/LocaleRedirect.tsx` & `app/en/layout.tsx`
- Menonaktifkan `detectBrowserLocale` pada `app/en/layout.tsx`.
- Pada `LocaleRedirect.tsx`, jika pengguna sedang berada di rute bahasa spesifik (`locale !== "id"`), sistem menyinkronkan preferensi lokal ke bahasa aktif tersebut dan **tidak pernah membuang pengguna kembali ke bahasa Indonesia**.

### 5. `nginx/nadimtrans.com.conf`
- Menambahkan arahan pada blok `location /`:
  ```nginx
  proxy_redirect http://nadimtrans_backend/ /;
  proxy_redirect default;
  ```
  Ini menjamin setiap header `Location` dari backend yang masih memuat port internal otomatis ditulis ulang menjadi domain publik `https://nadimtrans.com/`.

---

## 4. Hasil Verifikasi & Build

Pengujian build dilakukan pada direktori `projects/nadim-trans-rentcar`:
```bash
npm run build
```
**Hasil:**
- ✓ Compiled successfully (Turbopack / Next.js)
- ✓ Linting & type checking lolos tanpa error
- ✓ 116 halaman statis (ID, EN, EN-SG, MS, serta seluruh slug kendaraan) berhasil digenerate sempurna (`exit code 0`).

---

## 5. Ringkasan File yang Diubah

| File | Perubahan |
| :--- | :--- |
| `projects/nadim-trans-rentcar/components/layout/LanguageSwitcher.tsx` | Navigasi langsung client-side & async cookie sync |
| `projects/nadim-trans-rentcar/app/api/set-locale/route.ts` | Resolusi host publik via X-Forwarded headers & JSON mode |
| `projects/nadim-trans-rentcar/middleware.ts` | Pencegahan pemblokiran rute & penyelarasan public origin |
| `projects/nadim-trans-rentcar/components/providers/LocaleRedirect.tsx` | Pencegahan redirect loop pada rute non-ID |
| `projects/nadim-trans-rentcar/app/en/layout.tsx` | Penonaktifan auto-detect browser pada layout EN |
| `projects/nadim-trans-rentcar/nginx/nadimtrans.com.conf` | Penambahan proxy_redirect Nginx |
| `docs/DOKUMENTASI_PERBAIKAN_I18N_HOSTING_NADIMTRANS.md` | Dokumen panduan perbaikan ini |
