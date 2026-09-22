@extends('layouts.admin')

@section('title', 'Tambah Template Baru - Admin CMS Bidtech')

@section('content')
<div class="max-w-4xl mx-auto space-y-6">
    <!-- Breadcrumb & Title -->
    <div>
        <div class="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            <a href="{{ route('dashboard.templates.index') }}" class="hover:text-emerald-600 transition">Katalog Template</a>
            <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
            <span class="text-slate-700">Tambah Template Baru</span>
        </div>
        <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Formulir Tambah Template</h1>
        <p class="text-sm text-slate-500 mt-1">Input data desain website baru. Begitu disimpan, template langsung dapat diakses di Next.js dan alur checkout tanpa koding.</p>
    </div>

    <!-- Main Card Form -->
    <form action="{{ route('dashboard.templates.store') }}" method="POST" enctype="multipart/form-data" 
          class="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 sm:p-8 space-y-8">
        @csrf

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
                    <input type="text" name="name" value="{{ old('name') }}" required
                           placeholder="Contoh: Rentcar - Sewa Mobil #1" 
                           class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm font-medium text-slate-900">
                </div>

                <div>
                    <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Kategori <span class="text-rose-500">*</span>
                    </label>
                    <input type="text" name="category" list="category-list" value="{{ old('category') }}" required
                           placeholder="Pilih atau ketik kategori baru" 
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
                    <input type="text" name="demo_url" value="{{ old('demo_url') }}"
                           placeholder="Contoh: /demo/automotive atau https://demo.bidtech.com" 
                           class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm text-slate-900">
                </div>

                <div class="sm:col-span-2">
                    <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Deskripsi Singkat / Subcategory
                    </label>
                    <textarea name="description" rows="2" 
                              placeholder="Penjelasan keunggulan template dalam 1-2 kalimat..." 
                              class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm text-slate-900">{{ old('description') }}</textarea>
                </div>

                <div class="sm:col-span-2">
                    <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Tags (Pisahkan dengan koma)
                    </label>
                    <input type="text" name="tags" value="{{ old('tags') }}"
                           placeholder="Contoh: Automotive, Rental Mobil, Responsive, Landing Page" 
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
                    <p class="text-xs text-emerald-600">Dihitung otomatis dari: Harga Template + Server + Layanan</p>
                </div>
                <div class="text-right">
                    <span id="display-total-price" class="text-2xl font-extrabold text-emerald-800 font-mono">Rp 2.000.000</span>
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-5">
                <!-- Komponen 1: Template -->
                <div class="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
                    <div>
                        <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                            1. Harga Template (Rp) <span class="text-rose-500">*</span>
                        </label>
                        <input type="number" id="input_template_price" name="template_price" value="{{ old('template_price', 1000000) }}" required min="0" step="1000"
                               class="price-input w-full px-3.5 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm font-bold text-slate-900 font-mono">
                    </div>
                    <div>
                        <label class="block text-[11px] font-semibold text-slate-500 mb-1">Keterangan Template</label>
                        <input type="text" name="template_desc" value="{{ old('template_desc', 'Lisensi Desain UI/UX Eksklusif & Source Code Clean') }}"
                               class="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-700">
                    </div>
                </div>

                <!-- Komponen 2: Server -->
                <div class="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
                    <div>
                        <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                            2. Harga Server (Rp) <span class="text-rose-500">*</span>
                        </label>
                        <input type="number" id="input_server_price" name="server_price" value="{{ old('server_price', 500000) }}" required min="0" step="1000"
                               class="price-input w-full px-3.5 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm font-bold text-slate-900 font-mono">
                    </div>
                    <div>
                        <label class="block text-[11px] font-semibold text-slate-500 mb-1">Keterangan Server</label>
                        <input type="text" name="server_desc" value="{{ old('server_desc', 'Cloud Server Hosting 1 Tahun, NVMe High Speed & Free SSL') }}"
                               class="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-700">
                    </div>
                </div>

                <!-- Komponen 3: Layanan -->
                <div class="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
                    <div>
                        <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                            3. Harga Layanan (Rp) <span class="text-rose-500">*</span>
                        </label>
                        <input type="number" id="input_service_price" name="service_price" value="{{ old('service_price', 500000) }}" required min="0" step="1000"
                               class="price-input w-full px-3.5 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm font-bold text-slate-900 font-mono">
                    </div>
                    <div>
                        <label class="block text-[11px] font-semibold text-slate-500 mb-1">Keterangan Layanan</label>
                        <input type="text" name="service_desc" value="{{ old('service_desc', 'Setup Domain, Deployment Instan & Garansi Pemeliharaan') }}"
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
                <div>
                    <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Upload File Gambar Preview
                    </label>
                    <input type="file" name="preview_file" accept="image/*" id="preview_file_input"
                           class="w-full px-3.5 py-2 text-sm text-slate-600 border border-slate-200 rounded-xl file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 cursor-pointer">
                    <p class="text-[11px] text-slate-400 mt-1">Format: WEBP, PNG, JPG (Rasio 16:9 disarankan, maks 4MB)</p>
                </div>

                <div>
                    <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Atau URL Path Gambar yang Ada
                    </label>
                    <input type="text" name="preview_url" value="{{ old('preview_url') }}"
                           placeholder="Contoh: images/design_thumbnail/rentcar.webp" 
                           class="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm text-slate-900">
                </div>

                <div class="sm:col-span-2 pt-2">
                    <label class="inline-flex items-center gap-2.5 cursor-pointer select-none">
                        <input type="checkbox" name="is_active" value="1" {{ old('is_active', true) ? 'checked' : '' }}
                               class="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300">
                        <span class="text-sm font-semibold text-slate-800">Aktifkan Template (Langsung tampil di katalog website dan alur checkout)</span>
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
                <span>Simpan Template Baru</span>
            </button>
        </div>
    </form>
</div>

<script>
    // Live Kalkulator Total Harga Paket
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
