# Spesifikasi Modul Artikel Bidtech

Dokumen ini adalah hasil brainstorming arsitektur fitur artikel untuk meningkatkan SEO website Bidtech. Dokumen ini ditulis untuk dibaca oleh developer dan agen coding (Claude Code / Codex) sebagai acuan implementasi.

## 0. Cara memakai dokumen ini

- Simpan dokumen ini di `docs/artikel-spec.md` pada **kedua repo** (Laravel dan Next.js). Jaga agar isinya tetap sinkron.
- Setiap butir keputusan diberi label:
  - **[Diputuskan]**: sudah dinyatakan pemilik proyek. Jangan diubah tanpa bertanya.
  - **[Usulan]**: rekomendasi dari diskusi yang belum dikonfirmasi tegas. Boleh diikuti sebagai default, tetapi tandai di laporan kerja agar bisa dikonfirmasi.
  - **[Verifikasi]**: detail teknis yang bergantung pada versi library. Cek dokumentasi resmi versi yang terpasang sebelum mengimplementasikan.
- Kerjakan per fase (lihat bagian 14). Untuk tiap fase: buat rencana singkat dulu, minta persetujuan, baru implementasi.
- Dokumen ini sengaja minim kode. Detail implementasi (nama kelas, skema migrasi persis) diputuskan saat pengerjaan, mengikuti konvensi yang sudah ada di masing-masing repo.

## 1. Tujuan dan ruang lingkup

- Tujuan: menambah fitur artikel sebagai sumber trafik organik (SEO) untuk website Bidtech (bidtech.co.id).
- Ruang lingkup: **hanya untuk website Bidtech** [Diputuskan]. Bukan modul multi-situs untuk klien.
- Artikel harus mudah diindeks Google walau datanya dinamis (dibuat, diedit, dinonaktifkan, dihapus oleh tim media).

## 2. Arsitektur

| Komponen | Peran |
|---|---|
| **Next.js** | Frontend utama dan satu-satunya yang melayani halaman publik artikel [Diputuskan] |
| **Laravel 13** (proyek dashboard Bidtech, terpisah) | Backend: autentikasi, dashboard penulis, API, penyimpanan data, webhook revalidasi [Diputuskan] |
| **MySQL** | Database, tetap dipakai [Diputuskan] |
| **RustFS** (di VPS sendiri) | Penyimpanan gambar artikel melalui API S3-compatible [Diputuskan] |
| **Cloudflare** | DNS/proxy/CDN; domain media ditambahkan lewat dashboard Cloudflare Bidtech [Diputuskan] |

Prinsip:
- Halaman publik artikel **harus dirender di server** sehingga HTML lengkap (judul, isi, meta, structured data) sudah ada di respons awal. Dilarang mengambil isi artikel lewat fetch di sisi browser.
- Next.js memanggil API publik Laravel **hanya dari sisi server**.
- Laravel menyediakan dua permukaan API terpisah: **API dashboard** (butuh autentikasi, untuk role internal) dan **API publik** (read-only, hanya mengembalikan artikel berstatus terbit) [Usulan].

## 3. Role dan izin

Role di dashboard Bidtech (ke depan): admin (akun utama), marketing, klien, media. Fokus modul ini: **media** dan **admin** [Diputuskan].

| Aksi pada artikel | Media | Admin |
|---|---|---|
| Buat, edit, publish | Ya | Tidak |
| Nonaktifkan | Ya | Ya |
| Aktifkan kembali | Ya | Ya |
| Hapus | Ya | Ya |
| Lihat semua artikel | Ya | Ya |

Aturan tambahan [Diputuskan]:
- Ada banyak akun media (contoh: Sukma, Alya, Asma). Semua media bisa melihat dan mengelola **semua** artikel, termasuk milik media lain. Tidak ada pengecekan kepemilikan.
- Dashboard menyediakan **filter berdasarkan penulis/pembuat**.
- Tidak ada alur review atau persetujuan. Media mempublikasikan langsung.
- Tidak ada konsep "nonaktifan dikunci admin". Admin atau media sama-sama boleh menonaktifkan dan mengaktifkan.
- Role marketing dan klien: belum punya akses artikel pada tahap ini.

