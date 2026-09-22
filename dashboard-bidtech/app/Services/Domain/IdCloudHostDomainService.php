<?php

namespace App\Services\Domain;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

/**
 * Modul service untuk mengintegrasikan Bidtech dengan IdCloudHost SRS Reseller API
 * Endpoint: api.srs.idch.co.id/v1
 * Auth: Authorization: Bearer rsl_live_<token>
 */
class IdCloudHostDomainService
{
    /**
     * ─────────────────────────────────────────────────────
     * MARKUP HARGA DOMAIN (dalam Rupiah)
     * ─────────────────────────────────────────────────────
     * Jumlah Rupiah yang ditambahkan di atas harga resmi IDCloudHost
     * sebelum ditampilkan kepada pembeli.
     *
     * Catatan Pajak:
     *   Harga dasar dari IDCloudHost (grand_total_idr) SUDAH termasuk pajak PPN 11%.
     *   Markup ini ditambahkan di atas harga yang sudah inklusif pajak PPN 11%.
     */
    const MARKUP_HARGA_DOMAIN = 0;

    /**
     * Ekstensi domain yang disediakan IDCloudHost beserta urutan prioritas & harga (IDR/tahun)
     */
    public array $ekstensiDomain = [
        'com'       => 238650,
        'id'        => 222000,
        'co.id'     => 310800,
        'my.id'     => 5550,
        'online'    => 25000,
        'site'      => 25000,
        'store'     => 35000,
        'tech'      => 45000,
        'net'       => 288600,
        'xyz'       => 321900,
        'biz.id'    => 5550,
        'web.id'    => 5550,
        'org'       => 215000,
        'info'      => 75000,
        'shop'      => 55000,
        'live'      => 55000,
        'space'     => 35000,
        'website'   => 35000,
        'app'       => 250000,
        'dev'       => 250000,
        'io'        => 650000,
        'me'        => 280000,
        'org.id'    => 222000,
        'or.id'     => 51060,
        'ac.id'     => 51060,
        'sch.id'    => 51060,
        'ponpes.id' => 51060,
        'desa.id'   => 222000,
        'mil.id'    => 222000,
        'go.id'     => 222000,
    ];

    /**
     * Base URL API backend SRS IDCloudHost yang terverifikasi
     */
    protected string $apiBase = 'https://api.srs.idch.co.id/v1';

    protected ?string $apiKey;

    public function __construct()
    {
        $this->apiKey = config('services.idcloudhost.key') ?: env('IDCLOUDHOST_API_KEY');
    }

    /**
     * Hitung harga akhir yang ditampilkan kepada pembeli:
     * harga IDCloudHost (sudah termasuk PPN) + markup Bidtech
     */
    protected function hitungHargaAkhir(int|float $hargaBase): int
    {
        return (int) round($hargaBase + self::MARKUP_HARGA_DOMAIN);
    }

    /**
     * Cek apakah API key dikonfigurasi
     */
    public function hasApiKey(): bool
    {
        return !empty($this->apiKey);
    }

    /**
     * Cari domain berdasarkan nama bisnis — returns array domain results saja
     */
    public function cariDomain(string $namaBisnis): array
    {
        return $this->cariDomainWithMeta($namaBisnis)['domains'];
    }

    /**
     * Memisahkan input user menjadi nama dasar (base name) dan ekstensi jika ada.
     * Contoh:
     * - "deny.com" => base: "deny", ext: "com", is_exact: true
     * - "bengkel.co.id" => base: "bengkel", ext: "co.id", is_exact: true
     * - "toko.online" => base: "toko", ext: "online", is_exact: true
     * - "warung-kopi" => base: "warung-kopi", ext: null, is_exact: false
     */
    public function parseQueryDomain(string $query): array
    {
        $raw = strtolower(trim($query));
        $raw = preg_replace('/^https?:\/\//', '', $raw);
        $raw = preg_replace('/\/.*$/', '', $raw);
        $raw = trim($raw);

        // Sort ekstensi berdasarkan panjang karakter secara descending (.co.id dicek sebelum .id)
        $knownExtensions = array_keys($this->ekstensiDomain);
        usort($knownExtensions, fn($a, $b) => strlen($b) <=> strlen($a));

        $matchedExt = null;
        $baseName = $raw;

        foreach ($knownExtensions as $ext) {
            $suffix = '.' . $ext;
            if (str_ends_with($raw, $suffix)) {
                $matchedExt = $ext;
                $baseName = substr($raw, 0, -strlen($suffix));
                break;
            }
        }

        // Bersihkan nama dasar agar hanya berisi alfanumerik dan tanda hubung (-)
        $baseName = preg_replace('/[^a-z0-9\-]/', '', $baseName);
        $baseName = trim($baseName, '-');

        return [
            'base'     => $baseName,
            'ext'      => $matchedExt,
            'is_exact' => !empty($matchedExt),
        ];
    }

