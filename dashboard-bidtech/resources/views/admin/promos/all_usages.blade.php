@extends('layouts.admin')

@section('title', 'Riwayat Penggunaan Kode Promo - Dashboard Admin')

@section('content')
<div class="max-w-7xl mx-auto space-y-8">

    <!-- Top Bar -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
            <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Riwayat Penggunaan Kode Promo</h1>
            <p class="text-sm text-slate-500 mt-1">Audit lengkap siapa saja yang me-redeem promo, total diskon yang dinikmati, dan komisi mitra.</p>
        </div>
        <div class="flex items-center gap-3">
            <a href="{{ route('dashboard.promos.partners') }}"
               class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm transition shadow-xs">
                <i data-lucide="users" class="w-4 h-4 text-blue-600"></i>
                <span>Komisi Mitra</span>
            </a>
            <a href="{{ route('dashboard.promos.index') }}"
               class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold text-sm transition shadow-xs">
                <i data-lucide="ticket-percent" class="w-4 h-4"></i>
                <span>Kelola Promo</span>
            </a>
        </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <div class="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
            <div class="w-12 h-12 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center shrink-0">
                <i data-lucide="ticket-check" class="w-6 h-6"></i>
            </div>
            <div>
                <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Redeem</p>
                <p class="text-2xl font-bold text-slate-900 mt-0.5">{{ $stats['total_redeem'] }}</p>
            </div>
        </div>

        <div class="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
            <div class="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <i data-lucide="wallet" class="w-6 h-6"></i>
            </div>
            <div>
                <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Diskon Diberikan</p>
                <p class="text-xl font-bold text-slate-900 mt-0.5">Rp{{ number_format($stats['total_discount'], 0, ',', '.') }}</p>
            </div>
        </div>

        <div class="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
            <div class="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <i data-lucide="badge-percent" class="w-6 h-6"></i>
            </div>
            <div>
                <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Komisi Mitra</p>
                <p class="text-xl font-bold text-blue-700 mt-0.5">Rp{{ number_format($stats['total_commission'], 0, ',', '.') }}</p>
            </div>
        </div>

        <div class="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
            <div class="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <i data-lucide="user-check" class="w-6 h-6"></i>
            </div>
            <div>
                <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Pelanggan Unik</p>
                <p class="text-2xl font-bold text-slate-900 mt-0.5">{{ $stats['unique_users'] }}</p>
            </div>
        </div>
    </div>

    <!-- Filter & Search -->
    <div class="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <form method="GET" action="{{ route('dashboard.promos.all-usages') }}" class="flex flex-wrap gap-3">
            <div class="relative flex-1 min-w-[220px]">
                <i data-lucide="search" class="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2"></i>
                <input type="text" name="search" value="{{ request('search') }}"
                       placeholder="Cari email, no. invoice, atau kode promo..."
                       class="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 bg-slate-50/50">
            </div>

            <select name="promo_id" onchange="this.form.submit()"
                    class="px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 bg-slate-50/50 text-slate-700">
                <option value="">Semua Kode Promo</option>
                @foreach($promos as $p)
                    <option value="{{ $p->id }}" {{ request('promo_id') == $p->id ? 'selected' : '' }}>
                        {{ $p->code }} - {{ $p->name }}
                    </option>
                @endforeach
            </select>

            <button type="submit" class="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-sm font-semibold transition">Filter</button>
            @if(request('search') || request('promo_id'))
                <a href="{{ route('dashboard.promos.all-usages') }}" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-sm font-medium transition text-center">Reset</a>
            @endif
        </form>
    </div>

    <!-- Tabel Riwayat Semua Penggunaan -->
    <div class="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div class="overflow-x-auto">
            <table class="w-full text-left text-sm text-slate-600">
                <thead class="bg-slate-50 text-slate-700 text-xs uppercase font-bold tracking-wider border-b border-slate-200/80">
                    <tr>
                        <th class="py-3.5 px-4 w-12 text-center">No</th>
                        <th class="py-3.5 px-4">Waktu Redeem</th>
                        <th class="py-3.5 px-4">Kode Promo</th>
                        <th class="py-3.5 px-4">Pengguna (Email)</th>
                        <th class="py-3.5 px-4">Nomor Order</th>
                        <th class="py-3.5 px-4">Paket / Template</th>
                        <th class="py-3.5 px-4 text-right">Potongan Diskon</th>
                        <th class="py-3.5 px-4 text-right">Komisi Mitra</th>
                        <th class="py-3.5 px-4 text-center">Status</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                    @forelse($usages as $index => $usage)
                        <tr class="hover:bg-slate-50/70 transition">
                            <td class="py-4 px-4 text-center font-mono font-bold text-xs text-slate-400">
                                {{ $usages->firstItem() + $index }}
                            </td>
                            <td class="py-4 px-4 whitespace-nowrap">
                                <p class="font-semibold text-slate-800 text-xs">{{ $usage->created_at ? $usage->created_at->format('d/m/Y, H:i') : '-' }}</p>
                                <p class="text-[11px] text-slate-400">{{ $usage->created_at ? $usage->created_at->diffForHumans() : '' }}</p>
                            </td>
                            <td class="py-4 px-4">
                                @if($usage->promo)
                                    <a href="{{ route('dashboard.promos.usages', $usage->promo) }}" class="font-mono font-bold text-sm text-violet-600 hover:text-violet-800 hover:underline">
                                        {{ $usage->promo->code }}
                                    </a>
                                    <p class="text-[11px] text-slate-400 truncate max-w-[150px]">{{ $usage->promo->name }}</p>
                                    @if($usage->promo->is_partner)
                                        <span class="inline-flex items-center px-1.5 py-0.2 rounded bg-blue-50 text-[10px] text-blue-700 font-medium">
                                            {{ $usage->promo->partner_name }}
                                        </span>
                                    @endif
                                @else
                                    <span class="font-mono text-xs text-slate-400">Promo #{{ $usage->promo_id }}</span>
                                @endif
                            </td>
                            <td class="py-4 px-4">
                                <div class="flex items-center gap-2">
                                    <div class="w-7 h-7 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-xs font-bold shrink-0">
                                        {{ strtoupper(substr($usage->email, 0, 1)) }}
                                    </div>
                                    <span class="font-medium text-slate-900 text-xs">{{ $usage->email }}</span>
                                </div>
                            </td>
                            <td class="py-4 px-4 whitespace-nowrap">
                                @if($usage->order)
                                    <a href="{{ route('checkout.bayar.direct', $usage->order->order_number) }}" target="_blank"
                                       class="inline-flex items-center gap-1 font-mono font-bold text-violet-600 hover:text-violet-800 text-xs">
                                        {{ $usage->order->order_number }}
                                        <i data-lucide="external-link" class="w-3 h-3"></i>
                                    </a>
                                @else
                                    <span class="font-mono text-xs text-slate-400">Order #{{ $usage->order_id }}</span>
                                @endif
                            </td>
                            <td class="py-4 px-4">
                                @if($usage->order && $usage->order->template)
                                    <p class="font-medium text-slate-800 text-xs">{{ $usage->order->template->name }}</p>
                                    <p class="text-[11px] text-slate-400">{{ $usage->order->domain_name ?? '-' }}</p>
                                @else
                                    <span class="text-xs text-slate-400">-</span>
                                @endif
                            </td>
                            <td class="py-4 px-4 text-right whitespace-nowrap">
                                <span class="font-bold text-emerald-600 text-sm">
                                    -Rp{{ number_format($usage->discount_amount, 0, ',', '.') }}
                                </span>
                            </td>
                            <td class="py-4 px-4 text-right whitespace-nowrap">
                                @if($usage->partner_commission_earned > 0)
                                    <span class="font-bold text-blue-600 text-sm">
                                        +Rp{{ number_format($usage->partner_commission_earned, 0, ',', '.') }}
                                    </span>
                                @else
                                    <span class="text-xs text-slate-400">-</span>
                                @endif
                            </td>
                            <td class="py-4 px-4 text-center whitespace-nowrap">
                                @if($usage->order)
                                    @php
                                        $statusVal = $usage->order->status->value ?? $usage->order->status;
                                    @endphp
                                    @if($statusVal === 'paid')
                                        <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                                            <i data-lucide="check-circle-2" class="w-3 h-3"></i> Lunas Terverifikasi
                                        </span>
                                    @elseif($statusVal === 'unpaid')
                                        <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                                            <i data-lucide="clock" class="w-3 h-3"></i> Kupon Terklaim – Menunggu Bayar
                                        </span>
                                    @else
                                        <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600">
                                            <i data-lucide="x-circle" class="w-3 h-3"></i> Kedaluwarsa – Kupon Hangus
                                        </span>
                                    @endif
                                @else
                                    <span class="text-xs text-slate-400">-</span>
                                @endif
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="9" class="py-12 text-center text-slate-400">
                                <i data-lucide="history" class="w-8 h-8 mx-auto mb-2 text-slate-300"></i>
                                <p class="text-sm font-medium">Belum ada data riwayat penggunaan promo yang ditemukan.</p>
                            </td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>

        @if($usages->hasPages())
            <div class="p-4 border-t border-slate-100">
                {{ $usages->links() }}
            </div>
        @endif
    </div>

</div>
@endsection
