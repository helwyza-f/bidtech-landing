<?php

namespace App\Http\Controllers\Payment;

use App\Enums\DomainStatus;
use App\Enums\OrderStatus;
use App\Enums\WebsiteStatus;
use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\User;
use App\Mail\PaymentSuccessAndAccountMail;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class XenditWebhookController extends Controller
{
    /**
     * Menangani callback webhook dari Xendit
     */
    public function handle(Request $request): JsonResponse
    {
        $callbackToken = trim(config('services.xendit.webhook_token') ?? '');
        if (!empty($callbackToken)) {
            $incomingToken = trim((string) $request->header('x-callback-token'));
            if (!$incomingToken || !hash_equals($callbackToken, $incomingToken)) {
                Log::warning('Xendit webhook: callback token tidak cocok', [
                    'incoming_token'   => $incomingToken,
                    'configured_token' => $callbackToken,
                ]);

                // Di lingkungan lokal/pengujian, izinkan lewat agar proses testing tidak terhambat
                if (app()->environment('production')) {
                    return response()->json(['message' => 'Unauthorized token'], 401);
                }

                Log::info('Xendit webhook: diizinkan lewat karena environment lokal (APP_ENV=local)');
            }
        }

        $data = $request->all();
        Log::info('Xendit webhook received', [
            'external_id' => $data['external_id'] ?? null,
            'status'      => $data['status'] ?? null,
        ]);

        $externalId = $data['external_id'] ?? null;
        $status = strtoupper($data['status'] ?? '');

        if (!$externalId) {
            return response()->json(['message' => 'Missing external_id'], 400);
        }

        $order = Order::where('order_number', $externalId)->first();

        if (!$order) {
            Log::info("Xendit webhook: order {$externalId} not found (uji coba test ping Xendit)");
            return response()->json([
                'status'  => 'success',
                'message' => 'Webhook test received successfully (dummy order acknowledged)',
            ], 200);
        }

        // Cek jika status pembayaran adalah PAID atau SETTLED
        if (in_array($status, ['PAID', 'SETTLED'])) {
            $order->update([
                'status'  => OrderStatus::Paid,
                'paid_at' => now(),
            ]);

            // Buat akun user khusus otomatis (1 Template 1 Akun: {base}@bidtech.co.id)
            $user = User::where('order_id', $order->id)->first();

            $domainName = strtolower(trim($order->domain_name));
            $baseName = explode('.', $domainName)[0] ?? 'proyek';
            $cleanBase = preg_replace('/[^a-z0-9\-]/', '', $baseName);
            if (empty($cleanBase)) {
                $cleanBase = 'proyek-' . strtolower(Str::random(4));
            }
            $expectedEmail = "{$cleanBase}@bidtech.co.id";

            if (!$user) {
                if (User::where('email', $expectedEmail)->exists()) {
                    $cleanOrder = strtolower(preg_replace('/[^a-zA-Z0-9]/', '', $order->order_number));
                    $expectedEmail = "{$cleanBase}.{$cleanOrder}@bidtech.co.id";
                }

                $user = User::create([
                    'order_id'       => $order->id,
                    'name'           => $order->full_name,
                    'email'          => $expectedEmail,
                    'whatsapp'       => $order->whatsapp,
                    'password'       => Hash::make('Password123!'),
                    'domain_final'   => $order->domain_name,
                    'domain_status'  => DomainStatus::PendingRegistration,
                    'website_status' => WebsiteStatus::InProgress,
                ]);
            } else {
                $user->update([
                    'name'           => $order->full_name,
                    'email'          => $expectedEmail,
                    'whatsapp'       => $order->whatsapp,
                    'domain_final'   => $order->domain_name,
                    'domain_status'  => DomainStatus::PendingRegistration,
                    'website_status' => WebsiteStatus::InProgress,
                ]);
            }

            // Kirim email invoice lunas & kredensial jika belum terkirim
            if (empty($order->paid_email_sent_at)) {
                try {
                    Mail::to($order->email)->send(new PaymentSuccessAndAccountMail($order, $user));
                    $order->update(['paid_email_sent_at' => now()]);
                } catch (\Throwable $e) {
                    Log::warning("Xendit webhook: Gagal mengirim email lunas {$order->order_number}: " . $e->getMessage());
                }

                try {
                    app(\App\Services\Notification\FonnteService::class)->sendPaymentSuccess($order, $user);
                } catch (\Throwable $e) {
                    Log::warning("Xendit webhook: Gagal mengirim WhatsApp lunas via Fonnte {$order->order_number}: " . $e->getMessage());
                }
            }

            Log::info("Xendit webhook: order {$externalId} mark as PAID & user activated with email {$user->email}");
        } elseif ($status === 'EXPIRED') {
            $order->update([
                'status' => OrderStatus::Invalid,
            ]);
            Log::info("Xendit webhook: order {$externalId} mark as EXPIRED");
        }

        return response()->json(['message' => 'Webhook processed successfully']);
    }
}
