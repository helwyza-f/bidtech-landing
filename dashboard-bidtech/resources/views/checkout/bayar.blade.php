@extends('layouts.checkout')

@section('title', $order->isPaid() ? 'Pembayaran Berhasil - Bidtech' : ($order->isExpired() ? 'Link Pembayaran Kedaluwarsa - Bidtech' : 'Menunggu Pembayaran - Bidtech'))

@section('content')

<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-10 space-y-8">

    <!-- ================= HEADER TERPUSAT & HITUNG MUNDUR ================= -->
    <div class="text-center max-w-2xl mx-auto space-y-2">
        <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0B1B17]">
            @if($order->isPaid())
                Pembayaran Berhasil Diterima
            @elseif($order->isExpired() || $order->status === \App\Enums\OrderStatus::Invalid)
                Link Pembayaran Tidak Berlaku
            @else
                Menunggu Pembayaran
            @endif
        </h1>
        <p class="text-xs sm:text-sm text-[#6B7B75]">
            @if($order->isPaid())
                Terima kasih! Pembayaran Anda telah kami terima dan pesanan website resmi Anda segera diproses.
            @elseif($order->isExpired() || $order->status === \App\Enums\OrderStatus::Invalid)
                Batas waktu pembayaran untuk tagihan ini telah berakhir. Link pembayaran lama tidak dapat diproses lagi.
            @else
                Selesaikan pembayaran sebelum batas waktu berakhir untuk mengamankan pesanan Anda.
            @endif
        </p>

        <!-- Widget Countdown Timer (Hanya saat status Menunggu Pembayaran) -->
        @if(!$order->isPaid() && !$order->isExpired() && $order->status !== \App\Enums\OrderStatus::Invalid)
            <div class="pt-3 flex justify-center">
                <div class="inline-flex items-center gap-4 sm:gap-6 rounded-2xl bg-white border border-[#E4E9E6] px-6 sm:px-8 py-3 shadow-2xs">
                    <div class="text-center min-w-10">
                        <span id="cd-hours" class="block text-2xl sm:text-3xl font-black text-[#0B1B17] font-mono leading-none">00</span>
                        <span class="text-[10px] sm:text-xs font-semibold text-[#6B7B75]">Jam</span>
                    </div>
                    <span class="text-xl sm:text-2xl font-bold text-[#6B7B75] -mt-3">:</span>
                    <div class="text-center min-w-10">
                        <span id="cd-minutes" class="block text-2xl sm:text-3xl font-black text-[#0B1B17] font-mono leading-none">00</span>
                        <span class="text-[10px] sm:text-xs font-semibold text-[#6B7B75]">Menit</span>
                    </div>
                    <span class="text-xl sm:text-2xl font-bold text-[#6B7B75] -mt-3">:</span>
                    <div class="text-center min-w-10">
                        <span id="cd-seconds" class="block text-2xl sm:text-3xl font-black text-[#22C55E] font-mono leading-none">00</span>
                        <span class="text-[10px] sm:text-xs font-semibold text-[#6B7B75]">Detik</span>
                    </div>
                </div>
            </div>
        @elseif($order->isPaid())
            <div class="pt-2 flex justify-center">
                <span class="inline-flex items-center gap-2 rounded-full bg-[#E7F4EE] px-4 py-1.5 text-xs font-bold text-[#1E7A53] border border-emerald-200">
                    <svg class="size-4 text-[#1E7A53]" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                    <span>Tagihan Telah Dibayar Lunas</span>
                </span>
            </div>
        @else
            <div class="pt-2 flex justify-center">
                <span class="inline-flex items-center gap-2 rounded-full bg-rose-100 px-4 py-1.5 text-xs font-bold text-rose-800 border border-rose-200">
                    <svg class="size-4 text-rose-700" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                    </svg>
                    <span>Batas Waktu Pembayaran Telah Habis</span>
                </span>
            </div>
        @endif
    </div>

    <!-- ================= GRID UTAMA (KIRI: RINCIAN INVOICE | KANAN: DETAIL PESANAN) ================= -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">

        <!-- ================= KOLOM KIRI: INFORMASI & RINCIAN PESANAN ================= -->
        <div class="lg:col-span-8 space-y-6">

            <!-- 1. Khusus Jika Sudah Lunas: Tampilkan Kredensial Login Akun di Paling Atas -->
            @if($order->isPaid())
                <div class="rounded-3xl border-2 border-[#22C55E] bg-[#F2FBF5] p-6 sm:p-7 space-y-4 shadow-xs">
                    <div class="flex items-center gap-3">
                        <div class="flex size-10 items-center justify-center rounded-xl bg-[#E7F4EE] text-[#1E7A53] shrink-0">
                            <svg class="size-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
                            </svg>
                        </div>
                        <div>
                            <h3 class="text-base sm:text-lg font-bold text-[#0B1B17]">Informasi Login Dashboard Klien</h3>
                            <p class="text-xs text-[#6B7B75]">Akun portal khusus pesanan website ini siap digunakan untuk memantau status pengerjaan:</p>
                        </div>
                    </div>
                    
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div class="p-3.5 bg-white rounded-xl border border-[#E4E9E6]">
                            <span class="text-[#6B7B75] block mb-1">Email Login Proyek:</span>
                            <strong class="text-sm font-bold text-[#0B1B17] break-all select-all font-mono">{{ $user ? $user->email : $order->email }}</strong>
                        </div>
                        <div class="p-3.5 bg-white rounded-xl border border-[#E4E9E6] flex items-center justify-between">
                            <div>
                                <span class="text-[#6B7B75] block mb-1">Password Default:</span>
                                <div class="flex items-center gap-2">
                                    <span id="password-lunas-display" class="text-sm font-mono font-bold text-[#1E7A53] select-all tracking-wider">••••••••••••</span>
                                    <button type="button" onclick="togglePasswordLunas()" id="btn-toggle-lunas-pass" class="p-1 rounded-md text-slate-400 hover:text-[#1E7A53] hover:bg-[#E7F4EE] transition cursor-pointer" title="Tampilkan / Sembunyikan Password" aria-label="Lihat password">
                                        <svg id="icon-lunas-eye" class="size-4 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 .696 10.75 10.75 0 0 1-19.876 0"/>
                                            <circle cx="12" cy="12" r="3"/>
                                        </svg>
                                        <svg id="icon-lunas-eye-off" class="size-4 shrink-0 hidden" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/>
                                            <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/>
                                            <path d="M17.479 17.499A10.75 10.75 0 0 1 2.062 12.35a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.125-5.323"/>
                                            <line x1="2" x2="22" y1="2" y2="22"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <button type="button" onclick="salinTeks('Password123!', 'Password')" class="inline-flex items-center gap-1.5 text-xs font-bold text-[#1E7A53] hover:underline px-2.5 py-1 rounded-lg bg-[#E7F4EE] cursor-pointer transition">
                                <svg class="size-3.5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
                                </svg>
                                <span>Salin</span>
                            </button>
                        </div>
                    </div>

                    <div class="pt-2 flex flex-wrap items-center justify-between gap-3">
                        <button type="button" onclick="salinTeks('{{ $user ? $user->email : $order->email }}', 'Email Login')" class="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1E7A53] hover:underline cursor-pointer">
                            <svg class="size-3.5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
                            </svg>
                            <span>Salin Email Login</span>
                        </button>

                        <a href="{{ route('dashboard') }}" class="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#22C55E] hover:bg-[#16a34a] text-white font-bold text-xs shadow-xs transition">
                            <span>Buka Halaman Dashboard</span>
                            <svg class="size-4" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                            </svg>
                        </a>
                    </div>
                </div>
            @endif

            <div class="rounded-3xl border border-[#E4E9E6] bg-white p-6 sm:p-8 space-y-6 shadow-xs">

                <!-- 1. Informasi Pesanan -->
                <div>
                    <div class="flex flex-wrap items-center justify-between gap-3 mb-3">
                        <h2 class="text-base font-bold text-[#0B1B17]">
                            Informasi Pesanan
                        </h2>
                        <a href="{{ route('checkout.invoice.download', $order) }}" target="_blank" class="inline-flex items-center gap-1.5 rounded-xl border border-[#22C55E] bg-[#F2FBF5] px-3.5 py-1.5 text-xs font-bold text-[#1E7A53] hover:bg-[#22C55E] hover:text-white transition shadow-2xs">
                            <svg class="size-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                            </svg>
                            <span>Unduh Invoice (PDF)</span>
                        </a>
                    </div>
                    <div class="space-y-2 text-xs sm:text-sm">
                        <div class="flex items-center justify-between py-1">
                            <span class="text-[#6B7B75] w-36 sm:w-44 shrink-0">Nomor Invoice</span>
                            <div class="flex items-center gap-2 font-mono font-bold text-[#0B1B17] flex-1">
                                <span id="text-invoice">{{ $order->order_number }}</span>
                                <button type="button" onclick="salinTeks('{{ $order->order_number }}', 'Nomor Invoice')" title="Salin Nomor Invoice" class="p-1 text-[#6B7B75] hover:text-[#0B1B17] transition rounded cursor-pointer">
                                    <svg class="size-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div class="flex items-center justify-between py-1">
                            <span class="text-[#6B7B75] w-36 sm:w-44 shrink-0">Tanggal Pesanan</span>
                            <span class="font-medium text-[#0B1B17] flex-1">
                                {{ $order->created_at ? $order->created_at->format('d M Y') : now()->format('d M Y') }}
                            </span>
                        </div>
                    </div>
                </div>

                <hr class="border-[#E4E9E6]">

                <!-- 2. Informasi Akun -->
                <div>
                    <h2 class="text-base font-bold text-[#0B1B17] mb-3">
                        Informasi Akun
                    </h2>
                    <div class="space-y-2 text-xs sm:text-sm">
                        <div class="flex items-center justify-between py-1">
                            <span class="text-[#6B7B75] w-36 sm:w-44 shrink-0">Nama</span>
                            <span class="font-semibold text-[#0B1B17] flex-1">: {{ $order->full_name }}</span>
                        </div>
                        <div class="flex items-center justify-between py-1">
                            <span class="text-[#6B7B75] w-36 sm:w-44 shrink-0">Email</span>
                            <span class="font-semibold text-[#0B1B17] flex-1 break-all">: {{ $order->email }}</span>
                        </div>
                        <div class="flex items-center justify-between py-1">
                            <span class="text-[#6B7B75] w-36 sm:w-44 shrink-0">No. WhatsApp</span>
                            <span class="font-semibold text-[#0B1B17] flex-1">: {{ $order->whatsapp }}</span>
                        </div>
                    </div>
                </div>

                <hr class="border-[#E4E9E6]">

                <!-- 3. Status Pembayaran & Status Transaksi -->
                <div class="space-y-4">
                    <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-1 sm:gap-4 text-xs sm:text-sm">
                        <span class="text-[#6B7B75] w-36 sm:w-44 shrink-0">Status Pembayaran</span>
                        <div class="flex-1 space-y-1">
                            @if($order->isPaid())
                                <span class="inline-flex items-center gap-1.5 rounded-md bg-[#DCFCE7] text-[#166534] font-bold text-xs px-2.5 py-1 uppercase tracking-wider">
                                    <svg class="size-3.5" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                    </svg>
                                    <span>PAID</span>
                                </span>
                                <p class="text-xs text-[#6B7B75]">Pembayaran telah berhasil diverifikasi oleh sistem.</p>
                            @elseif($order->isExpired() || $order->status === \App\Enums\OrderStatus::Invalid)
                                <span class="inline-flex items-center gap-1.5 rounded-md bg-[#FEE2E2] text-[#991B1B] font-bold text-xs px-2.5 py-1 uppercase tracking-wider">
                                    <svg class="size-3.5" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                                    </svg>
                                    <span>EXPIRED</span>
                                </span>
                                <p class="text-xs text-rose-700">Tagihan telah melewati batas waktu pembayaran.</p>
                            @else
                                <span class="inline-flex items-center gap-1.5 rounded-md bg-[#FEF3C7] text-[#92400E] font-bold text-xs px-2.5 py-1 uppercase tracking-wider">
                                    <svg class="size-3.5" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                    <span>UNPAID</span>
                                </span>
                                <p class="text-xs text-[#6B7B75]">Silakan selesaikan pembayaran sebelum batas waktu berakhir.</p>
                            @endif
                        </div>
                    </div>

                    <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-1 sm:gap-4 text-xs sm:text-sm">
                        <span class="text-[#6B7B75] w-36 sm:w-44 shrink-0">Status Transaksi</span>
                        <div class="flex-1 space-y-1">
                            @if($order->isPaid())
                                <span class="inline-flex items-center gap-1.5 rounded-md bg-[#DCFCE7] text-[#166534] font-bold text-xs px-2.5 py-1 uppercase tracking-wider">
                                    <svg class="size-3.5" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                    <span>PROCESSED</span>
                                </span>
                                <p class="text-xs text-[#6B7B75]">Pesanan dan konfigurasi website sedang aktif diproses.</p>
                            @elseif($order->isExpired() || $order->status === \App\Enums\OrderStatus::Invalid)
                                <span class="inline-flex items-center gap-1.5 rounded-md bg-slate-100 text-slate-700 font-bold text-xs px-2.5 py-1 uppercase tracking-wider">
                                    <svg class="size-3.5" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                                    </svg>
                                    <span>CANCELLED</span>
                                </span>
                                <p class="text-xs text-[#6B7B75]">Pesanan dibatalkan otomatis karena waktu pembayaran habis.</p>
                            @else
                                <span class="inline-flex items-center gap-1.5 rounded-md bg-[#DBEAFE] text-[#1E40AF] font-bold text-xs px-2.5 py-1 uppercase tracking-wider">
                                    <svg class="size-3.5" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                    <span>PENDING</span>
                                </span>
                                <p class="text-xs text-[#6B7B75]">Pesanan akan otomatis diproses setelah pembayaran berhasil.</p>
                            @endif
                        </div>
                    </div>
                </div>

                <hr class="border-[#E4E9E6]">

                <!-- 4. Rincian Pesanan (Tabel) -->
                <div>
                    <h2 class="text-base font-bold text-[#0B1B17] mb-3">
                        Rincian Pesanan
                    </h2>
                    <div class="border border-[#E4E9E6] rounded-2xl overflow-hidden">
                        <table class="w-full text-left text-xs sm:text-sm">
                            <thead class="bg-[#F4F6F5] border-b border-[#E4E9E6] text-[#6B7B75] font-bold">
                                <tr>
                                    <th class="p-3.5 sm:p-4">Layanan / Item</th>
                                    <th class="p-3.5 sm:p-4 text-center">Durasi</th>
                                    <th class="p-3.5 sm:p-4 text-right">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-[#E4E9E6]">
                                <tr>
                                    <td class="p-3.5 sm:p-4">
                                        <strong class="font-bold text-[#0B1B17] block">
                                            1. Lisensi Template Website: {{ $template->name }}
                                        </strong>
                                        <span class="text-[11px] text-[#6B7B75] block mt-0.5">
                                            {{ $order->template_desc ?? $template->template_desc ?? 'Lisensi Desain UI/UX Eksklusif & Source Code Clean' }}
                                        </span>
                                    </td>
                                    <td class="p-3.5 sm:p-4 text-center text-[#6B7B75] font-medium">Selamanya</td>
                                    <td class="p-3.5 sm:p-4 text-right font-bold text-[#0B1B17]">
                                        Rp{{ number_format($templatePrice, 0, ',', '.') }}
                                    </td>
                                </tr>
                                <tr>
                                    <td class="p-3.5 sm:p-4">
                                        <strong class="font-bold text-[#0B1B17] block">
                                            2. Cloud Server Hosting (1 Tahun)
                                        </strong>
                                        <span class="text-[11px] text-[#6B7B75] block mt-0.5">
                                            {{ $order->server_desc ?? $template->server_desc ?? 'High Speed NVMe, Dedicated Cloud Resources & Free SSL HTTPS' }}
                                        </span>
                                    </td>
                                    <td class="p-3.5 sm:p-4 text-center text-[#6B7B75] font-medium">1 Tahun</td>
                                    <td class="p-3.5 sm:p-4 text-right font-bold text-[#0B1B17]">
                                        Rp{{ number_format($serverPrice, 0, ',', '.') }}
                                    </td>
                                </tr>
                                <tr>
                                    <td class="p-3.5 sm:p-4">
                                        <strong class="font-bold text-[#0B1B17] block">
                                            3. Setup Deployment & Layanan Teknis
                                        </strong>
                                        <span class="text-[11px] text-[#6B7B75] block mt-0.5">
                                            {{ $order->service_desc ?? $template->service_desc ?? 'Instalasi, Konfigurasi DNS Domain & Garansi Sistem' }}
                                        </span>
                                    </td>
                                    <td class="p-3.5 sm:p-4 text-center text-[#6B7B75] font-medium">Instan</td>
                                    <td class="p-3.5 sm:p-4 text-right font-bold text-[#0B1B17]">
                                        Rp{{ number_format($servicePrice, 0, ',', '.') }}
                                    </td>
                                </tr>
                                <tr>
                                    <td class="p-3.5 sm:p-4">
                                        <strong class="font-bold text-[#0B1B17] block">
                                            4. Registrasi Domain: {{ $order->domain_name }}
                                        </strong>
                                        <span class="text-[11px] text-[#6B7B75] block mt-0.5">
                                            Registrasi Domain Resmi &bull; Termasuk PPN 11%
                                        </span>
                                    </td>
                                    <td class="p-3.5 sm:p-4 text-center text-[#6B7B75] font-medium">{{ $order->domain_duration ?: 1 }} Tahun</td>
                                    <td class="p-3.5 sm:p-4 text-right font-bold text-[#0B1B17]">
                                        Rp{{ number_format($domainPrice, 0, ',', '.') }}
                                    </td>
                                </tr>
                                @if($discountAmount > 0)
                                    <tr class="bg-[#E7F4EE]">
                                        <td class="p-3.5 sm:p-4">
                                            <div class="flex items-center gap-2">
                                                <strong class="font-bold text-[#1E7A53] block">
                                                    Diskon Kode Promo ({{ $order->promo_code }})
                                                </strong>
                                                @if($order->is_partner_order)
                                                    <span class="inline-flex items-center gap-1 rounded-md bg-white border border-[#22C55E] px-2 py-0.5 text-[10px] font-bold text-[#1E7A53]">
                                                        <svg class="size-3 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-1.42-1.42l4.24-4.24a1 1 0 0 0 0-1.42l-1.41-1.41a1 1 0 0 0-1.42 0l-9.9 9.9a2 2 0 0 0 0 2.83L6 20a2 2 0 0 0 2.83 0l2.17-2.17"/><path d="m12 12 4 4"/></svg>
                                                        <span>Mitra: {{ $order->partner_name }}</span>
                                                    </span>
                                                @endif
                                            </div>
                                            <span class="text-[11px] text-[#1E7A53] block mt-0.5">
                                                Potongan harga khusus promo yang telah berhasil diverifikasi
                                            </span>
                                        </td>
                                        <td class="p-3.5 sm:p-4 text-center text-[#1E7A53] font-bold">Hemat</td>
                                        <td class="p-3.5 sm:p-4 text-right font-extrabold text-[#1E7A53]">
                                            -Rp{{ number_format($discountAmount, 0, ',', '.') }}
                                        </td>
                                    </tr>
                                @endif
                            </tbody>
                        </table>
                    </div>

                    <!-- Total Pembayaran Baris Besar -->
                    <div class="flex items-baseline justify-between pt-4">
                        <div>
                            <span class="text-sm sm:text-base font-bold text-[#0B1B17]">Total Pembayaran</span>
                                @if($order->is_partner_order && !empty($order->partner_name))
                                    <div class="text-xs text-[#1E7A53] font-semibold mt-0.5 flex items-center gap-1.5">
                                        <svg class="size-3.5 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-1.42-1.42l4.24-4.24a1 1 0 0 0 0-1.42l-1.41-1.41a1 1 0 0 0-1.42 0l-9.9 9.9a2 2 0 0 0 0 2.83L6 20a2 2 0 0 0 2.83 0l2.17-2.17"/><path d="m12 12 4 4"/></svg>
                                        <span>Terdaftar dalam Program Kemitraan: {{ $order->partner_name }}</span>
                                    </div>
                                @endif
                        </div>
                        <strong class="text-2xl sm:text-3xl font-black text-[#1E7A53] tabular-nums">
                            Rp{{ number_format($totalPrice, 0, ',', '.') }}
                        </strong>
                    </div>
                </div>

                <!-- 5. Blue Info Box -->
                <div class="rounded-2xl border border-[#D0E3F9] bg-[#EDF5FD] p-4 flex items-start gap-3 text-xs text-[#0B1B17]">
                    <div class="flex size-5 items-center justify-center rounded-full bg-[#2563EB] text-white font-bold text-[10px] shrink-0 mt-0.5">
                        i
                    </div>
                    <div>
                        <strong class="block font-bold">Pembayaran Terverifikasi Otomatis</strong>
                        <span class="text-[#4A5551]">Setelah pembayaran berhasil diverifikasi oleh sistem, domain Anda akan otomatis didaftarkan dan akun dashboard pelacakan website Anda akan langsung aktif.</span>
                    </div>
                </div>

                <!-- 6. Footer Kolom Kiri: Tombol Cek Status & Bantuan -->
                <div class="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                    <div class="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
                        <a href="{{ route('checkout.bayar', ['template' => $template->id, 'order' => $order->order_number]) }}" class="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-[#E4E9E6] bg-white hover:bg-[#F4F6F5] px-4 py-2.5 font-semibold text-[#0B1B17] transition shadow-2xs">
                            <svg class="size-3.5 text-[#6B7B75]" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                            </svg>
                            <span>Cek Status Pembayaran</span>
                        </a>
                    </div>

                    <div class="text-[#6B7B75]">
                        Mengalami kendala? 
                        <a href="https://wa.me/6281234567890?text=Halo%20Bidtech,%20saya%20mengalami%20kendala%20pembayaran%20{{ $order->order_number }}" target="_blank" class="font-bold text-[#1E7A53] hover:underline inline-flex items-center gap-1">
                            <span>Hubungi Tim Support</span>
                            <svg class="size-3.5" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                            </svg>
                        </a>
                    </div>
                </div>

            </div>
        </div>

        <!-- ================= KOLOM KANAN: DETAIL PESANAN & BUTUH BANTUAN ================= -->
        <div class="lg:col-span-4 relative">
            <div class="lg:sticky lg:top-20 xl:top-24 space-y-3 max-h-[calc(100vh-5.5rem)] overflow-y-auto">

                <!-- Card 1: Detail Pesanan (Dengan Gambar Website) -->
                <div class="rounded-3xl border border-[#E4E9E6] bg-white p-4.5 sm:p-5 shadow-xs space-y-3">
                    <div class="flex items-center justify-between">
                        <h3 class="text-sm sm:text-base font-bold text-[#0B1B17]">
                            Detail Pesanan
                        </h3>
                        @if(!$order->isPaid() && !$order->isExpired() && $order->status !== \App\Enums\OrderStatus::Invalid)
                            <a href="{{ route('checkout.ringkasan', $template) }}" class="text-xs font-semibold text-[#1E7A53] hover:underline">
                                Ubah
                            </a>
                        @endif
                    </div>

                    <!-- Gambar Preview Mockup Website -->
                    <div class="h-24 sm:h-28 w-full overflow-hidden rounded-xl border border-[#E4E9E6] bg-[#F4F6F5]">
                        @if($template->preview)
                            <img src="{{ asset($template->preview) }}" alt="{{ $template->name }}" class="h-full w-full object-cover object-top">
                        @else
                            <div class="flex h-full w-full items-center justify-center text-xs text-[#6B7B75]">
                                Preview tidak tersedia
                            </div>
                        @endif
                    </div>

                    <!-- Info Template -->
                    <div>
                        <div class="flex items-center justify-between gap-2">
                            <h4 class="text-sm font-bold text-[#0B1B17] truncate leading-snug">
                                {{ $template->name }}
                            </h4>
                            <a href="{{ $template->landing_url }}" target="_blank" class="text-xs font-semibold text-[#1E7A53] hover:underline inline-flex items-center gap-0.5 shrink-0" title="Buka Demo Live Template">
                                <span>Lihat Demo</span>
                                <svg class="size-3" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                </svg>
                            </a>
                        </div>
                        <p class="text-[11px] text-[#6B7B75] mt-0.5">
                            Template Website
                        </p>
                    </div>

                    <!-- Info Rincian Cepat -->
                    <div class="space-y-1.5 text-xs pt-2 border-t border-[#E4E9E6]">
                        <div class="flex items-center justify-between py-0.5">
                            <span class="text-[#6B7B75]">Domain</span>
                            <strong class="font-bold text-[#0B1B17] truncate ml-2">{{ $order->domain_name }}</strong>
                        </div>
                        <div class="flex items-center justify-between py-0.5">
                            <span class="text-[#6B7B75]">Durasi Domain</span>
                            <span class="font-semibold text-[#0B1B17]">1 Tahun</span>
                        </div>
                        <div class="flex items-center justify-between py-0.5">
                            <span class="text-[#6B7B75]">Setup & Deployment</span>
                            <span class="font-semibold text-[#1E7A53]">Termasuk</span>
                        </div>
                    </div>

                    <hr class="border-[#E4E9E6]">

                    <!-- Total Pembayaran -->
                    <div class="flex items-baseline justify-between pt-0.5">
                        <span class="text-xs font-bold text-[#0B1B17]">Total Pembayaran</span>
                        <strong class="text-lg sm:text-xl font-black text-[#1E7A53] tabular-nums">
                            Rp{{ number_format($totalPrice, 0, ',', '.') }}
                        </strong>
                    </div>

                    <!-- Tombol CTA Utama -->
                    <div class="pt-1">
                        @if($order->isPaid())
                            <a href="{{ route('dashboard') }}" class="flex w-full items-center justify-center gap-2 rounded-xl bg-[#22C55E] hover:bg-[#16a34a] py-2.5 sm:py-3 px-4 text-xs sm:text-sm font-bold text-white shadow-xs transition">
                                <span>Buka Dashboard</span>
                                <svg class="size-4" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                </svg>
                            </a>
                        @elseif($order->isExpired() || $order->status === \App\Enums\OrderStatus::Invalid)
                            <a href="{{ route('checkout.domain', $template) }}" class="flex w-full items-center justify-center gap-2 rounded-xl bg-[#22C55E] hover:bg-[#16a34a] py-2.5 sm:py-3 px-4 text-xs sm:text-sm font-bold text-white shadow-xs transition">
                                <span>Buat Pesanan Baru</span>
                                <svg class="size-4" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                </svg>
                            </a>
                        @else
                            @if($order->xendit_payment_url)
                                <a href="{{ $order->xendit_payment_url }}" target="_blank" rel="noopener noreferrer" class="flex w-full items-center justify-center gap-2 rounded-xl bg-[#22C55E] hover:bg-[#16a34a] py-2.5 sm:py-3 px-4 text-xs sm:text-sm font-bold text-white shadow-xs transition hover:shadow cursor-pointer">
                                    <span>Bayar Sekarang</span>
                                    <svg class="size-4" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                    </svg>
                                </a>
                            @endif
                        @endif
                    </div>
                </div>

                <!-- Card 2: Butuh Bantuan? (Kompak) -->
                <div class="rounded-2xl border border-[#E4E9E6] bg-white p-3.5 sm:p-4 shadow-xs space-y-2">
                    <div class="flex items-center justify-between">
                        <h4 class="text-xs sm:text-sm font-bold text-[#0B1B17]">
                            Butuh Bantuan?
                        </h4>
                        <span class="text-[10px] text-[#6B7B75]">Support Tim</span>
                    </div>

                    <div class="grid grid-cols-2 gap-2 pt-0.5">
                        <a href="https://wa.me/6281234567890?text=Halo%20Bidtech,%20saya%20butuh%20bantuan%20pesanan%20{{ $order->order_number }}" target="_blank" class="flex items-center justify-center gap-1.5 rounded-xl border border-[#E4E9E6] bg-white hover:bg-[#F4F6F5] py-2 px-2 text-[11px] font-semibold text-[#0B1B17] transition shadow-2xs">
                            <svg class="size-3.5 shrink-0 text-[#22C55E]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
                            <span>WhatsApp</span>
                        </a>

                        <a href="mailto:support@bidtech.co.id?subject=Bantuan%20Pesanan%20{{ $order->order_number }}" class="flex items-center justify-center gap-1.5 rounded-xl border border-[#E4E9E6] bg-white hover:bg-[#F4F6F5] py-2 px-2 text-[11px] font-semibold text-[#0B1B17] transition shadow-2xs">
                            <svg class="size-3.5 shrink-0 text-[#2563EB]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                            <span>Email</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>

</div>
</div>

<!-- ================= JAVASCRIPT: HITUNG MUNDUR, AUTO-EXPIRE & SALIN ================= -->
<script>
function salinTeks(teks, label) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(teks).then(() => {
            alert(label + ' berhasil disalin!');
        }).catch(() => {
            prompt('Salin teks secara manual:', teks);
        });
    } else {
        prompt('Salin teks secara manual:', teks);
    }
}

