@extends('layouts.dashboard')

@section('title', 'Detail & Invoice Pesanan - Bidtech')

@section('content')
<div class="max-w-7xl mx-auto space-y-6">
    <!-- Breadcrumb Navigasi Klien -->
    <div class="flex items-center gap-2 text-xs font-semibold text-ink-muted">
        <a href="{{ route('dashboard') }}" class="hover:text-ink transition flex items-center gap-1">
            <i data-lucide="layout-grid" class="w-3.5 h-3.5"></i>
            <span>Dashboard</span>
        </a>
        <i data-lucide="chevron-right" class="w-3 h-3"></i>
        <span class="text-primary font-bold">Detail Order & Invoice</span>
    </div>

    <!-- Rincian Pesanan & Invoice (Format Sesuai Halaman Bayar) -->
    @include('components.dashboard.order-detail')
</div>
@endsection
