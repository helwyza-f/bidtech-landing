# Arsitektur dashboard-bidtech

Acuan tunggal struktur kode. Prinsipnya: **satu Service per bidang bisnis** dan **satu controller per halaman/alur**. Logika bisnis aplikasi dikelompokkan dalam tujuh kelas di `app/Services/`, sehingga lokasi sebuah aturan bisa ditebak dari bidangnya tanpa membuat satu file untuk setiap operasi kecil.

## Peran aplikasi

Laravel melayani dashboard admin/klien/media berbasis Blade, alur checkout publik, API publik untuk frontend Next.js, serta webhook Xendit dan IDCloudHost. Halaman publik situs dilayani Next.js di repo `frontend/`.

## Struktur folder

| Lapisan | Lokasi | Isi |
|---|---|---|
| Route | `routes/web.php`, `routes/api.php` | Web/dashboard/checkout/webhook di `web.php`; API publik di `api.php`. Includes `GET /dashboard/profile` (`dashboard.profile.edit`). |
| Controller | `app/Http/Controllers` | Controller berbahasa Indonesia per halaman/alur; subfolder hanya `Api/` dan `Webhook/`. Controller mengurus HTTP, otorisasi, validasi pendek, response, redirect, dan login otomatis. |
| Service | `app/Services` | Tepat tujuh kelas bidang: `DomainService`, `TemplateService`, `PaymentService`, `OrderService`, `UserService`, `PromoService`, dan `ArticleService`. Semua logika bisnis ada di sini. |
| Data | `app/Models`, `app/Enums`, `database/` | Model, enum status, migration, factory, dan seeder. Rumus harga tetap di model. |
| View | `resources/views/` | Tepat 23 Blade + `vendor/pagination`: `layouts/` (`dashboard`, `login`, `checkout`), `components/` (`sidebar`, `header`), `pages/` (15 halaman), `pdf/invoice.blade.php`, `emails/` (`unpaid-invoice`, `paid-invoice`). |

Tidak ada folder/kelas `Actions`, `Support`, `Helper`, atau `Util`. Helper yang hanya dipakai satu bidang menjadi method `private` pada Service pemiliknya.

## Konvensi Service

- Lokasi `app/Services/{Nama}Service.php`; kelas biasa, tanpa facade/static buatan sendiri.
- Method publik bernama semantik dalam bahasa Inggris, misalnya `createOrder`, `applyPromo`, `dashboardClient`. Bagian besar dipisahkan komentar seperti `// ---- Checkout ----`.
- Controller memakai method injection:

  ```php
  public function store(SaveArticleRequest $request, ArticleService $articles)
  {
      $article = $articles->create($request->validated(), $request->user());
  }
  ```

- Service lain masuk lewat constructor. Arah dependensi satu arah dan tidak boleh membentuk siklus:
  - daun: `DomainService`, `TemplateService`, `UserService`, `PromoService`, `ArticleService`;
  - `OrderService` dapat memakai Domain, Template, dan User;
  - `PaymentService` dapat memakai Order dan User (serta Domain/Template bila kelak diperlukan).
- Service tidak menerima `Request`; ia menerima primitif, array, Model, atau `User`. Alur yang memang terikat sesi menerima `Illuminate\Contracts\Session\Session` dan memakai kunci `checkout.*` yang sudah ada.
- Service mengembalikan data/model/nilai, bukan response HTTP. Controller memilih view, JSON, redirect, dan flash message.
- Transaksi berada pada Service pemilik alur. `PaymentService::placeOrder()` mengunci dan mengklaim promo, memanggil `OrderService::create()`, lalu mencatat penggunaan promo dalam satu transaksi; panggilan jaringan dilakukan setelah transaksi.
- Penolakan promo antar-method tetap memakai `\DomainException`; `validatePromo()` menangkapnya dan mengubahnya menjadi hasil validasi seperti perilaku sebelumnya.
- Tinjau desain bila satu Service melewati sekitar 800 baris. `PaymentService` sengaja paling besar; integrasi Xendit dan WhatsApp tetap berupa method `private` agar bisa diekstrak nanti hanya setelah ada keputusan arsitektur baru.
- Fitur baru ditambahkan ke Service bidang yang sudah ada. Jangan menambah Service kedelapan tanpa keputusan pemilik proyek.

## Tanggung jawab tujuh Service

