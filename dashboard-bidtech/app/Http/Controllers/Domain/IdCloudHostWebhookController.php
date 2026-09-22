<?php

namespace App\Http\Controllers\Domain;

use App\Enums\DomainStatus;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class IdCloudHostWebhookController extends Controller
{
    /**
     * Menangani webhook callback dari IDCloudHost SRS Reseller
     * Header: X-Signature (HMAC SHA-256)
     */
    public function handle(Request $request): JsonResponse
    {
        $secret = config('services.idcloudhost.webhook_secret') ?: env('IDCLOUDHOST_WEBHOOK_SECRET');

        // 1. Verifikasi Signature HMAC SHA-256 jika secret terisi di .env
        if (!empty($secret)) {
            $incomingSignature = $request->header('X-Signature');
            $payload = $request->getContent();
            $expectedSignature = hash_hmac('sha256', $payload, $secret);

            if (!$incomingSignature || !hash_equals($expectedSignature, $incomingSignature)) {
                Log::warning('IDCloudHost webhook: Signature tidak valid', [
                    'received' => $incomingSignature,
                ]);
                return response()->json(['message' => 'Invalid signature'], 401);
            }
        }

        $data = $request->all();
        $event = $data['event'] ?? $data['type'] ?? '';
        $domainName = $data['data']['domain'] ?? $data['domain'] ?? null;

        Log::info('IDCloudHost webhook diterima', [
            'event'  => $event,
            'domain' => $domainName,
            'payload' => $data,
        ]);

        // 2. Tangani event ketika domain berhasil di-register
        if ($event === 'domain.registered' && !empty($domainName)) {
            $user = User::where('domain_final', $domainName)->first();

            if ($user) {
                $user->update([
                    'domain_status' => DomainStatus::Registered,
                ]);
                Log::info("IDCloudHost webhook: Status domain {$domainName} diperbarui menjadi Registered (Aktif) untuk user {$user->email}");
            }
        }

        // Return status 200 OK dalam waktu < 5 detik sesuai instruksi IDCloudHost
        return response()->json([
            'status'  => 'success',
            'message' => 'Webhook IDCloudHost berhasil diproses',
        ], 200);
    }
}