Catatan implementasi:
- Otorisasi **wajib ditegakkan di sisi server** (policy/gate), bukan hanya dengan menyembunyikan tombol di UI.
- Optimistic locking saat edit [Usulan]: jika artikel sudah diubah orang lain sejak dibuka, tampilkan peringatan sebelum menimpa. Konflik memang jarang, tetapi menimpa diam-diam berisiko kehilangan tulisan.

## 4. Model data (konseptual)

Nama tabel dan kolom final mengikuti konvensi repo Laravel.

**Artikel**
- Judul (ini adalah H1 halaman, **diinput manual**) [Diputuskan]
- Slug otomatis dari judul selama draft dan dikunci setelah terbit (unik, lihat bagian 10)
- Kolom ringkasan/excerpt lama dipertahankan sementara untuk kompatibilitas, tetapi tidak diisi atau dipakai pada kontrak editor baru
- Isi: **JSON blok BlockNote** sebagai sumber kebenaran [Diputuskan]
- Gambar cover opsional dan dapat diganti langsung dari hero. Alt cover asli otomatis mengikuti judul; cover kosong/gagal memakai placeholder baku [Diputuskan 2026-10-01]
- Status: `draft`, `terbit`, `nonaktif`; dihapus = soft delete [Usulan untuk penamaan status]
- Tanggal terbit pertama, tanggal isi terakhir diubah (dipakai sebagai `lastmod`)
- Pembuat dan pengubah terakhir (akun media) — **pembuat sekaligus dipakai sebagai byline publik** (nama & foto akun media tersebut), lihat "Akun media (byline)" di bawah [Diputuskan]
- ~~Kategori~~: **tidak dipakai untuk tahap ini** [Diputuskan]
- Tidak ada field SEO editable pada fase ini. Meta title = judul; meta description = 120 karakter pertama plain text body; gambar OG kelak memakai cover atau placeholder [Diputuskan 2026-10-01]

**Akun media (byline)** [Diputuskan (revisi 2026-09-29): tidak ada entitas "profil penulis" terpisah — byline artikel memakai data akun media pembuatnya langsung, bukan tabel/CRUD tersendiri]
- Tiap akun media punya: nama tampil publik (byline), foto profil, password — ketiganya diubah sendiri oleh media yang bersangkutan lewat halaman pengaturan akunnya sendiri, bukan lewat CRUD admin terpisah
- **Tidak ada field bio** [Diputuskan]
- **Tidak ada halaman detail/arsip penulis publik** (`/penulis/[slug]`) — byline hanya tampil inline di halaman artikel, tidak diklik ke halaman tersendiri [Diputuskan]
- Nama & foto byline tampil publik di halaman artikel dan masuk metadata/structured data, jadi pastikan media yang bersangkutan menyetujuinya sebelum publish

**Riwayat slug** [Diputuskan: slug tidak pernah dipakai ulang; Usulan: bentuk tabel]
- Mencatat semua slug yang pernah dipakai beserta artikelnya, termasuk slug lama hasil perubahan dan slug artikel yang dihapus

**Aset gambar**
- Satu baris per gambar: lokasi di RustFS, ukuran, tipe, lebar, tinggi, pengunggah, dan status siap
- Relasi pemakaian: gambar dipakai oleh artikel mana (cover dan gambar dalam isi). Ini dibutuhkan worker pembersih di masa depan [Usulan]

**Riwayat aktivitas (audit log)**
- Siapa, melakukan apa, pada artikel mana, kapan. Aksi: buat, edit, publish, nonaktifkan, aktifkan, hapus, ubah slug
- **Hanya untuk kebutuhan internal di dashboard**, tidak boleh muncul di API publik [Diputuskan]

## 5. Status artikel dan perilaku HTTP