| Service | Tanggung jawab |
|---|---|
| `DomainService` | Parsing pencarian, pricing IDCloudHost, fallback DNS, pengecekan registrasi, quote harga, webhook IDCloudHost. `isRegistered()` publik agar dapat di-partial-mock tanpa jaringan. |
| `TemplateService` | CRUD/toggle katalog admin, list/detail publik, view counter, preview upload, sinkronisasi frontend. |
| `PromoService` | CRUD/toggle promo admin serta laporan usage dan mitra/komisi. Promo checkout dimiliki `PaymentService`. |
| `UserService` | Login/logout, pengaturan profil/password/byline, pembuatan dan sinkronisasi akun klien. Kelola akun masa depan masuk di sini. |
| `ArticleService` | CRUD dan siklus publikasi artikel, audit activity, validasi slug/konten, serta upload gambar melalui disk S3 ke RustFS. |
| `OrderService` | Session checkout, pembuatan row order, daftar/status order, expiry/paid/invalid, semua data dashboard admin/klien/media. |
| `PaymentService` | Ringkasan konfirmasi, promo checkout, transaksi place order, invoice/status/webhook Xendit, render invoice, notifikasi email dan WhatsApp. |

## Alur utama

`Route -> Controller -> OrderService + TemplateService -> DomainService -> PaymentService -> OrderService -> UserService -> OrderService (dashboard)`.

Order pending dan invoice Xendit tetap dibuat sebelum pembayaran. `PaymentService::placeOrder()` memanggil `OrderService::create()`; webhook/polling pembayaran kemudian menandai order lunas, membuat/menyinkronkan akun melalui `UserService`, dan mengirim notifikasi sekali. Perubahan ini hanya struktur—waktu pembuatan order dan semua output tetap sama.

Rumus harga hanya berada di `Template::breakdown()` / `Template::priceBreakdown()` / `Order::priceBreakdown()`. Email akun klien hanya dibentuk oleh `Order::clientEmail()`.

## Penyimpanan gambar artikel

RustFS adalah object storage S3-compatible. Browser tidak mengakses API RustFS secara langsung: cover dan callback BlockNote mengirim gambar ke endpoint Laravel. `ArticleService::uploadImage()` memvalidasi file aktual, menyimpan langsung ke `articles/{uuid}.{ext}` lewat `Storage::disk('s3')`, mencatat metadata `ArticleImage`, lalu mengembalikan ID aset beserta URL publik. Editor menyimpan cover melalui ID tersebut; URL bebas dari browser tidak dipercaya.

RustFS berjalan di luar Docker Compose proyek. Bucket `bidtech`, policy public-read, CORS, akun akses, dan lifecycle dikelola manual lewat console RustFS sesuai `docs/RUSTFS.md`. Tidak ada command bootstrap, upload bertanda tangan, prefix sementara, ACL publik dari aplikasi, atau kode yang mengubah konfigurasi bucket. CORS yang terpasang adalah konfigurasi external dan tidak dibutuhkan oleh alur upload Laravel-first.

## Peta controller ke Service

| Controller | Service |
|---|---|
| `LoginController`, `PengaturanController` | `UserService` |
| `DashboardController`, `KelolaPesananController` | `OrderService` |
| `PilihTemplateController` | `OrderService`, `TemplateService` |
| `PilihDomainController` | `OrderService`, `DomainService` |
| `IsiDataDiriController` | `OrderService` |
| `KonfirmasiController`, `PembayaranController` | `PaymentService` |
| `KelolaTemplateController`, `Api/TemplateController` | `TemplateService` |
| `KelolaPromoController` | `PromoService` |
| `KelolaArtikelController` | `ArticleService` |
| `Api/DomainController`, `Webhook/IdCloudHostController` | `DomainService` |
| `Webhook/XenditController` | `PaymentService` |

## Konvensi lain

- Nama controller berbahasa Indonesia berbasis halaman; nama Service, method, dan variabel berbahasa Inggris. URL dan teks pengguna boleh berbahasa Indonesia.
- Nama route dan URL dipertahankan stabil; view dan frontend Next.js memakainya.
- Jangan menaruh logika bisnis di route closure atau Blade.
- Aturan izin ditulis sekali sebagai method pada model `User`, lalu dipakai controller dan view.
- Tidak ada folder/kelas `Requests` (FormRequest). Validasi — termasuk yang panjang atau dipakai bersama oleh `store`/`update` — ditulis inline lewat `$request->validate()` di controller pemilik, dengan `rules()`/`messages()`/helper bentuk data sebagai method `private` pada controller itu. Validasi domain tetap memanggil method Service, misalnya closure rule yang memanggil `ArticleService::checkContent()`.
- Satu-satunya middleware role adalah alias `role:...` (`App\Http\Middleware\EnsureUserHasRole`), parameterized dan dipasang per-grup route di `routes/web.php` untuk semua role termasuk ADMIN (mis. `role:ADMIN` untuk CRUD Template/Promo, `role:MEDIA,ADMIN` untuk modul artikel, `role:MEDIA` untuk byline). Gagal pada navigasi browser biasa → redirect ke `/dashboard` dengan flash `error`; gagal pada request AJAX/JSON (`expectsJson()`) → status JSON murni (401/403), supaya endpoint fetch-based (autosave/upload gambar artikel) tidak diam-diam "berhasil" saat sebenarnya ditolak. Pengecekan rinci per-aksi (status draft, kepemilikan, kombinasi tulis-vs-moderasi, dst) tetap `abort_unless(...)` manual di controller — kedua lapis ini saling melengkapi, bukan duplikat yang bisa dihapus salah satu.

