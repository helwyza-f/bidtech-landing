<?php

namespace App\Services;

use App\Enums\OrderStatus;
use App\Models\Order;
use App\Models\Template;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class TemplateService
{
    private const PREVIEW_DIRECTORY = 'templates';

    // ---- Admin catalog ----

    public function list(?string $search = null, ?string $category = null, string $sort = 'newest'): array
    {
        $query = Template::query()->withCount(['orders as sales_count' => function ($q) {
            $q->where('status', OrderStatus::Paid);
        }]);

        if ($search !== null && $search !== '') {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('category', 'like', "%{$search}%")
                    ->orWhere('tags', 'like', "%{$search}%");
            });
        }
        if ($category !== null && $category !== '' && $category !== 'all') {
            $query->where('category', $category);
        }

        match ($sort) {
            'sales' => $query->orderBy('sales_count', 'desc')->orderBy('id', 'desc'),
            'views' => $query->orderBy('views', 'desc')->orderBy('id', 'desc'),
            'price_high' => $query->orderBy('price', 'desc'),
            'price_low' => $query->orderBy('price', 'asc'),
            default => $query->orderBy('id', 'desc'),
        };

        return [
            'templates' => $query->paginate(10)->withQueryString(),
            'stats' => $this->stats(),
            'categories' => Template::distinct('category')->pluck('category')->filter()->values(),
        ];
    }

    public function create(array $data): Template
    {
        return Template::create([
            'slug' => $this->uniqueSlug($data['name']),
            'name' => $data['name'],
            'category' => $data['category'],
            'price' => (int) $data['template_price'] + (int) $data['server_price'] + (int) $data['service_price'],
            'template_price' => (int) $data['template_price'],
            'server_price' => (int) $data['server_price'],
            'service_price' => (int) $data['service_price'],
            'template_desc' => $data['template_desc'] ?? 'Lisensi Desain UI/UX Eksklusif & Source Code Clean',
            'server_desc' => $data['server_desc'] ?? 'Cloud Server Hosting 1 Tahun, NVMe High Speed & Free SSL',
            'service_desc' => $data['service_desc'] ?? 'Setup Domain, Deployment Instan & Garansi Pemeliharaan',
            'demo_url' => $data['demo_url'] ?? null,
            'description' => $data['description'] ?? null,
            'tags' => $data['tags'] ?? null,
            'preview' => $this->resolvePreview($data, 'https://media.bidtech.co.id/bidtech/templates/rentcar.webp'),
            'views' => 0,
            'is_active' => $data['is_active'],
        ]);
    }

    public function update(Template $template, array $data): Template
    {
        $template->update([
            'name' => $data['name'],
            'category' => $data['category'],
            'price' => (int) $data['template_price'] + (int) $data['server_price'] + (int) $data['service_price'],
            'template_price' => (int) $data['template_price'],
            'server_price' => (int) $data['server_price'],
            'service_price' => (int) $data['service_price'],
            'template_desc' => $data['template_desc'] ?? null,
            'server_desc' => $data['server_desc'] ?? null,
            'service_desc' => $data['service_desc'] ?? null,
            'demo_url' => $data['demo_url'] ?? null,
            'description' => $data['description'] ?? null,
            'tags' => $data['tags'] ?? null,
            'preview' => $this->resolvePreview($data, (string) $template->preview),
            'is_active' => $data['is_active'],
        ]);

        return $template;
    }

    public function delete(Template $template): bool
    {
        if ($template->orders()->exists()) {
            $template->update(['is_active' => false]);

            return false;
        }
        $template->delete();

        return true;
    }

    public function toggleActive(Template $template): Template
    {
        $template->is_active = ! $template->is_active;
        $template->save();

        return $template;
    }

    // ---- Public catalog ----

    public function listPublic(bool $includeInactive = false, ?string $category = null, ?string $search = null): array
    {
        $query = Template::query();
        if (! $includeInactive) {
            $query->where('is_active', true);
        }
        if ($category !== null && $category !== '' && $category !== 'Semua Design') {
            $query->where('category', $category);
        }
        if ($search !== null && $search !== '') {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
                    ->orWhere('tags', 'like', "%{$search}%")
                    ->orWhere('category', 'like', "%{$search}%");
            });
        }

        $templates = $query->orderBy('id')->get();

        return [
            'categories' => $this->categories(),
            'data' => $templates->map(fn (Template $item) => $item->toPublicArray(listing: true)),
        ];
    }

    public function findPublic(int $id): ?array
    {
        $template = Template::find($id);

        return $template ? $template->toPublicArray(listing: false) : null;
    }

    public function trackView(int $id): ?array
    {
        $template = Template::find($id);
        if (! $template) {
            return null;
        }

        return ['id' => $template->id, 'name' => $template->name, 'views' => $template->incrementView()];
    }

    public function resolvePreview(array $data, string $default): string
    {
        $file = $data['preview_file'] ?? null;
        if ($file instanceof UploadedFile) {
            $filename = time().'_'.Str::slug($data['name']).'.'.$file->getClientOriginalExtension();
            $diskPath = self::PREVIEW_DIRECTORY.'/'.$filename;
            Storage::disk('s3')->put($diskPath, file_get_contents($file->getRealPath()));

            return $diskPath;
        }

        return ! empty($data['preview_url']) ? $data['preview_url'] : $default;
    }

    public function syncFromFrontend(): void
    {
        try {
            $frontendUrl = rtrim(config('app.frontend_url', 'http://localhost:3000'), '/');
            $response = Http::timeout(3)->get("{$frontendUrl}/api/templates");
            if (! $response->successful()) {
                return;
            }
            $templates = $response->json('data');
            if (! is_array($templates) || empty($templates)) {
                return;
            }

            foreach ($templates as $item) {
                if (empty($item['name'])) {
                    continue;
                }
                Template::updateOrCreate(
                    ['slug' => Str::slug($item['name'])],
                    [
                        'name' => $item['name'] ?? '',
                        'category' => $item['category'] ?? 'Umum',
                        'price' => (int) ($item['price'] ?? 2000000),
                        'template_price' => (int) ($item['template_price'] ?? 1000000),
                        'server_price' => (int) ($item['server_price'] ?? 500000),
                        'service_price' => (int) ($item['service_price'] ?? 500000),
                        'template_desc' => $item['template_desc'] ?? 'Lisensi Desain UI/UX Eksklusif & Source Code Clean',
                        'server_desc' => $item['server_desc'] ?? 'Cloud Server Hosting 1 Tahun, NVMe High Speed & Free SSL',
                        'service_desc' => $item['service_desc'] ?? 'Setup Domain, Deployment Instan & Garansi Pemeliharaan',
                        'preview' => ltrim($item['image'] ?? '', '/'),
                    ]
                );
            }
        } catch (\Throwable $e) {
            Log::warning('Gagal sinkronisasi template dari API Next.js: '.$e->getMessage());
        }
    }

    private function uniqueSlug(string $name): string
    {
        $base = Str::slug($name);
        $slug = $base;
        $suffix = 1;
        while (Template::where('slug', $slug)->exists()) {
            $slug = $base.'-'.(++$suffix);
        }

        return $slug;
    }

    private function stats(): array
    {
        $paidOrders = Order::where('status', OrderStatus::Paid);

        return [
            'total' => Template::count(),
            'active' => Template::where('is_active', true)->count(),
            'total_views' => (int) Template::sum('views'),
            'categories_count' => Template::distinct('category')->count('category'),
            'total_sales' => (int) (clone $paidOrders)->count(),
            'total_revenue' => (int) (clone $paidOrders)->get()->sum(fn ($order) => $order->total_price),
        ];
    }

    private function categories(): array
    {
        $active = Template::where('is_active', true)->get();
        $categories = [['name' => 'Semua Design', 'count' => $active->count()]];
        foreach ($active->pluck('category')->unique()->values() as $category) {
            $categories[] = ['name' => $category, 'count' => $active->where('category', $category)->count()];
        }

        return $categories;
    }
}