    /**
     * Cari domain dengan metadata status koneksi IDCloudHost dan caching cerdas
     */
    public function cariDomainWithMeta(string $namaBisnis): array
    {
        $parsed = $this->parseQueryDomain($namaBisnis);
        $baseName = $parsed['base'];
        $explicitExt = $parsed['ext'];

        if (empty($baseName) || strlen($baseName) < 2) {
            return [
                'domains'      => [],
                'source'       => 'idle',
                'is_live_api'  => false,
                'has_api_key'  => $this->hasApiKey(),
                'status_label' => '',
            ];
        }

        // Susun urutan ekstensi: jika ada explicitExt (misal deny.com), tempatkan 'com' di urutan pertama!
        $orderedExtensions = array_keys($this->ekstensiDomain);
        if ($explicitExt && in_array($explicitExt, $orderedExtensions)) {
            $orderedExtensions = array_values(array_diff($orderedExtensions, [$explicitExt]));
            array_unshift($orderedExtensions, $explicitExt);
        }

        // Cache pencarian domain selama 5 menit (300 detik) untuk query yang sama
        $cacheKey = "idch_domain_search_{$baseName}_" . ($explicitExt ?: 'all');
        return Cache::remember($cacheKey, 300, function () use ($baseName, $orderedExtensions, $explicitExt) {
            // Jika API key ada, panggil IDCloudHost pricing/quote secara paralel
            if ($this->hasApiKey()) {
                $apiResult = $this->queryPricingQuoteParallel($baseName, $orderedExtensions, $explicitExt);
                if (!empty($apiResult)) {
                    return [
                        'domains'      => $apiResult,
                        'source'       => 'idcloudhost_api',
                        'is_live_api'  => true,
                        'has_api_key'  => true,
                        'status_label' => 'Terhubung ke IDCloudHost API (Live)',
                    ];
                }
            }

            // Fallback ke DNS lookup jika API tidak tersedia / key belum ada
            return [
                'domains'      => $this->queryDnsLookup($baseName, $orderedExtensions, $explicitExt),
                'source'       => 'dns_fallback',
                'is_live_api'  => false,
                'has_api_key'  => $this->hasApiKey(),
                'status_label' => $this->hasApiKey()
                    ? 'Mode Fallback DNS (Kunci diuji)'
                    : 'Mode Standby (DNS Real-time & Katalog IDCloudHost)',
            ];
        });
    }