## Status dan fitur berikutnya

Migrasi dari 81 Action ke tujuh Service selesai. API artikel publik Fase 2 belum dibuat; kelak `Api/ArticleController` memakai `ArticleService`. Halaman publik Next.js Fase 3 memakai URL kanonis `/blog` dan `/blog/[slug]`; route internal dashboard tetap `/dashboard/articles`. Kelola akun belum dibuat; create/edit/delete user kelak masuk `UserService` setelah keputusan produk tentang peran dan nonaktif-versus-hapus. `SendNotificationAdmin` kelak masuk `PaymentService`.

## Rencana migrasi: FrankenPHP + Laravel Octane

Keputusan arsitektur (belum dieksekusi): pindah dari PHP-FPM klasik (satu proses per request) ke **Laravel Octane dengan server FrankenPHP** (worker long-running) untuk mengejar response time dan performa. Dicatat di sini dulu sebagai keselarasan sebelum implementasi.

### Kesiapan kode aplikasi

Audit terhadap `app/` (singleton binding, static property mutable, `config([...])` runtime, `exit`/`die`/`dd`/`dump`, `Auth::user()`/`request()` yang disimpan ke property, file handle manual) **tidak menemukan risiko**. Ketujuh Service di `app/Services/` sudah stateless by design (lihat "Konvensi Service" di atas — Service tidak menerima `Request`, tidak menyimpan state instance). `SESSION_DRIVER`, `CACHE_STORE`, `QUEUE_CONNECTION` sudah `database`, bukan `array`/`file`, sehingga konsisten antar worker. Risiko migrasi di level kode aplikasi rendah; pekerjaan nyata ada di level paket dan infrastruktur Docker.

Aturan tambahan ke depan: kode baru yang menambah `->singleton()` binding atau static property mutable wajib ditinjau dampaknya terhadap worker long-running sebelum digabung, sejak Octane aktif.

### Topologi & keputusan terkait

- **TLS/HTTPS** ditangani reverse proxy/CDN eksternal di luar container ini (sejalan dengan network eksternal `bidtech-api` di `compose.prod.yml`). FrankenPHP di dalam container serve HTTP biasa saja, tidak mengurus sertifikat.
- **Dev lokal ikut pindah** ke Octane+FrankenPHP (bukan tetap `artisan serve`) untuk dev-prod parity. Perlu `php artisan octane:start --watch` agar hot-reload tetap jalan saat edit file; `--watch` butuh file-watcher Node (chokidar) di `devDependencies`.
- **Queue worker & scheduler di luar scope.** Saat ini tidak ada `php artisan queue:work` atau cron scheduler yang berjalan (`routes/console.php` hanya berisi command `inspire` bawaan), dan tidak ada job yang benar-benar didorong ke queue meski `QUEUE_CONNECTION=database` ada di `.env`. Octane sendiri tidak menjalankan queue worker. Kalau nanti ada fitur yang butuh job async, worker queue tetap harus jadi proses terpisah (di luar Octane) — baru jadi bagian keputusan arsitektur saat itu dibutuhkan.

### Yang berubah di level infrastruktur (belum dieksekusi)

