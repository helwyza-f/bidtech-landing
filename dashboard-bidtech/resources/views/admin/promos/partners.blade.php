@extends('layouts.admin')

@section('title', 'Laporan Kemitraan & Komisi - Dashboard Admin')

@section('content')
<div class="max-w-7xl mx-auto space-y-8">

    <!-- Top Bar -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
            <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Afiliasi Mitra & Komisi</h1>
            <p class="text-sm text-slate-500 mt-1">Rekapitulasi performa mitra, voucher terafiliasi, dan akumulasi hak komisi yang diperoleh mitra.</p>
        </div>
        <div class="flex items-center gap-3">
            <a href="{{ route('dashboard.promos.create') }}"
               class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold text-sm transition shadow-xs">
                <i data-lucide="plus" class="w-4 h-4"></i>
                <span>Buat Promo Mitra</span>
            </a>
            <a href="{{ route('dashboard.promos.all-usages') }}"
               class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm transition shadow-xs">
                <i data-lucide="history" class="w-4 h-4"></i>
                <span>Riwayat Redeem</span>
            </a>
        </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <div class="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
            <div class="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <i data-lucide="users" class="w-6 h-6"></i>
            </div>
            <div>
                <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Mitra Terdaftar</p>
                <p class="text-2xl font-bold text-slate-900 mt-0.5">{{ $stats['total_partners'] }}</p>
            </div>
        </div>

        <div class="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
            <div class="w-12 h-12 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center shrink-0">
                <i data-lucide="ticket" class="w-6 h-6"></i>
            </div>
            <div>
                <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Promo Mitra</p>
                <p class="text-2xl font-bold text-slate-900 mt-0.5">{{ $stats['total_promos'] }}</p>
            </div>
        </div>

        <div class="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
            <div class="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <i data-lucide="check-circle-2" class="w-6 h-6"></i>
            </div>
            <div>
                <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Ditebus</p>
                <p class="text-2xl font-bold text-slate-900 mt-0.5">{{ $stats['total_redeem'] }}</p>
            </div>
        </div>

        <div class="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
            <div class="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <i data-lucide="coins" class="w-6 h-6"></i>
            </div>
            <div>
                <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Akumulasi Komisi</p>
                <p class="text-xl font-bold text-amber-700 mt-0.5">Rp{{ number_format($stats['total_commission'], 0, ',', '.') }}</p>
            </div>
        </div>
    </div>

    <!-- Tabel Rekapitulasi Per Mitra -->
    <div class="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div class="p-5 border-b border-slate-100 flex items-center justify-between">
            <h2 class="font-bold text-slate-800 text-base">Rekapitulasi Perolehan Komisi Mitra</h2>
            <span class="text-xs font-medium text-slate-400">{{ count($partnersGrouped) }} Mitra Terdaftar</span>
        </div>

        <div class="overflow-x-auto">
            <table class="w-full text-left text-sm text-slate-600">
                <thead class="bg-slate-50 text-slate-700 text-xs uppercase font-bold tracking-wider border-b border-slate-200/80">
                    <tr>
                        <th class="py-3.5 px-4 w-12 text-center">No</th>
                        <th class="py-3.5 px-4">Nama Mitra & Kode</th>
                        <th class="py-3.5 px-4">Kode Promo Terafiliasi</th>
                        <th class="py-3.5 px-4 text-center">Jumlah Redeem</th>
                        <th class="py-3.5 px-4 text-right">Total Diskon Diberikan</th>
                        <th class="py-3.5 px-4 text-right">Total Komisi Mitra</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                    @forelse($partnersGrouped as $partner)
                        <tr class="hover:bg-slate-50/70 transition">
                            <td class="py-4 px-4 text-center font-mono font-bold text-xs text-slate-400">
                                {{ $loop->iteration }}
                            </td>
                            <td class="py-4 px-4">
                                <div class="flex items-center gap-3">
                                    <div class="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm shrink-0">
                                        {{ strtoupper(substr($partner['partner_name'], 0, 1)) }}
                                    </div>
                                    <div>
                                        <p class="font-bold text-slate-900 text-sm">{{ $partner['partner_name'] }}</p>
                                        @if($partner['partner_code'])
                                            <p class="text-xs font-mono text-slate-400 mt-0.5">Kode: {{ $partner['partner_code'] }}</p>
                                        @endif
                                    </div>
                                </div>
                            </td>
                            <td class="py-4 px-4">
                                <div class="flex flex-wrap gap-1.5 max-w-sm">
                                    @foreach($partner['promos'] as $promoItem)
                                        <a href="{{ route('dashboard.promos.usages', $promoItem) }}"
                                           title="Lihat riwayat redeem {{ $promoItem->code }}"
                                           class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-violet-50 hover:bg-violet-100 text-violet-700 font-mono text-xs font-bold transition border border-violet-100">
                                            <span>{{ $promoItem->code }}</span>
                                            <span class="text-[10px] font-normal text-violet-500">({{ $promoItem->usages_count }})</span>
                                        </a>
                                    @endforeach
                                </div>
                            </td>
                            <td class="py-4 px-4 text-center whitespace-nowrap">
                                <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700">
                                    {{ $partner['total_redeem'] }}x
                                </span>
                            </td>
                            <td class="py-4 px-4 text-right whitespace-nowrap">
                                <span class="font-semibold text-slate-800 text-sm">
                                    Rp{{ number_format($partner['total_discount'], 0, ',', '.') }}
                                </span>
                            </td>
                            <td class="py-4 px-4 text-right whitespace-nowrap">
                                <span class="font-extrabold text-blue-600 text-base">
                                    Rp{{ number_format($partner['total_commission'], 0, ',', '.') }}
                                </span>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="6" class="py-12 text-center text-slate-400">
                                <i data-lucide="users" class="w-8 h-8 mx-auto mb-2 text-slate-300"></i>
                                <p class="text-sm font-medium">Belum ada promo kemitraan yang dibuat.</p>
                                <a href="{{ route('dashboard.promos.create') }}" class="mt-3 inline-flex items-center gap-1.5 text-violet-600 hover:text-violet-800 text-sm font-semibold">
                                    <i data-lucide="plus" class="w-4 h-4"></i> Buat Promo Mitra Pertama
                                </a>
                            </td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>

</div>
@endsection
