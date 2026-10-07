<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pembayaran Berhasil & Kredensial Dashboard - Bidtech</title>
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
                                        <span style="display: inline-block; background-color: #DCFCE7; color: #166534; font-size: 11px; font-weight: 800; padding: 5px 12px; border-radius: 6px; text-transform: uppercase; letter-spacing: 0.5px;">
                                            PAID / LUNAS
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
                                Pembayaran Berhasil Diterima!
                            </h1>
                            <p style="margin: 0 0 24px 0; font-size: 14px; color: #4A5551; line-height: 1.5;">
                                Halo <strong>{{ $order->full_name }}</strong>, pembayaran untuk pesanan nomor <strong>#{{ $order->order_number }}</strong> telah berhasil diverifikasi oleh sistem. Website dan registrasi domain Anda sedang aktif diproses.
                            </p>

                            <!-- Kartu Kredensial Login Dashboard -->
                            <div style="background-color: #F2FBF5; border: 2px solid #22C55E; border-radius: 16px; padding: 24px; margin-bottom: 24px;">
                                <div style="font-size: 15px; font-weight: 800; color: #0B1B17; margin-bottom: 4px;">
                                    🔑 Kredensial Akses Dashboard Klien
                                </div>
                                <div style="font-size: 12px; color: #6B7B75; margin-bottom: 16px; line-height: 1.4;">
                                    Gunakan akun khusus proyek ini untuk memantau status pengerjaan website Anda:
                                </div>

                                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: separate; border-spacing: 0;">
                                    <tr>
                                        <td style="background-color: #ffffff; border: 1px solid #E4E9E6; border-radius: 10px; padding: 12px 14px; margin-bottom: 8px;">
                                            <div style="font-size: 11px; color: #6B7B75; text-transform: uppercase; font-weight: 600; margin-bottom: 4px;">Email Login Proyek:</div>
                                            <div style="font-size: 15px; font-weight: 800; color: #0B1B17; font-family: monospace;">
                                                {{ $user ? $user->email : $order->email }}
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="height: 8px;"></td>
                                    </tr>
                                    <tr>
                                        <td style="background-color: #ffffff; border: 1px solid #E4E9E6; border-radius: 10px; padding: 12px 14px;">
                                            <div style="font-size: 11px; color: #6B7B75; text-transform: uppercase; font-weight: 600; margin-bottom: 4px;">Password Default:</div>
                                            <div style="font-size: 15px; font-weight: 800; color: #1E7A53; font-family: monospace;">
                                                {{ $defaultPassword }}
                                            </div>
                                        </td>
                                    </tr>
                                </table>

                                <!-- CTA Masuk Dashboard -->
                                <div style="margin-top: 18px; text-align: center;">
                                    <a href="{{ $dashboardUrl }}" style="display: inline-block; background-color: #22C55E; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 800; padding: 12px 28px; border-radius: 10px; box-shadow: 0 2px 6px rgba(34,197,94,0.3);">
                                        Masuk ke Dashboard Klien &rarr;
                                    </a>
                                </div>
                            </div>

                            <!-- Detail Pesanan -->
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="border: 1px solid #E4E9E6; border-radius: 12px; margin-bottom: 24px; border-collapse: separate; border-spacing: 0; overflow: hidden;">
                                <tr style="background-color: #F8FAF9;">
                                    <td style="padding: 12px 16px; font-size: 12px; color: #6B7B75; font-weight: 600; border-bottom: 1px solid #E4E9E6;">Status Transaksi</td>
                                    <td align="right" style="padding: 12px 16px; font-size: 12px; font-weight: 800; color: #166534; border-bottom: 1px solid #E4E9E6;">
                                        PROCESSED (LUNAS)
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
                                    <td style="padding: 12px 16px; font-size: 13px; color: #4A5551; border-bottom: 1px solid #E4E9E6;">4. Registrasi Domain ({{ $order->domain_name }})</td>
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
                                    <td style="padding: 14px 16px; font-size: 14px; font-weight: 800; color: #0B1B17;">Total Pembayaran Lunas</td>
                                    <td align="right" style="padding: 14px 16px; font-size: 18px; font-weight: 900; color: #1E7A53;">
                                        Rp{{ number_format($order->total_price, 0, ',', '.') }}
                                    </td>
                                </tr>
                            </table>

                            <div style="text-align: center; margin-bottom: 24px;">
                                <a href="{{ $pdfUrl }}" style="font-size: 13px; font-weight: 700; color: #1E7A53; text-decoration: underline;">
                                    Unduh Dokumen Resmi Invoice Lunas (PDF)
                                </a>
                            </div>

                            <p style="margin: 0; font-size: 12px; color: #6B7B75; line-height: 1.5; text-align: center;">
                                Anda juga dapat membuka kembali halaman detail status pesanan kapan saja melalui:<br>
                                <a href="{{ $bayarUrl }}" style="color: #1E7A53; word-break: break-all;">{{ $bayarUrl }}</a>
                            </p>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="padding: 24px 32px; background-color: #F8FAF9; border-top: 1px solid #E4E9E6; text-align: center; font-size: 11px; color: #6B7B75; line-height: 1.6;">
                            Email bukti transaksi sah ini dikirimkan ke <strong>{{ $order->email }}</strong>.<br>
                            Terima kasih telah mempercayakan pembuatan website Anda bersama <strong>Bidtech</strong>.
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
</body>
</html>