1. `composer require laravel/octane`, lalu `php artisan octane:install --server=frankenphp`.
2. `Dockerfile` stage runtime: ganti base `php:8.4-fpm-alpine` + nginx + supervisord menjadi image berbasis FrankenPHP (binary tunggal, Caddy-based, menggantikan nginx+PHP-FPM sekaligus). `docker/nginx.conf` dan `docker/supervisord.conf` dihapus.
3. `docker/entrypoint.sh`: tetap jalankan `config:cache`/`route:cache`/`view:cache` sebelum start (praktik baik yang tetap relevan di Octane), lalu `exec` ke `php artisan octane:start` alih-alih supervisord.
4. `compose.yml`/`compose.prod.yml`: sesuaikan port/healthcheck ke endpoint FrankenPHP.
5. Tentukan `--workers` dan `--max-requests` (restart worker berkala sebagai safety net terhadap memory growth dari package pihak ketiga) berdasar load test setelah deploy ke staging, bukan ditebak di awal.
6. `.github/workflows/deploy-bidtech.yml`: sesuaikan health check `curl http://127.0.0.1:8000/up` di job `build-dashboard` kalau port FrankenPHP berbeda dari skema nginx (8080) sekarang. **Tidak perlu** menambah langkah `octane:reload` — pipeline ini build image Docker baru dari source yang baru di-`git reset --hard` tiap deploy (bukan reuse proses yang sama), jadi `docker compose up -d` sudah otomatis recreate container dengan kode terbaru. `octane:reload` baru relevan kalau pola deploy berubah jadi "kode di-mount sebagai volume + reload tanpa rebuild image" — bukan pola proyek ini.
7. Artisan CLI command (`migrate --seed`, `tinker`, dst di job `build-dashboard` dan script deploy) tetap jalan normal sebagai proses pendek biasa — Octane hanya mengubah proses HTTP server, bukan command CLI satu-kali.
8. Validasi di staging dulu sebelum menyentuh production; jalankan full test suite (`php artisan test`) dan smoke test manual alur checkout (termasuk upload gambar artikel/template preview ke RustFS) dalam mode Octane sebelum dianggap siap.

Status: **belum dieksekusi**. Bagian ini diperbarui jadi riwayat/selesai setelah implementasi berjalan.

## Rencana migrasi: Gabungkan FormRequest ke controller

Keputusan arsitektur (belum dieksekusi): hapus seluruh lapisan `app/Http/Requests` (FormRequest) dan gabungkan validasinya langsung ke controller pemilik, menyamakan ke satu pola validasi di seluruh codebase.

### Kenapa

Dari 17 controller, 12+ (`KelolaPesananController`, `IsiDataDiriController`, `LoginController`, `PengaturanController`, `PilihDomainController`, `PilihTemplateController`, dll) sudah memvalidasi inline lewat `$request->validate([...])` langsung di method. Hanya 3 yang masih memakai FormRequest terpisah: `KelolaArtikelController` (`SaveArticleRequest`, `AutosaveArticleRequest`, `UploadArticleImageRequest`), `KelolaPromoController` (`SavePromoRequest`), `KelolaTemplateController` (`SaveTemplateRequest`) — total 5 class. Dua pola validasi berdampingan tanpa alasan kuat; migrasi ini menghilangkan pola yang lebih jarang dipakai. Ketujuh Service (`ArticleService`, `PromoService`, `TemplateService`, dst) tidak terpengaruh: method `create()`/`update()`-nya sudah menerima `array $data` polos, bukan `Request`/`FormRequest`.

### Prinsip konsolidasi

- `authorize()` FormRequest → `abort_unless(...)` di awal method controller, mengikuti pola `ensureCanWrite()`/`ensureCanModerate()` yang sudah ada di `KelolaArtikelController`. Untuk `SavePromoRequest`/`SaveTemplateRequest`, `authorize()` cuma `true` (akses sudah dijaga middleware `admin` di route) sehingga tidak perlu replacement.
- `prepareForValidation()` → private method yang memanggil `$request->merge([...])` sebelum `$request->validate()` dipanggil (validasi inline tidak otomatis memanggil `prepareForValidation`).
- `rules()`/`messages()` yang dipakai di 2 method (store+update, store+storeDraft/autosave) diekstrak jadi private method controller supaya tidak duplikasi; yang dipakai cuma di 1 tempat (`UploadArticleImageRequest`) cukup inline di method, tanpa private method terpisah.
- Helper tambahan FormRequest (`SavePromoRequest::promoData()`, `SaveTemplateRequest::templateData()`) → private method controller yang menerima `array $validated` sebagai parameter.
- `Rule::unique(...)->ignore($this->route('promo'))` → terima Model yang sudah di-bind langsung sebagai parameter method (`?Coupon $ignore = null`), lebih bersih daripada lookup route manual.

### Perubahan per file (saat dieksekusi)

