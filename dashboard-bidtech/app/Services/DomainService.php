<?php

namespace App\Services;

use App\Enums\DomainStatus;
use App\Models\Order;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class DomainService
{
    private const CACHE_SECONDS = 300;

    private const API_BASE = 'https://api.srs.idch.co.id/v1';

    private const SRS_SUPPORTED = [
        'id', 'co.id', 'my.id', 'biz.id', 'web.id', 'org.id', 'ac.id', 'sch.id',
        'ponpes.id', 'desa.id', 'or.id', 'mil.id', 'go.id', 'com', 'net', 'xyz',
    ];

    public const DURATION_YEARS = 1;

    private const TAX_DIVISOR = 1.11;

    // ---- Search ----

    /**
     * @return array{domains: array, source: string, is_live_api: bool, has_api_key: bool, status_label: string}
     */
    public function search(string $query): array
    {
        $parsed = $this->parseQuery($query);
        $baseName = $parsed['base'];
        $explicitExt = $parsed['ext'];
        $hasApiKey = ! empty(config('services.idcloudhost.key'));

        if (strlen($baseName) < 2) {
            return [
                'domains' => [],
                'source' => 'idle',
                'is_live_api' => false,
                'has_api_key' => $hasApiKey,
                'status_label' => '',
            ];
        }

        $extensions = array_keys(config('domain.extensions'));
        if ($explicitExt && in_array($explicitExt, $extensions)) {
            $extensions = array_values(array_diff($extensions, [$explicitExt]));
            array_unshift($extensions, $explicitExt);
        }

        $cacheKey = "idch_domain_search_{$baseName}_".($explicitExt ?: 'all');

        return Cache::remember($cacheKey, self::CACHE_SECONDS, function () use ($baseName, $extensions, $explicitExt, $hasApiKey) {
            if ($hasApiKey) {
                $live = $this->queryPricing($baseName, $extensions, $explicitExt);

                if (! empty($live)) {
                    return [
                        'domains' => $live,
                        'source' => 'idcloudhost_api',
                        'is_live_api' => true,
                        'has_api_key' => true,
                        'status_label' => 'Terhubung ke IDCloudHost API (Live)',
                    ];
                }
            }

            return [
                'domains' => $this->lookupDns($baseName, $extensions, $explicitExt),
                'source' => 'dns_fallback',
                'is_live_api' => false,
                'has_api_key' => $hasApiKey,
                'status_label' => $hasApiKey
                    ? 'Mode Fallback DNS (Kunci diuji)'
                    : 'Mode Standby (DNS Real-time & Katalog IDCloudHost)',
            ];
        });
    }

    /** @return array{base: string, ext: ?string, is_exact: bool} */
    public function parseQuery(string $query): array
    {
        $raw = strtolower(trim($query));
        $raw = preg_replace('/^https?:\/\//', '', $raw);
        $raw = preg_replace('/\/.*$/', '', $raw);
        $raw = trim($raw);

        $knownExtensions = array_keys(config('domain.extensions'));
        usort($knownExtensions, fn ($a, $b) => strlen($b) <=> strlen($a));

        $matchedExt = null;
        $baseName = $raw;

        foreach ($knownExtensions as $ext) {
            $suffix = '.'.$ext;
            if (str_ends_with($raw, $suffix)) {
                $matchedExt = $ext;
                $baseName = substr($raw, 0, -strlen($suffix));
                break;
            }
        }

        $baseName = preg_replace('/[^a-z0-9\-]/', '', $baseName);
        $baseName = trim($baseName, '-');

        return ['base' => $baseName, 'ext' => $matchedExt, 'is_exact' => ! empty($matchedExt)];
    }

    /** @return array<int, array<string, mixed>>|null */
    public function queryPricing(string $baseName, ?array $extensions = null, ?string $explicitExt = null): ?array
    {
        try {
            $headers = [
                'Authorization' => 'Bearer '.config('services.idcloudhost.key'),
                'Accept' => 'application/json',
            ];
            $extensions = $extensions ?: array_keys(config('domain.extensions'));

            // Known legacy quirk: unnamed pool responses are numerically indexed.
            $responses = Http::pool(function ($pool) use ($headers, $baseName) {
                $requests = [];
                foreach (self::SRS_SUPPORTED as $ext) {
                    $requests[$ext] = $pool->withHeaders($headers)
                        ->timeout(3)
                        ->get(self::API_BASE.'/pricing/quote', [
                            'domain' => "{$baseName}.{$ext}",
                            'action' => 'register',
                            'years' => 1,
                        ]);
                }

                return $requests;
            });

            $results = [];
            foreach ($extensions as $ext) {
                $entry = $this->fromQuote($baseName, $ext, $responses[$ext] ?? null, $explicitExt);
                $results[] = $entry ?? $this->lookupDns($baseName, [$ext], $explicitExt)[0];
            }

            return $results !== [] ? $results : null;
        } catch (\Throwable $e) {
            Log::warning('IDCloudHost parallel pricing/quote gagal, fallback ke DNS: '.$e->getMessage());

            return null;
        }
    }

    /** @param string[] $extensions */
    public function lookupDns(string $baseName, array $extensions, ?string $explicitExt = null): array
    {
        $prices = config('domain.extensions');
        $results = [];

        foreach ($extensions as $ext) {
            $fullDomain = "{$baseName}.{$ext}";
            $catalogPrice = $prices[$ext] ?? config('domain.default_price');
            $base = (int) round($catalogPrice / 1.11);

            $results[] = [
                'domain' => $fullDomain,
                'available' => ! $this->isRegistered($fullDomain),
                'price' => (int) round($catalogPrice + config('domain.markup')),
                'price_base' => $base,
                'tax_amount' => $catalogPrice - $base,
                'tax_pct' => 11,
                'tax_label' => 'PPN',
                'markup' => config('domain.markup'),
                'includes_tax' => true,
                'extension' => $ext,
                'is_premium' => false,
                'is_exact_match' => $explicitExt && $ext === $explicitExt,
            ];
        }

        return $results;
    }

    public function isRegistered(string $domain): bool
    {
        return @checkdnsrr($domain, 'NS') || @checkdnsrr($domain, 'A');
    }

    /** @return array{price: int, base: int, tax: int} */
    public function quotePrice(string $domain, int $price = 0, int $base = 0, int $tax = 0): array
    {
        if ($price <= 0) {
            $price = $this->catalogPrice($domain);
        }
        if ($base <= 0) {
            $base = (int) round($price / self::TAX_DIVISOR);
        }
        if ($tax <= 0) {
            $tax = $price - $base;
        }

        return ['price' => $price, 'base' => $base, 'tax' => $tax];
    }

    // ---- Webhook ----

    public function handleWebhook(string $event, ?string $domain): void
    {
        if ($event !== 'domain.registered' || empty($domain)) {
            return;
        }

        $order = Order::where('domain_final', $domain)->first();
        if (! $order) {
            return;
        }

        $order->update(['domain_status' => DomainStatus::Registered]);
        Log::info("IDCloudHost webhook: Status domain {$domain} diperbarui menjadi Registered untuk order {$order->order_number}");
    }

    private function fromQuote(string $baseName, string $ext, mixed $response, ?string $explicitExt): ?array
    {
        if (! $response || ! $response->successful()) {
            return null;
        }
        $data = $response->json('data');
        if (empty($data)) {
            return null;
        }

        $fullDomain = "{$baseName}.{$ext}";
        $basePrice = (int) ($data['total_price_idr'] ?? $data['subtotal_idr'] ?? $data['unit_price_idr'] ?? 0);
        $taxAmount = (int) ($data['tax_idr'] ?? $data['tax'] ?? 0);
        $grandTotal = (int) ($data['grand_total_idr'] ?? $data['grand_total'] ?? ($basePrice + $taxAmount));

        return [
            'domain' => $fullDomain,
            'available' => ! $this->isRegistered($fullDomain),
            'price' => (int) round($grandTotal + config('domain.markup')),
            'price_base' => $basePrice,
            'tax_amount' => $taxAmount,
            'tax_pct' => (int) ($data['tax_pct'] ?? 11),
            'tax_label' => $data['tax_label'] ?? 'PPN',
            'markup' => config('domain.markup'),
            'includes_tax' => true,
            'extension' => $ext,
            'is_premium' => $data['is_premium'] ?? false,
            'is_exact_match' => $explicitExt && $ext === $explicitExt,
        ];
    }

    private function catalogPrice(string $domain): int
    {
        $domain = strtolower($domain);
        foreach (config('domain.extensions') as $extension => $price) {
            if (str_ends_with($domain, '.'.$extension)) {
                return $price;
            }
        }

        return (int) config('domain.default_price');
    }
}
