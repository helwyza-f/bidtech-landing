<?php

namespace App\Services\Payment;

use App\Models\Order;
use App\Models\Template;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class XenditPaymentService
{
    protected string $apiBase = 'https://api.xendit.co/v2';
    protected ?string $secretKey;

    public function __construct()
    {
        $this->secretKey = config('services.xendit.key') ?: env('XENDIT_SECRET_KEY');
    }

    /**
     * Cek apakah API key Xendit tersedia
     */
    public function hasKey(): bool
    {
        return !empty($this->secretKey);
    }

    /**
     * Buat Invoice Pembayaran ke Xendit (Hosted Checkout)
     */
    public function createInvoice(Order $order, Template $template, array $customer): ?array
    {
        if (!$this->hasKey()) {
            Log::error('XenditPaymentService: XENDIT_SECRET_KEY belum dikonfigurasi.');
            return null;
        }

        $templatePrice = (int) ($order->template_price ?? $template->template_price ?? 1000000);
        $serverPrice   = (int) ($order->server_price ?? $template->server_price ?? 500000);
        $servicePrice  = (int) ($order->service_price ?? $template->service_price ?? 500000);
        $domainPrice   = (int) $order->domain_price;
        $discountAmount = (int) ($order->discount_amount ?? 0);

        $totalAmount = max(0, $templatePrice + $serverPrice + $servicePrice + $domainPrice - $discountAmount);

        $description = "Pemesanan Website {$template->name} + Domain {$order->domain_name}";
        if ($discountAmount > 0 && !empty($order->promo_code)) {
            $description .= " (Hemat Rp " . number_format($discountAmount, 0, ',', '.') . " via {$order->promo_code})";
        }

        // Susun item Xendit yang selalu bernilai positif dan totalnya persis sama dengan $totalAmount
        if ($discountAmount > 0) {
            $packageGross = $templatePrice + $serverPrice + $servicePrice;
            $packageDiscount = min($packageGross, $discountAmount);
            $domainDiscount = max(0, $discountAmount - $packageDiscount);

            $packageNetPrice = max(0, $packageGross - $packageDiscount);
            $domainNetPrice  = max(0, $domainPrice - $domainDiscount);

            $items = [];
            if ($packageNetPrice > 0) {
                $items[] = [
                    'name'     => "Paket Website {$template->name} (Diskon {$order->promo_code})",
                    'quantity' => 1,
                    'price'    => $packageNetPrice,
                    'category' => 'Website Package',
                ];
            }
            if ($domainNetPrice > 0) {
                $items[] = [
                    'name'     => "Domain {$order->domain_name} (" . ($order->domain_duration ?: 1) . " Tahun)" . ($domainDiscount > 0 ? " (Diskon {$order->promo_code})" : ""),
                    'quantity' => 1,
                    'price'    => $domainNetPrice,
                    'category' => 'Domain Registration',
                ];
            }
            if (empty($items)) {
                $items[] = [
                    'name'     => "Paket Website {$template->name} + Domain {$order->domain_name}",
                    'quantity' => 1,
                    'price'    => $totalAmount,
                    'category' => 'Website Package',
                ];
            }
        } else {
            $items = [
                [
                    'name'     => "Lisensi Template: {$template->name}",
                    'quantity' => 1,
                    'price'    => $templatePrice,
                    'category' => 'Website Template',
                ],
                [
                    'name'     => "Cloud Server & Hosting (1 Tahun)",
                    'quantity' => 1,
                    'price'    => $serverPrice,
                    'category' => 'Cloud Server',
                ],
                [
                    'name'     => "Setup & Layanan Deployment",
                    'quantity' => 1,
                    'price'    => $servicePrice,
                    'category' => 'Service & Setup',
                ],
                [
                    'name'     => "Domain {$order->domain_name} (" . ($order->domain_duration ?: 1) . " Tahun)",
                    'quantity' => 1,
                    'price'    => $domainPrice,
                    'category' => 'Domain Registration',
                ],
            ];
        }

        $payload = [
            'external_id'          => $order->order_number,
            'amount'               => $totalAmount,
            'payer_email'          => $customer['email'],
            'description'          => $description,
            'customer'             => [
                'given_names'   => $customer['name'],
                'email'         => $customer['email'],
                'mobile_number' => $customer['whatsapp'],
            ],
            'customer_notification_preference' => [
                'invoice_created'  => [],
                'invoice_reminder' => [],
                'invoice_paid'     => [],
            ],
            'success_redirect_url' => route('checkout.bayar', ['template' => $template->id, 'order' => $order->order_number]),
            'failure_redirect_url' => route('checkout.bayar', ['template' => $template->id, 'order' => $order->order_number]),
            'currency'             => 'IDR',
            'items'                => $items,
        ];

        try {
            $response = Http::withBasicAuth($this->secretKey, '')
                ->withHeaders([
                    'Accept'       => 'application/json',
                    'Content-Type' => 'application/json',
                ])
                ->timeout(15)
                ->post("{$this->apiBase}/invoices", $payload);

            if ($response->successful()) {
                return $response->json();
            }

            Log::error('Xendit createInvoice failed', [
                'status'  => $response->status(),
                'body'    => $response->body(),
                'payload' => $payload,
            ]);

            return null;
        } catch (\Throwable $e) {
            Log::error('Xendit createInvoice exception: ' . $e->getMessage(), [
                'order_number' => $order->order_number,
            ]);
            return null;
        }
    }

    /**
     * Cek status invoice langsung dari Xendit berdasarkan invoice_id
     */
    public function getInvoice(string $invoiceId): ?array
    {
        if (!$this->hasKey() || empty($invoiceId)) {
            return null;
        }

        try {
            $response = Http::withBasicAuth($this->secretKey, '')
                ->withHeaders([
                    'Accept' => 'application/json',
                ])
                ->timeout(10)
                ->get("{$this->apiBase}/invoices/{$invoiceId}");

            if ($response->successful()) {
                return $response->json();
            }

            Log::warning('Xendit getInvoice failed: ' . $response->body());
            return null;
        } catch (\Throwable $e) {
            Log::warning('Xendit getInvoice exception: ' . $e->getMessage());
            return null;
        }
    }
}
