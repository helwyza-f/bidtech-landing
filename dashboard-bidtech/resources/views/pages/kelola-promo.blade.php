@extends('layouts.dashboard')

@section('title', $mode === 'create' ? 'Tambah Promo - Admin CMS Bidtech' : ($mode === 'edit' ? 'Edit Promo - Admin CMS Bidtech' : 'Kelola Promo - Admin CMS Bidtech'))

@section('content')
@if($mode === 'create' || $mode === 'edit')
@php
    $promo = $promo ?? null;
    $components = [
        'subtotal' => 'Subtotal (Seluruh Paket + Domain)',
        'template' => 'Biaya Template',
        'server' => 'Biaya Server',
        'service' => 'Biaya Layanan',
        'domain' => 'Biaya Domain',
    ];
@endphp
<div class="max-w-4xl mx-auto space-y-8">

    <!-- Header -->
    <div class="flex items-center gap-4">
        <a href="{{ route('dashboard.promos.index') }}" class="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition">
            <i data-lucide="arrow-left" class="w-5 h-5"></i>
        </a>
        <div>
            <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">{{ $mode === 'create' ? 'Buat Kode Promo' : 'Edit Kode Promo' }}</h1>
            <p class="text-sm text-slate-500 mt-1">
                @if($mode === 'create')
                    Isi formulir di bawah untuk membuat kode voucher atau diskon baru.
                @else
                    Mengubah data promo <span class="font-mono font-bold text-violet-700">{{ $promo->code }}</span>
                @endif
            </p>
        </div>
    </div>

    <form action="{{ $mode === 'create' ? route('dashboard.promos.store') : route('dashboard.promos.update', $promo) }}" method="POST" class="space-y-6">
        @csrf
        @if($mode === 'edit') @method('PUT') @endif

        {{-- Informasi Dasar --}}
        <div class="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-5">
            <h2 class="text-base font-bold text-slate-800 flex items-center gap-2">
                <i data-lucide="info" class="w-4 h-4 text-violet-500"></i>
                Informasi Dasar
            </h2>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">Kode Promo <span class="text-rose-500">*</span></label>
                    <input type="text" name="code" value="{{ old('code', $promo->code ?? '') }}" placeholder="Contoh: HEMAT50"
                           class="w-full px-4 py-2.5 text-sm rounded-xl border @error('code') border-rose-400 bg-rose-50 @else border-slate-200 bg-slate-50/50 @enderror focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 font-mono uppercase"
                           style="text-transform:uppercase">
                    @error('code')<p class="text-rose-500 text-xs mt-1">{{ $message }}</p>@enderror
                </div>
                <div>
                    <label class="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">Nama Promo <span class="text-rose-500">*</span></label>
                    <input type="text" name="name" value="{{ old('name', $promo->name ?? '') }}" placeholder="Contoh: Promo Hemat Spesial"
                           class="w-full px-4 py-2.5 text-sm rounded-xl border @error('name') border-rose-400 bg-rose-50 @else border-slate-200 bg-slate-50/50 @enderror focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500">
                    @error('name')<p class="text-rose-500 text-xs mt-1">{{ $message }}</p>@enderror
                </div>
            </div>

            <div class="flex items-center gap-3 p-3 rounded-xl bg-emerald-50 border border-emerald-100">
                <input type="hidden" name="is_active" value="0">
                <input type="checkbox" id="is_active" name="is_active" value="1" {{ old('is_active', $promo->is_active ?? true) ? 'checked' : '' }}
                       class="w-4 h-4 rounded text-emerald-600 border-slate-300 focus:ring-emerald-500">
                <label for="is_active" class="text-sm font-semibold text-emerald-800 cursor-pointer">{{ $mode === 'create' ? 'Aktifkan promo ini segera setelah dibuat' : 'Promo ini aktif' }}</label>
            </div>

            @if($mode === 'edit')
                <div class="text-xs text-slate-400 bg-slate-50 rounded-xl p-3">
                    <strong>Statistik:</strong> Sudah digunakan <strong>{{ $promo->orders()->count() }}x</strong>
                    @if($promo->usage_limit) dari batas <strong>{{ $promo->usage_limit }}x</strong>@endif
                </div>
            @endif
        </div>

        {{-- Konfigurasi Diskon per Komponen --}}
        <div class="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <h2 class="text-base font-bold text-slate-800 flex items-center gap-2">
                <i data-lucide="percent" class="w-4 h-4 text-amber-500"></i>
                Konfigurasi Diskon per Komponen Harga
            </h2>
            <p class="text-xs text-slate-500">Atur diskon secara independen untuk tiap komponen harga. Komponen yang dibiarkan "Tidak ada diskon" tidak terpengaruh kode promo ini.</p>

            @foreach($components as $key => $label)
                @php
                    $discountType = old("{$key}_discount_type", $promo?->{"{$key}_discount_type"}?->value ?? '');
                    $discountAmount = old("{$key}_discount_amount", $promo?->{"{$key}_discount_amount"});
                    $discountMax = old("{$key}_discount_max", $promo?->{"{$key}_discount_max"});
                @endphp
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-xl border border-slate-100 bg-slate-50/60">
                    <div>
                        <label class="block text-xs font-semibold text-slate-600 mb-1.5">{{ $label }}</label>
                        <select name="{{ $key }}_discount_type" data-component="{{ $key }}"
                                class="discount-type-select w-full px-3 py-2 text-sm rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500">
                            <option value="" {{ $discountType === '' ? 'selected' : '' }}>Tidak ada diskon</option>
                            <option value="PERCENTAGE" {{ $discountType === 'PERCENTAGE' ? 'selected' : '' }}>Persentase (%)</option>
                            <option value="FIXED" {{ $discountType === 'FIXED' ? 'selected' : '' }}>Harga Tetap (Rp)</option>
                            <option value="NOMINAL" {{ $discountType === 'NOMINAL' ? 'selected' : '' }}>Potongan Nominal (Rp)</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-xs font-semibold text-slate-600 mb-1.5">Nilai</label>
                        <input type="text" inputmode="numeric" name="{{ $key }}_discount_amount" value="{{ $discountAmount }}" placeholder="0"
                               class="coupon-amount-input w-full px-3 py-2 text-sm rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500">
                    </div>
                    <div class="coupon-max-wrapper" data-component-max="{{ $key }}" style="{{ $discountType === 'PERCENTAGE' ? '' : 'display:none' }}">
                        <label class="block text-xs font-semibold text-slate-600 mb-1.5">Maks. Diskon (Rp)</label>
                        <input type="text" inputmode="numeric" name="{{ $key }}_discount_max" value="{{ $discountMax }}" placeholder="Opsional"
                               class="coupon-amount-input w-full px-3 py-2 text-sm rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500">
                    </div>
                </div>
            @endforeach

            <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">Min. Subtotal Belanja (Rp)</label>
                <input type="text" inputmode="numeric" name="min_order_amount" id="min_order_amount"
                       value="{{ old('min_order_amount', $promo->min_order_amount ?? '') }}"
                       placeholder="Opsional (contoh: 1.000.000)"
                       class="coupon-amount-input w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500">
                <p class="text-[11px] text-slate-400 mt-1">Syarat total keranjang belanja sebelum diskon</p>
            </div>
        </div>

        {{-- Batas & Masa Berlaku --}}
        <div class="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-5">
            <h2 class="text-base font-bold text-slate-800 flex items-center gap-2">
                <i data-lucide="calendar" class="w-4 h-4 text-blue-500"></i>
                Batas & Masa Berlaku
            </h2>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">Berlaku Dari</label>
                    <input type="datetime-local" name="valid_from" value="{{ old('valid_from', $promo?->valid_from?->format('Y-m-d\TH:i')) }}"
                           class="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500">
                </div>
                <div>
                    <label class="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">Berlaku Sampai</label>
                    <input type="datetime-local" name="valid_until" value="{{ old('valid_until', $promo?->valid_until?->format('Y-m-d\TH:i')) }}"
                           class="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500">
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">Batas Total Penggunaan</label>
                    <input type="number" name="usage_limit" value="{{ old('usage_limit', $promo->usage_limit ?? '') }}" min="1" placeholder="Kosong = tidak terbatas"
                           class="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500">
                </div>
                <div>
                    <label class="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">Batas Per Email</label>
                    <input type="number" name="user_usage_limit" value="{{ old('user_usage_limit', $promo->user_usage_limit ?? '') }}" min="1" placeholder="Kosong = tidak terbatas"
                           class="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500">
                </div>
            </div>
        </div>

        {{-- Mitra --}}
        <div class="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <h2 class="text-base font-bold text-slate-800 flex items-center gap-2">
                <i data-lucide="users" class="w-4 h-4 text-blue-500"></i>
                Mitra (Opsional)
            </h2>
            <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">Pemilik Kupon</label>
                <select name="partner_id" class="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 text-slate-700">
                    <option value="">Kupon umum (tanpa mitra)</option>
                    @foreach($partners as $partner)
                        <option value="{{ $partner->id }}" {{ (string) old('partner_id', $promo->partner_id ?? '') === (string) $partner->id ? 'selected' : '' }}>
                            {{ $partner->user->name }} ({{ $partner->user->email }}) &bull; komisi {{ $partner->type_commission->value }} {{ $partner->amount_commission }}
                        </option>
                    @endforeach
                </select>
                <p class="text-[11px] text-slate-400 mt-1">Mitra dikelola sebagai akun dengan role MITRA. Pilih mitra untuk menandai kupon ini sebagai kupon kemitraan.</p>
            </div>
        </div>

        <!-- Actions -->
        <div class="flex items-center justify-end gap-3 pb-4">
            <a href="{{ route('dashboard.promos.index') }}" class="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition">Batal</a>
            <button type="submit" class="px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold text-sm shadow-sm transition hover:shadow-md">
                <i data-lucide="save" class="w-4 h-4 inline mr-1.5"></i>
                {{ $mode === 'create' ? 'Simpan Kode Promo' : 'Simpan Perubahan' }}
            </button>
        </div>
    </form>