Alur: `draft` → `terbit` ⇄ `nonaktif` → `dihapus` (soft delete).

| Status | Respons halaman publik | Sitemap dan daftar | Catatan |
|---|---|---|---|
| Draft | 404 | Tidak | Pratinjau lewat URL khusus, `noindex`, tanpa cache |
| Terbit | 200 | Ya | `lastmod` dari tanggal isi terakhir diubah |
| Nonaktif | 404 | Tidak | Durasi nonaktif tidak tentu (sehari sampai selamanya), maka diperlakukan sebagai tidak tersedia, bukan "sementara" [Usulan] |
| Dihapus | 410 (Gone), atau 301 ke artikel pengganti jika dipilih saat menghapus | Tidak | Artikel yang dihapus tidak akan kembali [Diputuskan]; 410/301 = Usulan |
| Slug diganti | 301 dari slug lama ke slug baru | Slug baru saja | Wajib, agar peringkat tidak hilang |

Larangan: jangan pernah menampilkan status 200 dengan isi "artikel tidak tersedia" (dianggap soft 404 oleh Google). Jangan redirect ke beranda.

Saat diaktifkan kembali: halaman kembali 200, masuk sitemap, `lastmod` diperbarui. Beri teks bantuan di tombol nonaktif bahwa artikel tidak akan tampil dan bisa turun peringkat sementara.

[Verifikasi] Next.js tidak punya helper bawaan untuk respons 410. API publik Laravel sebaiknya membedakan "tidak ada" (404) dan "dihapus" (410, dengan target redirect bila ada), lalu Next.js menerjemahkannya (mis. lewat route handler/middleware). Jika tidak praktis, fallback ke 404 dan catat sebagai keterbatasan.

## 6. Editor dan konten (BlockNote)

- Editor penulisan memakai **BlockNote** [Diputuskan].
- JSON blok adalah sumber kebenaran dan yang dimuat kembali ke editor. HTML adalah turunan untuk tampilan publik.
- **Judul (H1) dan gambar cover diisi manual** di field terpisah, bukan di dalam editor [Diputuskan].
- Halaman create/edit bersifat immersive tanpa sidebar. H1 diedit inline di hero cover; body berada di bawah hero pada reading column 760px.
- Di dalam isi artikel hanya boleh heading **H2 dan H3**. Sembunyikan opsi H1 di editor, dan tolak di validasi server [Usulan].
- Isi artikel boleh memakai blok **kutipan (blockquote)** [Diputuskan].
- Validasi sisi server (Laravel) saat simpan/publish [Usulan]:
  - Hanya jenis blok yang diizinkan (whitelist).
  - Tidak ada heading level 1 di isi.
  - Setiap gambar di isi punya caption/alt text sebelum update/publish; draft autosave boleh belum lengkap.
  - Judul, slug otomatis, dan body bermakna wajib sebelum publish. Cover tidak wajib.
- Nilai turunan **dihitung dari JSON**, bukan diisi manual/disimpan: plain text dengan whitespace ternormalisasi, meta description 120 karakter Unicode-safe, serta waktu baca `ceil(jumlah karakter / 2500)` (0 untuk body kosong, minimal 1 untuk body berisi).
- Byline selalu memakai akun media pembuat (`created_by.displayAuthorName()`), bukan pengubah terakhir.
- Draft autosave setelah debounce sekitar 1 detik dan tidak membuat activity log per ketikan. Artikel terbit/nonaktif disimpan hanya lewat aksi Update eksplisit dan dilindungi unsaved-navigation warning.
- Block produksi: paragraph, H2, H3, bullet list, numbered list, quote, image, divider, table, serta layout dua atau tiga kolom. Multi-column disimpan sebagai `columnList` dengan child `column`, kembali menjadi satu kolom pada mobile, dan tetap menjalankan validasi rekursif untuk setiap blok di dalamnya. H1 tidak tersedia pada schema UI dan tetap ditolak server.
- [Verifikasi] Nama jenis blok, dukungan alt text pada blok gambar (mungkin perlu blok/properti kustom), dan opsi hook unggah file (`uploadFile`) pada versi BlockNote yang terpasang.

