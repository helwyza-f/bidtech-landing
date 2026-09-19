@extends('layouts.admin')

@section('title', 'Manajemen Kode Promo - Dashboard Admin Bidtech')

@section('content')
<div class="max-w-7xl mx-auto space-y-8">

    <!-- Top Bar -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
            <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Manajemen Kode Promo</h1>
            <p class="text-sm text-slate-500 mt-1">Kelola semua kode voucher, diskon mitra, fixed price, dan promo kemitraan dalam satu panel.</p>
        </div>
        <div class="flex items-center gap-2.5">
            <a href="{{ route('dashboard.promos.partners') }}"
               class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm shadow-xs transition">
                <i data-lucide="users" class="w-4 h-4 text-blue-600"></i>
                <span>Mitra & Komisi</span>
            </a>
            <a href="{{ route('dashboard.promos.all-usages') }}"
               class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm shadow-xs transition">
                <i data-lucide="history" class="w-4 h-4 text-violet-600"></i>
                <span>Riwayat Redeem</span>
            </a>
            <a href="{{ route('dashboard.promos.create') }}"
               class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold text-sm shadow-sm transition-all hover:shadow-md hover:scale-[1.01] active:scale-[0.99]">
                <i data-lucide="plus" class="w-4 h-4"></i>
                <span>Buat Promo</span>
            </a>
        </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <div class="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
            <div class="w-12 h-12 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center shrink-0">
                <i data-lucide="ticket-percent" class="w-6 h-6"></i>
            </div>
            <div>
                <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Promo</p>
                <p class="text-2xl font-bold text-slate-900 mt-0.5">{{ $stats['total'] }}</p>
            </div>
        </div>
        <div class="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
            <div class="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <i data-lucide="check-circle" class="w-6 h-6"></i>
            </div>
            <div>
                <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Aktif</p>
                <p class="text-2xl font-bold text-slate-900 mt-0.5">{{ $stats['active'] }}</p>
            </div>
        </div>
        <div class="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
            <div class="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <i data-lucide="users" class="w-6 h-6"></i>
            </div>
            <div>
                <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Mitra</p>
                <p class="text-2xl font-bold text-slate-900 mt-0.5">{{ $stats['partner'] }}</p>
            </div>
        </div>
        <div class="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
            <div class="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                <i data-lucide="clock" class="w-6 h-6"></i>
            </div>
            <div>
                <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Expired</p>
                <p class="text-2xl font-bold text-slate-900 mt-0.5">{{ $stats['expired'] }}</p>
            </div>
        </div>
    </div>

    <!-- Filter & Search -->
    <div class="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <form method="GET" action="{{ route('dashboard.promos.index') }}" class="flex flex-wrap gap-3">
            <div class="relative flex-1 min-w-[200px]">
                <i data-lucide="search" class="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2"></i>
                <input type="text" name="search" value="{{ request('search') }}"
                       placeholder="Cari kode, nama, atau mitra..."
                       class="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 bg-slate-50/50">
            </div>
            <select name="type" onchange="this.form.submit()"
                    class="px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 bg-slate-50/50 text-slate-700">
                <option value="all">Semua Tipe</option>
                <option value="fixed" {{ request('type') === 'fixed' ? 'selected' : '' }}>Nominal Tetap</option>
                <option value="percentage" {{ request('type') === 'percentage' ? 'selected' : '' }}>Persentase</option>
                <option value="override_price" {{ request('type') === 'override_price' ? 'selected' : '' }}>Harga Pasti (Fixed Price)</option>
                <option value="free" {{ request('type') === 'free' ? 'selected' : '' }}>Gratis Total</option>
                <option value="free_component" {{ request('type') === 'free_component' ? 'selected' : '' }}>Gratis Komponen</option>
                <option value="bundle_price" {{ request('type') === 'bundle_price' ? 'selected' : '' }}>Bundle Flat</option>
            </select>
            <select name="is_partner" onchange="this.form.submit()"
                    class="px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 bg-slate-50/50 text-slate-700">
                <option value="all">Semua Kategori</option>
                <option value="0" {{ request('is_partner') === '0' ? 'selected' : '' }}>Promo Umum</option>
                <option value="1" {{ request('is_partner') === '1' ? 'selected' : '' }}>Promo Mitra</option>
            </select>
            <select name="is_active" onchange="this.form.submit()"
                    class="px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 bg-slate-50/50 text-slate-700">
                <option value="all">Semua Status</option>
                <option value="1" {{ request('is_active') === '1' ? 'selected' : '' }}>Aktif</option>
                <option value="0" {{ request('is_active') === '0' ? 'selected' : '' }}>Nonaktif</option>
            </select>
            <button type="submit" class="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-sm font-semibold transition">Filter</button>
            @if(request('search') || request('type') || request('is_partner') || request('is_active'))
                <a href="{{ route('dashboard.promos.index') }}" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-sm font-medium transition text-center">Reset</a>
            @endif
        </form>
    </div>

    <!-- Tabel -->
    <div class="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div class="overflow-x-auto">
            <table class="w-full text-left text-sm text-slate-600">
                <thead class="bg-slate-50 text-slate-700 text-xs uppercase font-bold tracking-wider border-b border-slate-200/80">
                    <tr>
                        <th class="py-3.5 px-4 w-12 text-center">ID</th>
                        <th class="py-3.5 px-4">Kode & Nama</th>
                        <th class="py-3.5 px-4">Tipe Promo</th>
                        <th class="py-3.5 px-4">Nilai Diskon / Harga</th>
                        <th class="py-3.5 px-4 text-center">Digunakan</th>
                        <th class="py-3.5 px-4">Masa Berlaku</th>
                        <th class="py-3.5 px-4 text-center">Status</th>
                        <th class="py-3.5 px-4 text-right">Aksi</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                    @forelse($promos as $promo)
                        <tr class="hover:bg-slate-50/70 transition">
                            <td class="py-4 px-4 text-center font-mono font-bold text-xs text-slate-400">#{{ $promo->id }}</td>
                            <td class="py-4 px-4">
                                <p class="font-bold text-slate-900 font-mono text-sm tracking-wide">{{ $promo->code }}</p>
                                <p class="text-xs text-slate-500 mt-0.5">{{ $promo->name }}</p>
                                @if($promo->is_partner)
                                    <span class="inline-flex items-center gap-1 mt-1 px-1.5 py-0.5 rounded bg-blue-50 text-[10px] text-blue-700 font-semibold">
                                        Mitra: {{ $promo->partner_name }}
                                    </span>
                                @endif
                            </td>
                            <td class="py-4 px-4">
                                @php
                                    $badgeConfig = match($promo->type) {
                                        'percentage'     => ['label' => 'Persentase', 'class' => 'bg-purple-50 text-purple-700 border-purple-200/50'],
                                        'override_price' => ['label' => 'Harga Pasti', 'class' => 'bg-blue-50 text-blue-700 border-blue-200/50'],
                                        'free'           => ['label' => 'Gratis Total', 'class' => 'bg-emerald-50 text-emerald-700 border-emerald-200/50'],
                                        'free_component' => ['label' => 'Gratis Komponen', 'class' => 'bg-teal-50 text-teal-700 border-teal-200/50'],
                                        'bundle_price'   => ['label' => 'Bundle Flat', 'class' => 'bg-indigo-50 text-indigo-700 border-indigo-200/50'],
                                        default          => ['label' => 'Nominal Tetap', 'class' => 'bg-amber-50 text-amber-700 border-amber-200/50'],
                                    };
                                @endphp
                                <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border {{ $badgeConfig['class'] }}">
                                    {{ $badgeConfig['label'] }}
                                </span>
                                <p class="text-[11px] text-slate-400 mt-0.5 capitalize">Scope: {{ $promo->target_scope }}</p>
                            </td>
                            <td class="py-4 px-4">
                                <p class="font-bold text-slate-900 text-sm">
                                    @if($promo->type === 'percentage')
                                        {{ $promo->reward_amount }}%
                                        @if($promo->max_discount)
                                            <span class="text-xs text-slate-500 font-normal">(Maks Rp{{ number_format($promo->max_discount, 0, ',', '.') }})</span>
                                        @endif
                                    @elseif($promo->type === 'override_price')
                                        Dipatok: Rp{{ number_format($promo->reward_amount, 0, ',', '.') }}
                                    @elseif($promo->type === 'bundle_price')
                                        Bundle: Rp{{ number_format($promo->reward_amount, 0, ',', '.') }}
                                    @elseif($promo->type === 'free' || $promo->type === 'free_component')
                                        <span class="text-emerald-600 font-bold">Rp0 (Gratis)</span>
                                    @else
                                        Rp{{ number_format($promo->reward_amount, 0, ',', '.') }}
                                    @endif
                                </p>
                                @if($promo->min_applicable_price)
                                    <p class="text-[11px] text-violet-600 font-medium">Syarat min. Rp{{ number_format($promo->min_applicable_price, 0, ',', '.') }}</p>
                                @elseif($promo->min_order_amount)
                                    <p class="text-[11px] text-slate-400">Min. order Rp{{ number_format($promo->min_order_amount, 0, ',', '.') }}</p>
                                @endif
                            </td>
                            <td class="py-4 px-4 text-center">
                                <a href="{{ route('dashboard.promos.usages', $promo) }}" 
                                   title="Klik untuk melihat transaksi yang me-redeem kode ini"
                                   class="inline-flex items-center gap-1 font-semibold text-violet-600 hover:text-violet-800 hover:underline">
                                    <span>{{ $promo->used_count }}</span>
                                    @if($promo->usage_limit)
                                        <span class="text-slate-400 font-normal"> / {{ $promo->usage_limit }}</span>
                                    @else
                                        <span class="text-slate-400 font-normal"> / ∞</span>
                                    @endif
                                    <i data-lucide="external-link" class="w-3 h-3 ml-0.5"></i>
                                </a>
                            </td>
                            <td class="py-4 px-4 text-xs text-slate-500">
                                @if($promo->valid_from || $promo->valid_until)
                                    @if($promo->valid_from)<p>Dari: {{ $promo->valid_from->format('d/m/Y') }}</p>@endif
                                    @if($promo->valid_until)
                                        <p class="{{ $promo->isExpired() ? 'text-rose-500 font-semibold' : '' }}">S/d: {{ $promo->valid_until->format('d/m/Y') }}</p>
                                    @endif
                                @else
                                    <span class="text-emerald-600 font-medium">Tidak terbatas</span>
                                @endif
                            </td>
                            <td class="py-4 px-4 text-center">
                                <form action="{{ route('dashboard.promos.toggle-active', $promo) }}" method="POST" class="inline">
                                    @csrf
                                    <button type="submit"
                                            class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold cursor-pointer transition {{ $promo->is_active ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200' : 'bg-slate-100 text-slate-600 hover:bg-slate-200' }}">
                                        <span class="w-1.5 h-1.5 rounded-full {{ $promo->is_active ? 'bg-emerald-600' : 'bg-slate-400' }}"></span>
                                        {{ $promo->is_active ? 'Aktif' : 'Nonaktif' }}
                                    </button>
                                </form>
                            </td>
                            <td class="py-4 px-4 text-right">
                                <div class="flex items-center justify-end gap-1.5">
                                    <a href="{{ route('dashboard.promos.usages', $promo) }}"
                                       title="Lihat Riwayat Redeem"
                                       class="p-2 text-violet-600 hover:text-violet-800 hover:bg-violet-50 rounded-lg transition">
                                        <i data-lucide="history" class="w-4 h-4"></i>
                                    </a>
                                    <a href="{{ route('dashboard.promos.edit', $promo) }}"
                                       title="Edit Promo"
                                       class="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition">
                                        <i data-lucide="edit-3" class="w-4 h-4"></i>
                                    </a>
                                    <form action="{{ route('dashboard.promos.destroy', $promo) }}" method="POST"
                                          onsubmit="return confirm('Hapus kode {{ $promo->code }}? Tidak dapat diurungkan.')" class="inline">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" class="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition">
                                            <i data-lucide="trash-2" class="w-4 h-4"></i>
                                        </button>
                                    </form>
                                </div>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="8" class="py-12 text-center text-slate-400">
                                <i data-lucide="ticket-percent" class="w-8 h-8 mx-auto mb-2 text-slate-300"></i>
                                <p class="text-sm font-medium">Belum ada kode promo.</p>
                                <a href="{{ route('dashboard.promos.create') }}" class="mt-3 inline-flex items-center gap-1.5 text-violet-600 hover:text-violet-800 text-sm font-semibold">
                                    <i data-lucide="plus" class="w-4 h-4"></i> Buat Kode Promo
                                </a>
                            </td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
        @if($promos->hasPages())
            <div class="p-4 border-t border-slate-100">{{ $promos->links() }}</div>
        @endif
    </div>
</div>
@endsection