- `KelolaArtikelController`: hapus import 3 FormRequest artikel, ganti type-hint jadi `Request $request` di `store`, `storeDraft`, `autosave`, `update`, `uploadImage`. Tambah private method `ensureCanAutosave(Request $request, ?Article $article)` (gabungan cek `canWriteArticles()` + status draft, dipakai `storeDraft` dan `autosave`), `normalizeArticlePayload(Request $request, bool $titleRequired)` (replikasi decode JSON `content` + trim `title`), `saveArticleRules()`/`saveArticleMessages()` (dipakai `store`&`update`), `autosaveArticleRules()` (dipakai `storeDraft`&`autosave`). `uploadImage` validasi inline tanpa private method tambahan.
- `KelolaPromoController`: hapus import `SavePromoRequest`, ganti type-hint `store`/`update` jadi `Request $request`. Tambah private const `COMPONENTS`/`CURRENCY_FIELDS` (dipindah dari `SavePromoRequest`) dan private method `cleanPromoCurrency(Request $request)`, `promoRules(?Coupon $ignore = null)`, `promoData(array $validated)`. Flash message pakai `$validated['code']` (sama seperti `$request->validated('code')` sebelumnya, sebelum di-uppercase oleh `promoData`).
- `KelolaTemplateController`: hapus import `SaveTemplateRequest`, ganti type-hint `store`/`update` jadi `Request $request`. Tambah private method `templateRules()` dan `templateData(array $validated)`.
- Hapus `app/Http/Requests/SaveArticleRequest.php`, `AutosaveArticleRequest.php`, `UploadArticleImageRequest.php`, `SavePromoRequest.php`, `SaveTemplateRequest.php`, dan direktori `app/Http/Requests/` itu sendiri setelah kosong.
- Dokumen ini: hapus baris "Validasi | `app/Http/Requests`" dari tabel struktur folder, hapus mention `SaveArticleRequest` di "Peta controller ke Service", dan hapus kata "FormRequest" dari baris "Aturan izin ditulis sekali sebagai method pada model `User`...".

### Yang tidak berubah

Signature Service (`create()`/`update()` menerima `array $data`), nama route dan URL, serta perilaku HTTP (`$request->validate()` inline melempar `ValidationException` yang sama persis seperti FormRequest — redirect-back-with-errors untuk web, 422 JSON untuk `expectsJson()`). Pesan error custom (`messages()`) dipertahankan kata demi kata.

### Verifikasi saat dieksekusi

`php artisan test --filter=PromoManagementTest`, `--filter=TemplateManagementTest`, dan seluruh `tests/Feature/Articles/*` (sudah menguji lewat HTTP request/response, tidak perlu diubah) harus tetap lulus tanpa modifikasi. Lalu `php artisan test` full suite, dan `grep -r "Http\\Requests" app/` harus nol hasil.

Status: **selesai dieksekusi (2026-10-07)**. Ketiga controller (`KelolaArtikelController`, `KelolaPromoController`, `KelolaTemplateController`) sudah divalidasi inline sesuai rencana di atas, kelima class FormRequest dan direktori `app/Http/Requests/` sudah dihapus, dan baris terkait di dokumen ini (tabel struktur folder, peta controller->Service, baris aturan izin) sudah diperbarui. Bagian ini dibiarkan sebagai riwayat keputusan.

## Hutang yang diketahui dan sengaja tidak diubah

1. `templates.id` bukan auto-increment, sementara form tambah template membuat baris tanpa `id`; perlu keputusan ID manual atau auto-increment.
2. `POST /templates/view/{id}` tanpa `/api` masih dipertahankan karena dipakai frontend.
3. Password awal akun klien masih konstanta `Password123!` dan dikirim melalui email/WhatsApp; perlu keputusan produk untuk password acak dan paksa ganti.
4. Halaman bayar tidak mengirim WhatsApp lunas; polling dan webhook yang mengirim. Webhook berulang tetap mereset status akun klien dan menimpa `paid_at`.
5. Harga live IDCloudHost belum terpakai: `Http::pool` menghasilkan indeks numerik tetapi kode membaca `$responses[$ext]`. Perbaikan `$pool->as($ext)` ditunda karena mengubah harga yang tampil ke pembeli.
6. Pencocokan harga bawaan domain mengikuti urutan ekstensi, sehingga `x.co.id` masih memakai harga `.id`, bukan `.co.id`.
7. Salinan spesifikasi artikel di repo `frontend/` dapat tertinggal dari implementasi backend dan perlu diselaraskan terpisah.

## Dokumen terkait

- `docs/RUSTFS.md` — endpoint, policy, CORS, akun akses, dan operasi object storage external.
- `docs/REDIS.md` — cache, session, dan strategi caching harga domain per ekstensi.

- `docs/ARTICLE-SPEC.md` — spesifikasi modul Artikel.
- `SCHEMA.md` — schema final, relasi kupon/mitra, dan aturan integritas data.
- `docs/API.md` — kontrak API.
- `docs/DESIGN.md` — panduan desain UI.