const rawPasswordLunas = 'Password123!';
let isPasswordLunasVisible = false;

function togglePasswordLunas() {
    isPasswordLunasVisible = !isPasswordLunasVisible;
    const display = document.getElementById('password-lunas-display');
    const iconEye = document.getElementById('icon-lunas-eye');
    const iconEyeOff = document.getElementById('icon-lunas-eye-off');
    const btn = document.getElementById('btn-toggle-lunas-pass');

    if (display) {
        display.textContent = isPasswordLunasVisible ? rawPasswordLunas : '••••••••••••';
    }
    if (iconEye && iconEyeOff) {
        if (isPasswordLunasVisible) {
            iconEye.classList.add('hidden');
            iconEyeOff.classList.remove('hidden');
            if (btn) btn.setAttribute('aria-label', 'Sembunyikan password');
        } else {
            iconEye.classList.remove('hidden');
            iconEyeOff.classList.add('hidden');
            if (btn) btn.setAttribute('aria-label', 'Lihat password');
        }
    }
}

@if(!$order->isPaid() && !$order->isExpired() && $order->status !== \App\Enums\OrderStatus::Invalid)
document.addEventListener('DOMContentLoaded', function() {
    // 1. Hitung Mundur Waktu Pembayaran (Live Countdown)
    const expiryTimestamp = new Date("{{ $order->payment_expires_at ? $order->payment_expires_at->toIso8601String() : now()->addDay()->toIso8601String() }}").getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = expiryTimestamp - now;

        const hoursEl = document.getElementById('cd-hours');
        const minutesEl = document.getElementById('cd-minutes');
        const secondsEl = document.getElementById('cd-seconds');

        if (!hoursEl || !minutesEl || !secondsEl) return;

        if (distance <= 0) {
            clearInterval(countdownInterval);
            hoursEl.textContent = '00';
            minutesEl.textContent = '00';
            secondsEl.textContent = '00';

            // Otomatis reload halaman saat waktu habis agar status berubah menjadi expired / tidak berlaku
            window.location.reload();
            return;
        }

        const hours = Math.floor(distance / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        hoursEl.textContent = String(hours).padStart(2, '0');
        minutesEl.textContent = String(minutes).padStart(2, '0');
        secondsEl.textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);

    // 2. Background Auto-Check Status Pembayaran
    const checkUrl = "{{ route('checkout.status.check', ['template' => $template->id, 'order' => $order->order_number]) }}";
    let isChecking = false;

    const pollInterval = setInterval(async function() {
        if (isChecking) return;
        isChecking = true;

        try {
            const response = await fetch(checkUrl, {
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            });

            if (response.ok) {
                const data = await response.json();
                if (data.is_paid || data.is_expired) {
                    clearInterval(pollInterval);
                    clearInterval(countdownInterval);
                    window.location.reload();
                }
            }
        } catch (err) {
            console.error('Auto status check error:', err);
        } finally {
            isChecking = false;
        }
    }, 3000);
});
@endif
</script>

@endsection
