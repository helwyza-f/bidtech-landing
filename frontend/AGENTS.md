
## Modul Artikel (repo Next.js / website Bidtech)

Sebelum mengerjakan apa pun yang menyangkut artikel, baca `docs/artikel-spec.md`. Dokumen itu adalah acuan utama; jangan mengubah butir berlabel **[Diputuskan]** tanpa bertanya. Kerjakan per fase, dan buat rencana singkat dulu sebelum menulis kode.

Aturan inti di sisi Next.js:

- Halaman artikel harus dirender di server: HTML lengkap (judul, isi, meta, JSON-LD) harus sudah ada di respons awal. Dilarang mengambil isi artikel lewat fetch di browser.
- Data artikel diambil dari API publik Laravel, hanya dari sisi server.
- Strategi render: ISR + on-demand revalidation. Jangan mengandalkan build ulang penuh untuk perubahan konten.
- Sediakan endpoint revalidasi yang diamankan dengan secret bersama dan idempoten. Revalidasi mencakup halaman artikel, daftar (termasuk paginasi terdampak), dan sitemap. Kategori serta halaman penulis publik tidak dipakai pada fase ini. Tambahkan revalidasi berbasis waktu sebagai jaring pengaman.
- Konversi JSON BlockNote ke HTML dilakukan di server Next.js (pendekatan B). Bandingkan `blocksToFullHTML` dan `blocksToHTMLLossy` pada versi terpasang. Pasca-proses hasilnya: sanitasi, anchor heading, atribut tautan eksternal, penanganan gambar.
- H1 halaman adalah judul artikel (field terpisah). Isi hanya memakai H2/H3.
- Metadata per halaman dibangkitkan di server: title dari H1, description dari 120 karakter pertama plain text body, canonical, Open Graph, Twitter, dan meta author. Nama pembuat artikel masuk ke metadata dan JSON-LD (`BlogPosting`, `BreadcrumbList`) tanpa halaman penulis publik.
- URL publik kanonis adalah `/blog` untuk daftar dan `/blog/[slug]` untuk detail. Canonical, Open Graph URL, sitemap, breadcrumb/JSON-LD, internal link, dan revalidation hanya memakai jalur ini. `/article` dan `/artikel` belum pernah dipublikasikan, sehingga tidak memerlukan redirect migrasi.
- Perilaku status: artikel tidak ada atau nonaktif = 404, dihapus = 410 (atau 301 bila API memberi target), slug lama = 301 ke slug baru. Jangan pernah 200 dengan pesan "tidak tersedia". Next.js tidak punya helper 410 bawaan; verifikasi cara terbaik di versi terpasang.
- Sitemap hanya berisi artikel terbit, `lastmod` dari tanggal isi terakhir diubah. Paginasi memakai tautan biasa yang bisa dirayapi.
- Gambar dioptimasi oleh Next.js; daftarkan domain media sebagai sumber gambar remote. Selalu sertakan dimensi eksplisit.
- Gambar artikel berasal dari RustFS melalui URL publik `https://media.bidtech.co.id/bidtech/articles/...`. Upload dimiliki dashboard Laravel; frontend publik tidak mengunggah langsung dan tidak memegang kredensial S3.
- Pratinjau draft: URL khusus, `noindex`, tanpa cache.
- Cover kosong atau gagal dimuat memakai `https://media.bidtech.co.id/bidtech/blog/placeholder.webp`; cover bukan syarat publish.
- API publik dan halaman artikel Next.js masih fase berikutnya. Jangan menganggap kontrak dashboard sebagai endpoint publik yang sudah tersedia.
- Jangan mengerjakan hal di luar cakupan (bagian 11 spesifikasi). Jika menemui hal yang belum diputuskan (bagian 12 spesifikasi), tanyakan; jangan memutuskan sendiri.
- Cek dokumentasi resmi untuk versi Next.js dan BlockNote yang terpasang sebelum memakai API tertentu.
