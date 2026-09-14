<?php

namespace App\Services\Domain;

/**
 * Modul service untuk mengitegrasikan Bidtech dengan IdCloudHost
 * untuk melakukan pencarian domain berdasarkan nama bisnis yang diinput
 * dan menampilkan harganya.
 */
class IdCloudHostDomainService
{
    /**
     * Ekstensi domain yang disediakan bidtech dari IdCloudHost
     */
    public array $ekstensiDomain = [
        'id',
        'my.id',
        'co.id',
        'com',  
    ];

    /**
     * Fungsi untuk mencari domain berdasarkan nama bisnis yang diinput
     * bersama dengan ketersediaannya dan harganya dari IdCloudHost
     */
    public function cariDomain(string $namaBisnis): array {
        // buat list-list domain dari nama bisnisnya dari ekstensi
        // yang disediakan oleh bidtech
        $domains = collect($this->ekstensiDomain)->map(fn (string $domain) => "{$namaBisnis}.{$domain}")->values()->all();
    }
}