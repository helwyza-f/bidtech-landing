<?php

namespace App\Http\Controllers;

use App\Models\Template;
use App\Services\OrderService;
use App\Services\TemplateService;
use Illuminate\Contracts\Session\Session;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

/**
 * Alur domain-first: domain dipilih di landing page, lalu template dipilih di sini.
 */
class PilihTemplateController extends Controller
{
    /**
     * GET /checkout/pilih-template?domain={domain}&price={price}
     */
    public function index(Request $request, OrderService $orders, TemplateService $templates): View
    {
        $session = $request->session();

        $this->rememberDomainFromRequest($request, $session, $orders);
        // $templates->syncFromFrontend();

        return view('pages.pilih-template', [
            'templates' => Template::all(),
            'domainTerpilih' => $session->get('checkout.domain_name'),
            'domainPrice' => (int) $session->get('checkout.domain_price', 0),
            'checkout' => $session->get('checkout', []),
            'step' => 1,
            'flow' => OrderService::FLOW_DOMAIN_FIRST,
        ]);
    }

    /**
     * POST/GET /checkout/pilih-template/{template}: pilih template lalu lanjut ke data diri.
     */
    public function select(Template $template, Request $request, OrderService $orders): RedirectResponse
    {
        $session = $request->session();

        // Tangkap domain jika disertakan di parameter form
        if (! $session->has('checkout.domain_name')) {
            $this->rememberDomainFromRequest($request, $session, $orders);
        }

        if (! $session->has('checkout.domain_name')) {
            return redirect()->route('checkout.pilih-template')
                ->with('error', 'Silakan pilih domain terlebih dahulu sebelum memilih template.');
        }

        $orders->selectTemplate($session, $template, OrderService::FLOW_DOMAIN_FIRST);

        return redirect()->route('checkout.data-diri', $template);
    }

    /**
     * POST /checkout/pilih-template/domain: ganti domain lewat modal (AJAX).
     */
    public function updateDomain(Request $request, OrderService $orders): JsonResponse
    {
        $validated = $request->validate([
            'domain' => ['required', 'string'],
            'price' => ['nullable', 'numeric'],
            'tax_amount' => ['nullable', 'numeric'],
            'price_base' => ['nullable', 'numeric'],
        ]);

        $domain = trim($validated['domain']);
        $quote = $orders->changeDomain(
            $request->session(),
            $domain,
            (int) ($validated['price'] ?? 0),
            (int) ($validated['price_base'] ?? 0),
            (int) ($validated['tax_amount'] ?? 0),
        );

        return response()->json([
            'status' => 'success',
            'domain_name' => $domain,
            'domain_price' => $quote['price'],
            'formatted_price' => 'Rp'.number_format($quote['price'], 0, ',', '.'),
            'message' => "Domain {$domain} berhasil dipilih!",
        ]);
    }

    /**
     * Simpan domain (dan harganya) dari query string/form ke sesi bila ada.
     */
    private function rememberDomainFromRequest(Request $request, Session $session, OrderService $orders): void
    {
        $domain = trim($request->input('domain', ''));

        if ($domain === '') {
            return;
        }

        $orders->changeDomain(
            $session,
            $domain,
            (int) $request->input('price', 0),
            (int) $request->input('price_base', 0),
            (int) $request->input('tax_amount', 0),
        );
    }
}
