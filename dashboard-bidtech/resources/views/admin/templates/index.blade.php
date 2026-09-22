@extends('layouts.admin')

@section('title', 'Katalog Template - Admin CMS Bidtech')

@section('content')
<div class="max-w-7xl mx-auto space-y-8">
    
    <!-- Top Bar Title & Quick Action -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
            <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Katalog Desain Template</h1>
            <p class="text-sm text-slate-500 mt-1">Kelola master data template website, harga paket, dan pemantauan view counter secara visual tanpa perlu koding.</p>
        </div>
        <div class="flex items-center gap-3">
            <a href="{{ route('dashboard.templates.create') }}" 
               class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-sm transition-all hover:shadow-md hover:scale-[1.01] active:scale-[0.99]">
                <i data-lucide="plus" class="w-4 h-4"></i>
                <span>Tambah Template Baru</span>
            </a>
        </div>
    </div>

    <!-- Quick Stats Bento Grid -->
    <div class="grid grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
        <div class="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
            <div class="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <i data-lucide="layout" class="w-6 h-6"></i>
            </div>
            <div>
                <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Template</p>
                <p class="text-2xl font-bold text-slate-900 mt-0.5">{{ $stats['total'] }}</p>
            </div>
        </div>

        <div class="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
            <div class="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <i data-lucide="check-circle" class="w-6 h-6"></i>
            </div>
            <div>
                <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Template Aktif</p>
                <p class="text-2xl font-bold text-slate-900 mt-0.5">{{ $stats['active'] }}</p>
            </div>
        </div>

        <div class="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
            <div class="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <i data-lucide="shopping-bag" class="w-6 h-6"></i>
            </div>
            <div>
                <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Terjual</p>
                <p class="text-2xl font-bold text-emerald-700 mt-0.5">{{ $stats['total_sales'] }} <span class="text-xs font-normal text-slate-500">Unit</span></p>
            </div>
        </div>

        <div class="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
            <div class="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                <i data-lucide="eye" class="w-6 h-6"></i>
            </div>
            <div>
                <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Penayangan</p>
                <p class="text-2xl font-bold text-slate-900 mt-0.5">{{ number_format($stats['total_views'], 0, ',', '.') }}</p>
            </div>
        </div>

        <div class="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
            <div class="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <i data-lucide="layers" class="w-6 h-6"></i>
            </div>
            <div>
                <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Kategori</p>
                <p class="text-2xl font-bold text-slate-900 mt-0.5">{{ $stats['categories_count'] }}</p>
            </div>
        </div>
    </div>

    <!-- Filter & Search Bar -->
    <div class="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <form method="GET" action="{{ route('dashboard.templates.index') }}" class="flex flex-1 flex-col sm:flex-row gap-3">
            <div class="relative flex-1">
                <i data-lucide="search" class="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2"></i>
                <input type="text" name="search" value="{{ request('search') }}" 
                       placeholder="Cari nama template, tag, atau deskripsi..." 
                       class="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-slate-50/50">
            </div>

            <div class="sm:w-48">
                <select name="category" onchange="this.form.submit()"
                        class="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-slate-50/50 text-slate-700">
                    <option value="all">Semua Kategori</option>
                    @foreach($categories as $cat)
                        <option value="{{ $cat }}" {{ request('category') === $cat ? 'selected' : '' }}>{{ $cat }}</option>
                    @endforeach
                </select>
            </div>

            <div class="sm:w-56">
                <select name="sort" onchange="this.form.submit()"
                        class="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-slate-50/50 text-slate-700 font-medium">
                    <option value="newest" {{ request('sort', 'newest') === 'newest' ? 'selected' : '' }}>Urut: Terbaru</option>
                    <option value="sales" {{ request('sort') === 'sales' ? 'selected' : '' }}>🔥 Urut: Paling Laku (Terlaris)</option>
                    <option value="views" {{ request('sort') === 'views' ? 'selected' : '' }}>👁️ Urut: Paling Banyak Dilihat</option>
                    <option value="price_high" {{ request('sort') === 'price_high' ? 'selected' : '' }}>Urut: Harga Tertinggi</option>
                    <option value="price_low" {{ request('sort') === 'price_low' ? 'selected' : '' }}>Urut: Harga Terendah</option>
                </select>
            </div>

            <button type="submit" class="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-sm font-semibold transition">
                Filter
            </button>
            
            @if(request('search') || request('category') || request('sort'))
                <a href="{{ route('dashboard.templates.index') }}" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-sm font-medium transition text-center">
                    Reset
                </a>
            @endif
        </form>
    </div>

    <!-- Tabel Daftar Template -->
    <div class="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div class="overflow-x-auto">
            <table class="w-full text-left text-sm text-slate-600">
                <thead class="bg-slate-50 text-slate-700 text-xs uppercase font-bold tracking-wider border-b border-slate-200/80">
                    <tr>
                        <th class="py-3.5 px-4 w-12 text-center">ID</th>
                        <th class="py-3.5 px-4">Template & Preview</th>
                        <th class="py-3.5 px-4">Kategori</th>
                        <th class="py-3.5 px-4">Rincian Paket Harga</th>
                        <th class="py-3.5 px-4 text-center">Terjual (Laku)</th>
                        <th class="py-3.5 px-4 text-center">Views</th>
                        <th class="py-3.5 px-4 text-center">Status</th>
                        <th class="py-3.5 px-4 text-right">Aksi</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                    @forelse($templates as $template)
                        <tr class="hover:bg-slate-50/70 transition">
                            <td class="py-4 px-4 text-center font-mono font-bold text-xs text-slate-400">
                                #{{ $template->id }}
                            </td>
                            <td class="py-4 px-4">
                                <div class="flex items-center gap-3.5">
                                    <div class="w-16 h-11 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0 relative group">
                                        <img src="{{ $template->preview_url }}" alt="{{ $template->name }}" class="w-full h-full object-cover object-top">
                                    </div>
                                    <div class="max-w-xs">
                                        <div class="flex items-center gap-1.5">
                                            <p class="font-bold text-slate-900 text-sm leading-snug">{{ $template->name }}</p>
                                            @if($template->sales_count >= 10)
                                                <span class="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-black bg-rose-100 text-rose-700 uppercase tracking-wider shrink-0" title="Top Seller">🔥 Best</span>
                                            @endif
                                        </div>
                                        <p class="text-xs text-slate-500 truncate mt-0.5">{{ $template->description ?? $template->template_desc }}</p>
                                        @if(!empty($template->tags_list))
                                            <div class="flex flex-wrap gap-1 mt-1">
                                                @foreach(array_slice($template->tags_list, 0, 3) as $tag)
                                                    <span class="px-1.5 py-0.5 rounded bg-slate-100 text-[10px] text-slate-600 font-medium">{{ $tag }}</span>
                                                @endforeach
                                            </div>
                                        @endif
                                    </div>
                                </div>
                            </td>
                            <td class="py-4 px-4">
                                <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/50">
                                    {{ $template->category }}
                                </span>
                            </td>
                            <td class="py-4 px-4">
                                <p class="font-bold text-slate-900 text-sm">Rp {{ number_format($template->total_package_price, 0, ',', '.') }}</p>
                                <div class="text-[11px] text-slate-500 space-y-0.5 mt-1 font-mono">
                                    <p>Tpl: Rp {{ number_format($template->template_price, 0, ',', '.') }}</p>
                                    <p>Srv: Rp {{ number_format($template->server_price, 0, ',', '.') }}</p>
                                    <p>Lay: Rp {{ number_format($template->service_price, 0, ',', '.') }}</p>
                                </div>
                            </td>
                            <td class="py-4 px-4 text-center">
                                <div class="inline-flex flex-col items-center">
                                    <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold {{ $template->sales_count > 0 ? 'bg-emerald-100 text-emerald-800 border border-emerald-300/60' : 'bg-slate-100 text-slate-500' }}">
                                        <i data-lucide="shopping-bag" class="w-3.5 h-3.5"></i>
                                        <span>{{ $template->sales_count }} Terjual</span>
                                    </span>
                                    @if($template->sales_count > 0)
                                        <span class="text-[11px] text-slate-500 font-mono font-bold mt-1">Rp {{ number_format($template->total_sales_revenue, 0, ',', '.') }}</span>
                                    @else
                                        <span class="text-[10px] text-slate-400 mt-0.5">Belum laku</span>
                                    @endif
                                </div>
                            </td>
                            <td class="py-4 px-4 text-center">
                                <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-700">
                                    <i data-lucide="eye" class="w-3.5 h-3.5"></i>
                                    <span>{{ number_format($template->views, 0, ',', '.') }}</span>
                                </span>
                            </td>

                            <td class="py-4 px-4 text-center">
                                <form action="{{ route('dashboard.templates.toggle-active', $template) }}" method="POST" class="inline">
                                    @csrf
                                    <button type="submit" title="Klik untuk ubah status"
                                            class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold cursor-pointer transition {{ $template->is_active ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200' : 'bg-slate-100 text-slate-600 hover:bg-slate-200' }}">
                                        <span class="w-1.5 h-1.5 rounded-full {{ $template->is_active ? 'bg-emerald-600' : 'bg-slate-400' }}"></span>
                                        <span>{{ $template->is_active ? 'Aktif' : 'Non-aktif' }}</span>
                                    </button>
                                </form>
                            </td>
                            <td class="py-4 px-4 text-right">
                                <div class="flex items-center justify-end gap-1.5">
                                    <a href="{{ $template->landing_url }}" target="_blank" title="Lihat Demo"
                                       class="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition">
                                        <i data-lucide="external-link" class="w-4 h-4"></i>
                                    </a>
                                    <a href="{{ route('dashboard.templates.edit', $template) }}" title="Edit Template"
                                       class="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition">
                                        <i data-lucide="edit-3" class="w-4 h-4"></i>
                                    </a>
                                    <form action="{{ route('dashboard.templates.destroy', $template) }}" method="POST" 
                                          onsubmit="return confirm('Apakah Anda yakin ingin menghapus template {{ $template->name }}?');" class="inline">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" title="Hapus Template"
                                                class="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition">
                                            <i data-lucide="trash-2" class="w-4 h-4"></i>
                                        </button>
                                    </form>
                                </div>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="7" class="py-12 text-center text-slate-400">
                                <i data-lucide="inbox" class="w-8 h-8 mx-auto mb-2 text-slate-300"></i>
                                <p class="text-sm font-medium">Tidak ada template ditemukan.</p>
                            </td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>

        @if($templates->hasPages())
            <div class="p-4 border-t border-slate-100">
                {{ $templates->links() }}
            </div>
        @endif
    </div>
</div>
@endsection
