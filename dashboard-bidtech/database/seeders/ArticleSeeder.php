<?php

namespace Database\Seeders;

use App\Models\Article;
use App\Enums\Role;
use App\Models\User;
use App\Services\ArticleService;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class ArticleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $articles = app(ArticleService::class);

        // ==========================================
        // AKUN MEDIA TESTING (Penulis/Editor Artikel)
        // Nama contoh mengikuti spec bagian 3 (Sukma, Alya, Asma)
        // ==========================================
        $sukma = User::firstOrCreate(
            ['email' => 'sukma@bidtech.co.id'],
            [
                'name' => 'Sukma Wardhani',
                'whatsapp' => '081100000001',
                'password' => Hash::make('password123'),
                'role' => Role::Media,
                'author_name' => 'Sukma Wardhani',
                'photo' => 'https://media.bidtech.co.id/bidtech/profiles/placeholder_profile.webp',
            ]
        );

        $alya = User::firstOrCreate(
            ['email' => 'alya@bidtech.co.id'],
            [
                'name' => 'Alya Ramadhani',
                'whatsapp' => '081100000002',
                'password' => Hash::make('password123'),
                'role' => Role::Media,
                'author_name' => 'Alya Ramadhani',
                'photo' => 'https://media.bidtech.co.id/bidtech/profiles/placeholder_profile.webp',
            ]
        );

        $asma = User::firstOrCreate(
            ['email' => 'asma@bidtech.co.id'],
            [
                'name' => 'Asma Nadira',
                'whatsapp' => '081100000003',
                'password' => Hash::make('password123'),
                'role' => Role::Media,
                // Belum mengisi nama pena/foto -> fallback ke nama akun (displayAuthorName()).
                'author_name' => null,
                'photo' => null,
            ]
        );

        // Tidak menabrak artikel yang sudah ada (idempoten bila seeder dijalankan ulang).
        if (Article::query()->exists()) {
            return;
        }

        // 1. Artikel terbit biasa
        $a1 = $articles->create([
            'title' => '5 Tips Memilih Template Website untuk Bisnis Kecil',
            'slug' => Str::slug('5 Tips Memilih Template Website untuk Bisnis Kecil'),
            'excerpt' => 'Memilih template yang tepat bisa mempercepat peluncuran website bisnis Anda tanpa mengorbankan tampilan profesional.',
            'cover_image_url' => 'https://media.bidtech.co.id/articles/pilih-template.jpg',
            'cover_alt_text' => 'Ilustrasi memilih template website di laptop',
            'content' => [
                $this->paragraph('Memilih template website yang tepat adalah langkah penting sebelum bisnis Anda tampil online. Berikut lima hal yang perlu diperhatikan.'),
                $this->heading('1. Sesuaikan dengan industri', 2),
                $this->paragraph('Template untuk toko fashion tentu berbeda kebutuhannya dengan template untuk jasa rental mobil.'),
                $this->bulletItem('Perhatikan tata letak galeri produk atau layanan'),
                $this->bulletItem('Cek apakah ada bagian khusus untuk testimoni pelanggan'),
                $this->heading('2. Pastikan responsif di perangkat mobile', 2),
                $this->paragraph('Mayoritas pengunjung mengakses website lewat ponsel, jadi tampilan mobile harus tetap rapi.'),
                $this->quote('Website yang lambat dan berantakan di HP akan langsung ditinggalkan pengunjung.'),
            ],
        ], $sukma);
        $articles->publish($a1, $sukma);

        // 2. Artikel terbit dengan gambar di isi
        $a2 = $articles->create([
            'title' => 'Kenapa Kecepatan Website Penting untuk SEO',
            'slug' => Str::slug('Kenapa Kecepatan Website Penting untuk SEO'),
            'excerpt' => 'Google secara eksplisit memakai kecepatan halaman sebagai salah satu faktor peringkat pencarian.',
            'cover_image_url' => 'https://media.bidtech.co.id/articles/kecepatan-seo.jpg',
            'cover_alt_text' => 'Grafik kecepatan loading website',
            'content' => [
                $this->paragraph('Kecepatan website tidak hanya soal kenyamanan pengunjung, tapi juga memengaruhi peringkat di mesin pencari.'),
                $this->heading('Dampak langsung ke pengalaman pengguna', 2),
                $this->paragraph('Pengunjung cenderung meninggalkan halaman yang butuh lebih dari 3 detik untuk dimuat.'),
                $this->image('https://media.bidtech.co.id/articles/core-web-vitals.jpg', 'Ilustrasi metrik Core Web Vitals'),
                $this->heading('Cara sederhana mempercepat website', 3),
                $this->numberedItem('Kompres ukuran gambar sebelum diunggah'),
                $this->numberedItem('Aktifkan caching di sisi server'),
                $this->numberedItem('Hindari terlalu banyak skrip pihak ketiga'),
            ],
        ], $alya);
        $articles->publish($a2, $alya);

        // 3. Draft belum selesai
        $articles->create([
            'title' => 'Panduan Memilih Domain yang Tepat untuk Bisnis Anda',
            'slug' => Str::slug('Panduan Memilih Domain yang Tepat untuk Bisnis Anda'),
            'excerpt' => null,
            'cover_image_url' => null,
            'cover_alt_text' => null,
            'content' => [
                $this->paragraph('Domain adalah alamat digital pertama yang dilihat calon pelanggan sebelum masuk ke website Anda.'),
                $this->heading('Draft: lanjutkan bagian tips pemilihan ekstensi domain di sini...', 2),
            ],
        ], $sukma);

        // 4. Pernah terbit, sekarang dinonaktifkan
        $a4 = $articles->create([
            'title' => 'Cara Kerja Hosting dan VPS: Apa Bedanya?',
            'slug' => Str::slug('Cara Kerja Hosting dan VPS Apa Bedanya'),
            'excerpt' => 'Bingung pilih shared hosting atau VPS? Berikut perbedaan mendasar keduanya.',
            'cover_image_url' => 'https://media.bidtech.co.id/articles/hosting-vps.jpg',
            'cover_alt_text' => 'Ilustrasi server hosting dan VPS',
            'content' => [
                $this->paragraph('Shared hosting dan VPS sering dibandingkan, padahal keduanya melayani kebutuhan yang berbeda.'),
                $this->heading('Shared hosting', 2),
                $this->paragraph('Sumber daya server dipakai bersama banyak pengguna lain, cocok untuk website baru dengan trafik rendah.'),
                $this->heading('VPS (Virtual Private Server)', 2),
                $this->paragraph('Sumber daya lebih terisolasi dan bisa disesuaikan, cocok untuk website dengan trafik lebih tinggi.'),
            ],
        ], $asma);
        $articles->publish($a4, $asma);
        $articles->deactivate($a4, $asma);

        // 5. Artikel terbit biasa.
        $a5 = $articles->create([
            'title' => 'Checklist Sebelum Meluncurkan Website Baru',
            'excerpt' => 'Jangan sampai website baru Anda live tanpa melewati pengecekan dasar ini.',
            'cover_image_url' => 'https://media.bidtech.co.id/articles/checklist-launch.jpg',
            'cover_alt_text' => 'Checklist peluncuran website di papan tulis',
            'content' => [
                $this->paragraph('Sebelum menekan tombol publish, pastikan beberapa hal berikut sudah dicek satu per satu.'),
                $this->bulletItem('Semua tautan internal berfungsi, tidak ada yang 404'),
                $this->bulletItem('Formulir kontak sudah diuji coba dan email masuk dengan benar'),
                $this->bulletItem('Meta title dan deskripsi sudah diisi di setiap halaman penting'),
                $this->heading('Terakhir, uji di perangkat mobile', 2),
                $this->paragraph('Buka website dari HP pribadi Anda, bukan hanya dari laptop pengembang.'),
            ],
        ], $alya);
        $articles->publish($a5, $alya);
    }

    /**
     * @return array{id: string, type: string, props: array, content: array, children: array}
     */
    private function paragraph(string $text): array
    {
        return [
            'id' => (string) Str::uuid(),
            'type' => 'paragraph',
            'props' => ['backgroundColor' => 'default', 'textColor' => 'default', 'textAlignment' => 'left'],
            'content' => [['type' => 'text', 'text' => $text, 'styles' => new \stdClass]],
            'children' => [],
        ];
    }

    private function heading(string $text, int $level): array
    {
        return [
            'id' => (string) Str::uuid(),
            'type' => 'heading',
            'props' => ['backgroundColor' => 'default', 'textColor' => 'default', 'textAlignment' => 'left', 'level' => $level],
            'content' => [['type' => 'text', 'text' => $text, 'styles' => new \stdClass]],
            'children' => [],
        ];
    }

    private function bulletItem(string $text): array
    {
        return [
            'id' => (string) Str::uuid(),
            'type' => 'bulletListItem',
            'props' => ['backgroundColor' => 'default', 'textColor' => 'default', 'textAlignment' => 'left'],
            'content' => [['type' => 'text', 'text' => $text, 'styles' => new \stdClass]],
            'children' => [],
        ];
    }

    private function numberedItem(string $text): array
    {
        return [
            'id' => (string) Str::uuid(),
            'type' => 'numberedListItem',
            'props' => ['backgroundColor' => 'default', 'textColor' => 'default', 'textAlignment' => 'left'],
            'content' => [['type' => 'text', 'text' => $text, 'styles' => new \stdClass]],
            'children' => [],
        ];
    }

    private function quote(string $text): array
    {
        return [
            'id' => (string) Str::uuid(),
            'type' => 'quote',
            'props' => ['backgroundColor' => 'default', 'textColor' => 'default'],
            'content' => [['type' => 'text', 'text' => $text, 'styles' => new \stdClass]],
            'children' => [],
        ];
    }

    private function image(string $url, string $caption): array
    {
        return [
            'id' => (string) Str::uuid(),
            'type' => 'image',
            'props' => [
                'backgroundColor' => 'default',
                'textAlignment' => 'left',
                'name' => '',
                'url' => $url,
                'caption' => $caption,
                'showPreview' => true,
                'previewWidth' => 512,
            ],
            'children' => [],
        ];
    }
}
