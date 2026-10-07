@php
    $template = $order->template ?? $template;
    $domainPrice = (int) ($order->domain_price ?? 0);
    $templatePrice = (int) ($order->template_price ?? $template->template_price ?? 1000000);
    $serverPrice = (int) ($order->server_price ?? $template->server_price ?? 500000);
    $servicePrice = (int) ($order->service_price ?? $template->service_price ?? 500000);
    $discountAmount = (int) ($order->discount_amount ?? 0);
    $subtotal = $templatePrice + $serverPrice + $servicePrice + $domainPrice;
    $totalPrice = max(0, $subtotal - $discountAmount);
@endphp
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invoice {{ $order->order_number }} - Bidtech</title>
    <style>
        @page {
            size: A4 portrait;
            margin: 1.5cm 1.5cm 1.2cm 1.5cm;
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            color: #1a1a1a;
            background-color: #ffffff;
            font-size: 11pt;
            line-height: 1.5;
            padding: 20px;
        }

        @media print {
            body {
                padding: 0;
            }
            .no-print {
                display: none !important;
            }
        }

        .invoice-wrapper {
            max-width: 800px;
            margin: 0 auto;
            background: #ffffff;
        }

        /* Toolbar Cetak */
        .print-toolbar {
            max-width: 800px;
            margin: 0 auto 20px auto;
            padding: 12px 20px;
            background: #f8faf9;
            border: 1px solid #e2e8e5;
            border-radius: 12px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .btn-print {
            background: #22c55e;
            color: #ffffff;
            border: none;
            padding: 8px 18px;
            border-radius: 8px;
            font-size: 13px;
            font-weight: 700;
            cursor: pointer;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 6px;
        }

        .btn-back {
            color: #4b5563;
            text-decoration: none;
            font-size: 13px;
            font-weight: 600;
        }

        /* Header Kop Surat */
        .header-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 25px;
        }

        .header-table td {
            vertical-align: top;
        }

        .logo-box {
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .logo-title {
            font-size: 24pt;
            font-weight: 900;
            letter-spacing: -0.5px;
            color: #111827;
            display: inline-block;
        }

        .logo-tagline {
            font-size: 9pt;
            color: #6b7280;
            margin-top: 2px;
        }

        .company-info {
            text-align: right;
            font-size: 9pt;
            color: #4b5563;
            line-height: 1.4;
        }

        .company-name {
            font-weight: 800;
            color: #111827;
            font-size: 9.5pt;
        }

        /* Invoice Title & Status Badge */
        .title-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }

        .title-table td {
            vertical-align: top;
        }

        .invoice-main-title {
            font-size: 26pt;
            font-weight: 900;
            color: #0b1b17;
            line-height: 1.1;
        }

        .invoice-number {
            font-size: 13pt;
            font-weight: 800;
            color: #111827;
            margin-top: 4px;
            letter-spacing: 0.5px;
        }

        .date-info {
            margin-top: 14px;
            font-size: 10pt;
            color: #4b5563;
        }

        .date-info table {
            border-collapse: collapse;
        }

        .date-info td {
            padding: 2px 0;
        }

        .date-label {
            width: 130px;
            color: #4b5563;
        }

        .date-val {
            color: #111827;
            font-weight: 600;
        }

        /* Status Badge */
        .status-box {
            text-align: right;
        }

        .badge-pill {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 6px 16px;
            border-radius: 9999px;
            font-size: 10.5pt;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .badge-unpaid {
            background-color: #fee2e2;
            color: #dc2626;
            border: 1px solid #fca5a5;
        }

        .badge-paid {
            background-color: #dcfce7;
            color: #16a34a;
            border: 1px solid #86efac;
        }

        .status-subtitle {
            font-size: 8.5pt;
            color: #6b7280;
            margin-top: 6px;
        }

        /* Ditagih Ke */
        .bill-to {
            margin-bottom: 20px;
            font-size: 9.5pt;
            line-height: 1.45;
        }

        .bill-to-title {
            font-weight: 800;
            color: #111827;
            margin-bottom: 3px;
        }

        .bill-to-name {
            font-weight: 600;
            color: #1f2937;
        }

        .bill-to-meta {
            color: #4b5563;
        }

        /* Table Rincian */
        .items-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 18px;
            font-size: 9.5pt;
        }

        .items-table th {
            background-color: #f9fafb;
            color: #374151;
            font-weight: 700;
            text-align: left;
            padding: 10px 12px;
            border-top: 1px solid #e5e7eb;
            border-bottom: 1px solid #e5e7eb;
        }

        .items-table td {
            padding: 11px 12px;
            border-bottom: 1px solid #f3f4f6;
            vertical-align: middle;
        }

        .col-no {
            width: 40px;
            text-align: center;
        }

        .col-durasi {
            width: 90px;
            text-align: center;
            color: #4b5563;
        }

        .col-subtotal {
            width: 130px;
            text-align: right;
            font-weight: 700;
            color: #111827;
        }

        .text-gratis {
            color: #16a34a;
            font-weight: 700;
        }

        .total-row td {
            padding: 14px 12px;
            border-top: 1.5px solid #e5e7eb;
            border-bottom: none;
        }

        .total-label {
            text-align: right;
            font-weight: 800;
            font-size: 11pt;
            color: #111827;
        }

        .total-amount {
            text-align: right;
            font-weight: 900;
            font-size: 14pt;
            color: #111827;
            letter-spacing: -0.3px;
        }

        /* Alert Box */
        .alert-box {
            border-radius: 10px;
            padding: 12px 16px;
            margin-bottom: 25px;
            display: flex;
            align-items: center;
            gap: 12px;
            font-size: 9.5pt;
        }

        .alert-unpaid {
            background-color: #fff1f2;
            border: 1px solid #ffe4e6;
            color: #9f1239;
        }

        .alert-paid {
            background-color: #ecfdf5;
            border: 1px solid #d1fae5;
            color: #065f46;
        }

        .alert-icon {
            font-size: 16pt;
            line-height: 1;
        }

        .alert-title {
            font-weight: 800;
            margin-bottom: 1px;
        }

        .alert-desc {
            font-size: 8.5pt;
            opacity: 0.9;
        }

        /* Footer Note */
        .footer-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 9pt;
            color: #4b5563;
            margin-top: 25px;
            padding-top: 15px;
        }

        .footer-table td {
            vertical-align: top;
        }

        .footer-contact {
            text-align: right;
        }

        .footer-contact a {
            color: #111827;
            text-decoration: none;
            font-weight: 600;
        }

        .bottom-disclaimer {
            margin-top: 30px;
            padding-top: 12px;
            border-top: 1px solid #f3f4f6;
            width: 100%;
            border-collapse: collapse;
            font-size: 8pt;
            color: #9ca3af;
        }

        .bottom-disclaimer td {
            vertical-align: middle;
        }
    </style>
