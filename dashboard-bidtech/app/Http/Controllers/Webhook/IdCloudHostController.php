<?php

namespace App\Http\Controllers\Webhook;

use App\Http\Controllers\Controller;
use App\Services\DomainService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

/**
 * Callback dari IDCloudHost SRS Reseller. Header X-Signature berisi HMAC SHA-256 dari body
 * bila secret terisi di .env.
 */
class IdCloudHostController extends Controller
{
    public function handle(Request $request, DomainService $domains): JsonResponse
    {
        if (! $this->hasValidSignature($request)) {
            Log::warning('IDCloudHost webhook: Signature tidak valid', [
                'received' => $request->header('X-Signature'),
            ]);

            return response()->json(['message' => 'Invalid signature'], 401);
        }

        $data = $request->all();
        $event = $data['event'] ?? $data['type'] ?? '';
        $domain = $data['data']['domain'] ?? $data['domain'] ?? null;

        Log::info('IDCloudHost webhook diterima', [
            'event' => $event,
            'domain' => $domain,
            'payload' => $data,
        ]);

        $domains->handleWebhook((string) $event, $domain);

        // Balas 200 OK dalam < 5 detik sesuai instruksi IDCloudHost
        return response()->json([
            'status' => 'success',
            'message' => 'Webhook IDCloudHost berhasil diproses',
        ], 200);
    }

    /**
     * Tanpa secret terkonfigurasi, semua callback diterima.
     */
    private function hasValidSignature(Request $request): bool
    {
        $secret = config('services.idcloudhost.webhook_secret') ?: env('IDCLOUDHOST_WEBHOOK_SECRET');

        if (empty($secret)) {
            return true;
        }

        $incoming = $request->header('X-Signature');

        return $incoming && hash_equals(hash_hmac('sha256', $request->getContent(), $secret), $incoming);
    }
}
