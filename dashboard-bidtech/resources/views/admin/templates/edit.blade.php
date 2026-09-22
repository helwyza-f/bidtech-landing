@extends('layouts.admin')

@section('title', 'Edit Template - Admin CMS Bidtech')

@section('content')
<div class="max-w-4xl mx-auto space-y-6">
    <!-- Breadcrumb & Title -->
    <div>
        <div class="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            <a href="{{ route('dashboard.templates.index') }}" class="hover:text-emerald-600 transition">Katalog Template</a>
            <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
            <span class="text-slate-700">Edit Template #{{ $template->id }}</span>
        </div>
        <div class="flex items-center justify-between">
            <div>
                <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Edit Template: {{ $template->name }}</h1>
                <p class="text-sm text-slate-500 mt-1">Perbarui data paket, rincian harga, atau gambar preview.</p>
            </div>
            <div class="flex items-center gap-2 bg-purple-50 text-purple-700 px-3.5 py-1.5 rounded-xl text-xs font-bold">
                <i data-lucide="eye" class="w-4 h-4"></i>
                <span>{{ number_format($template->views, 0, ',', '.') }} Penayangan</span>
            </div>
        </div>
    </div>

    <!-- Main Card Form -->
    <form action="{{ route('dashboard.templates.update', $template) }}" method="POST" enctype="multipart/form-data" 
          class="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 sm:p-8 space-y-8">
        @csrf
        @method('PUT')

        <!-- SECTION 1: INFORMASI DASAR -->
        <div>
            <h2 class="text-base font-bold text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
                <i data-lucide="info" class="w-4 h-4 text-emerald-600"></i>
                <span>Informasi Dasar Template</span>
            </h2>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
                <div class="sm:col-span-2">
                    <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Nama Template <span class="text-rose-500">*</span>
                    </label>
                    <input type="text" name="name" value="{{ old('name', $template->name) }}" required
                           class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm font-medium text-slate-900">
                </div>

                <div>
                    <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Kategori <span class="text-rose-500">*</span>
                    </label>
                    <input type="text" name="category" list="category-list" value="{{ old('category', $template->category) }}" required
                           class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm font-medium text-slate-900">
                    <datalist id="category-list">
                        @foreach($existingCategories as $cat)
                            <option value="{{ $cat }}">
                        @endforeach
                    </datalist>
                </div>

                <div>
                    <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        URL Live Demo / Preview
                    </label>
                    <input type="text" name="demo_url" value="{{ old('demo_url', $template->demo_url) }}"
                           placeholder="Contoh: /demo/automotive" 
                           class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm text-slate-900">
                </div>

                <div class="sm:col-span-2">
                    <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Deskripsi Singkat / Subcategory
                    </label>
                    <textarea name="description" rows="2" 
                              class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm text-slate-900">{{ old('description', $template->description) }}</textarea>
                </div>

                <div class="sm:col-span-2">
                    <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Tags (Pisahkan dengan koma)
                    </label>
                    <input type="text" name="tags" value="{{ old('tags', $template->tags) }}"
                           placeholder="Contoh: Automotive, Rental Mobil, Responsive" 
                           class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm text-slate-900">
                </div>
            </div>
        </div>

        <!-- SECTION 2: PEMERINGKATAN & RINCIAN HARGA PAKET -->
        <div>
            <h2 class="text-base font-bold text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
                <i data-lucide="tag" class="w-4 h-4 text-emerald-600"></i>
                <span>Pemecahan Rincian Harga Paket (3 Komponen)</span>
            </h2>

            <!-- Total Preview Badge -->
            <div class="mt-4 p-4 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-between">
                <div>
                    <span class="text-xs font-semibold text-emerald-700 uppercase tracking-wider">Total Harga Paket (Otomatis)</span>
                    <p class="text-xs text-emerald-600">Dihitung otomatis dari: Template + Server + Layanan</p>
                </div>
                <div class="text-right">
                    <span id="display-total-price" class="text-2xl font-extrabold text-emerald-800 font-mono">
                        Rp {{ number_format($template->total_package_price, 0, ',', '.') }}
                    </span>
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-5">
                <!-- Komponen 1: Template -->
                <div class="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
                    <div>
                        <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                            1. Harga Template (Rp) <span class="text-rose-500">*</span>
                        </label>
                        <input type="number" id="input_template_price" name="template_price" value="{{ old('template_price', $template->template_price) }}" required min="0" step="1000"
                               class="price-input w-full px-3.5 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm font-bold text-slate-900 font-mono">
                    </div>
                    <div>
                        <label class="block text-[11px] font-semibold text-slate-500 mb-1">Keterangan Template</label>
                        <input type="text" name="template_desc" value="{{ old('template_desc', $template->template_desc) }}"
                               class="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-700">
                    </div>
                </div>

                <!-- Komponen 2: Server -->
                <div class="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
                    <div>
                        <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                            2. Harga Server (Rp) <span class="text-rose-500">*</span>
                        </label>
                        <input type="number" id="input_server_price" name="server_price" value="{{ old('server_price', $template->server_price) }}" required min="0" step="1000"
                               class="price-input w-full px-3.5 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm font-bold text-slate-900 font-mono">
                    </div>
                    <div>
                        <label class="block text-[11px] font-semibold text-slate-500 mb-1">Keterangan Server</label>
                        <input type="text" name="server_desc" value="{{ old('server_desc', $template->server_desc) }}"
                               class="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-700">
                    </div>
                </div>

                <!-- Komponen 3: Layanan -->
                <div class="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
                    <div>
                        <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                            3. Harga Layanan (Rp) <span class="text-rose-500">*</span>
                        </label>
                        <input type="number" id="input_service_price" name="service_price" value="{{ old('service_price', $template->service_price) }}" required min="0" step="1000"
                               class="price-input w-full px-3.5 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm font-bold text-slate-900 font-mono">
                    </div>
                    <div>
                        <label class="block text-[11px] font-semibold text-slate-500 mb-1">Keterangan Layanan</label>
                        <input type="text" name="service_desc" value="{{ old('service_desc', $template->service_desc) }}"
                               class="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-700">
                    </div>
                </div>
            </div>
        </div>

        <!-- SECTION 3: GAMBAR PREVIEW & STATUS -->
        <div>
            <h2 class="text-base font-bold text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
                <i data-lucide="image" class="w-4 h-4 text-emerald-600"></i>
                <span>Thumbnail Preview & Status</span>
            </h2>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
                <!-- Current Thumbnail Preview -->
                <div class="sm:col-span-2 flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div class="w-24 h-16 rounded-lg overflow-hidden bg-white border border-slate-200 shrink-0">
                        <img src="{{ $template->preview_url }}" alt="{{ $template->name }}" class="w-full h-full object-cover object-top">
                    </div>
                    <div>
                        <p class="text-xs font-bold text-slate-700">Gambar Thumbnail Saat Ini</p>
                        <p class="text-xs text-slate-500 font-mono mt-0.5">{{ $template->preview }}</p>
                    </div>
                </div>

                <div>
                    <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Ganti File Gambar (Opsional)
                    </label>
                    <input type="file" name="preview_file" accept="image/*"
                           class="w-full px-3.5 py-2 text-sm text-slate-600 border border-slate-200 rounded-xl file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 cursor-pointer">
                </div>

                <div>
                    <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Atau Ubah Path Gambar
                    </label>
                    <input type="text" name="preview_url" value="{{ old('preview_url', $template->preview) }}"
                           class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm text-slate-900">
                </div>

                <div class="sm:col-span-2 pt-2">
                    <label class="inline-flex items-center gap-2.5 cursor-pointer select-none">
                        <input type="checkbox" name="is_active" value="1" {{ old('is_active', $template->is_active) ? 'checked' : '' }}
                               class="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300">
                        <span class="text-sm font-semibold text-slate-800">Status Aktif (Tampil di katalog Next.js dan alur checkout)</span>
                    </label>
                </div>
            </div>
        </div>

        <!-- Tombol Aksi -->
        <div class="pt-6 border-t border-slate-100 flex items-center justify-end gap-3">
            <a href="{{ route('dashboard.templates.index') }}" 
               class="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold text-sm transition">
                Batal
            </a>
            <button type="submit" 
                    class="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-sm transition-all hover:shadow-md hover:scale-[1.01] active:scale-[0.99] flex items-center gap-2">
                <i data-lucide="save" class="w-4 h-4"></i>
                <span>Simpan Perubahan</span>
            </button>
        </div>
    </form>
</div>

<script>
    function updateTotalPrice() {
        const tpl = parseInt(document.getElementById('input_template_price').value) || 0;
        const srv = parseInt(document.getElementById('input_server_price').value) || 0;
        const svc = parseInt(document.getElementById('input_service_price').value) || 0;
        const total = tpl + srv + svc;
        document.getElementById('display-total-price').innerText = 'Rp ' + total.toLocaleString('id-ID');
    }

    document.querySelectorAll('.price-input').forEach(input => {
        input.addEventListener('input', updateTotalPrice);
    });
</script>
@endsection
