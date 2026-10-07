# Redis — Cache, Session, dan Caching Harga Domain

Keputusan arsitektur (belum dieksekusi). Redis menggantikan driver `database` untuk `CACHE_STORE` dan `SESSION_DRIVER` sepenuhnya, sekaligus jadi lapisan caching strategis untuk harga domain di `DomainService`. Dicatat dulu sebagai keselarasan sebelum implementasi — lihat juga `docs/ARCHITECTURE.md` untuk keputusan FrankenPHP + Laravel Octane yang berjalan bersamaan.

## Peran Redis

- `CACHE_STORE=redis`, `SESSION_DRIVER=redis` (ganti dari `database`).
- Dipakai juga sebagai cache harga domain per ekstensi (lihat di bawah) — ini kebutuhan baru, bukan sekadar pindah driver cache umum.

## Masalah yang mau diselesaikan

`DomainService::search()` sekarang cache per **kombinasi nama bisnis + ekstensi** (`idch_domain_search_{baseName}_{ext}`, TTL 5 menit). Tapi harga domain (`price`/`price_base`/`tax_amount`) di `lookupDns()`/`queryPricing()` nyatanya hanya fungsi dari ekstensi (`config('domain.extensions')[$ext]` atau hasil live IDCloudHost per-ekstensi) — **tidak** bergantung nama bisnis. Mencari `abcde.com` lalu `efghj.com` melakukan query harga yang sama dua kali, padahal harga `.com` sudah diketahui dari pencarian pertama. Hanya `available` yang benar-benar spesifik per nama domain penuh.

## Desain: dua lapis data dengan sifat beda

1. **Harga per ekstensi** (`idch_ext_price_{ext}` di Redis, TTL panjang, misal 24 jam) — dipakai lintas pencarian siapa pun, nama bisnis apa pun. Cold start (ekstensi belum pernah dicari) tetap butuh query IDCloudHost penuh sekali.
2. **Availability per nama domain penuh** — TIDAK dicache. Status registrasi spesifik per domain dan bisa berubah; DNS heuristic (`checkdnsrr`, dipakai `DomainService::isRegistered()`) tidak selalu akurat (domain yang sudah dibeli tapi DNS-nya belum dikonfigurasi bisa salah kelihatan "tersedia"). Keputusan final "boleh dipilih/klik atau tidak" wajib menunggu konfirmasi asli dari IDCloudHost, bukan DNS semata.

## Alur pencarian dua fase (UX)

1. **Fase instan**: user mengetik query. Backend balas langsung pakai harga dari `idch_ext_price_{ext}` di Redis kalau ada (fallback ke harga katalog `config('domain.extensions')` kalau belum ada entri). Setiap kartu domain tampil dengan harga tapi berstatus "memverifikasi..." dan tombol pilih nonaktif.
2. **Fase konfirmasi**: frontend langsung mengirim request terpisah (bukan `defer()`) ke endpoint konfirmasi yang benar-benar menunggu IDCloudHost (`queryPricing()`, diperbaiki pakai `$pool->as($ext)` — menutup hutang arsitektur #5 di `docs/ARCHITECTURE.md`) untuk availability + harga final. Begitu respons kembali: kartu domain terkait jadi clickable dengan status final, dan `idch_ext_price_{ext}` di Redis diperbarui kalau harganya berbeda dari yang disajikan di fase instan.
3. Kalau harga Redis untuk ekstensi itu sudah fresh di fase instan, fase konfirmasi tetap wajib jalan untuk availability (karena availability tidak pernah dicache) — bagian harga di fase konfirmasi biasanya cuma re-confirm (sama), update Redis hanya kalau ternyata beda.

## Peran `defer()` (Octane) — hanya untuk cache warming, bukan unlock pencarian yang sedang berjalan

`defer()` jalan **setelah** response terkirim ke client — hasilnya tidak bisa "balik" ke request yang sama. Dipakai khusus untuk: kalau fase instan terpaksa pakai harga katalog fallback (Redis belum punya entri utk ekstensi itu), request bisa `defer()` pemanggilan `queryPricing()` untuk ekstensi tsb supaya Redis terisi untuk pencarian **berikutnya** (siapa pun, nama bisnis apa pun) — tanpa menambah latensi ke response saat ini. Unlock status clickable pada pencarian yang SEDANG berjalan tetap lewat fase konfirmasi (poin di atas), bukan `defer()`.

## Implikasi infrastruktur (belum dieksekusi)

- Tambah service `redis` di `compose.yml`/`compose.prod.yml` (image `redis:alpine` atau serupa). Volume persisten disarankan minimal untuk session (supaya restart Redis tidak logout semua user); cache boleh non-persisten.
- `.env`: `CACHE_STORE=redis`, `SESSION_DRIVER=redis`, `REDIS_HOST`, `REDIS_PORT`, `REDIS_PASSWORD` sesuai kebutuhan.
- Ekstensi PHP `redis` (phpredis) atau paket `predis/predis` perlu ditambahkan ke `Dockerfile`/`composer.json`.
- `DomainService` perlu restrukturisasi: pisahkan method harga-per-ekstensi (cacheable, dipanggil dari Redis) dari method availability-per-domain (selalu fresh), tambah endpoint/route baru untuk fase konfirmasi, serta memperbaiki `queryPricing()` (`$pool->as($ext)`).
- `.github/workflows/deploy-bidtech.yml`: tahap `docker compose up -d --wait mysql` (job `build-dashboard` dan script `deploy`) perlu ikut menunggu service `redis` baru (`--wait mysql redis` atau penyesuaian serupa) sebelum `up -d --wait app`, karena `CACHE_STORE`/`SESSION_DRIVER` akan bergantung ke Redis sejak awal boot.

## Status

Belum dieksekusi. Dokumen ini jadi acuan desain sebelum implementasi.
