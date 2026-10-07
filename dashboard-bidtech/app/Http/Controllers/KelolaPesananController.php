<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Services\OrderService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

/**
 * Halaman pesanan: admin mengelola seluruh pesanan klien, klien melihat detail order & invoicenya.
 */
class KelolaPesananController extends Controller
{
    public function index(Request $request, OrderService $orders): View|RedirectResponse
    {
        $user = $request->user();

        if ($user->isAdmin()) {
            return view('pages.kelola-pesanan', $orders->list([
                'category' => $request->query('category', 'all'),
                'status' => $request->query('status', 'all'),
                'period' => $request->query('period', 'all'),
                'month' => (int) $request->query('month', date('n')),
                'year' => (int) $request->query('year', date('Y')),
                'search' => (string) $request->query('search', ''),
            ]));
        }

        if ($user->isMedia()) {
            return redirect()->route('dashboard.articles.index');
        }

        return view('pages.order', $orders->clientOrder($user));
    }

    /**
     * Perbarui status pesanan, domain, dan progres website secara manual oleh Admin.
     */
    public function updateStatus(Request $request, Order $order, OrderService $orders): RedirectResponse
    {
        $validated = $request->validate([
            'order_status' => ['required', 'string', 'in:unpaid,paid,invalid'],
            'domain_status' => ['nullable', 'string', 'in:pending_registration,registered'],
            'domain_final' => ['nullable', 'string', 'max:255'],
            'website_status' => ['nullable', 'string', 'in:in_progress,deployed,maintenance'],
        ], [
            'order_status.required' => 'Status pesanan wajib dipilih.',
            'order_status.in' => 'Status pesanan tidak valid.',
            'domain_status.in' => 'Status domain tidak valid.',
            'website_status.in' => 'Status website tidak valid.',
        ]);

        $orders->updateStatus($order, $validated);

        return back()->with('success', "Status pesanan & dashboard klien #{$order->order_number} berhasil diperbarui!");
    }
}