## 7. Rendering dan revalidasi (Next.js)

### Strategi
**ISR + on-demand revalidation** [Diputuskan]. Tidak ada build ulang penuh saat konten berubah; build ulang hanya saat kode frontend berubah.

### Konversi JSON ke HTML
**Pendekatan B** [Diputuskan]: konversi JSON BlockNote ke HTML dilakukan di sisi server Next.js saat halaman dirender (hasilnya di-cache oleh ISR).
- [Verifikasi] Bandingkan `blocksToFullHTML` dan `blocksToHTMLLossy` pada artikel contoh. Karena JSON tetap sumber kebenaran, HTML publik tidak perlu bisa dimuat balik ke editor, sehingga versi yang lebih bersih/semantik mungkin lebih cocok untuk SEO. Konversi di server memakai utilitas server BlockNote.
- Pasca-proses HTML hasil konversi [Usulan]:
  - Sanitasi output sebelum ditampilkan (pertahanan lapis kedua terhadap XSS).
  - Beri `id` anchor pada heading (untuk daftar isi).
  - Atribut yang sesuai untuk tautan eksternal.
  - Gambar: ganti `<img>` menjadi `next/image` agar dioptimasi [Diputuskan].

### Alur revalidasi
1. Aksi di dashboard (publish, edit, nonaktifkan, aktifkan, hapus, ganti slug) tersimpan di MySQL.
2. Setelah transaksi database selesai (after-commit), Laravel mengantrekan job pengirim sinyal revalidasi ke Next.js [Usulan].
3. Job memanggil endpoint revalidasi di Next.js, diamankan dengan secret bersama, dengan retry dan backoff. Endpoint harus idempoten [Usulan].
4. Next.js membuang cache untuk: detail `/blog/[slug]` terkait, daftar `/blog` (dan halaman paginasi yang terdampak), dan sitemap. (Tidak ada halaman penulis tersendiri untuk direvalidasi — lihat bagian 4.)
5. Tambahkan revalidasi berbasis waktu sebagai jaring pengaman bila sinyal gagal terkirim: **durasi standar 1 jam (3600 detik)** [Diputuskan].

Jika Laravel sedang tidak bisa dihubungi, halaman lama tetap tersaji dari cache.

### Cloudflare dan cache HTML
[Usulan] Jika halaman artikel melewati proxy Cloudflare, atur agar cache HTML mengikuti header cache dari Next.js dengan durasi pendek, atau lakukan purge URL terkait saat revalidasi. Tanpa itu, pengunjung bisa melihat versi lama walau Next.js sudah revalidate. Aset statis dan gambar boleh di-cache lama.

### Pratinjau draft
Pratinjau memakai URL khusus berotentikasi/bertoken, `noindex`, tanpa cache (mis. Draft Mode Next.js) [Usulan, Verifikasi].

## 8. Gambar dan RustFS

### Keputusan
- Gambar disimpan di **RustFS** di VPS sendiri [Diputuskan].
- URL gambar **stabil dan memakai domain sendiri**: `media.bidtech.co.id` [Diputuskan], di belakang reverse proxy/Cloudflare, bukan alamat IP:port.
- Bucket `bidtech` **publik-baca** dan URL memuat nama bucket. Jangan gunakan URL sementara berkedaluwarsa untuk gambar publik [Diputuskan].
- **Optimasi gambar dilakukan oleh Next.js** [Diputuskan]. Domain media harus didaftarkan pada konfigurasi gambar remote Next.js.
- Backup RustFS/VPS dan worker pembersih gambar yatim **ditunda** ke tahap berikutnya. VPS diasumsikan stabil [Diputuskan]. Tetap gunakan prefix `articles/` agar migrasi/backup nanti mudah.

