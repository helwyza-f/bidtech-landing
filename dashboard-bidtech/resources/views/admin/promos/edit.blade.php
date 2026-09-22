@extends('layouts.admin')

@section('title', 'Edit Kode Promo - Dashboard Admin Bidtech')

@section('content')
<div class="max-w-4xl mx-auto space-y-8">

    <!-- Header -->
    <div class="flex items-center gap-4">
        <a href="{{ route('dashboard.promos.index') }}" class="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition">
            <i data-lucide="arrow-left" class="w-5 h-5"></i>
        </a>
        <div>
            <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Edit Kode Promo</h1>
            <p class="text-sm text-slate-500 mt-1">Mengubah data promo <span class="font-mono font-bold text-violet-700">{{ $promo->code }}</span></p>
        </div>
    </div>

    <form action="{{ route('dashboard.promos.update', $promo) }}" method="POST" class="space-y-6">
        @csrf
        @method('PUT')

        {{-- Informasi Dasar --}}
        <div class="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-5">
            <h2 class="text-base font-bold text-slate-800 flex items-center gap-2">
                <i data-lucide="info" class="w-4 h-4 text-violet-500"></i>
                Informasi Dasar
            </h2>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">Kode Promo <span class="text-rose-500">*</span></label>
                    <input type="text" name="code" value="{{ old('code', $promo->code) }}" placeholder="Contoh: HEMAT50"
                           class="w-full px-4 py-2.5 text-sm rounded-xl border @error('code') border-rose-400 bg-rose-50 @else border-slate-200 bg-slate-50/50 @enderror focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 font-mono uppercase"
                           style="text-transform:uppercase">
                    @error('code')<p class="text-rose-500 text-xs mt-1">{{ $message }}</p>@enderror
                </div>
                <div>
                    <label class="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">Nama Promo <span class="text-rose-500">*</span></label>
                    <input type="text" name="name" value="{{ old('name', $promo->name) }}" placeholder="Contoh: Promo Hemat Spesial"
                           class="w-full px-4 py-2.5 text-sm rounded-xl border @error('name') border-rose-400 bg-rose-50 @else border-slate-200 bg-slate-50/50 @enderror focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500">
                    @error('name')<p class="text-rose-500 text-xs mt-1">{{ $message }}</p>@enderror
                </div>
            </div>

            <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">Deskripsi</label>
                <textarea name="description" rows="2" placeholder="Deskripsi singkat promo ini..."
                          class="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 resize-none">{{ old('description', $promo->description) }}</textarea>
            </div>

            <div class="flex items-center gap-3 p-3 rounded-xl bg-emerald-50 border border-emerald-100">
                <input type="hidden" name="is_active" value="0">
                <input type="checkbox" id="is_active" name="is_active" value="1" {{ old('is_active', $promo->is_active) ? 'checked' : '' }}
                       class="w-4 h-4 rounded text-emerald-600 border-slate-300 focus:ring-emerald-500">
                <label for="is_active" class="text-sm font-semibold text-emerald-800 cursor-pointer">Promo ini aktif</label>
            </div>

            <div class="text-xs text-slate-400 bg-slate-50 rounded-xl p-3">
                <strong>Statistik:</strong> Sudah digunakan <strong>{{ $promo->used_count }}x</strong>
                @if($promo->usage_limit) dari batas <strong>{{ $promo->usage_limit }}x</strong>@endif
            </div>
        </div>

        {{-- Konfigurasi Diskon & Model Harga --}}
        <div class="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-5">
            <h2 class="text-base font-bold text-slate-800 flex items-center gap-2">
                <i data-lucide="percent" class="w-4 h-4 text-amber-500"></i>
                Konfigurasi Diskon & Model Harga
            </h2>

            <!-- Info Dinamis Tipe Promo -->
            <div id="promo-type-info" class="p-3.5 rounded-xl bg-violet-50 border border-violet-100 text-xs text-violet-800 flex items-start gap-2.5 transition">
                <i data-lucide="sparkles" class="w-4 h-4 text-violet-600 shrink-0 mt-0.5"></i>
                <div id="promo-type-desc">
                    <strong>Tipe Promo:</strong> Sesuaikan tipe promo dan cakupan di bawah sesuai skenario promosi Anda.
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                    <label class="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">Tipe Promo <span class="text-rose-500">*</span></label>
                    <select name="type" id="promo_type" onchange="updatePromoFormHelper()"
                            class="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 text-slate-700 font-medium">
                        <option value="fixed" {{ old('type', $promo->type) === 'fixed' ? 'selected' : '' }}>Nominal Tetap (Potongan Rp)</option>
                        <option value="percentage" {{ old('type', $promo->type) === 'percentage' ? 'selected' : '' }}>Persentase (Potongan %)</option>
                        <option value="override_price" {{ old('type', $promo->type) === 'override_price' ? 'selected' : '' }}>Harga Pasti / Fixed Price (Patokan Harga)</option>
                        <option value="free" {{ old('type', $promo->type) === 'free' ? 'selected' : '' }}>Gratis Total Paket (Rp0)</option>
                        <option value="free_component" {{ old('type', $promo->type) === 'free_component' ? 'selected' : '' }}>Gratis Komponen Tertentu (Rp0)</option>
                        <option value="bundle_price" {{ old('type', $promo->type) === 'bundle_price' ? 'selected' : '' }}>Harga Bundle Flat (Rp)</option>
                    </select>
                </div>
                <div>
                    <label id="label_reward_amount" class="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">
                        Nilai Diskon / Harga (Rp) <span class="text-rose-500">*</span>
                    </label>
                    <input type="text" inputmode="numeric" name="reward_amount" id="reward_amount" 
                           value="{{ old('reward_amount', $promo->type === 'percentage' ? $promo->reward_amount : number_format((int)$promo->reward_amount, 0, ',', '.')) }}" 
                           placeholder="Contoh: 1.000"
                           class="rupiah-input w-full px-4 py-2.5 text-sm rounded-xl border @error('reward_amount') border-rose-400 bg-rose-50 @else border-slate-200 bg-slate-50/50 @enderror focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 font-semibold">
                    <p id="reward_amount_hint" class="text-xs text-slate-500 mt-1"></p>
                    @error('reward_amount')<p class="text-rose-500 text-xs mt-1">{{ $message }}</p>@enderror
                </div>
                <div id="max_discount_container">
                    <label class="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">Maks. Diskon (Rp)</label>
                    <input type="text" inputmode="numeric" name="max_discount" id="max_discount" 
                           value="{{ old('max_discount', $promo->max_discount ? number_format((int)$promo->max_discount, 0, ',', '.') : '') }}" 
                           placeholder="Hanya untuk persen (contoh: 500.000)"
                           class="rupiah-input w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500">
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                    <label class="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">Ruang Lingkup (Scope) <span class="text-rose-500">*</span></label>
                    <select name="target_scope" id="target_scope" onchange="updatePromoFormHelper()"
                            class="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 text-slate-700">
                        <option value="all" {{ old('target_scope', $promo->target_scope) === 'all' ? 'selected' : '' }}>Semua Komponen Paket (General / Subtotal)</option>
                        <option value="service" {{ old('target_scope', $promo->target_scope) === 'service' ? 'selected' : '' }}>Hanya Layanan / Setup (Services)</option>
                        <option value="template" {{ old('target_scope', $promo->target_scope) === 'template' ? 'selected' : '' }}>Hanya Biaya Template</option>
                        <option value="server" {{ old('target_scope', $promo->target_scope) === 'server' ? 'selected' : '' }}>Hanya Biaya Server</option>
                    </select>
                </div>
                <div>
                    <label class="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">Min. Subtotal Belanja (Rp)</label>
                    <input type="text" inputmode="numeric" name="min_order_amount" id="min_order_amount" 
                           value="{{ old('min_order_amount', $promo->min_order_amount ? number_format((int)$promo->min_order_amount, 0, ',', '.') : '') }}" 
                           placeholder="Opsional (contoh: 1.000.000)"
                           class="rupiah-input w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500">
                    <p class="text-[11px] text-slate-400 mt-1">Syarat total keranjang belanja</p>
                </div>
                <div id="min_applicable_container">
                    <label class="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">Minimal Harga Berlaku (Rp)</label>
                    <input type="text" inputmode="numeric" name="min_applicable_price" id="min_applicable_price" 
                           value="{{ old('min_applicable_price', $promo->min_applicable_price ? number_format((int)$promo->min_applicable_price, 0, ',', '.') : '') }}" 
                           placeholder="Opsional (contoh: 500.000)"
                           class="rupiah-input w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500">
                    <p class="text-[11px] text-slate-400 mt-1" id="min_applicable_hint">Promo ditolak jika harga item target &lt; nilai ini. <strong class="text-amber-600 hidden" id="min_applicable_override_note">Tidak berlaku untuk tipe Harga Pasti / Gratis / Bundle.</strong></p>
                </div>
            </div>

            <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">Spesifik Template (Opsional)</label>
                <select name="target_template_id" class="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 text-slate-700">
                    <option value="">Berlaku untuk semua template</option>
                    @foreach($templates as $tpl)
                        <option value="{{ $tpl->id }}" {{ old('target_template_id', $promo->target_template_id) == $tpl->id ? 'selected' : '' }}>{{ $tpl->name }}</option>
                    @endforeach
                </select>
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
                    <input type="datetime-local" name="valid_from" value="{{ old('valid_from', $promo->valid_from?->format('Y-m-d\TH:i')) }}"
                           class="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500">
                </div>
                <div>
                    <label class="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">Berlaku Sampai</label>
                    <input type="datetime-local" name="valid_until" value="{{ old('valid_until', $promo->valid_until?->format('Y-m-d\TH:i')) }}"
                           class="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500">
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">Batas Total Penggunaan</label>
                    <input type="number" name="usage_limit" value="{{ old('usage_limit', $promo->usage_limit) }}" min="1" placeholder="Kosong = tidak terbatas"
                           class="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500">
                </div>
                <div>
                    <label class="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">Batas Per User</label>
                    <input type="number" name="usage_per_user" value="{{ old('usage_per_user', $promo->usage_per_user) }}" min="1" placeholder="Kosong = tidak terbatas"
                           class="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500">
                </div>
            </div>
        </div>

        {{-- Konfigurasi Mitra --}}
        <div class="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-5">
            <div class="flex items-center justify-between">
                <h2 class="text-base font-bold text-slate-800 flex items-center gap-2">
                    <i data-lucide="users" class="w-4 h-4 text-blue-500"></i>
                    Konfigurasi Mitra (Opsional)
                </h2>
                <div class="flex items-center gap-2">
                    <input type="hidden" name="is_partner" value="0">
                    <input type="checkbox" id="is_partner" name="is_partner" value="1" {{ old('is_partner', $promo->is_partner) ? 'checked' : '' }}
                           class="w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500"
                           onchange="document.getElementById('partner-fields').classList.toggle('hidden', !this.checked)">
                    <label for="is_partner" class="text-sm font-semibold text-slate-700 cursor-pointer">Ini adalah promo mitra</label>
                </div>
            </div>

            <div id="partner-fields" class="{{ old('is_partner', $promo->is_partner) ? '' : 'hidden' }} space-y-4">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">Nama Mitra</label>
                        <input type="text" name="partner_name" value="{{ old('partner_name', $promo->partner_name) }}" placeholder="Nama komunitas/instansi mitra"
                               class="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500">
                    </div>
                    <div>
                        <label class="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">Kode Referral Mitra</label>
                        <input type="text" name="partner_code" value="{{ old('partner_code', $promo->partner_code) }}" placeholder="Kode internal mitra"
                               class="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 font-mono">
                    </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">Tipe Komisi Mitra</label>
                        <select name="partner_commission_type" class="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 text-slate-700">
                            <option value="">Tanpa komisi</option>
                            <option value="fixed" {{ old('partner_commission_type', $promo->partner_commission_type) === 'fixed' ? 'selected' : '' }}>Nominal Tetap (Rp)</option>
                            <option value="percentage" {{ old('partner_commission_type', $promo->partner_commission_type) === 'percentage' ? 'selected' : '' }}>Persentase (%)</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">Nilai Komisi</label>
                        <input type="text" inputmode="numeric" name="partner_commission_value" id="partner_commission_value" 
                               value="{{ old('partner_commission_value', $promo->partner_commission_value ? number_format((int)$promo->partner_commission_value, 0, ',', '.') : '') }}" 
                               placeholder="0"
                               class="rupiah-input w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500">
                    </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">Whitelist Domain Email</label>
                        <input type="text" name="allowed_domains" value="{{ old('allowed_domains', $promo->allowed_domains) }}" placeholder="polibatam.ac.id, batam.go.id"
                               class="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500">
                        <p class="text-[11px] text-slate-400 mt-1">Pisahkan dengan koma</p>
                    </div>
                    <div>
                        <label class="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">Whitelist Email Spesifik</label>
                        <input type="text" name="allowed_emails" value="{{ old('allowed_emails', $promo->allowed_emails) }}" placeholder="john@gmail.com, jane@yahoo.com"
                               class="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500">
                        <p class="text-[11px] text-slate-400 mt-1">Pisahkan dengan koma</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Actions -->
        <div class="flex items-center justify-end gap-3 pb-4">
            <a href="{{ route('dashboard.promos.index') }}" class="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition">Batal</a>
            <button type="submit" class="px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold text-sm shadow-sm transition hover:shadow-md">
                <i data-lucide="save" class="w-4 h-4 inline mr-1.5"></i>
                Simpan Perubahan
            </button>
        </div>
    </form>
