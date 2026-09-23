@extends('layouts.admin')

@section('title', 'Riwayat Redeem: ' . $promo->code . ' - Dashboard Admin')

@section('content')
<div class="max-w-7xl mx-auto space-y-8">

    <!-- Top Navigation & Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
            <div class="flex items-center gap-2 mb-2">
                <a href="{{ route('dashboard.promos.index') }}" class="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition">
                    <i data-lucide="arrow-left" class="w-3.5 h-3.5"></i>
                    <span>Kembali ke Daftar Promo</span>
                </a>
            </div>
            <div class="flex items-center gap-3">
                <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    Pengguna Promo: <span class="font-mono text-violet-600">{{ $promo->code }}</span>
                </h1>
                <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold {{ $promo->is_active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600' }}">
                    {{ $promo->is_active ? 'Aktif' : 'Nonaktif' }}
                </span>
            </div>
            <p class="text-sm text-slate-500 mt-1">{{ $promo->name }} &bull; {{ $promo->description ?? 'Tidak ada deskripsi' }}</p>
        </div>
        <div class="flex items-center gap-3">
            <a href="{{ route('dashboard.promos.edit', $promo) }}"
               class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm transition shadow-xs">
                <i data-lucide="edit-3" class="w-4 h-4"></i>
                <span>Edit Promo</span>
            </a>
            <a href="{{ route('dashboard.promos.all-usages') }}"
               class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold text-sm transition shadow-xs">
                <i data-lucide="history" class="w-4 h-4"></i>
                <span>Semua Riwayat</span>
            </a>
        </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <div class="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
            <div class="w-12 h-12 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center shrink-0">
                <i data-lucide="check-check" class="w-6 h-6"></i>
            </div>
            <div>
                <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Ditebus</p>
                <p class="text-2xl font-bold text-slate-900 mt-0.5">{{ $usages->total() }} <span class="text-xs text-slate-400 font-normal">/ {{ $promo->usage_limit ?? '∞' }}</span></p>
            </div>
        </div>

        <div class="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
            <div class="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <i data-lucide="wallet" class="w-6 h-6"></i>
            </div>
            <div>
                <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Diskon Diberikan</p>
                <p class="text-xl font-bold text-slate-900 mt-0.5">Rp{{ number_format($totalDiscount, 0, ',', '.') }}</p>
            </div>
        </div>

        @if($promo->is_partner)
        <div class="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
            <div class="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <i data-lucide="badge-percent" class="w-6 h-6"></i>
            </div>
            <div>
                <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Komisi Mitra ({{ $promo->partner_name }})</p>
                <p class="text-xl font-bold text-blue-700 mt-0.5">Rp{{ number_format($totalCommission, 0, ',', '.') }}</p>
            </div>
        </div>
        @else
        <div class="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
            <div class="w-12 h-12 rounded-xl bg-slate-50 text-slate-500 flex items-center justify-center shrink-0">
                <i data-lucide="tag" class="w-6 h-6"></i>
            </div>
            <div>
                <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Tipe Promo</p>
                <p class="text-lg font-bold text-slate-800 mt-0.5 uppercase">{{ str_replace('_', ' ', $promo->type) }}</p>
            </div>
        </div>
        @endif

        <div class="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
            <div class="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <i data-lucide="layers" class="w-6 h-6"></i>
            </div>
            <div>
                <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Cakupan (Scope)</p>
                <p class="text-lg font-bold text-slate-800 mt-0.5 capitalize">{{ $promo->target_scope }}</p>
            </div>
        </div>
    </div>

    <!-- Tabel Riwayat Pengguna -->
    <div class="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div class="p-5 border-b border-slate-100 flex items-center justify-between">
            <h2 class="font-bold text-slate-800 text-base">Daftar Transaksi yang Menggunakan Promo Ini</h2>
            <span class="text-xs font-medium text-slate-400">Total {{ $usages->total() }} catatan</span>
        </div>

        {{-- Info banner: non-refundable quota policy --}}
        <div class="mx-5 mt-4 flex items-start gap-2.5 rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-xs text-amber-800">
            <i data-lucide="info" class="w-4 h-4 text-amber-600 shrink-0 mt-0.5"></i>
            <span>
                <strong>Kebijakan Kuota Promo:</strong> Kuota langsung berkurang dan dicatat saat link pembayaran Xendit dibuat (status <em>Menunggu Bayar</em>).
                Jika pesanan kedaluwarsa atau batal, kuota <strong>tidak dikembalikan</strong> — sesuai kebijakan kupon hangus permanen.
            </span>
        </div>

        <div class="overflow-x-auto">
            <table class="w-full text-left text-sm text-slate-600">
                <thead class="bg-slate-50 text-slate-700 text-xs uppercase font-bold tracking-wider border-b border-slate-200/80">
                    <tr>
                        <th class="py-3.5 px-4 w-12 text-center">No</th>
                        <th class="py-3.5 px-4">Tanggal & Waktu</th>
                        <th class="py-3.5 px-4">Email Pengguna</th>
                        <th class="py-3.5 px-4">Nomor Order / Invoice</th>
                        <th class="py-3.5 px-4">Template / Paket</th>
                        <th class="py-3.5 px-4 text-right">Potongan Diskon</th>
                        @if($promo->is_partner)
                            <th class="py-3.5 px-4 text-right">Komisi Mitra</th>
                        @endif
                        <th class="py-3.5 px-4 text-center">Status Order</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                    @forelse($usages as $index => $usage)
                        <tr class="hover:bg-slate-50/70 transition">
                            <td class="py-4 px-4 text-center font-mono font-bold text-xs text-slate-400">
                                {{ $usages->firstItem() + $index }}
                            </td>
                            <td class="py-4 px-4 whitespace-nowrap">
                                <p class="font-semibold text-slate-800 text-xs">{{ $usage->created_at ? $usage->created_at->format('d M Y, H:i') : '-' }}</p>
                                <p class="text-[11px] text-slate-400">{{ $usage->created_at ? $usage->created_at->diffForHumans() : '' }}</p>
                            </td>
                            <td class="py-4 px-4">
                                <div class="flex items-center gap-2">
                                    <div class="w-7 h-7 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center text-xs font-bold shrink-0">
                                        {{ strtoupper(substr($usage->email, 0, 1)) }}
                                    </div>
                                    <span class="font-medium text-slate-900 text-xs">{{ $usage->email }}</span>
                                </div>
                            </td>
                            <td class="py-4 px-4">
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
                                    <p class="text-[11px] text-slate-400">Domain: {{ $usage->order->domain_name ?? '-' }}</p>
                                @else
                                    <span class="text-xs text-slate-400">-</span>
                                @endif
                            </td>
                            <td class="py-4 px-4 text-right whitespace-nowrap">
                                <span class="font-bold text-emerald-600 text-sm">
                                    -Rp{{ number_format($usage->discount_amount, 0, ',', '.') }}
                                </span>
                            </td>
                            @if($promo->is_partner)
                                <td class="py-4 px-4 text-right whitespace-nowrap">
                                    <span class="font-bold text-blue-600 text-sm">
                                        +Rp{{ number_format($usage->partner_commission_earned, 0, ',', '.') }}
                                    </span>
                                </td>
                            @endif
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
                            <td colspan="{{ $promo->is_partner ? 8 : 7 }}" class="py-12 text-center text-slate-400">
                                <i data-lucide="ticket" class="w-8 h-8 mx-auto mb-2 text-slate-300"></i>
                                <p class="text-sm font-medium">Belum ada transaksi yang menggunakan kode promo ini.</p>
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
