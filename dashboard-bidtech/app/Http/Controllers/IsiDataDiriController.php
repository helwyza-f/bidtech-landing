<?php

namespace App\Http\Controllers;

use App\Models\Template;
use App\Services\OrderService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

/**
 * Langkah 2: data diri pemesan.
 */
class IsiDataDiriController extends Controller
{
    public function show(Template $template, Request $request): View|RedirectResponse
    {
        $session = $request->session();

        if (! $session->has('checkout.domain_name')) {
            return redirect()->route('checkout.domain', $template)
                ->with('error', 'Silakan pilih domain terlebih dahulu.');
        }

        return view('pages.data-diri', [
            'template' => $template,
            'checkout' => $session->get('checkout', []),
            'step' => 2,
            'flow' => $session->get('checkout.flow', OrderService::FLOW_TEMPLATE_FIRST),
        ]);
    }

    public function store(Template $template, Request $request, OrderService $orders): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:150'],
            'email' => ['required', 'email', 'max:150'],
            'whatsapp' => ['required', 'string', 'max:30'],
            'notes' => ['nullable', 'string', 'max:500'],
        ], [
            'name.required' => 'Nama lengkap wajib diisi.',
            'email.required' => 'Alamat email wajib diisi.',
            'email.email' => 'Format email tidak valid.',
            'whatsapp.required' => 'Nomor WhatsApp wajib diisi.',
        ]);

        $orders->saveCustomerDetails($request->session(), $validated);

        return redirect()->route('checkout.ringkasan', $template);
    }
}