</div>

<script>
function formatRupiahInput(input) {
    const typeSelect = document.getElementById('promo_type');
    const isPercentage = (input.id === 'reward_amount' && typeSelect && typeSelect.value === 'percentage');

    if (isPercentage) {
        input.value = input.value.replace(/[^0-9]/g, '');
        if (parseInt(input.value) > 100) input.value = '100';
        updateRewardAmountHint();
        return;
    }

    const cursorPos = input.selectionStart;
    const oldLength = input.value.length;
    const rawVal = input.value.replace(/[^0-9]/g, '');

    if (!rawVal) {
        input.value = '';
        updateRewardAmountHint();
        return;
    }

    const formatted = new Intl.NumberFormat('id-ID').format(rawVal);
    input.value = formatted;

    const newLength = formatted.length;
    const newCursor = cursorPos + (newLength - oldLength);
    input.setSelectionRange(newCursor, newCursor);

    updateRewardAmountHint();
}

function updateRewardAmountHint() {
    const rewardInput = document.getElementById('reward_amount');
    const rewardHint = document.getElementById('reward_amount_hint');
    const typeSelect = document.getElementById('promo_type');
    const scopeSelect = document.getElementById('target_scope');

    if (!rewardInput || !rewardHint || !typeSelect) return;

    const raw = rewardInput.value.replace(/[^0-9]/g, '');
    const num = parseInt(raw) || 0;
    const type = typeSelect.value;
    const scope = scopeSelect ? scopeSelect.value : 'all';

    if (num <= 0) {
        if (type === 'override_price') {
            rewardHint.innerHTML = '<span class="text-slate-400 text-xs">💡 Ketik angka (misal: <strong>1000</strong> akan otomatis menjadi <strong>1.000</strong>).</span>';
        } else if (type === 'percentage') {
            rewardHint.innerHTML = '<span class="text-slate-400 text-xs">💡 Masukkan persentase diskon (1-100%).</span>';
        } else {
            rewardHint.innerHTML = '';
        }
        return;
    }

    const fmtRp = 'Rp ' + new Intl.NumberFormat('id-ID').format(num);

    if (type === 'override_price') {
        if (scope === 'all') {
            rewardHint.innerHTML = `<span class="text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 inline-flex items-center gap-1.5 text-xs"><span>💡</span> Nominal: <strong>${fmtRp}</strong> &bull; Total tagihan pembeli (termasuk domain) akan tepat menjadi <strong>${fmtRp}</strong></span>`;
        } else {
            rewardHint.innerHTML = `<span class="text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 inline-flex items-center gap-1.5 text-xs"><span>💡</span> Nominal: <strong>${fmtRp}</strong> &bull; Biaya ${scope} dipatok menjadi <strong>${fmtRp}</strong></span>`;
        }
    } else if (type === 'percentage') {
        rewardHint.innerHTML = `<span class="text-violet-700 font-bold bg-violet-50 px-2.5 py-1 rounded-lg border border-violet-200 inline-flex items-center gap-1.5 text-xs"><span>💡</span> Potongan: <strong>${num}%</strong></span>`;
    } else if (type === 'bundle_price') {
        rewardHint.innerHTML = `<span class="text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 inline-flex items-center gap-1.5 text-xs"><span>💡</span> Nominal: <strong>${fmtRp}</strong> &bull; Total harga paket dipatok ${fmtRp}</span>`;
    } else if (type === 'fixed') {
        rewardHint.innerHTML = `<span class="text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 inline-flex items-center gap-1.5 text-xs"><span>💡</span> Potongan: <strong>${fmtRp}</strong></span>`;
    }
}

