<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Promo;
use App\Models\PromoUsage;
use App\Models\Template;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class AdminPromoController extends Controller
{
    /**
     * Tampilkan daftar semua kode promo
     */
    public function index(Request $request): View
    {
        $query = Promo::query();

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('code', 'like', "%{$search}%")
                  ->orWhere('name', 'like', "%{$search}%")
                  ->orWhere('partner_name', 'like', "%{$search}%");
            });
        }

        if ($request->filled('type') && $request->type !== 'all') {
            $query->where('type', $request->type);
        }

        if ($request->filled('is_partner') && $request->is_partner !== 'all') {
            $query->where('is_partner', $request->is_partner === '1');
        }

        if ($request->filled('is_active') && $request->is_active !== 'all') {
            $query->where('is_active', $request->is_active === '1');
        }

        $promos = $query->orderBy('id', 'desc')->paginate(15)->withQueryString();

        $stats = [
            'total'   => Promo::count(),
            'active'  => Promo::where('is_active', true)->count(),
            'partner' => Promo::where('is_partner', true)->count(),
            'expired' => Promo::where('valid_until', '<', now())->count(),
        ];

        return view('admin.promos.index', compact('promos', 'stats'));
    }

    /**
     * Form tambah promo baru
     */
    public function create(): View
    {
        $templates = Template::where('is_active', true)->orderBy('name')->get();
        return view('admin.promos.create', compact('templates'));
    }

    /**
     * Bersihkan input angka/rupiah dari titik pemisah ribuan (misal: 1.000 menjadi 1000)
     */
    protected function sanitizeCurrencyInputs(Request $request): void
    {
        $currencyFields = [
            'reward_amount',
            'max_discount',
            'min_order_amount',
            'min_applicable_price',
            'partner_commission_value',
        ];

        $cleanInputs = [];
        foreach ($currencyFields as $field) {
            if ($request->has($field) && !is_null($request->input($field))) {
                $raw = (string) $request->input($field);
                if (trim($raw) === '') {
                    $cleanInputs[$field] = null;
                } else {
                    $clean = preg_replace('/[^0-9]/', '', $raw);
                    $cleanInputs[$field] = $clean === '' ? null : (int) $clean;
                }
            }
        }

        if (!empty($cleanInputs)) {
            $request->merge($cleanInputs);
        }
    }

    /**
     * Simpan promo baru ke database
     */
    public function store(Request $request): RedirectResponse
    {
        $this->sanitizeCurrencyInputs($request);

        $validated = $request->validate([
            'code'                     => 'required|string|max:50|unique:promos,code',
            'name'                     => 'required|string|max:150',
            'description'              => 'nullable|string|max:500',
            'type'                     => 'required|in:fixed,percentage,override_price,free,free_component,bundle_price',
            'reward_amount'            => 'nullable|integer|min:0',
            'max_discount'             => 'nullable|integer|min:0',
            'min_order_amount'         => 'nullable|integer|min:0',
            'min_applicable_price'     => 'nullable|integer|min:0',
            'target_scope'             => 'required|in:all,service,template,server',
            'target_template_id'       => 'nullable|exists:templates,id',
            'is_partner'               => 'nullable|boolean',
            'partner_name'             => 'nullable|string|max:150',
            'partner_code'             => 'nullable|string|max:100',
            'partner_commission_type'  => 'nullable|in:fixed,percentage',
            'partner_commission_value' => 'nullable|integer|min:0',
            'allowed_domains'          => 'nullable|string',
            'allowed_emails'           => 'nullable|string',
            'usage_limit'              => 'nullable|integer|min:1',
            'usage_per_user'           => 'nullable|integer|min:1',
            'valid_from'               => 'nullable|date',
            'valid_until'              => 'nullable|date|after_or_equal:valid_from',
            'is_active'                => 'nullable|boolean',
        ]);

        Promo::create([
            'code'                     => strtoupper($validated['code']),
            'name'                     => $validated['name'],
            'description'              => $validated['description'] ?? null,
            'type'                     => $validated['type'],
            'reward_amount'            => (int) ($validated['reward_amount'] ?? 0),
            'max_discount'             => !empty($validated['max_discount']) ? (int) $validated['max_discount'] : null,
            'min_order_amount'         => (int) ($validated['min_order_amount'] ?? 0),
            'min_applicable_price'     => !empty($validated['min_applicable_price']) ? (int) $validated['min_applicable_price'] : null,
            'target_scope'             => $validated['target_scope'],
            'target_template_id'       => $validated['target_template_id'] ?? null,
            'is_partner'               => $request->boolean('is_partner'),
            'partner_name'             => $validated['partner_name'] ?? null,
            'partner_code'             => $validated['partner_code'] ?? null,
            'partner_commission_type'  => $validated['partner_commission_type'] ?? 'none',
            'partner_commission_value' => (int) ($validated['partner_commission_value'] ?? 0),
            'allowed_domains'          => $validated['allowed_domains'] ?? null,
            'allowed_emails'           => $validated['allowed_emails'] ?? null,
            'usage_limit'              => !empty($validated['usage_limit']) ? (int) $validated['usage_limit'] : null,
            'used_count'               => 0,
            'usage_per_user'           => !empty($validated['usage_per_user']) ? (int) $validated['usage_per_user'] : 1,
            'valid_from'               => $validated['valid_from'] ?? null,
            'valid_until'              => $validated['valid_until'] ?? null,
            'is_active'                => $request->boolean('is_active', true),
        ]);

        return redirect()->route('dashboard.promos.index')
            ->with('success', "Kode promo '{$validated['code']}' berhasil dibuat!");
    }

    /**
     * Form edit promo
     */
    public function edit(Promo $promo): View
    {
        $templates = Template::where('is_active', true)->orderBy('name')->get();
        return view('admin.promos.edit', compact('promo', 'templates'));
    }

    /**
     * Perbarui data promo
     */
    public function update(Request $request, Promo $promo): RedirectResponse
    {
        $this->sanitizeCurrencyInputs($request);

        $validated = $request->validate([
            'code'                     => 'required|string|max:50|unique:promos,code,' . $promo->id,
            'name'                     => 'required|string|max:150',
            'description'              => 'nullable|string|max:500',
            'type'                     => 'required|in:fixed,percentage,override_price,free,free_component,bundle_price',
            'reward_amount'            => 'nullable|integer|min:0',
            'max_discount'             => 'nullable|integer|min:0',
            'min_order_amount'         => 'nullable|integer|min:0',
            'min_applicable_price'     => 'nullable|integer|min:0',
            'target_scope'             => 'required|in:all,service,template,server',
            'target_template_id'       => 'nullable|exists:templates,id',
            'is_partner'               => 'nullable|boolean',
            'partner_name'             => 'nullable|string|max:150',
            'partner_code'             => 'nullable|string|max:100',
            'partner_commission_type'  => 'nullable|in:fixed,percentage',
            'partner_commission_value' => 'nullable|integer|min:0',
            'allowed_domains'          => 'nullable|string',
            'allowed_emails'           => 'nullable|string',
            'usage_limit'              => 'nullable|integer|min:1',
            'usage_per_user'           => 'nullable|integer|min:1',
            'valid_from'               => 'nullable|date',
            'valid_until'              => 'nullable|date|after_or_equal:valid_from',
            'is_active'                => 'nullable|boolean',
        ]);

        $promo->update([
            'code'                     => strtoupper($validated['code']),
            'name'                     => $validated['name'],
            'description'              => $validated['description'] ?? null,
            'type'                     => $validated['type'],
            'reward_amount'            => (int) ($validated['reward_amount'] ?? 0),
            'max_discount'             => !empty($validated['max_discount']) ? (int) $validated['max_discount'] : null,
            'min_order_amount'         => (int) ($validated['min_order_amount'] ?? 0),
            'min_applicable_price'     => !empty($validated['min_applicable_price']) ? (int) $validated['min_applicable_price'] : null,
            'target_scope'             => $validated['target_scope'],
            'target_template_id'       => $validated['target_template_id'] ?? null,
            'is_partner'               => $request->boolean('is_partner'),
            'partner_name'             => $validated['partner_name'] ?? null,
            'partner_code'             => $validated['partner_code'] ?? null,
            'partner_commission_type'  => $validated['partner_commission_type'] ?? 'none',
            'partner_commission_value' => (int) ($validated['partner_commission_value'] ?? 0),
            'allowed_domains'          => $validated['allowed_domains'] ?? null,
            'allowed_emails'           => $validated['allowed_emails'] ?? null,
            'usage_limit'              => !empty($validated['usage_limit']) ? (int) $validated['usage_limit'] : null,
            'usage_per_user'           => !empty($validated['usage_per_user']) ? (int) $validated['usage_per_user'] : 1,
            'valid_from'               => $validated['valid_from'] ?? null,
            'valid_until'              => $validated['valid_until'] ?? null,
            'is_active'                => $request->boolean('is_active', true),
        ]);

        return redirect()->route('dashboard.promos.index')
            ->with('success', "Kode promo '{$promo->code}' berhasil diperbarui!");
    }

    /**
     * Hapus promo
     */
    public function destroy(Promo $promo): RedirectResponse
    {
        if ($promo->usages()->exists()) {
            return redirect()->route('dashboard.promos.index')
                ->with('warning', "Promo '{$promo->code}' tidak dapat dihapus karena sudah pernah digunakan. Nonaktifkan saja.");
        }

        $code = $promo->code;
        $promo->delete();

        return redirect()->route('dashboard.promos.index')
            ->with('success', "Kode promo '{$code}' berhasil dihapus.");
    }

    /**
     * Toggle status aktif/nonaktif promo
     */
    public function toggleActive(Promo $promo): RedirectResponse
    {
        $promo->is_active = !$promo->is_active;
        $promo->save();

        $status = $promo->is_active ? 'diaktifkan' : 'dinonaktifkan';
        return back()->with('success', "Promo '{$promo->code}' berhasil {$status}.");
    }

    /**
     * Show single promo (redirect ke edit)
     */
    public function show(Promo $promo): RedirectResponse
    {
        return redirect()->route('dashboard.promos.edit', $promo);
    }

    /**
     * Tampilkan riwayat siapa yang redeem promo spesifik (Fitur 3)
     */
    public function usages(Promo $promo): View
    {
        $usages = $promo->usages()
            ->with(['order.template'])
            ->orderByDesc('id')
            ->paginate(20);

        $totalDiscount = $promo->usages()->sum('discount_amount');
        $totalCommission = $promo->usages()->sum('partner_commission_earned');

        return view('admin.promos.usages', compact('promo', 'usages', 'totalDiscount', 'totalCommission'));
    }

    /**
     * Tampilkan seluruh riwayat redeem kode promo di sistem (Fitur 3 Global)
     */
    public function allUsages(Request $request): View
    {
        $query = PromoUsage::with(['promo', 'order.template']);

        if ($request->filled('promo_id')) {
            $query->where('promo_id', $request->promo_id);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('email', 'like', "%{$search}%")
                  ->orWhereHas('order', function ($oq) use ($search) {
                      $oq->where('order_number', 'like', "%{$search}%");
                  })
                  ->orWhereHas('promo', function ($pq) use ($search) {
                      $pq->where('code', 'like', "%{$search}%");
                  });
            });
        }

        $usages = $query->orderByDesc('id')->paginate(20)->withQueryString();
        $promos = Promo::orderBy('code')->get();

        $stats = [
            'total_redeem'     => PromoUsage::count(),
            'total_discount'   => PromoUsage::sum('discount_amount'),
            'total_commission' => PromoUsage::sum('partner_commission_earned'),
            'unique_users'     => PromoUsage::distinct('email')->count('email'),
        ];

        return view('admin.promos.all_usages', compact('usages', 'promos', 'stats'));
    }

    /**
     * Tampilkan laporan rekapitulasi afiliasi dan komisi mitra (Fitur 6)
     */
    public function partners(Request $request): View
    {
        $partnerPromos = Promo::where('is_partner', true)
            ->withCount('usages')
            ->withSum('usages', 'partner_commission_earned')
            ->withSum('usages', 'discount_amount')
            ->orderByDesc('usages_count')
            ->get();

        $partnersGrouped = $partnerPromos->groupBy(function ($promo) {
            return $promo->partner_name ?: 'Mitra Tanpa Nama';
        })->map(function ($promos, $name) {
            return [
                'partner_name'       => $name,
                'partner_code'       => $promos->pluck('partner_code')->filter()->unique()->implode(', '),
                'promos_count'       => $promos->count(),
                'promos'             => $promos,
                'total_redeem'       => $promos->sum('usages_count'),
                'total_commission'   => $promos->sum('usages_sum_partner_commission_earned') ?? 0,
                'total_discount'     => $promos->sum('usages_sum_discount_amount') ?? 0,
            ];
        });

        $stats = [
            'total_partners'   => $partnersGrouped->count(),
            'total_promos'     => $partnerPromos->count(),
            'total_redeem'     => $partnerPromos->sum('usages_count'),
            'total_commission' => $partnerPromos->sum('usages_sum_partner_commission_earned') ?? 0,
        ];

        return view('admin.promos.partners', compact('partnersGrouped', 'stats'));
    }
}