### Alur unggah
Tujuan [Diputuskan, revisi 2026-10-01]: file dikirim ke Laravel agar alur sederhana dan seluruh tanggung jawab storage berada pada `ArticleService`.

1. Cover dan gambar inline dikirim ke `POST /dashboard/articles/images`. Response memuat `image_id`, URL, lebar, dan tinggi; cover disimpan memakai ID aset tepercaya, sedangkan callback BlockNote memakai URL.
2. `FormRequest` memeriksa role, MIME, dan batas ukuran; `ArticleService` kembali memeriksa MIME aktual, ukuran, serta dimensi gambar.
3. Laravel menyimpan file langsung ke `articles/{uuid}.{ext}` menggunakan `Storage::disk('s3')`, tanpa ACL per objek.
4. Setelah penyimpanan berhasil, metadata aset dicatat berstatus siap dan URL publik dikembalikan. Jika pencatatan database gagal, objek yang baru ditulis dihapus kembali. Browser tidak boleh mengirim `cover_image_url` bebas.

Catatan penting [Usulan, Verifikasi]:
- Metadata browser tidak dipercaya; validasi dilakukan dari file yang diterima Laravel sebelum ditulis ke RustFS.
- Jenis file yang diizinkan: JPG, PNG, WebP, AVIF, GIF. **SVG ditolak** (risiko skrip).
- Batas ukuran maksimum: **10 MB per gambar** [Diputuskan].
- Browser tidak mengakses S3 API RustFS secara langsung, sehingga S3 CORS tidak diperlukan untuk alur upload saat ini. Aturan CORS yang terpasang pada bucket dikelola manual sebagai konfigurasi external.
- Batas PHP adalah 12 MB per file, 16 MB per request, dan Nginx aplikasi 32 MB agar file maksimum 10 MB dapat diterima.
- Simpan lebar dan tinggi tiap gambar untuk mencegah layout shift.
- Gambar tetap disimpan saat artikel dinonaktifkan atau di-soft-delete. Gambar dianggap yatim hanya bila tidak dipakai artikel mana pun, **termasuk draft, nonaktif, dan yang dihapus**.

## 9. Checklist SEO teknis

- Metadata per halaman dibangkitkan di server: title, description, canonical, Open Graph, Twitter card, meta author, waktu terbit/ubah [Usulan].
- Nama penulis individu masuk ke metadata dan structured data [Diputuskan].
- Structured data JSON-LD [Usulan]:
  - `BlogPosting`/`Article`: judul, gambar, tanggal terbit, tanggal diubah, penulis (Person: nama & foto byline saja, **tanpa `url` ke halaman penulis** karena tidak ada halaman detail penulis di Bidtech), penerbit (Organization Bidtech).
  - `BreadcrumbList`.
- Sitemap XML dinamis: hanya artikel terbit, `lastmod` jujur (dari tanggal isi diubah). Daftarkan di Google Search Console [Usulan].
- `robots.txt`; pratinjau dan draft `noindex` [Usulan].
- Paginasi daftar artikel memakai tautan biasa yang bisa dirayapi, bukan tombol "muat lebih banyak" berbasis JavaScript [Usulan].
- URL publik kanonis memakai istilah internasional `blog`: daftar di `/blog` dan detail tanpa ID di `/blog/[slug]` pada domain utama (bukan subdomain) [Diputuskan 2026-10-02].
- Canonical URL, Open Graph URL, sitemap, breadcrumb/JSON-LD, internal link, dan target revalidasi hanya memakai jalur `/blog` [Diputuskan 2026-10-02].
- `/article`, `/article/[slug]`, `/artikel`, dan `/artikel/[slug]` belum pernah dipublikasikan, sehingga tidak memerlukan redirect migrasi. `/blog` menjadi jalur publik pertama saat Fase 3 diimplementasikan [Diputuskan 2026-10-02].
- Penamaan internal tetap memakai domain `Article`: route dashboard `/dashboard/articles`, endpoint API, nama model/tabel, dan prefix object storage `articles/` tidak diubah karena bukan URL publik yang diindeks [Diputuskan 2026-10-02].
- ~~Halaman penulis publik (`/penulis/[slug]`)~~: **tidak ada** [Diputuskan (revisi 2026-09-29)]. Byline hanya tampil inline di halaman artikel.
- Internal linking: artikel terkait, breadcrumb, tautan ke halaman layanan dan template Bidtech [Usulan].
- Core Web Vitals: gambar dengan dimensi eksplisit, lazy-loading, tanpa layout shift.
- Opsional: RSS feed, IndexNow untuk Bing/Yandex. Google mengandalkan sitemap dan Search Console.