function updatePromoFormHelper() {
    const typeSelect = document.getElementById('promo_type');
    const scopeSelect = document.getElementById('target_scope');
    const descBox = document.getElementById('promo-type-desc');
    const labelAmount = document.getElementById('label_reward_amount');
    const rewardInput = document.getElementById('reward_amount');
    const maxDiscountBox = document.getElementById('max_discount_container');
    const minApplicableContainer = document.getElementById('min_applicable_container');
    const minApplicableOverrideNote = document.getElementById('min_applicable_override_note');

    if (!typeSelect || !scopeSelect || !descBox) return;

    const type = typeSelect.value;
    const scope = scopeSelect.value;

    // Tampilkan/sembunyikan min_applicable_price berdasarkan tipe promo
    const noMinApplicable = ['override_price', 'free', 'bundle_price', 'free_component'];
    if (minApplicableContainer) {
        minApplicableContainer.style.opacity = noMinApplicable.includes(type) ? '0.45' : '1';
    }
    if (minApplicableOverrideNote) {
        minApplicableOverrideNote.classList.toggle('hidden', !noMinApplicable.includes(type));
    }

    let text = '';

    if (type === 'override_price') {
        if (scope === 'all') {
            text = '<strong>General Fixed Price (Harga Pasti Subtotal):</strong> Berapapun harga normal paket template + server + layanan + domain, total biaya tagihan akhir akan dipatok tepat menjadi nominal Rupiah yang Anda isi di bawah (misal: ketik 1000 jadi <strong>1.000</strong> agar total bayar tepat Rp 1.000). <strong>Berlaku ke semua template & domain juga ikut</strong>.';
            labelAmount.innerHTML = 'Patokan Total Tagihan Akhir (Rp) <span class="text-rose-500">*</span>';
            rewardInput.placeholder = 'Contoh: 1.000';
        } else if (scope === 'service') {
            text = '<strong>Services Fixed Price (Harga Pasti Layanan):</strong> Biaya layanan/setup akan dipatok tepat menjadi nominal Rupiah yang Anda tentukan di bawah (misal: ketik 50000 jadi <strong>50.000</strong> agar biaya layanan jadi Rp 50.000). Berlaku ke semua template. Domain tetap normal.';
            labelAmount.innerHTML = 'Patokan Biaya Layanan (Rp) <span class="text-rose-500">*</span>';
            rewardInput.placeholder = 'Contoh: 50.000';
        } else {
            text = `<strong>Fixed Price (Override Harga ${scope}):</strong> Biaya ${scope} akan dipatok tepat menjadi nominal Rupiah yang Anda tentukan di bawah. Berlaku ke semua template. Domain tetap normal.`;
            labelAmount.innerHTML = `Patokan Biaya ${scope} (Rp) <span class="text-rose-500">*</span>`;
            rewardInput.placeholder = 'Contoh: 100.000';
        }
        if (maxDiscountBox) maxDiscountBox.style.display = 'none';
        if (minApplicableContainer) minApplicableContainer.style.opacity = '0.45';
        rewardInput.disabled = false;
        formatRupiahInput(rewardInput);
    } else if (type === 'free') {
        text = '<strong>Gratis Total Seluruh Paket:</strong> Template, server, dan layanan menjadi Rp0 gratis. Biaya domain pihak ketiga tetap berbayar normal.';
        labelAmount.innerHTML = 'Nilai Diskon (Otomatis Rp0)';
        if (maxDiscountBox) maxDiscountBox.style.display = 'none';
        rewardInput.value = '0';
        rewardInput.disabled = true;
    } else if (type === 'free_component') {
        text = `<strong>Gratis Komponen:</strong> Khusus komponen <u>${scope}</u> akan digratiskan menjadi Rp0.`;
        labelAmount.innerHTML = 'Nilai Diskon (Otomatis Rp0)';
        if (maxDiscountBox) maxDiscountBox.style.display = 'none';
        rewardInput.value = '0';
        rewardInput.disabled = true;
    } else if (type === 'bundle_price') {
        text = '<strong>Harga Bundle Flat:</strong> Masukkan total harga satu paket lengkap yang diinginkan. Diskon akan dihitung dari selisih harga normal paket dikurangi nilai ini.';
        labelAmount.innerHTML = 'Total Harga Bundle (Rp) <span class="text-rose-500">*</span>';
        rewardInput.placeholder = 'Contoh: 1.500.000';
        if (maxDiscountBox) maxDiscountBox.style.display = 'none';
        rewardInput.disabled = false;
        formatRupiahInput(rewardInput);
    } else if (type === 'percentage') {
        text = `<strong>Diskon Persentase:</strong> Potongan sebesar sekian persen dari ${scope === 'all' ? 'seluruh paket' : 'biaya ' + scope}. Masukkan nilai persen (misal: 25).`;
        labelAmount.innerHTML = 'Persentase Diskon (%) <span class="text-rose-500">*</span>';
        rewardInput.placeholder = 'Contoh: 25';
        if (maxDiscountBox) maxDiscountBox.style.display = 'block';
        rewardInput.disabled = false;
        rewardInput.value = rewardInput.value.replace(/[^0-9]/g, '');
    } else { // fixed
        if (scope === 'all') {
            text = '<strong>General Discount (Potongan Nominal Subtotal):</strong> Potongan nominal tetap langsung dari subtotal paket. Promo akan otomatis DITOLAK oleh sistem jika nilai diskon melebihi harga paket.';
        } else if (scope === 'service') {
            text = '<strong>Service Discount (Potongan Nominal Layanan):</strong> Potongan nominal langsung dari biaya layanan. Promo akan otomatis DITOLAK jika diskon melebihi biaya layanan.';
        } else {
            text = `<strong>Diskon Nominal:</strong> Potongan nominal tetap langsung dari biaya ${scope}.`;
        }
        labelAmount.innerHTML = 'Potongan Diskon (Rp) <span class="text-rose-500">*</span>';
        rewardInput.placeholder = 'Contoh: 50.000';
        if (maxDiscountBox) maxDiscountBox.style.display = 'none';
        rewardInput.disabled = false;
        formatRupiahInput(rewardInput);
    }

    descBox.innerHTML = text;
    updateRewardAmountHint();
}

document.addEventListener('DOMContentLoaded', function() {
    updatePromoFormHelper();

    // Format semua input rupiah saat dimuat
    document.querySelectorAll('.rupiah-input').forEach(function(input) {
        if (input.value) {
            formatRupiahInput(input);
        }
        input.addEventListener('input', function() {
            formatRupiahInput(this);
        });
    });

    // Bersihkan titik sebelum submit form
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function() {
            document.querySelectorAll('.rupiah-input').forEach(function(input) {
                const clean = input.value.replace(/[^0-9]/g, '');
                input.value = clean;
            });
        });
    }
});
</script>
@endsection