    /**
     * Akselerasi Query Harga & Ketersediaan via Http::pool (Concurrent Requests)
     * Memangkas waktu tunggu dari ~7-10 detik menjadi ~1-1.5 detik.
     */
    protected function queryPricingQuoteParallel(string $namaBisnis, ?array $customExtensions = null, ?string $explicitExt = null): ?array
    {
        try {
            $headers = [
                'Authorization' => 'Bearer ' . $this->apiKey,
                'Accept'        => 'application/json',
            ];

            $extensions = $customExtensions ?: array_keys($this->ekstensiDomain);
            $srsSupported = [
                'id', 'co.id', 'my.id', 'biz.id', 'web.id', 'org.id', 'ac.id', 'sch.id',
                'ponpes.id', 'desa.id', 'or.id', 'mil.id', 'go.id', 'com', 'net', 'xyz'
            ];

            // Eksekusi HTTP request secara paralel khusus ekstensi yang didukung SRS API
            $responses = Http::pool(function ($pool) use ($headers, $namaBisnis, $srsSupported) {
                $reqs = [];
                foreach ($srsSupported as $ext) {
                    $reqs[$ext] = $pool->withHeaders($headers)
                        ->timeout(3)
                        ->get("{$this->apiBase}/pricing/quote", [
                            'domain' => "{$namaBisnis}.{$ext}",
                            'action' => 'register',
                            'years'  => 1,
                        ]);
                }
                return $reqs;
            });

            $results = [];

            foreach ($extensions as $ext) {
                $fullDomain = "{$namaBisnis}.{$ext}";
                $response = $responses[$ext] ?? null;
                $isExact = ($explicitExt && $ext === $explicitExt);

                // Cek ketersediaan DNS cepat (hanya NS dan A record)
                $hasDns = @checkdnsrr($fullDomain, 'NS') || @checkdnsrr($fullDomain, 'A');

                if ($response && $response->successful()) {
                    $data = $response->json('data');
                    if (!empty($data)) {
                        $basePrice  = (int) ($data['total_price_idr'] ?? $data['subtotal_idr'] ?? $data['unit_price_idr'] ?? 0);
                        $taxAmount  = (int) ($data['tax_idr'] ?? $data['tax'] ?? 0);
                        $taxPct     = (int) ($data['tax_pct'] ?? 11);
                        $taxLabel   = $data['tax_label'] ?? 'PPN';
                        $grandTotal = (int) ($data['grand_total_idr'] ?? $data['grand_total'] ?? ($basePrice + $taxAmount));

                        // Jika grand_total belum termasuk markup
                        $finalPrice = $this->hitungHargaAkhir($grandTotal);

                        $results[] = [
                            'domain'         => $fullDomain,
                            'available'      => !$hasDns,
                            'price'          => $finalPrice,
                            'price_base'     => $basePrice,
                            'tax_amount'     => $taxAmount,
                            'tax_pct'        => $taxPct,
                            'tax_label'      => $taxLabel,
                            'markup'         => self::MARKUP_HARGA_DOMAIN,
                            'includes_tax'   => true,
                            'extension'      => $ext,
                            'is_premium'     => $data['is_premium'] ?? false,
                            'is_exact_match' => $isExact,
                        ];
                        continue;
                    }
                }

                // Fallback jika satu ekstensi gagal quote
                $hargaDefault = $this->ekstensiDomain[$ext] ?? 185000;
                $calcBasePrice = (int) round($hargaDefault / 1.11);
                $calcTax = $hargaDefault - $calcBasePrice;

                $results[] = [
                    'domain'         => $fullDomain,
                    'available'      => !$hasDns,
                    'price'          => $this->hitungHargaAkhir($hargaDefault),
                    'price_base'     => $calcBasePrice,
                    'tax_amount'     => $calcTax,
                    'tax_pct'        => 11,
                    'tax_label'      => 'PPN',
                    'markup'         => self::MARKUP_HARGA_DOMAIN,
                    'includes_tax'   => true,
                    'extension'      => $ext,
                    'is_premium'     => false,
                    'is_exact_match' => $isExact,
                ];
            }

            return !empty($results) ? $results : null;
        } catch (\Throwable $e) {
            Log::warning('IDCloudHost parallel pricing/quote gagal, fallback ke DNS: ' . $e->getMessage());
            return null;
        }
    }

    /**
     * Fallback: cek ketersediaan domain via DNS lookup + harga katalog default IDCloudHost
     */
    protected function queryDnsLookup(string $namaBisnis, ?array $customExtensions = null, ?string $explicitExt = null): array
    {
        $results = [];
        $extensions = $customExtensions ?: array_keys($this->ekstensiDomain);

        foreach ($extensions as $ext) {
            $fullDomain = "{$namaBisnis}.{$ext}";
            $hargaDefault = $this->ekstensiDomain[$ext] ?? 185000;
            $isExact = ($explicitExt && $ext === $explicitExt);

            $hasDns = @checkdnsrr($fullDomain, 'NS') || @checkdnsrr($fullDomain, 'A');

            $calcBasePrice = (int) round($hargaDefault / 1.11);
            $calcTax = $hargaDefault - $calcBasePrice;

            $results[] = [
                'domain'         => $fullDomain,
                'available'      => !$hasDns,
                'price'          => $this->hitungHargaAkhir($hargaDefault),
                'price_base'     => $calcBasePrice,
                'tax_amount'     => $calcTax,
                'tax_pct'        => 11,
                'tax_label'      => 'PPN',
                'markup'         => self::MARKUP_HARGA_DOMAIN,
                'includes_tax'   => true,
                'extension'      => $ext,
                'is_premium'     => false,
                'is_exact_match' => $isExact,
            ];
        }

        return $results;
    }
}
