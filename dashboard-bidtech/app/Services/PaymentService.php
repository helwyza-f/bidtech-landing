<?php

namespace App\Services;

use App\Enums\OrderStatus;
use App\Mail\InvoiceUnpaidMail;
use App\Mail\PaymentSuccessAndAccountMail;
use App\Models\Order;
use App\Models\Coupon;
use App\Enums\CommissionType;
use App\Models\Template;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Contracts\Session\Session;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class PaymentService
{
    private const XENDIT_API_URL = 'https://api.xendit.co/v2/invoices';

    private const FONNTE_API_URL = 'https://api.fonnte.com/send';

    public function __construct(
        private readonly OrderService $orders,
        private readonly UserService $users,
    ) {}

    // ---- Confirmation and checkout promos ----

    public function showSummary(Session $session, Template $template): array
    {
        $checkout = $session->get('checkout', []);
        $domainPrice = (int) ($checkout['domain_price'] ?? config('domain.default_price'));
        $promo = $session->get('checkout.promo');
        $discountAmount = 0;

        if (! empty($promo['code'])) {
            $validation = $this->validatePromo(
                $promo['code'],
                $template,
                $domainPrice,
                $checkout['customer']['email'] ?? null
            );
            if ($validation['valid']) {
                $discountAmount = $validation['discount_amount'];
                $promo['discount_amount'] = $discountAmount;
                $promo['partner_commission_amount'] = $validation['partner_commission_amount'];
                $session->put('checkout.promo', $promo);
            } else {
                $session->forget('checkout.promo');
                $promo = null;
            }
        }

        return $template->priceBreakdown($domainPrice, $discountAmount) + [
            'template' => $template,
            'checkout' => $checkout,
            'promo' => $promo,
            'step' => 3,
            'flow' => $session->get('checkout.flow', OrderService::FLOW_TEMPLATE_FIRST),
        ];
    }

    public function validatePromo(string $code, Template $template, int $domainPrice, ?string $email = null): array
    {
        try {
            $cleanCode = strtoupper(trim($code));
            if ($cleanCode === '') {
                throw new \DomainException('Silakan masukkan kode promo.');
            }
            $promo = Coupon::with('partner.user')->where('code', $cleanCode)->first();
            if (! $promo) {
                throw new \DomainException('Kode promo tidak ditemukan. Periksa kembali penulisan kode promo Anda.');
            }

            $prices = $template->priceBreakdown($domainPrice);
            $subtotal = $prices['subtotal'];
            $this->checkPromoEligibility($promo, $template, $email, $subtotal);
            $discount = $this->calculatePromoDiscount($promo, $prices);
            $newTotal = max(0, $subtotal - $discount);

            return [
                'valid' => true,
                'coupon_id' => $promo->id,
                'promo_id' => $promo->id,
                'code' => $promo->code,
                'name' => $promo->name,
                'description' => null,
                'is_partner' => $promo->partner_id !== null,
                'partner_name' => $promo->partner?->user?->name,
                'partner_code' => null,
                'discount_amount' => $discount,
                'formatted_discount' => $this->rupiah($discount),
                'partner_commission_amount' => $this->partnerCommission($promo, $subtotal),
                'new_total' => $newTotal,
                'formatted_new_total' => $this->rupiah($newTotal),
                'message' => $this->promoSuccessMessage($promo, $discount),
            ];
        } catch (\DomainException $e) {
            return ['valid' => false, 'message' => $e->getMessage()];
        }
    }

    public function checkPromoEligibility(Coupon $promo, Template $template, ?string $email, int $subtotal): void
    {
        if (! $promo->is_active) {
            throw new \DomainException('Kode promo ini sedang tidak aktif.');
        }
        if ($promo->isExpired()) {
            throw new \DomainException('Masa berlaku kode promo ini telah berakhir atau belum dimulai.');
        }
        if (! $promo->hasQuota($email)) {
            throw new \DomainException('Mohon maaf, kuota penggunaan kode promo ini sudah habis.');
        }
        if ($promo->min_order_amount !== null && $subtotal < $promo->min_order_amount) {
            throw new \DomainException(
                'Minimal pemesanan untuk menggunakan kode promo ini adalah Rp'.number_format($promo->min_order_amount, 0, ',', '.').'.'
            );
        }
    }

    public function calculatePromoDiscount(Coupon $promo, array $prices): int
    {
        return $promo->discountFor('subtotal', $prices['subtotal'])
            + $promo->discountFor('template', $prices['templatePrice'])
            + $promo->discountFor('server', $prices['serverPrice'])
            + $promo->discountFor('service', $prices['servicePrice'])
            + $promo->discountFor('domain', $prices['domainPrice']);
    }

    public function applyPromo(Session $session, Template $template, string $code, string $fallbackEmail = ''): array
    {
        $checkout = $session->get('checkout', []);
        $domainPrice = (int) ($checkout['domain_price'] ?? config('domain.default_price'));
        $customerEmail = $checkout['customer']['email'] ?? $fallbackEmail;
        $result = $this->validatePromo(trim($code), $template, $domainPrice, $customerEmail);
        if ($result['valid']) {
            $session->put('checkout.promo', [
                'coupon_id' => $result['coupon_id'],
                'promo_id' => $result['coupon_id'],
                'code' => $result['code'],
                'name' => $result['name'],
                'description' => $result['description'],
                'is_partner' => $result['is_partner'],
                'partner_name' => $result['partner_name'],
                'partner_code' => $result['partner_code'],
                'discount_amount' => $result['discount_amount'],
                'partner_commission_amount' => $result['partner_commission_amount'],
            ]);
        }

        return $result;
    }

    public function removePromo(Session $session, Template $template): int
    {
        $session->forget('checkout.promo');
        $domainPrice = (int) ($session->get('checkout.domain_price') ?? config('domain.default_price'));

        return $template->priceBreakdown($domainPrice)['totalPrice'];
    }

    public function claimPromoQuota(int|string $promoId, string $email): Coupon
    {
        $promo = Coupon::with('partner.user')->where('id', $promoId)->lockForUpdate()->first();
        if (! $promo) {
            throw new \RuntimeException('Kode promo tidak ditemukan. Promo mungkin telah dihapus.');
        }
        if (! $promo->hasQuota($email)) {
            throw new \RuntimeException("Mohon maaf, kuota kode promo {$promo->code} telah habis. Checkout Anda diproses tanpa promo.");
        }
        return $promo;
    }

    public function recordPromoUsage(Coupon $promo, Order $order, int $discountAmount, int $commissionAmount = 0): void
    {
        // Pemakaian merupakan snapshot pada orders; tidak ada tabel usage terpisah.
    }

    // ---- Payment lifecycle ----

    public function placeOrder(Template $template, array $checkout): Order
    {
        $promo = $checkout['promo'] ?? null;
        $promoId = $promo['coupon_id'] ?? $promo['promo_id'] ?? null;
        $discount = (int) ($promo['discount_amount'] ?? 0);
        $commission = (int) ($promo['partner_commission_amount'] ?? 0);

        $order = DB::transaction(function () use ($template, $checkout, $promoId, $discount, $commission) {
            $claimedPromo = $promoId
                ? $this->claimPromoQuota($promoId, $checkout['customer']['email'])
                : null;
            $order = $this->orders->create($template, $checkout);
            if ($claimedPromo) {
                $this->recordPromoUsage($claimedPromo, $order, $discount, $commission);
            }

            return $order;
        });

        $this->createInvoice($order, $template, $checkout['customer']);
        $this->sendInvoiceMail($order);
        $this->sendInvoiceWhatsapp($order);

        return $order;
    }

    public function createInvoice(Order $order, Template $template, array $customer): void
    {
        $invoice = $this->createXenditInvoice($order, $template, $customer);
        if ($invoice && ! empty($invoice['invoice_url'])) {
            $order->update([
                'xendit_invoice_id' => $invoice['id'] ?? null,
                'xendit_payment_url' => $invoice['invoice_url'],
                'payment_expires_at' => ! empty($invoice['expiry_date'])
                    ? Carbon::parse($invoice['expiry_date'])
                    : now()->addDay(),
            ]);

            return;
        }
        $order->update([
            'xendit_payment_url' => route('checkout.bayar', ['template' => $template->id, 'order' => $order->order_number]),
            'payment_expires_at' => now()->addDay(),
        ]);
    }

    public function showPayment(Order $order, Template $template, string $flow): array
    {
        $orderTemplate = $order->template ?? $template;
        $this->orders->ensureExpiry($order);
        $this->refreshStatus($order);
        $user = $order->isPaid()
            ? $this->activatePaidOrder($order, withWhatsapp: false)
            : $order->client;

        return $order->priceBreakdown($orderTemplate) + [
            'template' => $orderTemplate,
            'order' => $order,
            'user' => $user,
            'isExistingUser' => false,
            'step' => 4,
            'flow' => $flow,
        ];
    }

    public function refreshStatus(Order $order): void
    {
        if ($order->isExpired() && $order->status !== OrderStatus::Invalid && ! $order->isPaid()) {
            $this->orders->markInvalid($order);
        }
        if ($order->isPaid() || $order->status === OrderStatus::Invalid || empty($order->xendit_invoice_id)) {
            return;
        }
        $invoice = $this->getXenditInvoice($order->xendit_invoice_id);
        if (! $invoice) {
            return;
        }
        $status = strtoupper($invoice['status'] ?? '');
        if (in_array($status, ['PAID', 'SETTLED'])) {
            $this->orders->markPaid($order);
        } elseif ($status === 'EXPIRED') {
            $this->orders->markInvalid($order);
        }
    }

    public function activatePaidOrder(Order $order, bool $withWhatsapp = true): User
    {
        $existing = $order->client_id !== null;
        $user = $this->users->createClientAccount($order);
        if ($existing) {
            $this->users->normalizeClientEmail($order, $user);
        }
        $this->notifyOrderPaid($order, $user, $withWhatsapp);

        return $user;
    }

    public function handleXenditWebhook(Order $order, string $status): void
    {
        $status = strtoupper($status);
        if (in_array($status, ['PAID', 'SETTLED'])) {
            $this->orders->markPaid($order);
            $user = $this->users->syncClientAccountFromOrder($order);
            $this->notifyOrderPaid($order, $user);
            Log::info("Xendit webhook: order {$order->order_number} mark as PAID & user activated with email {$user->email}");
        } elseif ($status === 'EXPIRED') {
            $this->orders->markInvalid($order);
            Log::info("Xendit webhook: order {$order->order_number} mark as EXPIRED");
        }
    }

    public function renderInvoice(Order $order): string
    {
        return view('pdf.invoice', [
            'order' => $order,
            'template' => $order->template,
            'autoPrint' => true,
        ])->render();
    }

    // ---- Notifications ----

    public function sendInvoiceMail(Order $order): void
    {
        try {
            Mail::to($order->email)->send(new InvoiceUnpaidMail($order));
        } catch (\Throwable $e) {
            Log::warning("Gagal mengirim email tagihan unpaid untuk order {$order->order_number}: ".$e->getMessage());
        }
    }

    public function sendInvoiceWhatsapp(Order $order): void
    {
        try {
            $this->sendWhatsapp($order->whatsapp, $this->invoiceWhatsappMessage($order));
        } catch (\Throwable $e) {
            Log::warning("Gagal mengirim WhatsApp invoice via Fonnte untuk order {$order->order_number}: ".$e->getMessage());
        }
    }

    public function sendPaymentSuccessMail(Order $order, User $user): void
    {
        try {
            Mail::to($order->email)->send(new PaymentSuccessAndAccountMail($order, $user));
            $order->update(['paid_email_sent_at' => now()]);
        } catch (\Throwable $e) {
            Log::warning("Gagal mengirim email lunas & kredensial untuk order {$order->order_number}: ".$e->getMessage());
        }
    }

    public function sendPaymentSuccessWhatsapp(Order $order, User $user): void
    {
        try {
            $this->sendWhatsapp($order->whatsapp, $this->paymentSuccessWhatsappMessage($order, $user));
        } catch (\Throwable $e) {
            Log::warning("Gagal mengirim WhatsApp lunas via Fonnte untuk order {$order->order_number}: ".$e->getMessage());
        }
    }

    public function notifyOrderPaid(Order $order, User $user, bool $withWhatsapp = true): void
    {
        if (! empty($order->paid_email_sent_at)) {
            return;
        }
        $this->sendPaymentSuccessMail($order, $user);
        if ($withWhatsapp) {
            $this->sendPaymentSuccessWhatsapp($order, $user);
        }
    }

    // ---- Xendit (internal) ----

    private function createXenditInvoice(Order $order, Template $template, array $customer): ?array
    {
        $secretKey = config('services.xendit.key');
        if (empty($secretKey)) {
            Log::error('CreateXenditInvoice: XENDIT_SECRET_KEY belum dikonfigurasi.');

            return null;
        }

        $prices = $order->priceBreakdown($template);
        $discount = $prices['discountAmount'];
        $description = "Pemesanan Website {$template->name} + Domain {$order->domain_name}";
        if ($discount > 0 && ! empty($order->coupon_code)) {
            $description .= ' (Hemat Rp '.number_format($discount, 0, ',', '.')." via {$order->coupon_code})";
        }
        $returnUrl = route('checkout.bayar', ['template' => $template->id, 'order' => $order->order_number]);
        $payload = [
            'external_id' => $order->order_number,
            'amount' => $prices['totalPrice'],
            'payer_email' => $customer['email'],
            'description' => $description,
            'customer' => [
                'given_names' => $customer['name'],
                'email' => $customer['email'],
                'mobile_number' => $customer['whatsapp'],
            ],
            'customer_notification_preference' => [
                'invoice_created' => [],
                'invoice_reminder' => [],
                'invoice_paid' => [],
            ],
            'success_redirect_url' => $returnUrl,
            'failure_redirect_url' => $returnUrl,
            'currency' => 'IDR',
            'items' => $discount > 0
                ? $this->discountedItems($order, $template, $prices)
                : $this->fullPriceItems($order, $template, $prices),
        ];

        try {
            $response = Http::withBasicAuth($secretKey, '')
                ->withHeaders(['Accept' => 'application/json', 'Content-Type' => 'application/json'])
                ->timeout(15)
                ->post(self::XENDIT_API_URL, $payload);
            if ($response->successful()) {
                return $response->json();
            }
            Log::error('Xendit createInvoice failed', [
                'status' => $response->status(),
                'body' => $response->body(),
                'payload' => $payload,
            ]);

            return null;
        } catch (\Throwable $e) {
            Log::error('Xendit createInvoice exception: '.$e->getMessage(), ['order_number' => $order->order_number]);

            return null;
        }
    }

    private function getXenditInvoice(string $invoiceId): ?array
    {
        $secretKey = config('services.xendit.key');
        if (empty($secretKey) || empty($invoiceId)) {
            return null;
        }
        try {
            $response = Http::withBasicAuth($secretKey, '')
                ->withHeaders(['Accept' => 'application/json'])
                ->timeout(10)
                ->get(self::XENDIT_API_URL."/{$invoiceId}");
            if ($response->successful()) {
                return $response->json();
            }
            Log::warning('Xendit getInvoice failed: '.$response->body());

            return null;
        } catch (\Throwable $e) {
            Log::warning('Xendit getInvoice exception: '.$e->getMessage());

            return null;
        }
    }

    // ---- Internal helpers ----

    private function partnerCommission(Coupon $promo, int $subtotal): int
    {
        $partner = $promo->partner;
        if (! $partner) {
            return 0;
        }

        return match ($partner->type_commission) {
            CommissionType::Fixed => (int) $partner->amount_commission,
            CommissionType::Percentage => (int) round(($subtotal * $partner->amount_commission) / 100),
        };
    }

    private function promoSuccessMessage(Coupon $promo, int $discount): string
    {
        $partner = $promo->partner?->user?->name;
        return $partner
            ? "Kode kupon kemitraan {$partner} berhasil digunakan! Anda hemat {$this->rupiah($discount)}"
            : "Kode kupon {$promo->code} berhasil diterapkan! Anda hemat {$this->rupiah($discount)}";
    }

    private function fullPriceItems(Order $order, Template $template, array $prices): array
    {
        return [
            ['name' => "Lisensi Template: {$template->name}", 'quantity' => 1, 'price' => $prices['templatePrice'], 'category' => 'Website Template'],
            ['name' => 'Cloud Server & Hosting (1 Tahun)', 'quantity' => 1, 'price' => $prices['serverPrice'], 'category' => 'Cloud Server'],
            ['name' => 'Setup & Layanan Deployment', 'quantity' => 1, 'price' => $prices['servicePrice'], 'category' => 'Service & Setup'],
            ['name' => "Domain {$order->domain_name} (".($order->domain_duration ?: 1).' Tahun)', 'quantity' => 1, 'price' => $prices['domainPrice'], 'category' => 'Domain Registration'],
        ];
    }

    private function discountedItems(Order $order, Template $template, array $prices): array
    {
        $discount = $prices['discountAmount'];
        $packageDiscount = min($prices['packageTotal'], $discount);
        $domainDiscount = max(0, $discount - $packageDiscount);
        $packageNet = max(0, $prices['packageTotal'] - $packageDiscount);
        $domainNet = max(0, $prices['domainPrice'] - $domainDiscount);
        $items = [];
        if ($packageNet > 0) {
            $items[] = ['name' => "Paket Website {$template->name} (Diskon {$order->coupon_code})", 'quantity' => 1, 'price' => $packageNet, 'category' => 'Website Package'];
        }
        if ($domainNet > 0) {
            $items[] = [
                'name' => "Domain {$order->domain_name} (".($order->domain_duration ?: 1).' Tahun)'.($domainDiscount > 0 ? " (Diskon {$order->coupon_code})" : ''),
                'quantity' => 1,
                'price' => $domainNet,
                'category' => 'Domain Registration',
            ];
        }
        if ($items === []) {
            $items[] = ['name' => "Paket Website {$template->name} + Domain {$order->domain_name}", 'quantity' => 1, 'price' => $prices['totalPrice'], 'category' => 'Website Package'];
        }

        return $items;
    }

    private function invoiceWhatsappMessage(Order $order): string
    {
        $order->loadMissing('template');
        $template = $order->template;
        $total = number_format($order->total_price, 0, ',', '.');
        $duration = $order->domain_duration ?: 1;
        $paymentUrl = $order->xendit_payment_url ?: route('checkout.bayar', ['template' => $order->template_id, 'order' => $order->order_number]);
        $pdfUrl = route('checkout.invoice.download', $order);
        $promoInfo = ! empty($order->discount_amount) && $order->discount_amount > 0
            ? '🏷️ *Diskon Promo:* -Rp '.number_format($order->discount_amount, 0, ',', '.')." ({$order->coupon_code})\n"
            : '';
        $partnerInfo = $order->is_partner_order && ! empty($order->partner_name)
            ? "🤝 *Program Kemitraan:* {$order->partner_name}\n"
            : '';

        return "Halo *{$order->full_name}*, terima kasih telah melakukan pemesanan di *Bidtech*! 🚀\n\n"
            ."Berikut rincian tagihan pesanan website Anda:\n"
            ."━━━━━━━━━━━━━━━━━━━━\n"
            ."📄 *No. Invoice:* #{$order->order_number}\n"
            .'🎨 *Template:* '.($template->name ?? 'Bidtech Template')."\n"
            ."🌐 *Domain:* {$order->domain_name} ({$duration} Tahun)\n"
            .$partnerInfo.$promoInfo
            ."💰 *Total Tagihan:* *Rp {$total}*\n"
            ."━━━━━━━━━━━━━━━━━━━━\n\n"
            ."💳 *Tautan Pembayaran Resmi (QRIS / Virtual Account):*\n👉 {$paymentUrl}\n\n"
            ."📄 *Unduh Dokumen Invoice (PDF):*\n👉 {$pdfUrl}\n\n"
            ."⚠️ _Batas waktu pembayaran berlaku 1x24 jam._\n"
            ."Jika Anda sudah menyelesaikan pembayaran atau memiliki pertanyaan, Anda dapat langsung membalas pesan WhatsApp ini.\n\n"
            ."Salam hangat,\n*Tim Bidtech Official*";
    }

    private function paymentSuccessWhatsappMessage(Order $order, User $user): string
    {
        $order->loadMissing('template');
        $total = number_format($order->total_price, 0, ',', '.');
        $loginUrl = url('/login');

        return "🎉 *PEMBAYARAN BERHASIL & TERKONFIRMASI!*\n\n"
            ."Halo *{$order->full_name}*,\n"
            ."Pembayaran untuk pesanan website Anda dengan nomor invoice *#{$order->order_number}* sebesar *Rp {$total}* telah kami terima.\n\n"
            ."━━━━━━━━━━━━━━━━━━━━\n"
            ."🔐 *AKUN KLIEN & AKSES PROYEK:*\n"
            ."🌐 *Domain:* {$order->domain_name}\n"
            ."📧 *Email Login:* `{$user->email}`\n"
            ."🔑 *Password Default:* `Password123!`\n"
            ."🔗 *Tautan Login:* {$loginUrl}\n"
            ."━━━━━━━━━━━━━━━━━━━━\n\n"
            ."🛠️ Tim teknis Bidtech saat ini sedang menyiapkan instalasi template dan konfigurasi domain Anda. Anda dapat memantau progres pengerjaan website secara berkala di Dashboard Klien.\n\n"
            ."Terima kasih atas kepercayaan Anda bermitra bersama *Bidtech*!\n\n"
            ."Salam hangat,\n*Tim Bidtech Official*";
    }

    private function sendWhatsapp(string $target, string $message, ?string $url = null, ?string $filename = null): array
    {
        $token = config('services.fonnte.token');
        if (empty($token)) {
            Log::warning('SendWhatsappMessage: FONNTE_TOKEN belum dikonfigurasi di .env');

            return ['status' => false, 'message' => 'Token not configured'];
        }
        $cleanTarget = $this->normalizePhone($target);
        if (empty($cleanTarget)) {
            Log::warning("SendWhatsappMessage: Nomor target WhatsApp tidak valid: '{$target}'");

            return ['status' => false, 'message' => 'Invalid phone number'];
        }
        $payload = ['target' => $cleanTarget, 'message' => $message, 'countryCode' => '62'];
        if (! empty($url)) {
            $payload['url'] = $url;
            if (! empty($filename)) {
                $payload['filename'] = $filename;
            }
        }
        try {
            $response = Http::withHeaders(['Authorization' => $token])
                ->timeout(15)->asForm()->post(self::FONNTE_API_URL, $payload);
            $result = $response->json() ?? [];
            Log::info("SendWhatsappMessage: Pesan WA terkirim ke {$cleanTarget}", ['response' => $result]);

            return $result;
        } catch (\Throwable $e) {
            Log::error("SendWhatsappMessage: Gagal mengirim pesan WA ke {$cleanTarget}: ".$e->getMessage());

            return ['status' => false, 'message' => $e->getMessage()];
        }
    }

    private function normalizePhone(string $phone): string
    {
        $phone = preg_replace('/[^0-9]/', '', $phone);
        if (str_starts_with($phone, '0')) {
            return '62'.substr($phone, 1);
        }
        if (str_starts_with($phone, '8')) {
            return '62'.$phone;
        }

        return $phone;
    }

    private function rupiah(int $amount): string
    {
        return 'Rp'.number_format($amount, 0, ',', '.');
    }
}
