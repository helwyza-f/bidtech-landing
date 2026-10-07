<?php

namespace App\Http\Controllers;

use App\Models\Template;
use App\Services\DomainService;
use App\Services\OrderService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

/**
 * Langkah 1 alur template-first: cari dan pilih domain untuk template yang sudah dipilih.
 */
class PilihDomainController extends Controller
{
    public function show(Template $template, Request $request, OrderService $orders, DomainService $domains): View
    {
        $session = $request->session();
        $orders->selectTemplate($session, $template, OrderService::FLOW_TEMPLATE_FIRST);

        $query = trim($request->input('q', ''));

        // Tanpa query (pertama kali membuka halaman) tampilkan hasil bawaan.
        $searchData = $domains->search($query !== '' ? $query : 'namabisnismu');
        $session->put('checkout.domain_results', $searchData['domains']);

        if ($query !== '') {
            $session->put('checkout.domain_query', $query);
        } else {
            $session->forget('checkout.domain_query');
        }

        return view('pages.domain', [
            'template' => $template,
            'checkout' => $session->get('checkout', []),
            'domainResults' => $searchData['domains'] ?? [],
            'searchMeta' => $searchData,
            'step' => 1,
            'flow' => OrderService::FLOW_TEMPLATE_FIRST,
        ]);
    }

    /**
     * Live search (AJAX) saat pengguna mengetik.
     */
    public function search(Template $template, Request $request, DomainService $domains): JsonResponse
    {
        $query = trim($request->input('q', ''));
        $searchData = $domains->search($query);

        if (! empty($searchData['domains'])) {
            $request->session()->put('checkout.domain_results', $searchData['domains']);
        }

        return response()->json([
            'status' => 'success',
            'query' => $query,
            'domains' => $searchData['domains'],
            'is_live_api' => $searchData['is_live_api'],
            'source' => $searchData['source'],
            'status_label' => $searchData['status_label'],
            'has_api_key' => $searchData['has_api_key'],
            'select_url' => route('checkout.domain.select', $template),
            'csrf_token' => csrf_token(),
        ]);
    }

    /**
     * Pilih salah satu domain yang tersedia.
     */
    public function select(Template $template, Request $request, OrderService $orders): RedirectResponse|JsonResponse
    {
        $validated = $request->validate([
            'domain' => ['required', 'string'],
            'price' => ['nullable', 'numeric'],
            'duration' => ['nullable', 'integer', 'in:1,2,3'],
            'tax_amount' => ['nullable', 'numeric'],
            'price_base' => ['nullable', 'numeric'],
        ]);

        $domain = $validated['domain'];
        $chosen = $orders->selectDomain($request->session(), $domain, (int) ($validated['price'] ?? 0));

        if ($request->ajax() || $request->wantsJson()) {
            $total = $chosen['total'];

            return response()->json([
                'status' => 'success',
                'domain_name' => $domain,
                'domain_duration' => $chosen['duration'],
                'domain_price_per_year' => $chosen['price_per_year'],
                'formatted_price_year' => $this->rupiah($chosen['price_per_year']),
                'domain_price' => $total['price'],
                'formatted_price' => $this->rupiah($total['price']),
                'domain_tax' => $total['tax'],
                'domain_price_base' => $total['base'],
                'total_price' => $template->price + $total['price'],
                'formatted_total' => $this->rupiah($template->price + $total['price']),
            ]);
        }

        return redirect()->route('checkout.domain', $template)->with('success', "Domain {$domain} berhasil dipilih!");
    }

    /**
     * Ubah durasi pendaftaran domain (AJAX). Input divalidasi, tetapi durasi yang berlaku tetap 1 tahun.
     */
    public function updateDuration(Template $template, Request $request, OrderService $orders): JsonResponse
    {
        $request->validate([
            'duration' => ['required', 'integer', 'in:1,2,3'],
        ]);

        $result = $orders->updateDomainDuration($request->session());

        if (! $result) {
            return response()->json([
                'status' => 'error',
                'message' => 'Silakan pilih domain terlebih dahulu.',
            ], 400);
        }

        $total = $result['total'];

        return response()->json([
            'status' => 'success',
            'domain_name' => $result['domain'],
            'domain_duration' => $result['duration'],
            'domain_price_per_year' => $result['price_per_year'],
            'formatted_price_year' => $this->rupiah($result['price_per_year']),
            'domain_price' => $total['price'],
            'formatted_price' => $this->rupiah($total['price']),
            'total_price' => $template->price + $total['price'],
            'formatted_total' => $this->rupiah($template->price + $total['price']),
        ]);
    }

    private function rupiah(int $amount): string
    {
        return 'Rp'.number_format($amount, 0, ',', '.');
    }
}