</head>
<body>

    <!-- Toolbar untuk Preview / Cetak di Browser (Sembunyi saat dicetak) -->
    <div class="print-toolbar no-print">
        <a href="{{ route('checkout.bayar', ['template' => $order->template_id, 'order' => $order->order_number]) }}" class="btn-back">
            ← Kembali ke Halaman Bayar
        </a>
        <button onclick="window.print()" class="btn-print">
            <svg style="width:16px;height:16px;" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.656l10.5 0Z" />
            </svg>
            <span>Cetak / Simpan PDF</span>
        </button>
    </div>

    <div class="invoice-wrapper">

        <!-- 1. Header Kop Surat -->
        <table class="header-table">
            <tr>
                <td style="width: 50%;">
                    <div class="logo-box">
                        <img src="{{ asset('images/logo/logo.webp') }}" alt="Bidtech Logo" style="height: 38px; width: auto; object-fit: contain;">
                    </div>
                    <div class="logo-tagline" style="margin-top: 6px;">Build Your Idea Online.</div>
                </td>
                <td style="width: 50%;">
                    <div class="company-info">
                        <div class="company-name" style="font-size: 11pt; font-weight: 800; color: #111827;">Bidtech</div>
                        <div>Kompleks Ruko KBC Tunas, A5 No. 3, Belian</div>
                        <div>Batam Center, Kota Batam, Kepulauan Riau 29464</div>
                        <div>Website: bidtech.co.id &bull; support@bidtech.co.id</div>
                    </div>
                </td>
            </tr>
        </table>

        <!-- 2. Invoice Title & Status Badge -->
        <table class="title-table">
            <tr>
                <td style="width: 55%;">
                    <div class="invoice-main-title">Invoice</div>
                    <div class="invoice-number">{{ $order->order_number }}</div>

                    <div class="date-info">
                        <table>
                            <tr>
                                <td class="date-label">Tanggal Invoice</td>
                                <td style="padding-right: 8px;">:</td>
                                <td class="date-val">{{ $order->created_at ? $order->created_at->translatedFormat('d F Y') : now()->translatedFormat('d F Y') }}</td>
                            </tr>
                            @if($order->isPaid())
                                <tr>
                                    <td class="date-label">Tanggal Pembayaran</td>
                                    <td style="padding-right: 8px;">:</td>
                                    <td class="date-val">{{ $order->paid_at ? $order->paid_at->translatedFormat('d F Y') : now()->translatedFormat('d F Y') }}</td>
                                </tr>
                            @else
                                <tr>
                                    <td class="date-label">Jatuh Tempo</td>
                                    <td style="padding-right: 8px;">:</td>
                                    <td class="date-val">{{ $order->payment_expires_at ? $order->payment_expires_at->translatedFormat('d F Y') : now()->addDay()->translatedFormat('d F Y') }}</td>
                                </tr>
                            @endif
                        </table>
                    </div>
                </td>
                <td style="width: 45%; text-align: right;">
                    <div class="status-box">
                        @if($order->isPaid())
                            <div class="badge-pill badge-paid">
                                <svg style="width:15px;height:15px;" fill="none" viewBox="0 0 24 24" stroke-width="2.8" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                </svg>
                                <span>LUNAS</span>
                            </div>
                            <div class="status-subtitle">
                                Pembayaran berhasil.<br>Terima kasih atas kepercayaannya.
                            </div>
                        @elseif($order->status === \App\Enums\OrderStatus::Invalid || $order->isExpired())
                            <div class="badge-pill badge-invalid" style="background-color: #fee2e2; color: #dc2626; border: 1px solid #fca5a5;">
                                <svg style="width:15px;height:15px;" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                <span>KEDALUWARSA / BATAL</span>
                            </div>
                            <div class="status-subtitle">
                                Batas waktu pembayaran telah berakhir.<br>Tagihan tidak berlaku.
                            </div>
                        @else
                            <div class="badge-pill badge-unpaid">
                                <svg style="width:15px;height:15px;" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                <span>BELUM LUNAS</span>
                            </div>
                            <div class="status-subtitle">
                                Mohon selesaikan pembayaran<br>sebelum batas waktu.
                            </div>
                        @endif
                    </div>
                </td>
            </tr>
        </table>

        <!-- 3. Ditagih Ke -->
        <div class="bill-to">
            <div class="bill-to-title">Ditagih ke</div>
            <div class="bill-to-name">{{ $order->full_name }}</div>
            <div class="bill-to-meta">{{ $order->email }}</div>
            <div class="bill-to-meta">{{ $order->whatsapp }}</div>
        </div>

        <!-- 4. Tabel Rincian -->
        <table class="items-table">
            <thead>
                <tr>
                    <th class="col-no">No.</th>
                    <th>Deskripsi</th>
                    <th class="col-durasi">Durasi</th>
                    <th class="col-subtotal">Subtotal</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="col-no">1</td>
                    <td>
                        <strong>Lisensi Template Website: {{ $template->name }}</strong>
                        <div style="font-size: 8pt; color: #6b7280; margin-top: 2px;">{{ $order->template_desc ?? $template->template_desc ?? 'Lisensi Desain UI/UX Eksklusif & Source Code Clean' }}</div>
                    </td>
                    <td class="col-durasi">Selamanya</td>
                    <td class="col-subtotal">Rp{{ number_format($templatePrice, 0, ',', '.') }}</td>
                </tr>
                <tr>
                    <td class="col-no">2</td>
                    <td>
                        <strong>Cloud Server Hosting (1 Tahun)</strong>
                        <div style="font-size: 8pt; color: #6b7280; margin-top: 2px;">{{ $order->server_desc ?? $template->server_desc ?? 'High Speed NVMe, Dedicated Cloud Resources & Free SSL HTTPS' }}</div>
                    </td>
                    <td class="col-durasi">1 Tahun</td>
                    <td class="col-subtotal">Rp{{ number_format($serverPrice, 0, ',', '.') }}</td>
                </tr>
                <tr>
                    <td class="col-no">3</td>
                    <td>
                        <strong>Setup Deployment & Layanan Teknis</strong>
                        <div style="font-size: 8pt; color: #6b7280; margin-top: 2px;">{{ $order->service_desc ?? $template->service_desc ?? 'Instalasi, Konfigurasi DNS Domain & Garansi Sistem' }}</div>
                    </td>
                    <td class="col-durasi">Instan</td>
                    <td class="col-subtotal">Rp{{ number_format($servicePrice, 0, ',', '.') }}</td>
                </tr>
                <tr>
                    <td class="col-no">4</td>
                    <td>
                        <strong>Registrasi Domain: {{ $order->domain_name }}</strong>
                        <div style="font-size: 8pt; color: #6b7280; margin-top: 2px;">Registrasi Domain Resmi &bull; Termasuk PPN 11%</div>
                    </td>
                    <td class="col-durasi">{{ $order->domain_duration ?: 1 }} Tahun</td>
                    <td class="col-subtotal">Rp{{ number_format($domainPrice, 0, ',', '.') }}</td>
                </tr>
                @if($discountAmount > 0)
                <tr style="background-color: #f2fbf5;">
                    <td class="col-no" style="color: #166534; font-weight: bold;">🏷️</td>
                    <td>
                        <strong style="color: #166534;">Potongan Diskon Promo ({{ $order->promo_code }})</strong>
                        @if($order->is_partner_order)
                            <div style="font-size: 8pt; color: #15803d; margin-top: 2px; font-weight: bold;">🤝 Program Kemitraan: {{ $order->partner_name }}</div>
                        @else
                            <div style="font-size: 8pt; color: #15803d; margin-top: 2px;">Diskon promo voucher resmi Bidtech</div>
                        @endif
                    </td>
                    <td class="col-durasi" style="color: #166534; font-weight: bold;">Hemat</td>
                    <td class="col-subtotal" style="color: #166534; font-weight: 800;">-Rp{{ number_format($discountAmount, 0, ',', '.') }}</td>
                </tr>
                @endif
            </tbody>
            <tfoot>
                <tr class="total-row">
                    <td colspan="3" class="total-label">Total</td>
                    <td class="total-amount">Rp{{ number_format($totalPrice, 0, ',', '.') }}</td>
                </tr>
            </tfoot>
        </table>

        <!-- 5. Alert Box Bawah Tabel -->
        @if($order->isPaid())
            <div class="alert-box alert-paid">
                <div class="alert-icon" style="display:flex;align-items:center;">
                    <svg style="width:20px;height:20px;" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </div>
                <div>
                    <div class="alert-title">Pembayaran telah diterima.</div>
                    <div class="alert-desc">Pesanan Anda sedang aktif diproses. Akun dashboard pelacakan website Anda telah aktif.</div>
                </div>
            </div>
        @elseif($order->status === \App\Enums\OrderStatus::Invalid || $order->isExpired())
            <div class="alert-box alert-unpaid" style="background-color: #fef2f2; border: 1px solid #fee2e2; color: #991b1b;">
                <div class="alert-icon" style="display:flex;align-items:center;">
                    <svg style="width:20px;height:20px;" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                    </svg>
                </div>
                <div>
                    <div class="alert-title">Tagihan pesanan ini telah kedaluwarsa atau dibatalkan.</div>
                    <div class="alert-desc">Jika Anda membutuhkan website ini, silakan lakukan pemesanan ulang melalui katalog website resmi Bidtech.</div>
                </div>
            </div>
        @else
            <div class="alert-box alert-unpaid">
                <div class="alert-icon" style="display:flex;align-items:center;">
                    <svg style="width:20px;height:20px;" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </div>
                <div>
                    <div class="alert-title">Selesaikan pembayaran sebelum {{ $order->payment_expires_at ? $order->payment_expires_at->translatedFormat('d F Y') : now()->addDay()->translatedFormat('d F Y') }}.</div>
                    <div class="alert-desc">Setelah pembayaran berhasil, pesanan akan otomatis diproses.</div>
                </div>
            </div>
        @endif

        <!-- 6. Footer Kontak & Terima Kasih -->
        <table class="footer-table">
            <tr>
                <td style="width: 50%;">
                    <div>Terima kasih,</div>
                    <strong style="color:#111827;">Tim Bidtech</strong>
                </td>
                <td style="width: 50%;" class="footer-contact">
                    <div>Jika ada pertanyaan, silakan hubungi kami.</div>
                    <div style="margin-top: 2px;">
                        <span>support@bidtech.co.id</span> &nbsp;&bull;&nbsp;
                        <span>bidtech.co.id</span>
                    </div>
                </td>
            </tr>
        </table>

        <!-- 7. Disclaimer Otomatis Sistem -->
        <table class="bottom-disclaimer">
            <tr>
                <td style="width: 50%;">
                    <strong style="color:#4b5563;">Bidtech</strong><br>
                    Build Your Idea Online.
                </td>
                <td style="width: 50%; text-align: right;">
                    Invoice ini diterbitkan secara otomatis oleh sistem.<br>
                    Tidak memerlukan tanda tangan.
                </td>
            </tr>
        </table>

    </div>

    <script>
        if (window.location.search.includes('print=1') || {{ (!empty($autoPrint) && $autoPrint) ? 'true' : 'false' }}) {
            window.addEventListener('load', function() {
                setTimeout(function() {
                    window.print();
                }, 400);
            });
        }
    </script>
</body>
</html>