## 10. Aturan slug

- **Slug yang pernah dipakai tidak boleh dipakai lagi**, oleh artikel mana pun [Diputuskan]. Keunikan slug mencakup artikel aktif, nonaktif, dihapus, dan slug lama hasil perubahan.
- Slug bukan input pengguna. Selama draft, slug selalu dibentuk ulang dari judul; judul kosong menghasilkan slug `null`.
- Konflik dengan artikel aktif, soft-delete, atau riwayat slug memakai suffix numerik terkecil (`-2`, `-3`, dan seterusnya).
- Perubahan judul draft tidak membuat riwayat slug karena URL tersebut belum pernah publik. Setelah pertama terbit, slug dikunci walaupun judul berubah.
- Slug dinormalisasi (huruf kecil, tanda hubung) dan tidak berisi ID.

## 11. Di luar cakupan tahap ini (ditunda)

- Backup RustFS/VPS [Diputuskan ditunda]
- Worker pembersih gambar yatim [Diputuskan ditunda]
- Multi-situs untuk website klien (tidak dikerjakan) [Diputuskan]
- Multi-bahasa, publikasi terjadwal, riwayat revisi, komentar, pencarian internal, fitur untuk role marketing: belum dibahas, jangan dikerjakan kecuali diminta

## 12. Hal yang belum diputuskan

Tidak ada lagi poin terbuka dari daftar awal. Keputusan awal diselesaikan pada 2026-09-29 dan pola URL publik direvisi pada 2026-10-02 menjadi `/blog` serta `/blog/[slug]`. Batas unggah gambar tetap 10 MB, domain media `media.bidtech.co.id`, gambar isi memakai `next/image`, kategori/tag tidak dipakai untuk tahap ini, dan durasi revalidasi berbasis waktu standar 1 jam. Lihat bagian 4, 7-9 untuk detail.

Jika saat implementasi muncul hal baru yang belum dibahas dokumen ini, **tanyakan kepada pemilik proyek**, jangan memutuskan sendiri.

## 13. Daftar verifikasi versi (sebelum menulis kode)

1. BlockNote: jenis blok, `blocksToFullHTML` vs `blocksToHTMLLossy` di server, alt text pada gambar, hook `uploadFile`.
2. RustFS: API S3, path-style endpoint, serta pengelolaan manual bucket policy, CORS, dan akun akses di luar Compose aplikasi.
3. Next.js (versi terpasang): API revalidasi berbasis path/tag, Draft Mode, pembuatan metadata, sitemap, penanganan 410.
4. Laravel 13: cara mengantrekan job setelah commit, policy/gate, soft delete, dan driver S3 untuk RustFS.
5. Cloudflare: aturan cache untuk HTML dan batas ukuran unggahan pada paket yang dipakai.

## 14. Urutan implementasi

Kerjakan berurutan, satu fase per sesi. Di akhir tiap fase, laporkan apa yang selesai, apa yang menyimpang dari spesifikasi, dan butir [Usulan] apa yang diikuti.

**Catatan urutan (2026-09-29) [Diputuskan oleh owner]:** Fase 5 dikerjakan lebih dulu, sebelum Fase 2-4, karena owner ingin upload gambar nyata tersedia lebih awal untuk testing CRUD artikel. Keputusan storage kemudian direvisi pada 2026-10-01: RustFS menggantikan implementasi lama, tetap melalui protokol S3-compatible dan package `league/flysystem-aws-s3-v3`.