</div>

<script>
function formatRupiahInput(input) {
    const cursorPos = input.selectionStart;
    const oldLength = input.value.length;
    const rawVal = input.value.replace(/[^0-9]/g, '');
    if (!rawVal) { input.value = ''; return; }
    const formatted = new Intl.NumberFormat('id-ID').format(rawVal);
    input.value = formatted;
    const newLength = formatted.length;
    const newCursor = cursorPos + (newLength - oldLength);
    input.setSelectionRange(newCursor, newCursor);
}

document.querySelectorAll('.discount-type-select').forEach(function (select) {
    select.addEventListener('change', function () {
        const key = this.dataset.component;
        const maxWrapper = document.querySelector('.coupon-max-wrapper[data-component-max="' + key + '"]');
        if (maxWrapper) maxWrapper.style.display = this.value === 'PERCENTAGE' ? '' : 'none';
    });
});

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.coupon-amount-input').forEach(function (input) {
        if (input.value) formatRupiahInput(input);
        input.addEventListener('input', function () { formatRupiahInput(this); });
    });

    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function () {
            document.querySelectorAll('.coupon-amount-input').forEach(function (input) {
                input.value = input.value.replace(/[^0-9]/g, '');
            });
        });
    }
});
</script>
@else
<div class="max-w-7xl mx-auto space-y-8">

    <!-- Top Bar -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
            <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Manajemen Kode Promo</h1>
            <p class="text-sm text-slate-500 mt-1">Kelola semua kode voucher, diskon per komponen, dan promo kemitraan dalam satu panel.</p>
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
                       placeholder="Cari kode, nama, atau nama mitra..."
                       class="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 bg-slate-50/50">
            </div>
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
            @if(request('search') || request('is_partner') || request('is_active'))
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
                        <th class="py-3.5 px-4">Diskon Aktif</th>
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
                                @if($promo->partner_id)
                                    <span class="inline-flex items-center gap-1 mt-1 px-1.5 py-0.5 rounded bg-blue-50 text-[10px] text-blue-700 font-semibold">
                                        Mitra: {{ $promo->partner?->user?->name }}
                                    </span>
                                @endif
                            </td>
                            <td class="py-4 px-4">
                                <div class="flex flex-wrap gap-1">
                                    @foreach(['subtotal' => 'Subtotal', 'template' => 'Template', 'server' => 'Server', 'service' => 'Layanan', 'domain' => 'Domain'] as $key => $label)
                                        @php $componentType = $promo->{"{$key}_discount_type"}; @endphp
                                        @if($componentType)
                                            <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200/50">
                                                {{ $label }}:
                                                @if($componentType->value === 'PERCENTAGE')
                                                    -{{ $promo->{"{$key}_discount_amount"} }}%
                                                @elseif($componentType->value === 'FIXED')
                                                    jadi Rp{{ number_format($promo->{"{$key}_discount_amount"}, 0, ',', '.') }}
                                                @else
                                                    -Rp{{ number_format($promo->{"{$key}_discount_amount"}, 0, ',', '.') }}
                                                @endif
                                            </span>
                                        @endif
                                    @endforeach
                                </div>
                                @if($promo->min_order_amount)
                                    <p class="text-[11px] text-slate-400 mt-1">Min. order Rp{{ number_format($promo->min_order_amount, 0, ',', '.') }}</p>
                                @endif
                            </td>
                            <td class="py-4 px-4 text-center">
                                <a href="{{ route('dashboard.promos.usages', $promo) }}"
                                   title="Klik untuk melihat transaksi yang me-redeem kode ini"
                                   class="inline-flex items-center gap-1 font-semibold text-violet-600 hover:text-violet-800 hover:underline">
                                    <span>{{ $promo->orders_count }}</span>
                                    @if($promo->usage_limit)
                                        <span class="text-slate-400 font-normal"> / {{ $promo->usage_limit }}</span>
                                    @else
                                        <span class="text-slate-400 font-normal"> / &infin;</span>
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
                            <td colspan="7" class="py-12 text-center text-slate-400">
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
@endif
@endsection
