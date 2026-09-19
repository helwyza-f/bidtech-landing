@extends('layouts.checkout')

@section('title', $order->isPaid() ? 'Invoice Pembayaran Lunas - Bidtech' : 'Menunggu Pembayaran - Bidtech')

@section('content')

<div class="max-w-3xl mx-auto py-8 px-4 sm:px-6 space-y-6">

    <!-- Top Alert / Status Banner -->
    @if($order->isPaid())
        <div class="p-6 rounded-2xl bg-mint-soft border-2 border-primary/30 flex items-center justify-between gap-4 shadow-xs">
            <div class="flex items-center gap-4">
                <div class="size-12 rounded-full bg-primary flex items-center justify-center text-white text-2xl font-bold shrink-0">
                    ✓
                </div>
                <div>
                    <div class="flex items-center gap-2">
                        <h1 class="text-lg sm:text-xl font-extrabold text-ink">Pembayaran Berhasil Diverifikasi</h1>
                        <span class="text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded-full bg-primary text-white">
                            Lunas
                        </span>
                    </div>
                    <p class="text-xs text-ink-muted mt-1">
                        Terima kasih! Pesanan Anda telah resmi terdaftar dan pengerjaan website segera dimulai.
                    </p>
                </div>
            </div>
            <div class="hidden sm:block text-right">
                <span class="text-[11px] text-ink-muted block">Waktu Lunas:</span>
                <span class="text-xs font-bold text-ink">{{ $order->paid_at ? $order->paid_at->format('d M Y, H:i') . ' WIB' : now()->format('d M Y, H:i') . ' WIB' }}</span>
            </div>
        </div>
    @else
        <div class="p-6 rounded-2xl bg-amber-50 border-2 border-amber-300/60 flex items-center justify-between gap-4 shadow-xs">
            <div class="flex items-center gap-4">
                <div class="size-12 rounded-full bg-amber-500 flex items-center justify-center text-white text-xl font-bold shrink-0">
                    <svg class="size-6 text-white" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </div>
                <div>
                    <div class="flex items-center gap-2">
                        <h1 class="text-lg sm:text-xl font-extrabold text-ink">Menunggu Pembayaran</h1>
                        <span class="text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded-full bg-amber-200 text-amber-900">
                            Unpaid
                        </span>
                    </div>
                    <p class="text-xs text-ink-muted mt-1">
                        Silakan selesaikan pembayaran melalui portal resmi Xendit sebelum batas waktu berakhir.
                    </p>
                </div>
            </div>
            @if($order->payment_expires_at)
                <div class="hidden sm:block text-right">
                    <span class="text-[11px] text-amber-800 font-medium block">Batas Waktu:</span>
                    <span class="text-xs font-bold text-ink">{{ $order->payment_expires_at->format('d M Y, H:i') }} WIB</span>
                </div>
            @endif
        </div>
    @endif

    <!-- JIKA SUDAH LUNAS: KOTAK KREDENSIAL AKUN PORTAL -->
    @if($order->isPaid())
        <div class="bg-gradient-to-br from-white to-mint-soft/30 border-2 border-primary rounded-2xl p-6 sm:p-7 shadow-sm space-y-4">
            <div class="flex items-center justify-between pb-3 border-b border-primary/20">
                <div class="flex items-center gap-2.5">
                    <div class="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                        <svg class="size-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
                        </svg>
                    </div>
                    <div>
                        <h2 class="text-base font-extrabold text-ink">Akun Portal Klien Anda Telah Aktif</h2>
                        <p class="text-xs text-ink-muted">Gunakan kredensial di bawah ini untuk mengakses dashboard pelacakan progres website Anda.</p>
                    </div>
                </div>
                <span class="text-[11px] font-bold px-2 py-0.5 rounded bg-primary-100 text-primary-800 shrink-0">
                    Otomatis Dibuat
                </span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="p-4 rounded-xl bg-white border border-border">
                    <span class="text-xs text-ink-muted block mb-1">Email Login:</span>
                    <strong class="text-sm font-bold text-ink break-all select-all">{{ $order->email }}</strong>
                </div>

                <div class="p-4 rounded-xl bg-white border border-border flex items-center justify-between">
                    <div>
                        <span class="text-xs text-ink-muted block mb-1">Kata Sandi Default:</span>
                        <div class="flex items-center gap-2">
                            <code class="text-sm font-mono font-bold text-forest bg-mint-soft px-2 py-0.5 rounded select-all tracking-wider" id="default-pass">••••••••••••</code>
                            <button type="button" onclick="toggleInvoicePassword()" id="btn-toggle-invoice-pass" class="p-1 rounded-md text-slate-400 hover:text-primary hover:bg-mint-soft transition cursor-pointer" title="Tampilkan / Sembunyikan Password" aria-label="Lihat password">
                                <svg id="icon-invoice-eye" class="size-4 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 .696 10.75 10.75 0 0 1-19.876 0"/>
                                    <circle cx="12" cy="12" r="3"/>
                                </svg>
                                <svg id="icon-invoice-eye-off" class="size-4 shrink-0 hidden" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/>
                                    <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/>
                                    <path d="M17.479 17.499A10.75 10.75 0 0 1 2.062 12.35a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.125-5.323"/>
                                    <line x1="2" x2="22" y1="2" y2="22"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <button type="button" onclick="salinPassword()" class="inline-flex items-center gap-1.5 text-xs text-primary hover:underline font-bold px-2.5 py-1 rounded bg-surface hover:bg-mint-soft transition">
                        <svg class="size-3.5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
                        </svg>
                        <span>Salin</span>
                    </button>
                </div>
            </div>

            <div class="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div class="text-[11px] text-ink-muted flex items-center gap-1.5">
                    <svg class="size-3.5 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                    </svg>
                    <span>Demi keamanan, segera ubah kata sandi ini di menu Pengaturan Akun setelah login.</span>
                </div>

                <a href="{{ route('dashboard') }}" class="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-primary-foreground px-6 py-3 rounded-xl text-sm font-extrabold transition shadow-xs hover:shadow">
                    <span>Buka Dashboard Website Saya</span>
                    <span>→</span>
                </a>
            </div>

            <script>
            const rawPasswordInvoice = 'Password123!';
            let isInvoicePasswordVisible = false;

            function toggleInvoicePassword() {
                isInvoicePasswordVisible = !isInvoicePasswordVisible;
                const display = document.getElementById('default-pass');
                const iconEye = document.getElementById('icon-invoice-eye');
                const iconEyeOff = document.getElementById('icon-invoice-eye-off');
                const btn = document.getElementById('btn-toggle-invoice-pass');

                if (display) {
                    display.textContent = isInvoicePasswordVisible ? rawPasswordInvoice : '••••••••••••';
                }
                if (iconEye && iconEyeOff) {
                    if (isInvoicePasswordVisible) {
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

            function salinPassword() {
                navigator.clipboard.writeText(rawPasswordInvoice).then(() => {
                    alert('Kata sandi berhasil disalin ke clipboard!');
                });
            }
            </script>
        </div>
    @else
        <!-- JIKA BELUM LUNAS: Banner Edukasi & Tombol Bayar Xendit (TANPA AKUN) -->
        <div class="bg-white border border-border rounded-2xl p-6 sm:p-7 shadow-xs space-y-4">
            <div class="flex items-start gap-3 text-xs text-ink-muted">
                <svg class="size-4.5 shrink-0 text-amber-500 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                <div>
                    <strong class="text-ink block font-semibold mb-0.5">Informasi Pembuatan Akun:</strong>
                    Akun dashboard pelacakan progres website Anda akan dibuatkan secara otomatis oleh sistem segera setelah pembayaran berhasil diverifikasi.
                </div>
            </div>

            @if($order->xendit_payment_url)
                <div class="pt-3 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border">
                    <div class="text-xs text-ink-muted">
                        Total yang harus ditransfer: <strong class="text-sm text-ink font-bold">Rp{{ number_format($totalPrice, 0, ',', '.') }}</strong>
                    </div>

                    <div class="flex items-center gap-3 w-full sm:w-auto">
                        <a href="{{ route('checkout.invoice', $order) }}" class="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl border border-border text-xs font-bold text-ink hover:bg-surface transition">
                            <svg class="size-3.5" fill="none" viewBox="0 0 24 24" stroke-width="2.2" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                            </svg>
                            <span>Cek Status</span>
                        </a>

                        <a href="{{ $order->xendit_payment_url }}" class="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-primary-foreground px-6 py-3 rounded-xl text-sm font-extrabold transition shadow-xs hover:shadow">
                            <span>Lanjut Bayar via Xendit</span>
                            <span>→</span>
                        </a>
                    </div>
                </div>
            @endif
        </div>
    @endif

    <!-- Invoice Details Card -->
    <div class="bg-white border border-border rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-border">
            <div>
                <span class="text-xs font-semibold text-primary block">INVOICE PESANAN</span>
                <h2 class="text-xl font-bold text-ink mt-0.5">{{ $order->order_number }}</h2>
            </div>
            <div class="text-xs text-ink-muted sm:text-right">
                <div>Tanggal Pesan: <span class="font-semibold text-ink">{{ $order->created_at->format('d M Y') }}</span></div>
                @if($order->xendit_invoice_id)
                    <div class="mt-0.5">Ref Xendit: <span class="font-mono text-ink">{{ $order->xendit_invoice_id }}</span></div>
                @endif
            </div>
        </div>

        <!-- Data Pemesan Ringkas -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs py-2">
            <div>
                <span class="text-ink-muted block mb-0.5">Nama Pemesan:</span>
                <strong class="text-sm font-semibold text-ink">{{ $order->full_name }}</strong>
            </div>
            <div>
                <span class="text-ink-muted block mb-0.5">Alamat Email:</span>
                <strong class="text-sm font-semibold text-ink break-all">{{ $order->email }}</strong>
            </div>
            <div>
                <span class="text-ink-muted block mb-0.5">Nomor WhatsApp:</span>
                <strong class="text-sm font-semibold text-ink">{{ $order->whatsapp }}</strong>
            </div>
        </div>

        <!-- Rincian Item Pesanan Table -->
        <div class="border border-border rounded-xl overflow-hidden">
            <table class="w-full text-left text-xs">
                <thead class="bg-canvas border-b border-border text-ink-muted font-bold">
                    <tr>
                        <th class="p-3.5">Layanan / Item</th>
                        <th class="p-3.5 text-center">Durasi</th>
                        <th class="p-3.5 text-right">Subtotal</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-border">
                    <tr>
                        <td class="p-3.5">
                            <strong class="text-sm font-bold text-ink block">1. Lisensi Template: {{ $template->name }}</strong>
                            <span class="text-ink-muted">{{ $order->template_desc ?? $template->template_desc ?? 'Lisensi desain website premium siap deploy' }}</span>
                        </td>
                        <td class="p-3.5 text-center font-medium text-ink-muted">Selamanya</td>
                        <td class="p-3.5 text-right font-bold text-ink">Rp{{ number_format($order->template_price ?? $template->template_price ?? 1000000, 0, ',', '.') }}</td>
                    </tr>
                    <tr>
                        <td class="p-3.5">
                            <strong class="text-sm font-bold text-ink block">2. Cloud Server Hosting (1 Tahun)</strong>
                            <span class="text-ink-muted">{{ $order->server_desc ?? $template->server_desc ?? 'High Speed NVMe, Dedicated Cloud Resources & Free SSL' }}</span>
                        </td>
                        <td class="p-3.5 text-center font-medium text-ink-muted">1 Tahun</td>
                        <td class="p-3.5 text-right font-bold text-ink">Rp{{ number_format($order->server_price ?? $template->server_price ?? 500000, 0, ',', '.') }}</td>
                    </tr>
                    <tr>
                        <td class="p-3.5">
                            <strong class="text-sm font-bold text-ink block">3. Setup Deployment & Layanan Teknis</strong>
                            <span class="text-ink-muted">{{ $order->service_desc ?? $template->service_desc ?? 'Instalasi sistem, DNS domain & garansi teknis' }}</span>
                        </td>
                        <td class="p-3.5 text-center font-medium text-ink-muted">Instan</td>
                        <td class="p-3.5 text-right font-bold text-ink">Rp{{ number_format($order->service_price ?? $template->service_price ?? 500000, 0, ',', '.') }}</td>
                    </tr>
                    <tr>
                        <td class="p-3.5">
                            <strong class="text-sm font-bold text-ink block">4. Registrasi Domain: {{ $order->domain_name }}</strong>
                            <span class="text-ink-muted">Registrasi domain resmi &bull; Termasuk PPN 11%</span>
                        </td>
                        <td class="p-3.5 text-center font-medium text-ink-muted">{{ $order->domain_duration ?: 1 }} Tahun</td>
                        <td class="p-3.5 text-right font-bold text-ink">Rp{{ number_format($order->domain_price, 0, ',', '.') }}</td>
                    </tr>
                    @if(!empty($order->discount_amount) && $order->discount_amount > 0)
                        <tr class="bg-mint-soft/60">
                            <td class="p-3.5">
                                <div class="flex items-center gap-2">
                                    <strong class="text-sm font-bold text-primary block">Diskon Kode Promo ({{ $order->promo_code }})</strong>
                                    @if($order->is_partner_order)
                                        <span class="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-white text-primary border border-primary/40">
                                            <svg class="size-3 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-1.42-1.42l4.24-4.24a1 1 0 0 0 0-1.42l-1.41-1.41a1 1 0 0 0-1.42 0l-9.9 9.9a2 2 0 0 0 0 2.83L6 20a2 2 0 0 0 2.83 0l2.17-2.17"/><path d="m12 12 4 4"/></svg>
                                            <span>Mitra: {{ $order->partner_name }}</span>
                                        </span>
                                    @endif
                                </div>
                                <span class="text-ink-muted">Potongan harga promo kemitraan/voucher resmi</span>
                            </td>
                            <td class="p-3.5 text-center font-bold text-primary">Hemat</td>
                            <td class="p-3.5 text-right font-extrabold text-primary">-Rp{{ number_format($order->discount_amount, 0, ',', '.') }}</td>
                        </tr>
                    @endif
                </tbody>
                <tfoot class="bg-canvas/50 border-t border-border">
                    <tr>
                        <td colspan="2" class="p-4 text-right font-bold text-sm text-ink">Total Pembayaran:</td>
                        <td class="p-4 text-right font-extrabold text-base text-primary">Rp{{ number_format($totalPrice, 0, ',', '.') }}</td>
                    </tr>
                </tfoot>
            </table>
        </div>

        <div class="pt-2 flex items-center justify-between text-xs text-ink-muted">
            <span>Butuh bantuan terkait pesanan ini? <a href="https://wa.me/6281234567890" target="_blank" class="text-primary font-bold hover:underline">Hubungi Tim Support Bidtech</a></span>
            <button type="button" onclick="window.print()" class="inline-flex items-center gap-1.5 text-ink hover:text-primary font-semibold transition cursor-pointer">
                <svg class="size-3.5 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/></svg>
                <span>Cetak Invoice</span>
            </button>
        </div>
    </div>

</div>

@endsection
