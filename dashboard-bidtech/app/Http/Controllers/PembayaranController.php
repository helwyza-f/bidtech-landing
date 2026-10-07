<?php

namespace App\Http\Controllers;

use App\Enums\OrderStatus;
use App\Models\Order;
use App\Models\Template;
use App\Models\User;
use App\Services\OrderService;
use App\Services\PaymentService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\View\View;

/**
 * Langkah 4: pembuatan order, halaman bayar, pemantauan status, dan invoice.
 */
class PembayaranController extends Controller
{
    /**
     * Halaman bayar / invoice terpadu: /checkout/{template}/bayar/{order_number}
     */
    public function show(Template $template, Order $order, Request $request, PaymentService $payments): View
    {
        $data = $payments->showPayment(
            $order,
            $template,
            $request->session()->get('checkout.flow', OrderService::FLOW_TEMPLATE_FIRST),
        );

        if ($order->isPaid()) {
            $this->loginClient($data['user']);
        }

        return view('pages.metode-pembayaran', $data);
    }

    /**
     * /checkout/{template}/bayar tanpa nomor order: pakai order dari sesi, atau buat baru
     * dari data checkout, lalu arahkan ke URL berparameter nomor order.
     */
    public function start(Template $template, Request $request, PaymentService $payments): RedirectResponse
    {
        $session = $request->session();

        $orderNumber = $request->query('order') ?: $session->get('checkout.order_number');
        $order = $orderNumber ? Order::where('order_number', $orderNumber)->first() : null;

        if (! $order) {
            $checkout = $session->get('checkout', []);

            if (empty($checkout['domain_name']) || empty($checkout['customer'])) {
                return redirect()->route('checkout.domain', $template)
                    ->with('error', 'Sesi checkout telah kedaluwarsa. Silakan ulangi pemesanan.');
            }

            try {
                $order = $payments->placeOrder($template, $checkout);
            } catch (\RuntimeException $e) {
                // Kuota habis / email sudah pernah memakai promo: buang promo dan kembali ke ringkasan
                $session->forget('checkout.promo');
                Log::info("Checkout promo ditolak saat pembuatan invoice untuk template {$template->id}: ".$e->getMessage());

                return redirect()->route('checkout.ringkasan', $template)->with('error', $e->getMessage());
            } catch (\Throwable $e) {
                Log::error("Gagal membuat order checkout untuk template {$template->id}: ".$e->getMessage());

                return redirect()->route('checkout.ringkasan', $template)
                    ->with('error', 'Terjadi kesalahan saat memproses pesanan. Silakan coba lagi.');
            }

            // Mulai dari kondisi bersih untuk checkout berikutnya
            $session->forget('checkout.promo');
            $session->put('checkout.order_number', $order->order_number);
        }

        return $this->redirectToPayment($order);
    }

    /**
     * POST /checkout/{template}/bayar: diteruskan ke alur pembuatan order.
     */
    public function process(Template $template): RedirectResponse
    {
        return redirect()->route('checkout.bayar.redirect', $template);
    }

    /**
     * Link invoice di email: /checkout/bayar/{order_number}
     */
    public function openByOrderNumber(Order $order): RedirectResponse
    {
        return $this->redirectToPayment($order);
    }

    /**
     * Endpoint polling untuk mengecek status pembayaran secara real-time.
     */
    public function status(Template $template, Order $order, PaymentService $payments): JsonResponse
    {
        $payments->refreshStatus($order);

        if ($order->isPaid()) {
            $this->loginClient($payments->activatePaidOrder($order));
        }

        return response()->json([
            'order_number' => $order->order_number,
            'status' => $order->status->value,
            'is_paid' => $order->isPaid(),
            'is_expired' => $order->isExpired() || $order->status === OrderStatus::Invalid,
            'redirect_url' => route('checkout.bayar', ['template' => $template->id, 'order' => $order->order_number]),
        ]);
    }

    /**
     * Invoice resmi siap cetak (Belum Lunas & Sudah Lunas).
     */
    public function downloadInvoice(Order $order, PaymentService $payments): Response
    {
        return response($payments->renderInvoice($order))
            ->header('Content-Type', 'text/html; charset=UTF-8')
            ->header('Content-Disposition', 'inline; filename="Invoice-'.$order->order_number.'.html"');
    }

    /**
     * URL invoice lama diarahkan ke halaman bayar resmi.
     */
    public function invoice(Order $order): RedirectResponse
    {
        return $this->redirectToPayment($order);
    }

    private function redirectToPayment(Order $order): RedirectResponse
    {
        return redirect()->route('checkout.bayar', [
            'template' => $order->template_id,
            'order' => $order->order_number,
        ]);
    }

    /**
     * Login otomatis ke portal klien setelah pembayaran lunas.
     */
    private function loginClient(User $user): void
    {
        if (! Auth::check() || Auth::id() !== $user->id) {
            Auth::login($user);
        }
    }
}
