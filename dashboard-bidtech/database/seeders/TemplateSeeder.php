<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Template;

class TemplateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $templates = [
            ['id' => 1, 'name' => 'Rentcar - Sewa Mobil #1', 'category' => 'Otomotif', 'price' => 2000000, 'preview' => 'images/design_thumbnail/rentcar.webp'],
            ['id' => 2, 'name' => 'Deny Restaurant - Kalcer Restaurant', 'category' => 'Restaurant', 'price' => 2000000, 'preview' => 'images/design_thumbnail/deny_restaurant.webp'],
            ['id' => 3, 'name' => "Chef's Table - European Signature", 'category' => 'Restaurant', 'price' => 2000000, 'preview' => 'images/design_thumbnail/chefs_table.webp'],
            ['id' => 4, 'name' => 'IRONFORCE - Best Gym on Jakarta', 'category' => 'Gym', 'price' => 2000000, 'preview' => 'images/design_thumbnail/ironforce.webp'],
            ['id' => 5, 'name' => 'Yayasan Bakti Nusantara', 'category' => 'Komunitas', 'price' => 2000000, 'preview' => 'images/design_thumbnail/batik_nusantara.webp'],
            ['id' => 6, 'name' => 'Harapan kita', 'category' => 'Komunitas', 'price' => 2000000, 'preview' => 'images/design_thumbnail/harapan_kita.webp'],
            ['id' => 7, 'name' => 'Konterku', 'category' => 'UMKM', 'price' => 2000000, 'preview' => 'images/design_thumbnail/konterku.webp'],
            ['id' => 8, 'name' => 'Denn House', 'category' => 'Properti', 'price' => 2000000, 'preview' => 'images/design_thumbnail/denn_house.webp'],
            ['id' => 9, 'name' => 'Chulla', 'category' => 'Kecantikan', 'price' => 2000000, 'preview' => 'images/design_thumbnail/chulla.webp'],
            ['id' => 10, 'name' => 'SmartBelajar', 'category' => 'Pendidikan', 'price' => 2000000, 'preview' => 'images/design_thumbnail/smart_belajar.webp'],
            ['id' => 11, 'name' => 'Nivora Academy - Akademi digital, kursus, bootcamp', 'category' => 'Pendidikan', 'price' => 2000000, 'preview' => 'images/design_thumbnail/nivora_academy.webp'],
            ['id' => 12, 'name' => 'Aliansi Kepemimpinan Indonesia', 'category' => 'Komunitas', 'price' => 2000000, 'preview' => 'images/design_thumbnail/aliansi_kepemimpinan.webp'],
        ];

        foreach ($templates as $template) {
            Template::updateOrCreate(
                ['id' => $template['id']],
                $template
            );
        }
    }
}
