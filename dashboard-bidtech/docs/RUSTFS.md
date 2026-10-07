# RustFS external untuk dashboard Bidtech

RustFS adalah object storage S3-compatible untuk media dan gambar artikel. RustFS dijalankan dan dikelola manual di luar Docker Compose proyek; aplikasi Laravel hanya mengakses bucket melalui disk `s3` dan tidak mengubah konfigurasi server atau bucket.

## Endpoint

| Lingkungan | S3 API | Console | Bucket |
|---|---|---|---|
| Lokal | `http://localhost:9000` | `http://localhost:9001` | `bidtech` |
| Produksi | `https://media.bidtech.co.id` | `https://rustfs.bidtech.co.id` | `bidtech` |

Pada pengembangan lokal, RustFS dijalankan langsung di Windows dan Laravel juga dijalankan langsung di Windows. Karena itu `localhost:9000` dapat digunakan sebagai endpoint aplikasi.

RustFS produksi, DNS, TLS, reverse proxy, console, akun, dan backup dikelola sebagai infrastruktur external. Proyek ini tidak menyediakan service, volume, profile, atau health check RustFS di Compose.

## Konfigurasi Laravel

Laravel memakai variabel standar S3. Isi nilai rahasia hanya di `.env` lokal atau GitHub Secrets; jangan menaruh access key atau secret key dalam source code, dokumentasi, contoh environment, log, maupun issue.

### Lokal

```dotenv
AWS_ACCESS_KEY_ID=<access-key>
AWS_SECRET_ACCESS_KEY=<secret-key>
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=bidtech
AWS_ENDPOINT=http://localhost:9000
AWS_URL=http://localhost:9000/bidtech
AWS_USE_PATH_STYLE_ENDPOINT=true
```

### Produksi

```dotenv
AWS_ACCESS_KEY_ID=<dari-github-secrets>
AWS_SECRET_ACCESS_KEY=<dari-github-secrets>
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=bidtech
AWS_ENDPOINT=https://media.bidtech.co.id
AWS_URL=https://media.bidtech.co.id/bidtech
AWS_USE_PATH_STYLE_ENDPOINT=true
```

Workflow deployment membaca GitHub Secrets `RUSTFS_S3_ACCESS_KEY` dan `RUSTFS_S3_SECRET_KEY`, kemudian menuliskannya sebagai `AWS_ACCESS_KEY_ID` dan `AWS_SECRET_ACCESS_KEY` pada environment aplikasi. Job build/test tidak menerima kredensial RustFS produksi.

## Konfigurasi bucket yang sudah aktif

Bucket `bidtech` telah dibuat manual dan menggunakan public-read untuk objek. Jangan menyimpan data privat atau sensitif di bucket ini. Public-read berasal dari bucket policy; aplikasi tidak mengirim ACL per objek.

Contoh URL publik:

- `https://media.bidtech.co.id/bidtech/blog/placeholder.webp`
- `https://media.bidtech.co.id/bidtech/articles/{uuid}.{ext}`

Aturan CORS berikut saat ini dipasang manual pada bucket:

```json
{
  "CORSRules": [
    {
      "AllowedMethods": [
        "GET",
        "PUT",
        "POST",
        "DELETE",
        "HEAD"
      ],
      "AllowedOrigins": [
        "*"
      ],
      "AllowedHeaders": [
        "*"
      ],
      "ExposeHeaders": [
        "ETag"
      ]
    }
  ]
}
```

CORS tersebut adalah kondisi external sementara dan cukup permisif. Alur saat ini tidak membutuhkannya karena browser mengirim file ke Laravel, lalu `ArticleService` mengunggahnya ke RustFS dari server. Perubahan CORS tetap dilakukan manual melalui console, bukan dari aplikasi.

## Batas tanggung jawab

Aplikasi hanya boleh membaca, menulis, dan menghapus objek sesuai kebutuhan fitur. Aplikasi tidak boleh:

- membuat atau menghapus bucket;
- mengubah bucket policy atau public access;
- membuat akun atau mengganti kredensial;
- mengubah CORS atau lifecycle;
- menjalankan RustFS sebagai bagian dari Compose proyek.

Kredensial yang pernah terbuka di dokumentasi, percakapan, atau log sangat disarankan untuk dirotasi dari sisi RustFS. Setelah rotasi, perbarui `.env` lokal dan GitHub Secrets tanpa mengubah file repository.

## Verifikasi

### Public read

Buka URL berikut tanpa autentikasi:

```text
https://media.bidtech.co.id/bidtech/blog/placeholder.webp
```

Respons yang diharapkan adalah HTTP `200` dengan `Content-Type: image/webp`.

### Akses Laravel

Gunakan nama objek unik di prefix `articles/healthchecks/`, tulis data uji melalui `Storage::disk('s3')`, periksa URL publiknya, lalu selalu hapus objek tersebut. Probe tidak boleh membuat bucket atau mengubah policy/CORS.

Upload artikel normal disimpan langsung sebagai `articles/{uuid}.{ext}` oleh `ArticleService::uploadImage()`.
