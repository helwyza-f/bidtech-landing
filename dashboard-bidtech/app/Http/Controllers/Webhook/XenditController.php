<?php

namespace App\Http\Controllers\Webhook;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Services\PaymentService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

/**
 * Callback pembayaran dari Xendit (header x-callback-token).
 */
class XenditController extends Controller
{
    public function handle(Request $request, PaymentService $payments): JsonResponse
    {
        if ($rejection = $this->rejectInvalidToken($request)) {
            return $rejection;
        }

        $data = $request->all();
        Log::info('Xendit webhook received', [
            'external_id' => $data['external_id'] ?? null,
            'status' => $data['status'] ?? null,
        ]);

        $externalId = $data['external_id'] ?? null;

        if (! $externalId) {
            return response()->json(['message' => 'Missing external_id'], 400);
        }

        $order = Order::where('order_number', $externalId)->first();

        if (! $order) {
            Log::info("Xendit webhook: order {$externalId} not found (uji coba test ping Xendit)");

            return response()->json([
                'status' => 'success',
                'message' => 'Webhook test received successfully (dummy order acknowledged)',
            ], 200);
        }

        $payments->handleXenditWebhook($order, (string) ($data['status'] ?? ''));

        return response()->json(['message' => 'Webhook processed successfully']);
    }

    /**
     * Tolak callback bila token tidak cocok. Di luar production hanya dicatat, agar uji coba tidak terhambat.
     */
    private function rejectInvalidToken(Request $request): ?JsonResponse
    {
        $callbackToken = trim(config('services.xendit.webhook_token') ?? '');
        if ($callbackToken === '') {
            return null;
        }

        $incomingToken = trim((string) $request->header('x-callback-token'));
        if ($incomingToken && hash_equals($callbackToken, $incomingToken)) {
            return null;
        }

        Log::warning('Xendit webhook: callback token tidak cocok');

        if (app()->environment('production')) {
            return response()->json(['message' => 'Unauthorized token'], 401);
        }

        Log::info('Xendit webhook: diizinkan lewat karena bukan environment production');

        return null;
    }
}