**Implementasi Fase 5 terkini (revisi 2026-10-01):** `ArticleService::uploadImage()` menerima `UploadedFile`, memvalidasi isi aktual, menyimpan langsung ke prefix `articles/` melalui disk S3, dan mencatat `article_images` sebagai siap. Cover dan BlockNote memakai satu endpoint multipart Laravel; cover kemudian direferensikan lewat `image_id`. RustFS berjalan di luar Compose aplikasi; bucket, public policy, CORS, dan akun akses dibuat manual melalui console sesuai `docs/RUSTFS.md`. **[Usulan]** tidak ada tabel pivot pemakaian gambar-per-artikel karena gambar dapat diunggah sebelum artikel tersimpan dan worker pembersih masih ditunda.

**Alasan revisi tetap dicatat:** alur direct-to-storage sebelumnya menambah dua endpoint, objek sementara, validasi konfirmasi, aturan CORS, dan kode JavaScript khusus. Owner memilih alur Laravel-first agar mudah dipahami dan seluruh akses storage berada pada satu Service. Konsekuensinya bandwidth file melewati PHP, sehingga batas PHP/Nginx dijaga di atas batas aplikasi 10 MB.

**Verifikasi yang tetap berlaku:** cover dan gambar inline harus menerima format yang diizinkan, menolak SVG/file palsu/oversize, menyimpan dimensi, serta menolak submit artikel bila gambar isi belum memiliki caption/alt text.

**Fase 1: Data, izin, dan CRUD dashboard (Laravel)**
Tabel dan model, role media/admin beserta policy, CRUD artikel, siklus status, soft delete, riwayat slug, pengaturan byline (nama tampil & foto) di akun media, audit log internal, validasi konten JSON.
Selesai bila: izin sesuai tabel bagian 3 dan slug tidak bisa dipakai ulang.

**Fase 2: API publik (Laravel)**
Endpoint read-only: daftar, detail per slug (termasuk pembedaan 404/410/redirect, dengan byline nama & foto akun media pembuat disertakan di response). Hanya artikel terbit. Tidak ada endpoint/halaman penulis tersendiri.
Selesai bila: artikel draft/nonaktif tidak pernah bocor lewat API publik.

**Fase 3: Halaman publik (Next.js)**
Halaman daftar `/blog` dan detail `/blog/[slug]`, konversi JSON ke HTML, pasca-proses, metadata, JSON-LD, serta penanganan 404/410/301 untuk status artikel dan perubahan slug. Tidak diperlukan redirect migrasi dari `/article` atau `/artikel` karena keduanya belum pernah dipublikasikan. Byline tampil inline di halaman artikel (tanpa halaman detail penulis tersendiri).
Selesai bila: HTML lengkap sudah ada di respons awal (cek dengan "view source"/curl).

**Fase 4: Revalidasi dan sitemap**
Job antrean di Laravel, endpoint revalidasi aman di Next.js, revalidasi berbasis waktu, sitemap dinamis, robots, penyesuaian cache Cloudflare.
Selesai bila: publish/edit/nonaktifkan/hapus memperbarui halaman, daftar, dan sitemap tanpa build ulang.

**Fase 5: Unggah gambar ke RustFS**
Upload multipart melalui Laravel, penyimpanan oleh `ArticleService` lewat driver S3, integrasi BlockNote dan cover, serta pencatatan aset.
Selesai bila: file valid tersimpan langsung di `articles/`, file tidak valid ditolak, dan browser tidak memegang kredensial storage.

**Fase 6: Penyempurnaan SEO dan kualitas**
Optimasi gambar, internal linking, pratinjau draft publik, dan optimistic locking. Dashboard tidak menyediakan field SEO manual; checklist hanya boleh menilai nilai turunan dan internal link.

**Fase 7 (tahap berikutnya, di luar spesifikasi ini)**
Backup, worker pembersih, dan butir pada bagian 11.
