<?php

namespace App\Services\Notification;

use App\Models\Order;
use App\Models\User;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class FonnteService
{
    protected ?string $token;
    protected string $apiUrl = 'https://api.fonnte.com/send';

    public function __construct()
    {
        $this->token = config('services.fonnte.token') ?: env('FONNTE_TOKEN');
    }

    /**
     * Kirim pesan teks atau media via Fonnte API
     */
    public function sendMessage(string $target, string $message, ?string $url = null, ?string $filename = null): array
    {
        if (empty($this->token)) {
            Log::warning('FonnteService: FONNTE_TOKEN belum dikonfigurasi di .env');
            return ['status' => false, 'message' => 'Token not configured'];
        }

        $cleanTarget = $this->formatPhoneNumber($target);
        if (empty($cleanTarget)) {
            Log::warning("FonnteService: Nomor target WhatsApp tidak valid: '{$target}'");
            return ['status' => false, 'message' => 'Invalid phone number'];
        }

        $payload = [
            'target'      => $cleanTarget,
            'message'     => $message,
            'countryCode' => '62',
        ];

        if (!empty($url)) {
            $payload['url'] = $url;
            if (!empty($filename)) {
                $payload['filename'] = $filename;
            }
        }

        try {
            $response = Http::withHeaders([
                'Authorization' => $this->token,
            ])
            ->timeout(15)
            ->asForm()
            ->post($this->apiUrl, $payload);

            $result = $response->json() ?? [];
            Log::info("FonnteService: Pesan WA terkirim ke {$cleanTarget}", [
                'response' => $result,
            ]);

            return $result;
        } catch (\Throwable $e) {
            Log::error("FonnteService: Gagal mengirim pesan WA ke {$cleanTarget}: " . $e->getMessage());
            return ['status' => false, 'message' => $e->getMessage()];
        }
    }

    /**
     * Kirim notifikasi tagihan invoice belum bayar (Unpaid) beserta tautan pembayaran
     */
    public function sendInvoiceUnpaid(Order $order): array
    {
        $order->loadMissing('template');
        $template = $order->template;
        $totalBayar = number_format($order->total_price, 0, ',', '.');
        $duration = $order->domain_duration ?: 1;

        $paymentUrl = $order->xendit_payment_url 
            ?: route('checkout.bayar', ['template' => $order->template_id, 'order' => $order->order_number]);
        
        $pdfUrl = route('checkout.invoice.download', $order);

        $promoInfo = '';
        if (!empty($order->discount_amount) && $order->discount_amount > 0) {
            $promoInfo = "🏷️ *Diskon Promo:* -Rp " . number_format($order->discount_amount, 0, ',', '.') . " ({$order->promo_code})\n";
        }
        $partnerInfo = '';
        if ($order->is_partner_order && !empty($order->partner_name)) {
            $partnerInfo = "🤝 *Program Kemitraan:* {$order->partner_name}\n";
        }

        $message = "Halo *{$order->full_name}*, terima kasih telah melakukan pemesanan di *Bidtech*! 🚀\n\n"
            . "Berikut rincian tagihan pesanan website Anda:\n"
            . "━━━━━━━━━━━━━━━━━━━━\n"
            . "📄 *No. Invoice:* #{$order->order_number}\n"
            . "🎨 *Template:* " . ($template->name ?? 'Bidtech Template') . "\n"
            . "🌐 *Domain:* {$order->domain_name} ({$duration} Tahun)\n"
            . $partnerInfo
            . $promoInfo
            . "💰 *Total Tagihan:* *Rp {$totalBayar}*\n"
            . "━━━━━━━━━━━━━━━━━━━━\n\n"
            . "💳 *Tautan Pembayaran Resmi (QRIS / Virtual Account):*\n"
            . "👉 {$paymentUrl}\n\n"
            . "📄 *Unduh Dokumen Invoice (PDF):*\n"
            . "👉 {$pdfUrl}\n\n"
            . "⚠️ _Batas waktu pembayaran berlaku 1x24 jam._\n"
            . "Jika Anda sudah menyelesaikan pembayaran atau memiliki pertanyaan, Anda dapat langsung membalas pesan WhatsApp ini.\n\n"
            . "Salam hangat,\n"
            . "*Tim Bidtech Official*";

        return $this->sendMessage($order->whatsapp, $message);
    }

    /**
     * Kirim notifikasi konfirmasi pembayaran lunas & info akun proyek website
     */
    public function sendPaymentSuccess(Order $order, ?User $user = null): array
    {
        $order->loadMissing('template');
        $totalBayar = number_format($order->total_price, 0, ',', '.');
        $loginUrl = url('/login');

        $userEmail = $user ? $user->email : $order->email;

        $message = "🎉 *PEMBAYARAN BERHASIL & TERKONFIRMASI!*\n\n"
            . "Halo *{$order->full_name}*,\n"
            . "Pembayaran untuk pesanan website Anda dengan nomor invoice *#{$order->order_number}* sebesar *Rp {$totalBayar}* telah kami terima.\n\n"
            . "━━━━━━━━━━━━━━━━━━━━\n"
            . "🔐 *AKUN KLIEN & AKSES PROYEK:*\n"
            . "🌐 *Domain:* {$order->domain_name}\n"
            . "📧 *Email Login:* `{$userEmail}`\n"
            . "🔑 *Password Default:* `Password123!`\n"
            . "🔗 *Tautan Login:* {$loginUrl}\n"
            . "━━━━━━━━━━━━━━━━━━━━\n\n"
            . "🛠️ Tim teknis Bidtech saat ini sedang menyiapkan instalasi template dan konfigurasi domain Anda. Anda dapat memantau progres pengerjaan website secara berkala di Dashboard Klien.\n\n"
            . "Terima kasih atas kepercayaan Anda bermitra bersama *Bidtech*!\n\n"
            . "Salam hangat,\n"
            . "*Tim Bidtech Official*";

        return $this->sendMessage($order->whatsapp, $message);
    }

    /**
     * Normalisasi format nomor telepon Indonesia (e.g. 0812... -> 62812...)
     */
    protected function formatPhoneNumber(string $phone): string
    {
        $phone = preg_replace('/[^0-9]/', '', $phone);

        if (str_starts_with($phone, '0')) {
            return '62' . substr($phone, 1);
        }

        if (str_starts_with($phone, '8')) {
            return '62' . $phone;
        }

        return $phone;
    }
}
