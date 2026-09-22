<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Template;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TemplateApiController extends Controller
{
    /**
     * Helper untuk menambahkan header CORS ke setiap response API
     */
    private function corsResponse(array $data, int $status = 200): JsonResponse
    {
        return response()->json($data, $status, [
            'Access-Control-Allow-Origin' => '*',
            'Access-Control-Allow-Methods' => 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers' => 'Origin, Content-Type, Accept, Authorization, X-Requested-With',
        ]);
    }

    /**
     * Menampilkan daftar semua template aktif beserta kategori dan rincian harga
     */
    public function index(Request $request): JsonResponse
    {
        $query = Template::query();

        // Default: hanya tampilkan template yang aktif kecuali diminta sebaliknya
        if (!$request->has('include_inactive')) {
            $query->where('is_active', true);
        }

        // Filter berdasarkan kategori
        if ($request->filled('category') && $request->category !== 'Semua Design') {
            $query->where('category', $request->category);
        }

        // Filter pencarian teks
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%")
                  ->orWhere('tags', 'like', "%{$search}%")
                  ->orWhere('category', 'like', "%{$search}%");
            });
        }

        $templates = $query->orderBy('id', 'asc')->get();

        // Ambil semua kategori untuk filter tab di frontend
        $allActiveTemplates = Template::where('is_active', true)->get();
        $categoriesSet = $allActiveTemplates->pluck('category')->unique()->values();

        $categories = [
            [
                'name' => 'Semua Design',
                'count' => $allActiveTemplates->count(),
            ]
        ];

        foreach ($categoriesSet as $category) {
            $categories[] = [
                'name' => $category,
                'count' => $allActiveTemplates->where('category', $category)->count(),
            ];
        }

        $formattedData = $templates->map(function (Template $item) {
            return [
                'id' => $item->id,
                'name' => $item->name,
                'category' => $item->category,
                'subcategory' => $item->description ?? $item->template_desc ?? 'Website profesional modern siap pakai',
                'description' => $item->description,
                'image' => $item->preview_url,
                'previewHref' => $item->landing_url,
                'demo_url' => $item->demo_url,
                'tags' => !empty($item->tags_list) ? $item->tags_list : [$item->category, 'Responsive'],
                'views' => (int) $item->views,
                'pricing' => [
                    'total' => $item->total_package_price,
                    'formatted_total' => 'Rp ' . number_format($item->total_package_price, 0, ',', '.'),
                    'template_price' => (int) $item->template_price,
                    'server_price' => (int) $item->server_price,
                    'service_price' => (int) $item->service_price,
                    'template_desc' => $item->template_desc,
                    'server_desc' => $item->server_desc,
                    'service_desc' => $item->service_desc,
                ],
                'is_active' => (bool) $item->is_active,
                'checkout_url' => url('/checkout/' . $item->id . '/domain'),
            ];
        });

        return $this->corsResponse([
            'status' => 'success',
            'message' => 'Data template berhasil diambil',
            'count' => $formattedData->count(),
            'categories' => $categories,
            'data' => $formattedData,
        ]);
    }

    /**
     * Menampilkan detail satu template
     */
    public function show(int $id): JsonResponse
    {
        $item = Template::find($id);

        if (!$item) {
            return $this->corsResponse([
                'status' => 'error',
                'message' => 'Template tidak ditemukan',
            ], 404);
        }

        return $this->corsResponse([
            'status' => 'success',
            'data' => [
                'id' => $item->id,
                'name' => $item->name,
                'category' => $item->category,
                'subcategory' => $item->description ?? $item->template_desc,
                'description' => $item->description,
                'image' => $item->preview_url,
                'previewHref' => $item->landing_url,
                'demo_url' => $item->demo_url,
                'tags' => $item->tags_list,
                'views' => (int) $item->views,
                'pricing' => [
                    'total' => $item->total_package_price,
                    'formatted_total' => 'Rp ' . number_format($item->total_package_price, 0, ',', '.'),
                    'template_price' => (int) $item->template_price,
                    'server_price' => (int) $item->server_price,
                    'service_price' => (int) $item->service_price,
                    'template_desc' => $item->template_desc,
                    'server_desc' => $item->server_desc,
                    'service_desc' => $item->service_desc,
                ],
                'is_active' => (bool) $item->is_active,
                'checkout_url' => url('/checkout/' . $item->id . '/domain'),
            ]
        ]);
    }

    /**
     * Tracking jumlah penayangan (view counter) template
     */
    public function trackView(int $id): JsonResponse
    {
        $template = Template::find($id);

        if (!$template) {
            return $this->corsResponse([
                'status' => 'error',
                'message' => 'Template tidak ditemukan',
            ], 404);
        }

        $newViews = $template->incrementView();

        return $this->corsResponse([
            'status' => 'success',
            'message' => 'View count berhasil diperbarui',
            'id' => $template->id,
            'name' => $template->name,
            'views' => $newViews,
        ]);
    }
}
