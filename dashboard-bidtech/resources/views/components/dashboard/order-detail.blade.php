<div id="view-detail-order" class="page-view {{ request()->routeIs('dashboard.order*') ? 'active' : '' }} max-w-6xl">
    <!-- Top Header & Status Banner -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
        <div>
            <div class="flex items-center gap-2.5">
                <h1 class="text-2xl lg:text-3xl font-bold text-ink">Detail & Invoice Pesanan</h1>
                @php
                    $isOrderPaid = $order ? $order->isPaid() : true;
                    $isOrderExpired = $order ? ($order->isExpired() || $order->status === \App\Enums\OrderStatus::Invalid) : false;
                @endphp
                @if($isOrderPaid)
                    <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#DCFCE7] text-[#166534] border border-[#86efac]">
                        <i data-lucide="check-circle" class="w-3.5 h-3.5"></i>
                        <span>LUNAS</span>
                    </span>
                @elseif($isOrderExpired)
                    <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#FEE2E2] text-[#991B1B] border border-[#fca5a5]">
                        <i data-lucide="x-circle" class="w-3.5 h-3.5"></i>
                        <span>KEDALUWARSA / BATAL</span>
                    </span>
                @else
                    <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#FEF3C7] text-[#92400E] border border-[#fde68a]">
                        <i data-lucide="clock" class="w-3.5 h-3.5"></i>
                        <span>MENUNGGU PEMBAYARAN</span>
                    </span>
                @endif
            </div>
            <p class="text-xs sm:text-sm text-ink-muted mt-1 font-mono">Invoice Resmi: {{ $orderNumber }}</p>
        </div>

        <div class="flex items-center gap-2.5 self-start sm:self-auto">
            <a href="{{ route('checkout.invoice.download', $orderNumber) }}" target="_blank" 
               class="inline-flex items-center gap-2 rounded-xl border border-primary bg-mint-soft hover:bg-primary hover:text-white px-4 py-2.5 text-xs sm:text-sm font-bold text-primary transition shadow-2xs cursor-pointer">
                <i data-lucide="file-down" class="w-4 h-4"></i>
                <span>Unduh Invoice (PDF)</span>
            </a>
        </div>
    </div>

    <!-- Main 2-Column Grid (Sesuai Struktur Halaman Bayar) -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start mt-6">

        <!-- ================= KOLOM KIRI (8 COLS): INFORMASI & RINCIAN PESANAN ================= -->
        <div class="lg:col-span-8 space-y-6">
            <div class="rounded-3xl border border-border bg-surface p-6 sm:p-8 space-y-6 shadow-xs">

                <!-- 1. Informasi Pesanan -->
                <div>
                    <div class="flex flex-wrap items-center justify-between gap-3 mb-3">
                        <h2 class="text-base font-bold text-ink flex items-center gap-2">
                            <i data-lucide="receipt" class="w-4 h-4 text-primary"></i>
                            <span>Informasi Pesanan</span>
                        </h2>
                    </div>
                    <div class="space-y-2 text-xs sm:text-sm">
                        <div class="flex items-center justify-between py-1">
                            <span class="text-ink-muted w-36 sm:w-44 shrink-0">Nomor Invoice</span>
                            <div class="flex items-center gap-2 font-mono font-bold text-ink flex-1">
                                <span id="client-invoice-num">{{ $orderNumber }}</span>
                                <button type="button" onclick="navigator.clipboard.writeText('{{ $orderNumber }}'); alert('Nomor invoice berhasil disalin!');" 
                                        title="Salin Nomor Invoice" class="p-1 text-ink-muted hover:text-ink transition rounded cursor-pointer">
                                    <i data-lucide="copy" class="w-3.5 h-3.5"></i>
                                </button>
                            </div>
                        </div>

                        <div class="flex items-center justify-between py-1">
                            <span class="text-ink-muted w-36 sm:w-44 shrink-0">Tanggal Pesanan</span>
                            <span class="font-medium text-ink flex-1">
                                {{ $paidDateShort }}
                            </span>
                        </div>
                    </div>
                </div>

                <hr class="border-border">

                <!-- 2. Informasi Akun Pemesan -->
                <div>
                    <h2 class="text-base font-bold text-ink mb-3 flex items-center gap-2">
                        <i data-lucide="user-check" class="w-4 h-4 text-primary"></i>
                        <span>Informasi Akun Pemesan</span>
                    </h2>
                    <div class="space-y-2 text-xs sm:text-sm">
                        <div class="flex items-center justify-between py-1">
                            <span class="text-ink-muted w-36 sm:w-44 shrink-0">Nama Lengkap</span>
                            <span class="font-semibold text-ink flex-1">: {{ $user->name }}</span>
                        </div>
                        <div class="flex items-center justify-between py-1">
                            <span class="text-ink-muted w-36 sm:w-44 shrink-0">Alamat Email</span>
                            <span class="font-semibold text-ink flex-1 break-all">: {{ $user->email }}</span>
                        </div>
                        <div class="flex items-center justify-between py-1">
                            <span class="text-ink-muted w-36 sm:w-44 shrink-0">No. WhatsApp</span>
                            <span class="font-semibold text-ink flex-1">: {{ $user->whatsapp }}</span>
                        </div>
                    </div>
                </div>

                <hr class="border-border">

                <!-- 3. Status Pembayaran & Status Transaksi -->
                <div class="space-y-4">
                    <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-1 sm:gap-4 text-xs sm:text-sm">
                        <span class="text-ink-muted w-36 sm:w-44 shrink-0">Status Pembayaran</span>
                        <div class="flex-1 space-y-1">
                            @if($isOrderPaid)
                                <span class="inline-flex items-center gap-1.5 rounded-md bg-[#DCFCE7] text-[#166534] font-bold text-xs px-2.5 py-1 uppercase tracking-wider">
                                    <i data-lucide="check" class="w-3.5 h-3.5"></i>
                                    <span>PAID</span>
                                </span>
                                <p class="text-xs text-ink-muted">Pembayaran telah berhasil diverifikasi oleh sistem.</p>
                            @elseif($isOrderExpired)
                                <span class="inline-flex items-center gap-1.5 rounded-md bg-[#FEE2E2] text-[#991B1B] font-bold text-xs px-2.5 py-1 uppercase tracking-wider">
                                    <i data-lucide="alert-triangle" class="w-3.5 h-3.5"></i>
                                    <span>EXPIRED</span>
                                </span>
                                <p class="text-xs text-rose-600">Tagihan telah melewati batas waktu pembayaran.</p>
                            @else
                                <span class="inline-flex items-center gap-1.5 rounded-md bg-[#FEF3C7] text-[#92400E] font-bold text-xs px-2.5 py-1 uppercase tracking-wider">
                                    <i data-lucide="clock" class="w-3.5 h-3.5"></i>
                                    <span>UNPAID</span>
                                </span>
                                <p class="text-xs text-amber-700">Silakan selesaikan pembayaran sebelum batas waktu berakhir.</p>
                            @endif
                        </div>
                    </div>

                    <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-1 sm:gap-4 text-xs sm:text-sm">
                        <span class="text-ink-muted w-36 sm:w-44 shrink-0">Status Transaksi</span>
                        <div class="flex-1 space-y-1">
                            @if($isOrderPaid)
                                <span class="inline-flex items-center gap-1.5 rounded-md bg-[#DCFCE7] text-[#166534] font-bold text-xs px-2.5 py-1 uppercase tracking-wider">
                                    <i data-lucide="shield-check" class="w-3.5 h-3.5"></i>
                                    <span>PROCESSED</span>
                                </span>
                                <p class="text-xs text-ink-muted">Pesanan dan konfigurasi website sedang aktif diproses.</p>
                            @elseif($isOrderExpired)
                                <span class="inline-flex items-center gap-1.5 rounded-md bg-slate-100 text-slate-700 font-bold text-xs px-2.5 py-1 uppercase tracking-wider">
                                    <i data-lucide="ban" class="w-3.5 h-3.5"></i>
                                    <span>CANCELLED</span>
                                </span>
                                <p class="text-xs text-ink-muted">Pesanan dibatalkan atau kedaluwarsa.</p>
                            @else
                                <span class="inline-flex items-center gap-1.5 rounded-md bg-[#DBEAFE] text-[#1E40AF] font-bold text-xs px-2.5 py-1 uppercase tracking-wider">
                                    <i data-lucide="loader" class="w-3.5 h-3.5 animate-spin"></i>
                                    <span>PENDING</span>
                                </span>
                                <p class="text-xs text-ink-muted">Pesanan akan otomatis diproses segera setelah pembayaran lunas.</p>
                            @endif
                        </div>
                    </div>
                </div>

                <hr class="border-border">

                <!-- 4. Rincian Pesanan (Tabel) -->
                <div>
                    <h2 class="text-base font-bold text-ink mb-3 flex items-center gap-2">
                        <i data-lucide="clipboard-list" class="w-4 h-4 text-primary"></i>
                        <span>Rincian Pesanan</span>
                    </h2>
                    <div class="border border-border rounded-2xl overflow-hidden">
                        <table class="w-full text-left text-xs sm:text-sm">
                            <thead class="bg-canvas border-b border-border text-ink-muted font-bold">
                                <tr>
                                    <th class="p-3.5 sm:p-4">Layanan / Item</th>
                                    <th class="p-3.5 sm:p-4 text-center">Durasi</th>
                                    <th class="p-3.5 sm:p-4 text-right">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-border">
                                <tr>
                                    <td class="p-3.5 sm:p-4">
                                        <strong class="font-bold text-ink block">
                                            1. Lisensi Template Website: {{ $template?->name ?? 'Pilihan Template' }}
                                        </strong>
                                        <span class="text-[11px] text-ink-muted block mt-0.5">
                                            {{ $order?->template_desc ?? $template?->template_desc ?? 'Lisensi Desain UI/UX Eksklusif & Source Code Clean' }}
                                        </span>
                                    </td>
                                    <td class="p-3.5 sm:p-4 text-center text-ink-muted font-medium">Selamanya</td>
                                    <td class="p-3.5 sm:p-4 text-right font-bold text-ink">
                                        Rp{{ number_format($templatePrice, 0, ',', '.') }}
                                    </td>
                                </tr>
                                <tr>
                                    <td class="p-3.5 sm:p-4">
                                        <strong class="font-bold text-ink block">
                                            2. Cloud Server Hosting (1 Tahun)
                                        </strong>
                                        <span class="text-[11px] text-ink-muted block mt-0.5">
                                            {{ $order?->server_desc ?? $template?->server_desc ?? 'High Speed NVMe, Dedicated Cloud Resources & Free SSL HTTPS' }}
                                        </span>
                                    </td>
                                    <td class="p-3.5 sm:p-4 text-center text-ink-muted font-medium">1 Tahun</td>
                                    <td class="p-3.5 sm:p-4 text-right font-bold text-ink">
                                        Rp{{ number_format($serverPrice, 0, ',', '.') }}
                                    </td>
                                </tr>
                                <tr>
                                    <td class="p-3.5 sm:p-4">
                                        <strong class="font-bold text-ink block">
                                            3. Setup Deployment & Layanan Teknis
                                        </strong>
                                        <span class="text-[11px] text-ink-muted block mt-0.5">
                                            {{ $order?->service_desc ?? $template?->service_desc ?? 'Instalasi, Konfigurasi DNS Domain & Garansi Sistem' }}
                                        </span>
                                    </td>
                                    <td class="p-3.5 sm:p-4 text-center text-ink-muted font-medium">Instan</td>
                                    <td class="p-3.5 sm:p-4 text-right font-bold text-ink">
                                        Rp{{ number_format($servicePrice, 0, ',', '.') }}
                                    </td>
                                </tr>
                                <tr>
                                    <td class="p-3.5 sm:p-4">
                                        <strong class="font-bold text-ink block">
                                            4. Registrasi Domain: {{ $domainName }}
                                        </strong>
                                        <span class="text-[11px] text-ink-muted block mt-0.5">
                                            Registrasi Domain Resmi &bull; Termasuk PPN 11%
                                        </span>
                                    </td>
                                    <td class="p-3.5 sm:p-4 text-center text-ink-muted font-medium">{{ $order?->domain_duration ?: 1 }} Tahun</td>
                                    <td class="p-3.5 sm:p-4 text-right font-bold text-ink">
                                        Rp{{ number_format($domainPrice, 0, ',', '.') }}
                                    </td>
                                </tr>
                                @if(!empty($discountAmount) && $discountAmount > 0)
                                    <tr class="bg-mint-soft/70">
                                        <td class="p-3.5 sm:p-4">
                                            <div class="flex items-center gap-2">
                                                <strong class="font-bold text-primary block">
                                                    Diskon Kode Promo ({{ $order?->promo_code }})
                                                </strong>
                                                @if($order?->is_partner_order)
                                                    <span class="inline-flex items-center rounded-md bg-white border border-primary/40 px-2 py-0.5 text-[10px] font-bold text-primary">
                                                        🤝 Mitra: {{ $order?->partner_name }}
                                                    </span>
                                                @endif
                                            </div>
                                            <span class="text-[11px] text-primary/80 block mt-0.5">
                                                Potongan harga khusus promo resmi
                                            </span>
                                        </td>
                                        <td class="p-3.5 sm:p-4 text-center text-primary font-bold">Hemat</td>
                                        <td class="p-3.5 sm:p-4 text-right font-extrabold text-primary">
                                            -Rp{{ number_format($discountAmount, 0, ',', '.') }}
                                        </td>
                                    </tr>
                                @endif
                            </tbody>
                        </table>
                    </div>

                    <!-- Total Pembayaran Baris Besar -->
                    <div class="flex items-baseline justify-between pt-5">
                        <div>
                            <span class="text-sm sm:text-base font-bold text-ink">Total Pembayaran</span>
                            @if($order?->is_partner_order && !empty($order?->partner_name))
                                <div class="text-xs text-primary font-semibold mt-0.5 flex items-center gap-1">
                                    <span>🤝 Terdaftar dalam Program Kemitraan: {{ $order?->partner_name }}</span>
                                </div>
                            @endif
                        </div>
                        <strong class="text-2xl sm:text-3xl font-black text-primary tabular-nums">
                            Rp{{ number_format($totalPaid, 0, ',', '.') }}
                        </strong>
                    </div>
                </div>

                <!-- 5. Blue Info Box -->
                <div class="rounded-2xl border border-blue-200 bg-blue-50/70 p-4 flex items-start gap-3 text-xs text-slate-800">
                    <div class="flex size-5 items-center justify-center rounded-full bg-blue-600 text-white font-bold text-[10px] shrink-0 mt-0.5">
                        i
                    </div>
                    <div>
                        <strong class="block font-bold">Verifikasi Sistem Otomatis</strong>
                        <span class="text-slate-600">Seluruh komponen layanan website, server cloud, dan registrasi domain Anda telah dicatat dalam database resmi Bidtech.</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- ================= KOLOM KANAN (4 COLS): DETAIL TEMPLATE & SUPPORT ================= -->
        <div class="lg:col-span-4 space-y-6">

            <!-- Card 1: Detail Template Website -->
            <div class="rounded-3xl border border-border bg-surface p-6 shadow-xs space-y-4">
                <div class="flex items-center justify-between">
                    <h3 class="text-base font-bold text-ink">
                        Detail Desain Website
                    </h3>
                    @if(!empty($template))
                        <a href="{{ $template->landing_url }}" target="_blank" class="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1">
                            <span>Lihat Demo</span>
                            <i data-lucide="external-link" class="w-3 h-3"></i>
                        </a>
                    @endif
                </div>

                <!-- Gambar Preview Mockup Website -->
                <div class="overflow-hidden rounded-2xl border border-border bg-canvas aspect-[16/10]">
                    @if($template && $template->preview)
                        <img src="{{ asset($template->preview) }}" alt="{{ $template->name }}" class="h-full w-full object-cover">
                    @else
                        <div class="flex h-full w-full items-center justify-center text-xs text-ink-muted">
                            Preview tidak tersedia
                        </div>
                    @endif
                </div>

                <!-- Info Template & Domain -->
                <div class="space-y-3 pt-1">
                    <div>
                        <h4 class="text-base font-bold text-ink leading-snug">
                            {{ $template?->name ?? 'Pilihan Template Website' }}
                        </h4>
                        <p class="text-xs text-ink-muted mt-0.5">
                            Kategori: {{ $template?->category ?? 'Bisnis & Profesional' }}
                        </p>
                    </div>

                    <div class="pt-3 border-t border-border space-y-2 text-xs">
                        <div class="flex items-center justify-between">
                            <span class="text-ink-muted">Domain Proyek:</span>
                            <a href="https://{{ $domainName }}" target="_blank" rel="noopener noreferrer" class="font-bold text-ink hover:text-primary flex items-center gap-1">
                                <span>{{ $domainName }}</span>
                                <i data-lucide="external-link" class="w-3 h-3"></i>
                            </a>
                        </div>
                        <div class="flex items-center justify-between">
                            <span class="text-ink-muted">Status Domain:</span>
                            @if($isDomainRegistered)
                                <span class="bg-success-surface text-success px-2.5 py-0.5 rounded-full text-[11px] font-bold">Domain Aktif</span>
                            @else
                                <span class="bg-warning-surface text-warning px-2.5 py-0.5 rounded-full text-[11px] font-bold">Diproses Tim</span>
                            @endif
                        </div>
                        <div class="flex items-center justify-between">
                            <span class="text-ink-muted">Status Website:</span>
                            @if($isWebsiteLive)
                                <span class="bg-success-surface text-success px-2.5 py-0.5 rounded-full text-[11px] font-bold">Website Live</span>
                            @elseif($isWebsiteInProgress)
                                <span class="bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full text-[11px] font-bold">Dikerjakan</span>
                            @else
                                <span class="bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full text-[11px] font-bold">Maintenance</span>
                            @endif
                        </div>
                    </div>
                </div>
            </div>

            <!-- Card 2: Bantuan & Support Tim IT -->
            <div class="rounded-3xl border border-border bg-surface p-6 shadow-xs space-y-4">
                <h3 class="text-base font-bold text-ink">Bantuan Layanan</h3>
                <p class="text-xs text-ink-muted">
                    Membutuhkan penyesuaian domain, email profesional, atau konsultasi teknis terkait website Anda?
                </p>
                <a href="https://wa.me/6281234567890?text={{ urlencode('Halo Tim IT Bidtech, saya ingin berkonsultasi mengenai invoice & pesanan website saya #' . $orderNumber) }}" 
                   target="_blank" 
                   class="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#22C55E] hover:bg-[#16a34a] text-white font-bold text-xs py-3 px-4 shadow-xs transition">
                    <i data-lucide="message-circle" class="w-4 h-4"></i>
                    <span>Hubungi Support via WhatsApp</span>
                </a>
            </div>

        </div>
    </div>
</div>
