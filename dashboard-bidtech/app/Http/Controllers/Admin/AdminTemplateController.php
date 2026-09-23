<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Template;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\View\View;

class AdminTemplateController extends Controller
{
    /**
     * Tampilkan katalog template di panel Admin CMS
     */
    public function index(Request $request): View
    {
        $query = Template::query()
            ->withCount(['orders as sales_count' => function ($q) {
                $q->where('status', \App\Enums\OrderStatus::Paid);
            }]);

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('category', 'like', "%{$search}%")
                  ->orWhere('tags', 'like', "%{$search}%");
            });
        }

        if ($request->filled('category') && $request->category !== 'all') {
            $query->where('category', $request->category);
        }

        // Sorting opsi: paling laku (sales), paling banyak dilihat (views), terbaru (default)
        $sort = $request->get('sort', 'newest');
        if ($sort === 'sales') {
            $query->orderBy('sales_count', 'desc')->orderBy('id', 'desc');
        } elseif ($sort === 'views') {
            $query->orderBy('views', 'desc')->orderBy('id', 'desc');
        } elseif ($sort === 'price_high') {
            $query->orderBy('price', 'desc');
        } elseif ($sort === 'price_low') {
            $query->orderBy('price', 'asc');
        } else {
            $query->orderBy('id', 'desc');
        }

        $templates = $query->paginate(10)->withQueryString();

        $stats = [
            'total'            => Template::count(),
            'active'           => Template::where('is_active', true)->count(),
            'total_views'      => (int) Template::sum('views'),
            'categories_count' => Template::distinct('category')->count('category'),
            'total_sales'      => (int) \App\Models\Order::where('status', \App\Enums\OrderStatus::Paid)->count(),
            'total_revenue'    => (int) \App\Models\Order::where('status', \App\Enums\OrderStatus::Paid)->get()->sum(fn($o) => $o->total_price),
        ];

        $categories = Template::distinct('category')->pluck('category')->filter()->values();

        return view('admin.templates.index', compact('templates', 'stats', 'categories'));
    }


    /**
     * Form tambah template baru
     */
    public function create(): View
    {
        $existingCategories = Template::distinct('category')->pluck('category')->filter()->values();
        return view('admin.templates.create', compact('existingCategories'));
    }

    /**
     * Simpan template baru ke database
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name'           => 'required|string|max:150',
            'category'       => 'required|string|max:100',
            'template_price' => 'required|numeric|min:0',
            'server_price'   => 'required|numeric|min:0',
            'service_price'  => 'required|numeric|min:0',
            'template_desc'  => 'nullable|string|max:255',
            'server_desc'    => 'nullable|string|max:255',
            'service_desc'   => 'nullable|string|max:255',
            'demo_url'       => 'nullable|string|max:255',
            'description'    => 'nullable|string',
            'tags'           => 'nullable|string|max:255',
            'preview_file'   => 'nullable|image|mimes:jpeg,png,jpg,webp,svg|max:4096',
            'preview_url'    => 'nullable|string|max:255',
            'is_active'      => 'nullable|boolean',
        ]);

        $previewPath = 'images/design_thumbnail/rentcar.webp';

        if ($request->hasFile('preview_file')) {
            $file = $request->file('preview_file');
            $filename = time() . '_' . Str::slug($request->name) . '.' . $file->getClientOriginalExtension();
            $destinationPath = public_path('images/design_thumbnail');
            if (!file_exists($destinationPath)) {
                mkdir($destinationPath, 0755, true);
            }
            $file->move($destinationPath, $filename);
            $previewPath = 'images/design_thumbnail/' . $filename;
        } elseif (!empty($request->preview_url)) {
            $previewPath = $request->preview_url;
        }

        $totalPrice = (int)$request->template_price + (int)$request->server_price + (int)$request->service_price;

        Template::create([
            'name'           => $validated['name'],
            'category'       => $validated['category'],
            'price'          => $totalPrice,
            'template_price' => (int) $validated['template_price'],
            'server_price'   => (int) $validated['server_price'],
            'service_price'  => (int) $validated['service_price'],
            'template_desc'  => $validated['template_desc'] ?? 'Lisensi Desain UI/UX Eksklusif & Source Code Clean',
            'server_desc'    => $validated['server_desc'] ?? 'Cloud Server Hosting 1 Tahun, NVMe High Speed & Free SSL',
            'service_desc'   => $validated['service_desc'] ?? 'Setup Domain, Deployment Instan & Garansi Pemeliharaan',
            'demo_url'       => $validated['demo_url'] ?? null,
            'description'    => $validated['description'] ?? null,
            'tags'           => $validated['tags'] ?? null,
            'preview'        => $previewPath,
            'views'          => 0,
            'is_active'      => $request->boolean('is_active', true),
        ]);

        return redirect()->route('dashboard.templates.index')->with('success', 'Template baru berhasil ditambahkan dan langsung aktif di katalog website!');
    }

    /**
     * Form edit template
     */
    public function edit(Template $template): View
    {
        $existingCategories = Template::distinct('category')->pluck('category')->filter()->values();
        return view('admin.templates.edit', compact('template', 'existingCategories'));
    }

    /**
     * Perbarui data template
     */
    public function update(Request $request, Template $template): RedirectResponse
    {
        $validated = $request->validate([
            'name'           => 'required|string|max:150',
            'category'       => 'required|string|max:100',
            'template_price' => 'required|numeric|min:0',
            'server_price'   => 'required|numeric|min:0',
            'service_price'  => 'required|numeric|min:0',
            'template_desc'  => 'nullable|string|max:255',
            'server_desc'    => 'nullable|string|max:255',
            'service_desc'   => 'nullable|string|max:255',
            'demo_url'       => 'nullable|string|max:255',
            'description'    => 'nullable|string',
            'tags'           => 'nullable|string|max:255',
            'preview_file'   => 'nullable|image|mimes:jpeg,png,jpg,webp,svg|max:4096',
            'preview_url'    => 'nullable|string|max:255',
            'is_active'      => 'nullable|boolean',
        ]);

        $previewPath = $template->preview;

        if ($request->hasFile('preview_file')) {
            $file = $request->file('preview_file');
            $filename = time() . '_' . Str::slug($request->name) . '.' . $file->getClientOriginalExtension();
            $destinationPath = public_path('images/design_thumbnail');
            if (!file_exists($destinationPath)) {
                mkdir($destinationPath, 0755, true);
            }
            $file->move($destinationPath, $filename);
            $previewPath = 'images/design_thumbnail/' . $filename;
        } elseif (!empty($request->preview_url)) {
            $previewPath = $request->preview_url;
        }

        $totalPrice = (int)$request->template_price + (int)$request->server_price + (int)$request->service_price;

        $template->update([
            'name'           => $validated['name'],
            'category'       => $validated['category'],
            'price'          => $totalPrice,
            'template_price' => (int) $validated['template_price'],
            'server_price'   => (int) $validated['server_price'],
            'service_price'  => (int) $validated['service_price'],
            'template_desc'  => $validated['template_desc'],
            'server_desc'    => $validated['server_desc'],
            'service_desc'   => $validated['service_desc'],
            'demo_url'       => $validated['demo_url'],
            'description'    => $validated['description'],
            'tags'           => $validated['tags'],
            'preview'        => $previewPath,
            'is_active'      => $request->boolean('is_active', true),
        ]);

        return redirect()->route('dashboard.templates.index')->with('success', 'Data template berhasil diperbarui!');
    }

    /**
     * Hapus template dari database
     */
    public function destroy(Template $template): RedirectResponse
    {
        if ($template->orders()->exists()) {
            // Jika sudah ada order terkait, nonaktifkan saja untuk keamanan integritas data
            $template->update(['is_active' => false]);
            return redirect()->route('dashboard.templates.index')->with('warning', 'Template memiliki riwayat pesanan (orders), sehingga statusnya dinonaktifkan agar data transaksi tetap utuh.');
        }

        $template->delete();
        return redirect()->route('dashboard.templates.index')->with('success', 'Template berhasil dihapus.');
    }

    /**
     * Toggle status aktif/non-aktif template
     */
    public function toggleActive(Template $template): RedirectResponse
    {
        $template->is_active = !$template->is_active;
        $template->save();

        $statusStr = $template->is_active ? 'diaktifkan' : 'dinonaktifkan';
        return back()->with('success', "Template '{$template->name}' berhasil {$statusStr}.");
    }
}
