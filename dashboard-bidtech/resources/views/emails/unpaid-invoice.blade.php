<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tagihan Invoice Pesanan - Bidtech</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F4F6F5; font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif; color: #0B1B17;">
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #F4F6F5; padding: 30px 15px;">
        <tr>
            <td align="center">
                <!-- Wrapper Box -->
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 20px; border: 1px solid #E4E9E6; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
                    
                    <!-- Header -->
                    <tr>
                        <td style="padding: 32px 32px 24px 32px; border-bottom: 1px solid #E4E9E6;">
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td>
                                        <div style="font-size: 22px; font-weight: 900; color: #1E7A53; letter-spacing: -0.5px;">
                                            Bidtech
                                        </div>
                                        <div style="font-size: 11px; color: #6B7B75; margin-top: 2px;">
                                            Jasa Pembuatan Website & Domain
                                        </div>
                                    </td>
                                    <td align="right">
                                        <span style="display: inline-block; background-color: #FEF3C7; color: #92400E; font-size: 11px; font-weight: 800; padding: 5px 12px; border-radius: 6px; text-transform: uppercase; letter-spacing: 0.5px;">
                                            UNPAID
                                        </span>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Body Content -->
                    <tr>
                        <td style="padding: 32px;">
                            <h1 style="margin: 0 0 8px 0; font-size: 20px; font-weight: 800; color: #0B1B17;">
                                Tagihan Menunggu Pembayaran
                            </h1>
                            <p style="margin: 0 0 24px 0; font-size: 14px; color: #4A5551; line-height: 1.5;">
                                Halo <strong>{{ $order->full_name }}</strong>, terima kasih telah melakukan pemesanan di Bidtech. Silakan selesaikan pembayaran Anda sebelum batas waktu berakhir untuk memulai pembuatan website.
                            </p>

                            <!-- Alert 24 Jam -->
                            <div style="background-color: #FFFBEB; border: 1px solid #FDE68A; border-radius: 12px; padding: 14px 16px; margin-bottom: 24px;">
                                <div style="font-size: 13px; font-weight: 700; color: #92400E; margin-bottom: 2px;">
                                    ⏱️ Batas Waktu Pembayaran: 1x24 Jam
                                </div>
                                <div style="font-size: 12px; color: #78350F; line-height: 1.4;">
                                    Pesanan akan otomatis kedaluwarsa jika belum diselesaikan sebelum <strong>{{ $order->payment_expires_at ? $order->payment_expires_at->format('d M Y, H:i') . ' WIB' : '1x24 jam ke depan' }}</strong>.
                                </div>
                            </div>

                            <!-- Detail Ringkas -->
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="border: 1px solid #E4E9E6; border-radius: 12px; margin-bottom: 24px; border-collapse: separate; border-spacing: 0; overflow: hidden;">
                                <tr style="background-color: #F8FAF9;">
                                    <td style="padding: 12px 16px; font-size: 12px; color: #6B7B75; font-weight: 600; border-bottom: 1px solid #E4E9E6;">Nomor Invoice</td>
                                    <td align="right" style="padding: 12px 16px; font-size: 12px; font-weight: 700; color: #0B1B17; font-family: monospace; border-bottom: 1px solid #E4E9E6;">
                                        {{ $order->order_number }}
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 12px 16px; font-size: 13px; color: #4A5551; border-bottom: 1px solid #E4E9E6;">1. Lisensi Template ({{ $template ? $template->name : 'Bidtech Template' }})</td>
                                    <td align="right" style="padding: 12px 16px; font-size: 13px; font-weight: 700; color: #0B1B17; border-bottom: 1px solid #E4E9E6;">
                                        Rp{{ number_format($order->template_price ?? $template?->template_price ?? 1000000, 0, ',', '.') }}
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 12px 16px; font-size: 13px; color: #4A5551; border-bottom: 1px solid #E4E9E6;">2. Cloud Server Hosting (1 Tahun)</td>
                                    <td align="right" style="padding: 12px 16px; font-size: 13px; font-weight: 700; color: #0B1B17; border-bottom: 1px solid #E4E9E6;">
                                        Rp{{ number_format($order->server_price ?? $template?->server_price ?? 500000, 0, ',', '.') }}
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 12px 16px; font-size: 13px; color: #4A5551; border-bottom: 1px solid #E4E9E6;">3. Setup Deployment & Layanan Teknis</td>
                                    <td align="right" style="padding: 12px 16px; font-size: 13px; font-weight: 700; color: #0B1B17; border-bottom: 1px solid #E4E9E6;">
                                        Rp{{ number_format($order->service_price ?? $template?->service_price ?? 500000, 0, ',', '.') }}
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 12px 16px; font-size: 13px; color: #4A5551; border-bottom: 1px solid #E4E9E6;">4. Registrasi Domain ({{ $order->domain_name }}, {{ $order->domain_duration ?: 1 }} Thn)</td>
                                    <td align="right" style="padding: 12px 16px; font-size: 13px; font-weight: 700; color: #1E7A53; border-bottom: 1px solid #E4E9E6;">
                                        Rp{{ number_format($order->domain_price, 0, ',', '.') }}
                                    </td>
                                </tr>
                                @if(!empty($order->discount_amount) && $order->discount_amount > 0)
                                <tr style="background-color: #E7F4EE;">
                                    <td style="padding: 12px 16px; font-size: 13px; color: #166534; font-weight: 600; border-bottom: 1px solid #E4E9E6;">
                                        🏷️ Diskon Promo ({{ $order->promo_code }})
                                        @if($order->is_partner_order)
                                            <br><small style="color: #15803d;">🤝 Mitra: {{ $order->partner_name }}</small>
                                        @endif
                                    </td>
                                    <td align="right" style="padding: 12px 16px; font-size: 13px; font-weight: 800; color: #166534; border-bottom: 1px solid #E4E9E6;">
                                        -Rp{{ number_format($order->discount_amount, 0, ',', '.') }}
                                    </td>
                                </tr>
                                @endif
                                <tr style="background-color: #F8FAF9;">
                                    <td style="padding: 14px 16px; font-size: 14px; font-weight: 800; color: #0B1B17;">Total Tagihan</td>
                                    <td align="right" style="padding: 14px 16px; font-size: 18px; font-weight: 900; color: #1E7A53;">
                                        Rp{{ number_format($order->total_price, 0, ',', '.') }}
                                    </td>
                                </tr>
                            </table>

                            <!-- Tombol Bayar -->
                            <div style="text-align: center; margin-bottom: 24px;">
                                <a href="{{ $bayarUrl }}" style="display: inline-block; background-color: #22C55E; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 800; padding: 14px 32px; border-radius: 12px; box-shadow: 0 2px 6px rgba(34,197,94,0.3);">
                                    Bayar Tagihan Sekarang &rarr;
                                </a>
                            </div>

                            <div style="text-align: center; margin-bottom: 24px;">
                                <a href="{{ $pdfUrl }}" style="font-size: 12px; font-weight: 700; color: #1E7A53; text-decoration: underline;">
                                    Unduh Salinan Invoice (PDF)
                                </a>
                            </div>

                            <p style="margin: 0; font-size: 12px; color: #6B7B75; line-height: 1.5; text-align: center;">
                                Jika tombol di atas tidak dapat diklik, salin dan buka tautan berikut di browser Anda:<br>
                                <a href="{{ $bayarUrl }}" style="color: #1E7A53; word-break: break-all;">{{ $bayarUrl }}</a>
                            </p>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="padding: 24px 32px; background-color: #F8FAF9; border-top: 1px solid #E4E9E6; text-align: center; font-size: 11px; color: #6B7B75; line-height: 1.6;">
                            Email ini dikirim otomatis oleh sistem pembayaran <strong>Bidtech</strong> ke {{ $order->email }}.<br>
                            Butuh bantuan? Hubungi kami via WhatsApp atau balas email ke support@bidtech.co.id.
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
</body>
</html>
