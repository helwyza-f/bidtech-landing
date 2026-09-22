@extends('layouts.dashboard')

@section('title', $isAdmin ? 'Admin Dashboard - Bidtech' : 'Dashboard Klien - Bidtech')

@section('content')

    <!-- ================= TAB 1: DASHBOARD ================= -->
    <div id="view-dashboard" class="page-view active max-w-7xl">
        <!-- Top Header -->
        @include('components.dashboard.header')

        @if(!empty($isAdmin) && $isAdmin)
            <!-- Notifikasi Flash Message -->
            @if(session('success'))
                <div class="mt-6 p-4 rounded-2xl bg-success-surface border border-primary/30 text-forest flex items-center justify-between text-sm font-semibold shadow-xs">
                    <div class="flex items-center gap-2.5">
                        <i data-lucide="check-circle-2" class="w-5 h-5 text-primary-700"></i>
                        <span>{{ session('success') }}</span>
                    </div>
                    <button type="button" onclick="this.parentElement.remove()" class="text-primary-800 hover:text-primary-950 cursor-pointer p-1">✕</button>
                </div>
            @endif

            <div class="mt-8 space-y-8">
                <!-- ================= 1. EXECUTIVE WELCOME & QUICK ACTION BAR ================= -->
                <div class="relative overflow-hidden rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-primary/25"
                     style="background: linear-gradient(135deg, #0B1B17 0%, #0E2502 55%, #153306 100%);">
                    <!-- Ambient Bidtech Glow Effects -->
                    <div class="absolute -right-12 -bottom-12 w-80 h-80 rounded-full blur-3xl pointer-events-none"
                         style="background: radial-gradient(circle, rgba(99, 224, 9, 0.22) 0%, transparent 70%);"></div>
                    <div class="absolute -left-12 -top-12 w-56 h-56 rounded-full blur-2xl pointer-events-none"
                         style="background: radial-gradient(circle, rgba(99, 224, 9, 0.12) 0%, transparent 70%);"></div>

                    <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div class="space-y-2.5 max-w-2xl">
                            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-primary/15 text-primary border border-primary/30 backdrop-blur-xs">
                                <i data-lucide="shield-check" class="w-3.5 h-3.5 text-primary"></i>
                                <span>Bidtech Administrator Workspace</span>
                            </span>
                            <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                                Selamat Datang di <span class="text-primary">Dashboard Admin</span>
                            </h1>
                            <p class="text-slate-200/90 text-sm leading-relaxed">
                                Pantau ringkasan pendapatan omzet, performa penjualan template, dan aktivitas pesanan klien secara terpusat. Untuk manajemen transaksi & update status manual klien, silakan buka menu Kelola Pesanan.
                            </p>
                        </div>
                        <div class="flex flex-wrap items-center gap-3">
                            <a href="{{ route('dashboard.order') }}" 
                               class="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-primary hover:bg-primary-hover text-ink font-extrabold text-sm shadow-lg shadow-primary/25 hover:shadow-primary/35 transition-all transform hover:-translate-y-0.5 cursor-pointer">
                                <i data-lucide="shopping-bag" class="w-4 h-4 text-ink"></i>
                                <span>Buka Kelola Pesanan</span>
                                <i data-lucide="arrow-right" class="w-4 h-4 text-ink"></i>
                            </a>
                        </div>
                    </div>
                </div>

                <!-- ================= 2. EXECUTIVE KPI BENTO CARDS ================= -->
                <div class="grid grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
                    <!-- Total Omzet Lunas -->
                    <div class="bg-surface border border-border rounded-3xl p-5 shadow-xs flex flex-col justify-between">
                        <div class="flex items-center justify-between">
                            <span class="text-xs font-bold text-ink-muted uppercase tracking-wider">Total Omzet Lunas</span>
                            <div class="w-10 h-10 rounded-2xl bg-success-surface text-primary-800 flex items-center justify-center">
                                <i data-lucide="wallet" class="w-5 h-5 text-primary-700"></i>
                            </div>
                        </div>
                        <div class="mt-3">
                            <p class="text-xl sm:text-2xl font-extrabold text-primary truncate">
                                Rp {{ number_format($adminStats['total_omzet'], 0, ',', '.') }}
                            </p>
                            <p class="text-[11px] text-ink-muted mt-0.5">
                                {{ $adminStats['paid_orders'] }} Transaksi Lunas
                            </p>
                        </div>
                    </div>

                    <!-- Total Pesanan -->
                    <div class="bg-surface border border-border rounded-3xl p-5 shadow-xs flex flex-col justify-between">
                        <div class="flex items-center justify-between">
                            <span class="text-xs font-bold text-ink-muted uppercase tracking-wider">Total Pesanan</span>
                            <div class="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center">
                                <i data-lucide="shopping-cart" class="w-5 h-5"></i>
                            </div>
                        </div>
                        <div class="mt-3">
                            <p class="text-xl sm:text-2xl font-extrabold text-ink">
                                {{ $adminStats['total_orders'] }}
                            </p>
                            <p class="text-[11px] text-ink-muted mt-0.5">
                                <span class="text-primary-800 font-semibold">{{ $adminStats['paid_orders'] }} Lunas</span> &bull; 
                                <span class="text-amber-700 font-semibold">{{ $adminStats['unpaid_orders'] }} Pending</span>
                            </p>
                        </div>
                    </div>

                    <!-- Klien Terdaftar -->
                    <div class="bg-surface border border-border rounded-3xl p-5 shadow-xs flex flex-col justify-between">
                        <div class="flex items-center justify-between">
                            <span class="text-xs font-bold text-ink-muted uppercase tracking-wider">Klien Terdaftar</span>
                            <div class="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center">
                                <i data-lucide="users" class="w-5 h-5"></i>
                            </div>
                        </div>
                        <div class="mt-3">
                            <p class="text-xl sm:text-2xl font-extrabold text-ink">
                                {{ $adminStats['total_users'] }}
                            </p>
                            <p class="text-[11px] text-ink-muted mt-0.5">
                                Pengguna portal klien
                            </p>
                        </div>
                    </div>

                    <!-- Katalog Template -->
                    <div class="bg-surface border border-border rounded-3xl p-5 shadow-xs flex flex-col justify-between">
                        <div class="flex items-center justify-between">
                            <span class="text-xs font-bold text-ink-muted uppercase tracking-wider">Katalog Template</span>
                            <div class="w-10 h-10 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center">
                                <i data-lucide="layout-template" class="w-5 h-5"></i>
                            </div>
                        </div>
                        <div class="mt-3">
                            <p class="text-xl sm:text-2xl font-extrabold text-ink">
                                {{ $adminStats['active_templates'] }}
                            </p>
                            <p class="text-[11px] text-ink-muted mt-0.5">
                                Dari {{ $adminStats['total_templates'] }} total master
                            </p>
                        </div>
                    </div>

                    <!-- Kode Promo Aktif -->
                    <div class="bg-surface border border-border rounded-3xl p-5 shadow-xs flex flex-col justify-between">
                        <div class="flex items-center justify-between">
                            <span class="text-xs font-bold text-ink-muted uppercase tracking-wider">Kode Promo Aktif</span>
                            <div class="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
                                <i data-lucide="ticket-percent" class="w-5 h-5"></i>
                            </div>
                        </div>
                        <div class="mt-3">
                            <p class="text-xl sm:text-2xl font-extrabold text-ink">
                                {{ $adminStats['active_promos'] }}
                            </p>
                            <p class="text-[11px] text-ink-muted mt-0.5">
                                Dari {{ $adminStats['total_promos'] }} voucher & promo
                            </p>
                        </div>
                    </div>
                </div>

                <!-- ================= 3. QUICK NAVIGATION SHORTCUTS ================= -->
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                    <a href="{{ route('dashboard.order') }}" 
                       class="p-4 rounded-2xl bg-surface border border-border hover:border-primary/50 hover:bg-canvas transition group flex items-center gap-3.5">
                        <div class="w-10 h-10 rounded-xl bg-primary-50 text-primary-800 group-hover:bg-primary group-hover:text-ink flex items-center justify-center transition">
                            <i data-lucide="shopping-bag" class="w-5 h-5"></i>
                        </div>
                        <div class="min-w-0">
                            <p class="text-xs font-bold text-ink group-hover:text-primary transition truncate">Kelola Pesanan</p>
                            <p class="text-[11px] text-ink-muted truncate">Daftar & status klien</p>
                        </div>
                    </a>

                    <a href="{{ route('dashboard.templates.index') }}" 
                       class="p-4 rounded-2xl bg-surface border border-border hover:border-primary/50 hover:bg-canvas transition group flex items-center gap-3.5">
                        <div class="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center transition">
                            <i data-lucide="layout-template" class="w-5 h-5"></i>
                        </div>
                        <div class="min-w-0">
                            <p class="text-xs font-bold text-ink group-hover:text-primary transition truncate">Katalog Template</p>
                            <p class="text-[11px] text-ink-muted truncate">Master & statistik terjual</p>
                        </div>
                    </a>

                    <a href="{{ route('dashboard.promos.index') }}" 
                       class="p-4 rounded-2xl bg-surface border border-border hover:border-primary/50 hover:bg-canvas transition group flex items-center gap-3.5">
                        <div class="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 group-hover:bg-amber-600 group-hover:text-white flex items-center justify-center transition">
                            <i data-lucide="ticket-percent" class="w-5 h-5"></i>
                        </div>
                        <div class="min-w-0">
                            <p class="text-xs font-bold text-ink group-hover:text-primary transition truncate">Kode Promo</p>
                            <p class="text-[11px] text-ink-muted truncate">Diskon & kuota promo</p>
                        </div>
                    </a>

                    <a href="{{ route('dashboard.promos.partners') }}" 
                       class="p-4 rounded-2xl bg-surface border border-border hover:border-primary/50 hover:bg-canvas transition group flex items-center gap-3.5">
                        <div class="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 group-hover:bg-purple-600 group-hover:text-white flex items-center justify-center transition">
                            <i data-lucide="users" class="w-5 h-5"></i>
                        </div>
                        <div class="min-w-0">
                            <p class="text-xs font-bold text-ink group-hover:text-primary transition truncate">Mitra & Komisi</p>
                            <p class="text-[11px] text-ink-muted truncate">Afiliasi & penarikan</p>
                        </div>
                    </a>
                </div>

                <!-- ================= 4. TEMPLATE TERLARIS LEADERBOARD (FITUR 2) ================= -->
                @if(!empty($adminStats['top_templates']) && $adminStats['top_templates']->count() > 0)
                <div class="bg-surface border border-border rounded-3xl p-6 sm:p-7 shadow-xs space-y-4">
                    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-border">
                        <div>
                            <h2 class="font-bold text-ink text-base sm:text-lg flex items-center gap-2">
                                <i data-lucide="trophy" class="w-5 h-5 text-amber-500"></i>
                                <span>Performa Penjualan: Template Paling Laku</span>
                            </h2>
                            <p class="text-xs text-ink-muted mt-0.5">Daftar template website dengan penjualan tertinggi di sistem.</p>
                        </div>
                        <a href="{{ route('dashboard.templates.index', ['sort' => 'sales']) }}" class="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline self-start sm:self-auto">
                            <span>Lihat Katalog Lengkap</span>
                            <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
                        </a>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                        @foreach($adminStats['top_templates'] as $idx => $tt)
                            <div class="bg-canvas border border-border rounded-2xl p-4 flex flex-col justify-between space-y-3 relative group hover:border-primary/40 transition">
                                <div class="flex items-center gap-3">
                                    <div class="w-7 h-7 rounded-lg {{ $idx === 0 ? 'bg-amber-400 text-slate-950 font-black' : ($idx === 1 ? 'bg-slate-300 text-slate-900 font-bold' : ($idx === 2 ? 'bg-amber-700 text-white font-bold' : 'bg-surface text-ink-muted font-bold')) }} flex items-center justify-center text-xs shrink-0 shadow-2xs">
                                        #{{ $idx + 1 }}
                                    </div>
                                    <div class="min-w-0 flex-1">
                                        <h3 class="text-xs font-bold text-ink truncate" title="{{ $tt->name }}">{{ $tt->name }}</h3>
                                        <p class="text-[11px] text-ink-muted truncate">{{ $tt->category }}</p>
                                    </div>
                                </div>

                                <div class="aspect-[16/10] rounded-xl overflow-hidden bg-surface border border-border">
                                    <img src="{{ $tt->preview_url }}" alt="{{ $tt->name }}" class="w-full h-full object-cover object-top group-hover:scale-105 transition duration-300">
                                </div>

                                <div class="pt-2 border-t border-border flex items-center justify-between">
                                    <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-success-surface text-primary-800 border border-primary/20">
                                        <i data-lucide="shopping-bag" class="w-3 h-3"></i>
                                        <span>{{ $tt->sales_count }} Laku</span>
                                    </span>
                                    <span class="text-[11px] font-mono font-bold text-ink">
                                        Rp {{ number_format($tt->price, 0, ',', '.') }}
                                    </span>
                                </div>
                            </div>
                        @endforeach
                    </div>
                </div>
                @endif

                <!-- ================= 5. PESANAN KLIEN TERBARU (EXECUTIVE PREVIEW) ================= -->
                <div class="bg-surface border border-border rounded-3xl p-6 sm:p-7 shadow-xs space-y-4">
                    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border">
                        <div>
                            <h2 class="font-bold text-ink text-base sm:text-lg flex items-center gap-2">
                                <i data-lucide="clock" class="w-5 h-5 text-primary"></i>
                                <span>Pesanan Klien Terbaru</span>
                            </h2>
                            <p class="text-xs text-ink-muted mt-0.5">5 transaksi pesanan terakhir yang masuk ke dalam sistem.</p>
                        </div>
                        <a href="{{ route('dashboard.order') }}" class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover text-ink font-bold text-xs shadow-xs transition cursor-pointer self-start sm:self-auto">
                            <span>Buka Semua Pesanan ({{ $adminStats['total_orders'] }})</span>
                            <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
                        </a>
                    </div>

                    <div class="overflow-x-auto rounded-2xl border border-border">
                        <table class="w-full text-left text-xs sm:text-sm text-ink-muted">
                            <thead class="text-[11px] uppercase font-bold text-ink bg-canvas border-b border-border tracking-wider">
                                <tr>
                                    <th class="py-3 px-3.5">No. Order & Tanggal</th>
                                    <th class="py-3 px-3.5">Pemesan</th>
                                    <th class="py-3 px-3.5">Template / Domain</th>
                                    <th class="py-3 px-3.5 text-center">Status Pembayaran</th>
                                    <th class="py-3 px-3.5 text-right">Total</th>
                                    <th class="py-3 px-3.5 text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-border">
                                @forelse($adminStats['recent_orders'] as $ro)
                                    @php
                                        $sVal = $ro->status->value ?? $ro->status;
                                        $orderUser = $ro->user;
                                    @endphp
                                    <tr class="hover:bg-canvas/60 transition">
                                        <td class="py-3.5 px-3.5">
                                            <p class="font-mono font-bold text-xs text-ink">{{ $ro->order_number }}</p>
                                            <p class="text-[11px] text-ink-muted mt-0.5">{{ $ro->created_at ? $ro->created_at->format('d M Y, H:i') : '-' }}</p>
                                        </td>
                                        <td class="py-3.5 px-3.5">
                                            <p class="font-bold text-xs text-ink">{{ $ro->full_name }}</p>
                                            <p class="text-[11px] text-ink-muted truncate max-w-[140px]">{{ $ro->email }}</p>
                                        </td>
                                        <td class="py-3.5 px-3.5">
                                            <p class="text-xs font-semibold text-ink">{{ $ro->template?->name ?? 'Template Website' }}</p>
                                            <p class="text-[11px] text-primary font-bold flex items-center gap-1">
                                                <i data-lucide="globe" class="w-3 h-3"></i>
                                                <span>{{ $orderUser?->domain_final ?: $ro->domain_name }}</span>
                                            </p>
                                        </td>
                                        <td class="py-3.5 px-3.5 text-center">
                                            @if($sVal === 'paid')
                                                <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-[#DCFCE7] text-[#166534]">
                                                    <i data-lucide="check-circle" class="w-3 h-3"></i>
                                                    <span>LUNAS</span>
                                                </span>
                                            @elseif($sVal === 'invalid')
                                                <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-[#FEE2E2] text-[#991B1B]">
                                                    <i data-lucide="x-circle" class="w-3 h-3"></i>
                                                    <span>BATAL</span>
                                                </span>
                                            @else
                                                <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-[#FEF3C7] text-[#92400E]">
                                                    <i data-lucide="clock" class="w-3 h-3"></i>
                                                    <span>UNPAID</span>
                                                </span>
                                            @endif
                                        </td>
                                        <td class="py-3.5 px-3.5 text-right font-mono font-bold text-xs text-ink">
                                            Rp {{ number_format($ro->total_price, 0, ',', '.') }}
                                        </td>
                                        <td class="py-3.5 px-3.5 text-center">
                                            <a href="{{ route('dashboard.order', ['search' => $ro->order_number]) }}" 
                                               class="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-primary-50 text-primary-800 hover:bg-primary-100 text-xs font-semibold transition"
                                               title="Kelola Pesanan Ini">
                                                <span>Kelola</span>
                                                <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
                                            </a>
                                        </td>
                                    </tr>
                                @empty
                                    <tr>
                                        <td colspan="6" class="py-10 text-center text-ink-muted">
                                            <i data-lucide="inbox" class="w-8 h-8 mx-auto mb-2 text-ink-muted/50"></i>
                                            <p class="font-medium text-sm">Belum ada pesanan terbaru.</p>
                                        </td>
                                    </tr>
                                @endforelse
                            </tbody>
                        </table>
                    </div>

                    <div class="pt-2 text-center">
                        <a href="{{ route('dashboard.order') }}" class="inline-flex items-center gap-2 text-xs font-bold text-primary hover:underline">
                            <span>Buka Halaman Kelola Pesanan Klien untuk Mengubah Status & Download Invoice</span>
                            <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
                        </a>
                    </div>
                </div>
            </div>
        @else
            <!-- Quick Metrics Bento Grid untuk Klien Biasa -->
            @include('components.dashboard.metric-cards')

            <!-- Lower Content: 2 Columns (Progress Stepper & Support Card) -->
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-8 items-stretch">
                <!-- Progress Stepper (8 Cols) -->
                <div class="lg:col-span-8 flex flex-col">
                    @include('components.dashboard.progress-stepper')
                </div>

                <!-- Support & Order Info (4 Cols) -->
                <div class="lg:col-span-4 flex flex-col">
                    @include('components.dashboard.support-card')
                </div>
            </div>
        @endif
    </div>

    <!-- ================= TAB 2: DETAIL ORDER (FORMAT IDENTIK BAYAR) ================= -->
    @include('components.dashboard.order-detail')

    <!-- ================= TAB 3: PENGATURAN AKUN ================= -->
    @include('components.dashboard.account-settings')

@endsection
