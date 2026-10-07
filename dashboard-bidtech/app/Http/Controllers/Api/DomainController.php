<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\DomainService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * API publik pencarian domain untuk landing page Next.js (CORS terbuka).
 */
class DomainController extends Controller
{
    /**
     * GET /api/domain/search?q={query}
     */
    public function search(Request $request, DomainService $domains): JsonResponse
    {
        $query = trim($request->input('q', $request->input('domain', $request->input('search', ''))));

        if ($query === '') {
            return $this->withCors(response()->json([
                'status' => 'error',
                'message' => 'Kata kunci pencarian domain tidak boleh kosong.',
                'domains' => [],
            ], 400));
        }

        $result = $domains->search($query);

        return $this->withCors(response()->json([
            'status' => 'success',
            'query' => $query,
            'domains' => $result['domains'] ?? [],
            'is_live_api' => $result['is_live_api'] ?? false,
            'source' => $result['source'] ?? 'idle',
            'status_label' => $result['status_label'] ?? '',
            'has_api_key' => $result['has_api_key'] ?? false,
        ]));
    }

    private function withCors(JsonResponse $response): JsonResponse
    {
        return $response
            ->header('Access-Control-Allow-Origin', '*')
            ->header('Access-Control-Allow-Methods', 'GET, OPTIONS')
            ->header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With');
    }
}
