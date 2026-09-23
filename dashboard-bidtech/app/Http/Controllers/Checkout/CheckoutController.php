<?php

namespace App\Http\Controllers\Checkout;

use App\Enums\DomainStatus;
use App\Enums\OrderStatus;
use App\Enums\WebsiteStatus;
use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Template;
use App\Models\User;
use App\Services\Domain\IdCloudHostDomainService;
use App\Mail\InvoiceUnpaidMail;
use App\Mail\PaymentSuccessAndAccountMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Illuminate\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

use App\Services\Promo\PromoService;
use App\Models\Promo;
use App\Models\PromoUsage;

class CheckoutController extends Controller
{
    public function __construct(
        protected IdCloudHostDomainService $domainService,
        protected \App\Services\Payment\XenditPaymentService $xenditService,
        protected \App\Services\Notification\FonnteService $fonnteService,
        protected PromoService $promoService
    ) {}

    /**
     * API Publik: Pencarian Domain Real-time untuk Landing Page Next.js
     * Endpoint: GET /api/domain/search?q={query}
     */
    public function cariDomainApi(Request $request): JsonResponse
    {
        $query = trim($request->input('q', $request->input('domain', $request->input('search', ''))));

        if (empty($query)) {
            return response()->json([
                'status'  => 'error',
                'message' => 'Kata kunci pencarian domain tidak boleh kosong.',
                'domains' => [],
            ], 400)->header('Access-Control-Allow-Origin', '*')
                   ->header('Access-Control-Allow-Methods', 'GET, OPTIONS')
                   ->header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With');
        }

        $searchData = $this->domainService->cariDomainWithMeta($query);

        return response()->json([
            'status'       => 'success',
            'query'        => $query,
            'domains'      => $searchData['domains'] ?? [],
            'is_live_api'  => $searchData['is_live_api'] ?? false,
            'source'       => $searchData['source'] ?? 'idle',
            'status_label' => $searchData['status_label'] ?? '',
            'has_api_key'  => $searchData['has_api_key'] ?? false,
        ])->header('Access-Control-Allow-Origin', '*')
          ->header('Access-Control-Allow-Methods', 'GET, OPTIONS')
          ->header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With');
    }

    /**
     * Alur Domain-First: Halaman Pilih Template setelah domain dipilih di Landing Page
     * URL: /checkout/pilih-template?domain={domain}&price={price}
     */
    public function halamanPilihTemplate(Request $request): View
    {
        $domainParam = trim($request->input('domain', ''));
        $priceParam  = (int) $request->input('price', 0);
        $taxParam    = (int) $request->input('tax_amount', 0);
        $baseParam   = (int) $request->input('price_base', 0);

        if (!empty($domainParam)) {
            if ($priceParam <= 0) {
                foreach ($this->domainService->ekstensiDomain as $ext => $p) {
                    if (str_ends_with(strtolower($domainParam), '.' . $ext)) {
                        $priceParam = $p;
                        break;
                    }
                }
                if ($priceParam <= 0) {
                    $priceParam = 185000;
                }
            }

            if ($baseParam <= 0) {
                $baseParam = (int) round($priceParam / 1.11);
            }
            if ($taxParam <= 0) {
                $taxParam = $priceParam - $baseParam;
            }

            $request->session()->put('checkout.domain_name', $domainParam);
            $request->session()->put('checkout.domain_price', $priceParam);
            $request->session()->put('checkout.domain_tax', $taxParam);
            $request->session()->put('checkout.domain_price_base', $baseParam);
            $request->session()->put('checkout.flow', 'domain-first');
        }

        // Sinkronisasi data template dari API Next.js jika ada pembaruan
        $this->sinkronisasiTemplateDariApi();

        $domainTerpilih = $request->session()->get('checkout.domain_name');
        $domainPrice    = (int) $request->session()->get('checkout.domain_price', 0);
        $templates      = Template::all();

        return view('checkout.pilih-template', [
            'templates'      => $templates,
            'domainTerpilih' => $domainTerpilih,
            'domainPrice'    => $domainPrice,
            'checkout'       => $request->session()->get('checkout', []),
            'step'           => 1,
            'flow'           => 'domain-first',
        ]);
    }

    /**
     * Alur Domain-First: Pilih Template dan langsung lanjut ke halaman Data Diri
     * URL: POST/GET /checkout/pilih-template/{template}
     */
    public function prosesPilihTemplate(Template $template, Request $request): RedirectResponse
    {
        // Tangkap domain jika disertakan di parameter form
        $domainParam = trim($request->input('domain', ''));
        if (!empty($domainParam) && !$request->session()->has('checkout.domain_name')) {
            $this->halamanPilihTemplate($request);
        }

        if (!$request->session()->has('checkout.domain_name')) {
            return redirect()->route('checkout.pilih-template')
                ->with('error', 'Silakan pilih domain terlebih dahulu sebelum memilih template.');
        }

        $this->menambahkanSession($template, $request);
        $request->session()->put('checkout.flow', 'domain-first');

        return redirect()->route('checkout.data-diri', $template);
    }

    /**
     * Alur Domain-First: Update domain dari Modal Ganti Domain secara AJAX
     */
    public function updateDomainAjax(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'domain'     => ['required', 'string'],
            'price'      => ['nullable', 'numeric'],
            'tax_amount' => ['nullable', 'numeric'],
            'price_base' => ['nullable', 'numeric'],
        ]);

        $domain = trim($validated['domain']);
        $price = (int) ($validated['price'] ?? 0);
        $taxAmount = (int) ($validated['tax_amount'] ?? 0);
        $priceBase = (int) ($validated['price_base'] ?? 0);

        if ($price <= 0) {
            foreach ($this->domainService->ekstensiDomain as $ext => $p) {
                if (str_ends_with(strtolower($domain), '.' . $ext)) {
                    $price = $p;
                    break;
                }
            }
            if ($price <= 0) {
                $price = 185000;
            }
        }

        if ($priceBase <= 0) {
            $priceBase = (int) round($price / 1.11);
        }
        if ($taxAmount <= 0) {
            $taxAmount = $price - $priceBase;
        }

        $request->session()->put('checkout.domain_name', $domain);
        $request->session()->put('checkout.domain_price', $price);
        $request->session()->put('checkout.domain_tax', $taxAmount);
        $request->session()->put('checkout.domain_price_base', $priceBase);
        $request->session()->put('checkout.flow', 'domain-first');

        return response()->json([
            'status'          => 'success',
            'domain_name'     => $domain,
            'domain_price'    => $price,
            'formatted_price' => 'Rp' . number_format($price, 0, ',', '.'),
            'message'         => "Domain {$domain} berhasil dipilih!",
        ]);
    }

    /**
     * Langkah 1: Masuk ke halaman checkout domain
     */
    public function masukHalamanCheckout(Template $template, Request $request): View
    {
        $this->menambahkanSession($template, $request);

        $query = trim($request->input('q', ''));
        $searchData = [
            'domains'      => [],
            'is_live_api'  => false,
            'source'       => 'idle',
            'status_label' => '',
            'has_api_key'  => !empty(config('services.idcloudhost.key')),
        ];

        if (!empty($query)) {
            $searchData = $this->domainService->cariDomainWithMeta($query);
            $request->session()->put('checkout.domain_results', $searchData['domains']);
            $request->session()->put('checkout.domain_query', $query);
        } else {
            // Tampilan default saat pertama kali membuka halaman (tanpa query pencarian)
            $searchData = $this->domainService->cariDomainWithMeta('namabisnismu');
            $request->session()->put('checkout.domain_results', $searchData['domains']);
            $request->session()->forget('checkout.domain_query');
        }

        $request->session()->put('checkout.flow', 'template-first');

        return view('checkout.domain', [
            'template'      => $template,
            'checkout'      => $request->session()->get('checkout', []),
            'domainResults' => $searchData['domains'] ?? [],
            'searchMeta'    => $searchData,
            'step'          => 1,
            'flow'          => 'template-first',
        ]);
    }

    /**
     * Langkah 1 (Live Search AJAX): Cari domain real-time saat user mengetik minimal 3 karakter
     */
    public function cariDomainAjax(Template $template, Request $request): JsonResponse
    {
        $query = trim($request->input('q', ''));
        $searchData = $this->domainService->cariDomainWithMeta($query);

        if (!empty($searchData['domains'])) {
            $request->session()->put('checkout.domain_results', $searchData['domains']);
        }

        return response()->json([
            'status'        => 'success',
            'query'         => $query,
            'domains'       => $searchData['domains'],
            'is_live_api'   => $searchData['is_live_api'],
            'source'        => $searchData['source'],
            'status_label'  => $searchData['status_label'],
            'has_api_key'   => $searchData['has_api_key'],
            'select_url'    => route('checkout.domain.select', $template),
            'csrf_token'    => csrf_token(),
        ]);
    }

    /**
     * Langkah 1 (Submit): Pilih salah satu domain yang tersedia
     */
    public function pilihDomain(Template $template, Request $request): RedirectResponse|JsonResponse
    {
        $validated = $request->validate([
            'domain'     => ['required', 'string'],
            'price'      => ['nullable', 'numeric'],
            'duration'   => ['nullable', 'integer', 'in:1,2,3'],
            'tax_amount' => ['nullable', 'numeric'],
            'price_base' => ['nullable', 'numeric'],
        ]);

        $domain = $validated['domain'];
        $pricePerYear = (int) ($validated['price'] ?? 0);
        // Pilihan durasi 2 & 3 tahun disembunyikan sementara (fitur versi selanjutnya),
        // order untuk saat ini selalu default 1 tahun.
        $duration = 1;

        // Jika harga per tahun tidak dikirim, ambil default berdasarkan ekstensi
        if ($pricePerYear <= 0) {
            foreach ($this->domainService->ekstensiDomain as $ext => $p) {
                if (str_ends_with($domain, '.' . $ext)) {
                    $pricePerYear = $p;
                    break;
                }
            }
            if ($pricePerYear <= 0) {
                $pricePerYear = 185000;
            }
        }

        $totalPrice = $pricePerYear * $duration;
        $totalBase = (int) round($totalPrice / 1.11);
        $totalTax = $totalPrice - $totalBase;

        $request->session()->put('checkout.domain_name', $domain);
        $request->session()->put('checkout.domain_duration', $duration);
        $request->session()->put('checkout.domain_price_per_year', $pricePerYear);
        $request->session()->put('checkout.domain_price', $totalPrice);
        $request->session()->put('checkout.domain_tax', $totalTax);
        $request->session()->put('checkout.domain_price_base', $totalBase);
        $request->session()->put('checkout.flow', 'template-first');

        if ($request->ajax() || $request->wantsJson()) {
            return response()->json([
                'status'                => 'success',
                'domain_name'           => $domain,
                'domain_duration'       => $duration,
                'domain_price_per_year' => $pricePerYear,
                'formatted_price_year'  => 'Rp' . number_format($pricePerYear, 0, ',', '.'),
                'domain_price'          => $totalPrice,
                'formatted_price'       => 'Rp' . number_format($totalPrice, 0, ',', '.'),
                'domain_tax'            => $totalTax,
                'domain_price_base'     => $totalBase,
                'total_price'           => $template->price + $totalPrice,
                'formatted_total'       => 'Rp' . number_format($template->price + $totalPrice, 0, ',', '.'),
            ]);
        }

        return redirect()->route('checkout.domain', $template)->with('success', "Domain {$domain} berhasil dipilih!");
    }

    /**
     * Langkah 1 (AJAX): Ubah durasi pendaftaran domain (1, 2, atau 3 Tahun)
     */
    public function updateDomainDurationAjax(Template $template, Request $request): JsonResponse
    {
        $request->validate([
            'duration' => ['required', 'integer', 'in:1,2,3'],
        ]);

        // Pilihan durasi 2 & 3 tahun disembunyikan sementara (fitur versi selanjutnya),
        // order untuk saat ini selalu default 1 tahun terlepas dari input yang dikirim.
        $duration = 1;
        $domain = $request->session()->get('checkout.domain_name');

        if (!$domain) {
            return response()->json([
                'status'  => 'error',
                'message' => 'Silakan pilih domain terlebih dahulu.',
            ], 400);
        }

        $pricePerYear = (int) ($request->session()->get('checkout.domain_price_per_year') ?: 185000);
        $totalPrice = $pricePerYear * $duration;
        $totalBase = (int) round($totalPrice / 1.11);
        $totalTax = $totalPrice - $totalBase;

        $request->session()->put('checkout.domain_duration', $duration);
        $request->session()->put('checkout.domain_price', $totalPrice);
        $request->session()->put('checkout.domain_tax', $totalTax);
        $request->session()->put('checkout.domain_price_base', $totalBase);

        return response()->json([
            'status'                => 'success',
            'domain_name'           => $domain,
            'domain_duration'       => $duration,
            'domain_price_per_year' => $pricePerYear,
            'formatted_price_year'  => 'Rp' . number_format($pricePerYear, 0, ',', '.'),
            'domain_price'          => $totalPrice,
            'formatted_price'       => 'Rp' . number_format($totalPrice, 0, ',', '.'),
            'total_price'           => $template->price + $totalPrice,
            'formatted_total'       => 'Rp' . number_format($template->price + $totalPrice, 0, ',', '.'),
        ]);
    }

    /**
     * Langkah 2: Halaman Data Diri
     */
    public function halamanDataDiri(Template $template, Request $request): View|RedirectResponse
    {
        if (!$request->session()->has('checkout.domain_name')) {
            return redirect()->route('checkout.domain', $template)
                ->with('error', 'Silakan pilih domain terlebih dahulu.');
        }

        return view('checkout.data-diri', [
            'template' => $template,
            'checkout' => $request->session()->get('checkout', []),
            'step'     => 2,
            'flow'     => $request->session()->get('checkout.flow', 'template-first'),
        ]);
    }

    /**
     * Langkah 2 (Submit): Simpan data diri ke session
     */
    public function simpanDataDiri(Template $template, Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name'     => ['required', 'string', 'max:150'],
            'email'    => ['required', 'email', 'max:150'],
            'whatsapp' => ['required', 'string', 'max:30'],
            'notes'    => ['nullable', 'string', 'max:500'],
        ], [
            'name.required'     => 'Nama lengkap wajib diisi.',
            'email.required'    => 'Alamat email wajib diisi.',
            'email.email'       => 'Format email tidak valid.',
            'whatsapp.required' => 'Nomor WhatsApp wajib diisi.',
        ]);

        $request->session()->put('checkout.customer', [
            'name'     => $validated['name'],
            'email'    => $validated['email'],
            'whatsapp' => $validated['whatsapp'],
            'notes'    => $validated['notes'] ?? '',
        ]);

        return redirect()->route('checkout.ringkasan', $template);
    }

    /**
     * Langkah 3: Halaman Ringkasan Pesanan
     */
    public function halamanRingkasan(Template $template, Request $request): View|RedirectResponse
    {
        $checkout = $request->session()->get('checkout', []);

        if (empty($checkout['domain_name'])) {
            return redirect()->route('checkout.domain', $template);
        }

        if (empty($checkout['customer'])) {
            return redirect()->route('checkout.data-diri', $template);
        }

        $domainPrice   = (int) ($checkout['domain_price'] ?? 185000);
        $templatePrice = (int) ($template->template_price ?? 1000000);
        $serverPrice   = (int) ($template->server_price ?? 500000);
        $servicePrice  = (int) ($template->service_price ?? 500000);
        $subtotal      = $templatePrice + $serverPrice + $servicePrice + $domainPrice;

        // Cek promo aktif dari sesi
        $promoSession = $request->session()->get('checkout.promo');
        $discountAmount = 0;
        if (!empty($promoSession['code'])) {
            $validation = $this->promoService->validateAndCalculate(
                $promoSession['code'],
                $template,
                $domainPrice,
                $checkout['customer']['email'] ?? null
            );

            if ($validation['valid']) {
                $discountAmount = $validation['discount_amount'];
                $promoSession['discount_amount'] = $discountAmount;
                $promoSession['partner_commission_amount'] = $validation['partner_commission_amount'];
                $request->session()->put('checkout.promo', $promoSession);
            } else {
                $request->session()->forget('checkout.promo');
                $promoSession = null;
            }
        }

        $totalPrice = max(0, $subtotal - $discountAmount);

        return view('checkout.ringkasan', [
            'template'       => $template,
            'checkout'       => $checkout,
            'domainPrice'    => $domainPrice,
            'templatePrice'  => $templatePrice,
            'serverPrice'    => $serverPrice,
            'servicePrice'   => $servicePrice,
            'subtotal'       => $subtotal,
            'discountAmount' => $discountAmount,
            'promo'          => $promoSession,
            'totalPrice'     => $totalPrice,
            'step'           => 3,
            'flow'           => $request->session()->get('checkout.flow', 'template-first'),
        ]);
    }

    /**
     * AJAX: Terapkan Kode Promo (Umum atau Khusus Mitra)
     */
    public function terapkanPromoAjax(Template $template, Request $request): JsonResponse
    {
        $code = trim($request->input('code', ''));
        $checkout = $request->session()->get('checkout', []);
        $domainPrice = (int) ($checkout['domain_price'] ?? 185000);
        $customerEmail = $checkout['customer']['email'] ?? $request->input('email', '');

        $result = $this->promoService->validateAndCalculate($code, $template, $domainPrice, $customerEmail);

        if (!$result['valid']) {
            return response()->json([
                'status'  => 'error',
                'message' => $result['message'],
            ], 422);
        }

        // Simpan data promo ke session
        $request->session()->put('checkout.promo', [
            'promo_id'                  => $result['promo_id'],
            'code'                      => $result['code'],
            'name'                      => $result['name'],
            'description'               => $result['description'],
            'is_partner'                => $result['is_partner'],
            'partner_name'              => $result['partner_name'],
            'partner_code'              => $result['partner_code'],
            'discount_amount'           => $result['discount_amount'],
            'partner_commission_amount' => $result['partner_commission_amount'],
        ]);

        return response()->json([
            'status'             => 'success',
            'promo_code'         => $result['code'],
            'is_partner'         => $result['is_partner'],
            'partner_name'       => $result['partner_name'],
            'discount_amount'    => $result['discount_amount'],
            'formatted_discount' => $result['formatted_discount'],
            'new_total'          => $result['new_total'],
            'formatted_total'    => $result['formatted_new_total'],
            'message'            => $result['message'],
        ]);
    }

    /**
     * AJAX: Hapus Kode Promo dari Sesi Checkout
     */
    public function hapusPromoAjax(Template $template, Request $request): JsonResponse
    {
        $request->session()->forget('checkout.promo');
        $checkout = $request->session()->get('checkout', []);
        $domainPrice = (int) ($checkout['domain_price'] ?? 185000);

        $templatePrice = (int) ($template->template_price ?? 1000000);
        $serverPrice   = (int) ($template->server_price ?? 500000);
        $servicePrice  = (int) ($template->service_price ?? 500000);
        $totalPrice    = $templatePrice + $serverPrice + $servicePrice + $domainPrice;

        return response()->json([
            'status'          => 'success',
            'message'         => 'Kode promo berhasil dihapus.',
            'total_price'     => $totalPrice,
            'formatted_total' => 'Rp' . number_format($totalPrice, 0, ',', '.'),
        ]);
    }

    /**
     * Langkah 4: Halaman Bayar / Invoice Pesanan Terpadu dengan nomor invoice di URL
     * URL: /checkout/{template}/bayar/{order_number}
     */
    public function halamanBayar(Template $template, Order $order, Request $request): View|RedirectResponse
    {
        $orderTemplate = $order->template ?? $template;

        // Pastikan batas waktu pembayaran 1x24 jam diset
        if (!$order->payment_expires_at) {
            $order->update([
                'payment_expires_at' => $order->created_at ? $order->created_at->addDay() : now()->addDay(),
            ]);
        }

        // 1. Cek Kedaluwarsa (Expired / Invalid) jika melewati 1x24 jam
        if ($order->isExpired() && $order->status !== OrderStatus::Invalid && !$order->isPaid()) {
            $order->update(['status' => OrderStatus::Invalid]);
        }

        // 2. Jika status masih Unpaid, sinkronkan langsung dengan API Xendit (jika invoice Xendit ada)
        if (!$order->isPaid() && $order->status !== OrderStatus::Invalid && !empty($order->xendit_invoice_id)) {
            $xenditInvoice = $this->xenditService->getInvoice($order->xendit_invoice_id);
            if ($xenditInvoice) {
                $xStatus = strtoupper($xenditInvoice['status'] ?? '');
                if (in_array($xStatus, ['PAID', 'SETTLED'])) {
                    $order->update([
                        'status'  => OrderStatus::Paid,
                        'paid_at' => now(),
                    ]);
                } elseif ($xStatus === 'EXPIRED') {
                    $order->update([
                        'status' => OrderStatus::Invalid,
                    ]);
                }
            }
        }

        // 3. JIKA SUDAH LUNAS: Buat akun User otomatis (Opsi B: 1 Template 1 Akun Khusus)
        $user = null;
        if ($order->isPaid()) {
            $user = $this->buatAtauDapatkanUserKhususOrder($order);

            // Kirim email notifikasi sukses bayar & kredensial jika belum pernah terkirim
            if (empty($order->paid_email_sent_at)) {
                try {
                    Mail::to($order->email)->send(new PaymentSuccessAndAccountMail($order, $user));
                    $order->update(['paid_email_sent_at' => now()]);
                } catch (\Throwable $e) {
                    Log::warning("Gagal mengirim email lunas & kredensial untuk order {$order->order_number}: " . $e->getMessage());
                }
            }

            // Login otomatis ke portal klien jika belum login
            if (!Auth::check() || Auth::id() !== $user->id) {
                Auth::login($user);
            }
        } else {
            $user = User::where('order_id', $order->id)->first();
        }

        $domainPrice    = (int) $order->domain_price;
        $templatePrice  = (int) ($order->template_price ?? $orderTemplate->template_price ?? 1000000);
        $serverPrice    = (int) ($order->server_price ?? $orderTemplate->server_price ?? 500000);
        $servicePrice   = (int) ($order->service_price ?? $orderTemplate->service_price ?? 500000);
        $discountAmount = (int) ($order->discount_amount ?? 0);
        $subtotal       = $templatePrice + $serverPrice + $servicePrice + $domainPrice;
        $totalPrice     = max(0, $subtotal - $discountAmount);

        return view('checkout.bayar', [
            'template'       => $orderTemplate,
            'order'          => $order,
            'domainPrice'    => $domainPrice,
            'templatePrice'  => $templatePrice,
            'serverPrice'    => $serverPrice,
            'servicePrice'   => $servicePrice,
            'subtotal'       => $subtotal,
            'discountAmount' => $discountAmount,
            'totalPrice'     => $totalPrice,
            'user'           => $user,
            'isExistingUser' => false,
            'step'           => 4,
            'flow'           => $request->session()->get('checkout.flow', 'template-first'),
        ]);
    }

    /**
     * Fallback jika user mengakses /checkout/{template}/bayar tanpa parameter nomor order.
     * Membuat order baru dari sesi jika belum ada, lalu redirect ke URL berparameter nomor order.
     */
    public function halamanBayarRedirect(Template $template, Request $request): RedirectResponse
    {
        $orderNumber = $request->query('order') ?: $request->session()->get('checkout.order_number');
        $order = null;

        if ($orderNumber) {
            $order = Order::where('order_number', $orderNumber)->first();
        }

        if (!$order) {
            $checkout = $request->session()->get('checkout', []);

            if (empty($checkout['domain_name']) || empty($checkout['customer'])) {
                return redirect()->route('checkout.domain', $template)
                    ->with('error', 'Sesi checkout telah kedaluwarsa. Silakan ulangi pemesanan.');
            }

            $customer = $checkout['customer'];
            $domainName = $checkout['domain_name'];
            $domainPrice = (int) ($checkout['domain_price'] ?? 185000);
            $newOrderNumber = 'ORD-' . date('Ymd') . '-' . strtoupper(Str::random(5));

            $duration = (int) ($checkout['domain_duration'] ?? 1);
            $pricePerYear = (int) ($checkout['domain_price_per_year'] ?? round($domainPrice / max(1, $duration)));

            $promoSession = $request->session()->get('checkout.promo');
            $discountAmount = (int) ($promoSession['discount_amount'] ?? 0);
            $promoId = $promoSession['promo_id'] ?? null;
            $promoCode = $promoSession['code'] ?? null;
            $isPartner = (bool) ($promoSession['is_partner'] ?? false);
            $partnerName = $promoSession['partner_name'] ?? null;
            $partnerCommission = (int) ($promoSession['partner_commission_amount'] ?? 0);

            $templatePrice = (int) ($template->template_price ?? 1000000);
            $serverPrice   = (int) ($template->server_price ?? 500000);
            $servicePrice  = (int) ($template->service_price ?? 500000);

            // =====================================================================
            // ATOMIC: Bungkus pembuatan pesanan + pencatatan kuota promo
            // dalam transaksi database untuk mencegah race condition (double-claim).
            // Jika ada 2 pembeli bersamaan mengklaim sisa kuota 1, hanya 1 yang lolos.
            // =====================================================================
            try {
                $order = DB::transaction(function () use (
                    $newOrderNumber, $template, $domainName, $domainPrice, $duration,
                    $pricePerYear, $templatePrice, $serverPrice, $servicePrice,
                    $promoId, $promoCode, $discountAmount, $isPartner, $partnerName,
                    $partnerCommission, $customer
                ) {
                    // Validasi ulang kuota promo secara atomic dengan lock baris
                    if ($promoId) {
                        $promoLocked = Promo::where('id', $promoId)->lockForUpdate()->first();

                        if (!$promoLocked) {
                            throw new \RuntimeException('Kode promo tidak ditemukan. Promo mungkin telah dihapus.');
                        }

                        // Cek kuota global (masih tersedia setelah lock)
                        if (!$promoLocked->hasQuota()) {
                            throw new \RuntimeException(
                                "Mohon maaf, kuota kode promo {$promoLocked->code} telah habis. " .
                                "Checkout Anda diproses tanpa promo."
                            );
                        }

                        // Cek batas pemakaian per email termasuk invoice unpaid (non-refundable policy)
                        $existingUsageCount = PromoUsage::where('promo_id', $promoLocked->id)
                            ->where('email', strtolower(trim($customer['email'])))
                            ->count();

                        if ($existingUsageCount >= $promoLocked->usage_per_user) {
                            throw new \RuntimeException(
                                "Alamat email Anda sudah pernah menggunakan kode promo {$promoLocked->code}. " .
                                "Setiap email hanya dapat menggunakan promo ini {$promoLocked->usage_per_user}x " .
                                "(termasuk pesanan yang belum dibayar)."
                            );
                        }
                    }

                    // Buat pesanan
                    $newOrder = Order::create([
                        'order_number'              => $newOrderNumber,
                        'template_id'               => $template->id,
                        'domain_name'               => $domainName,
                        'domain_price'              => $domainPrice,
                        'domain_duration'           => $duration,
                        'domain_price_per_year'     => $pricePerYear,
                        'template_price'            => $templatePrice,
                        'server_price'              => $serverPrice,
                        'service_price'             => $servicePrice,
                        'template_desc'             => $template->template_desc,
                        'server_desc'               => $template->server_desc,
                        'service_desc'              => $template->service_desc,
                        'promo_id'                  => $promoId,
                        'promo_code'                => $promoCode,
                        'discount_amount'           => $discountAmount,
                        'is_partner_order'          => $isPartner,
                        'partner_name'              => $partnerName,
                        'partner_commission_amount' => $partnerCommission,
                        'full_name'                 => $customer['name'],
                        'email'                     => $customer['email'],
                        'whatsapp'                  => $customer['whatsapp'],
                        'status'                    => OrderStatus::Unpaid,
                        'paid_at'                   => null,
                        'xendit_invoice_id'         => null,
                        'xendit_payment_url'        => null,
                        'payment_expires_at'        => now()->addDay(),
                    ]);

                    // Catat pemakaian promo & kurangi kuota secara permanen (non-refundable policy)
                    // Stok TIDAK akan dikembalikan meski order kedaluwarsa/batal.
                    if ($promoId && isset($promoLocked)) {
                        $this->promoService->recordUsage($promoLocked, $newOrder, $discountAmount, $partnerCommission);
                    }

                    return $newOrder;
                });
            } catch (\RuntimeException $e) {
                // Kuota habis / email sudah pernah menggunakan promo: bersihkan sesi promo
                // dan kembalikan ke ringkasan dengan pesan error yang jelas
                $request->session()->forget('checkout.promo');
                Log::info("Checkout promo ditolak saat pembuatan invoice untuk order {$newOrderNumber}: " . $e->getMessage());

                return redirect()->route('checkout.ringkasan', $template)
                    ->with('error', $e->getMessage());
            } catch (\Throwable $e) {
                Log::error("Gagal membuat order checkout untuk template {$template->id}: " . $e->getMessage());
                return redirect()->route('checkout.ringkasan', $template)
                    ->with('error', 'Terjadi kesalahan saat memproses pesanan. Silakan coba lagi.');
            }

            // Buat link pembayaran Xendit (di luar transaksi database agar tidak hang)
            $invoice = $this->xenditService->createInvoice($order, $template, $customer);
            if ($invoice && !empty($invoice['invoice_url'])) {
                $order->update([
                    'xendit_invoice_id'  => $invoice['id'] ?? null,
                    'xendit_payment_url' => $invoice['invoice_url'],
                    'payment_expires_at' => !empty($invoice['expiry_date'])
                        ? \Carbon\Carbon::parse($invoice['expiry_date'])
                        : now()->addDay(),
                ]);
            } else {
                $order->update([
                    'xendit_payment_url' => route('checkout.bayar', ['template' => $template->id, 'order' => $order->order_number]),
                    'payment_expires_at' => now()->addDay(),
                ]);
            }

            // Bersihkan sesi promo setelah link invoice berhasil dibuat
            // agar sesi checkout berikutnya dimulai dari fresh state
            $request->session()->forget('checkout.promo');

            // Kirim email tagihan / invoice unpaid otomatis ke email penagihan klien
            try {
                Mail::to($order->email)->send(new InvoiceUnpaidMail($order));
            } catch (\Throwable $e) {
                Log::warning("Gagal mengirim email tagihan unpaid untuk order {$order->order_number}: " . $e->getMessage());
            }

            // Kirim notifikasi WhatsApp invoice resmi via Fonnte
            try {
                $this->fonnteService->sendInvoiceUnpaid($order);
            } catch (\Throwable $e) {
                Log::warning("Gagal mengirim WhatsApp invoice via Fonnte untuk order {$order->order_number}: " . $e->getMessage());
            }

            $request->session()->put('checkout.order_number', $order->order_number);
        }


        return redirect()->route('checkout.bayar', [
            'template' => $template->id,
            'order'    => $order->order_number,
        ]);
    }

    /**
     * Akses langsung ke halaman bayar via nomor order (link invoice di email: /checkout/bayar/{order_number})
     */
    public function bukaBayarViaNomorOrder(Order $order, Request $request): RedirectResponse
    {
        return redirect()->route('checkout.bayar', [
            'template' => $order->template_id,
            'order'    => $order->order_number,
        ]);
    }

    /**
     * Download / Cetak PDF Invoice resmi (A4 Print-ready, Belum Lunas & Sudah Lunas)
     */
    public function downloadPdfInvoice(Order $order): Response
    {
        $template = $order->template;
        $html = view('pdf.invoice_pdf', [
            'order'     => $order,
            'template'  => $template,
            'autoPrint' => true,
        ])->render();

        return response($html)
            ->header('Content-Type', 'text/html; charset=UTF-8')
            ->header('Content-Disposition', 'inline; filename="Invoice-' . $order->order_number . '.html"');
    }

    /**
     * Memproses atau mengarahkan pembayaran (jika diakses via POST)
     */
    public function prosesPembayaran(Template $template, Request $request): RedirectResponse
    {
        return redirect()->route('checkout.bayar.redirect', $template);
    }

    /**
     * Endpoint AJAX untuk mengecek status pesanan & pembayaran secara real-time
     */
    public function cekStatusOrder(Template $template, Order $order, Request $request): JsonResponse
    {
        // 1. Cek kedaluwarsa 1x24 jam
        if ($order->isExpired() && $order->status !== OrderStatus::Invalid && !$order->isPaid()) {
            $order->update(['status' => OrderStatus::Invalid]);
        }

        // 2. Jika status masih Unpaid, sinkronkan langsung dengan API Xendit secara real-time
        if (!$order->isPaid() && $order->status !== OrderStatus::Invalid && !empty($order->xendit_invoice_id)) {
            $xenditInvoice = $this->xenditService->getInvoice($order->xendit_invoice_id);
            if ($xenditInvoice) {
                $xStatus = strtoupper($xenditInvoice['status'] ?? '');
                if (in_array($xStatus, ['PAID', 'SETTLED'])) {
                    $order->update([
                        'status'  => OrderStatus::Paid,
                        'paid_at' => now(),
                    ]);
                } elseif ($xStatus === 'EXPIRED') {
                    $order->update([
                        'status' => OrderStatus::Invalid,
                    ]);
                }
            }
        }

        // 3. Jika status sudah Paid, pastikan akun User khusus dibuat (Opsi B: 1 Template 1 Akun)
        if ($order->isPaid()) {
            $user = $this->buatAtauDapatkanUserKhususOrder($order);

            // Kirim email notifikasi sukses bayar & kredensial jika belum pernah terkirim
            if (empty($order->paid_email_sent_at)) {
                try {
                    Mail::to($order->email)->send(new PaymentSuccessAndAccountMail($order, $user));
                    $order->update(['paid_email_sent_at' => now()]);
                } catch (\Throwable $e) {
                    Log::warning("Gagal mengirim email lunas & kredensial untuk order {$order->order_number}: " . $e->getMessage());
                }

                try {
                    $this->fonnteService->sendPaymentSuccess($order, $user);
                } catch (\Throwable $e) {
                    Log::warning("Gagal mengirim WhatsApp lunas via Fonnte untuk order {$order->order_number}: " . $e->getMessage());
                }
            }

            if (!Auth::check() || Auth::id() !== $user->id) {
                Auth::login($user);
            }
        }

        return response()->json([
            'order_number' => $order->order_number,
            'status'       => $order->status->value,
            'is_paid'      => $order->isPaid(),
            'is_expired'   => $order->isExpired() || $order->status === OrderStatus::Invalid,
            'redirect_url' => route('checkout.bayar', ['template' => $template->id, 'order' => $order->order_number]),
        ]);
    }

    /**
     * Redirect dari URL invoice lama ke Halaman Bayar resmi
     */
    public function halamanInvoice(Order $order, Request $request): RedirectResponse
    {
        return redirect()->route('checkout.bayar', [
            'template' => $order->template_id,
            'order'    => $order->order_number,
        ]);
    }

    /**
     * Implementasi OPSI B: 1 Template 1 Akun Khusus Berbasis Domain Proyek (Paling Pendek & Simpel).
     * Email di awal murni untuk mengirim invoice (orders.email).
     * Saat pembayaran lunas, dibuatkan akun user khusus dengan format: {base}@bidtech.co.id
     * Contoh: Untuk domain sat.org.id -> sat@bidtech.co.id
     */
    protected function buatAtauDapatkanUserKhususOrder(Order $order): User
    {
        $user = User::where('order_id', $order->id)->first();

        // Ekstrak nama dasar domain (base name sebelum titik / TLD)
        $domainName = strtolower(trim($order->domain_name));
        $baseName = explode('.', $domainName)[0] ?? 'proyek';
        $cleanBase = preg_replace('/[^a-z0-9\-]/', '', $baseName);
        if (empty($cleanBase)) {
            $cleanBase = 'proyek-' . strtolower(Str::random(4));
        }

        // Format Opsi B: {base}@bidtech.co.id (contoh: sat@bidtech.co.id)
        $expectedEmail = "{$cleanBase}@bidtech.co.id";

        if (!$user) {
            // Jika kebetulan email sudah dipakai order lain, tambahkan suffix order
            if (User::where('email', $expectedEmail)->exists()) {
                $cleanOrder = strtolower(preg_replace('/[^a-zA-Z0-9]/', '', $order->order_number));
                $expectedEmail = "{$cleanBase}.{$cleanOrder}@bidtech.co.id";
            }

            $user = User::create([
                'order_id'       => $order->id,
                'name'           => $order->full_name,
                'email'          => $expectedEmail,
                'whatsapp'       => $order->whatsapp,
                'password'       => Hash::make('Password123!'),
                'domain_final'   => $order->domain_name,
                'domain_status'  => DomainStatus::PendingRegistration,
                'website_status' => WebsiteStatus::InProgress,
            ]);
        } else {
            // Perbarui email akun jika masih menggunakan format lama
            if ($user->email !== $expectedEmail && !User::where('email', $expectedEmail)->where('id', '!=', $user->id)->exists()) {
                $user->update(['email' => $expectedEmail]);
            }
        }

        return $user;
    }

    /**
     * Menambahkan session template_id dengan tetap mempertahankan domain jika sudah dipilih
     */
    private function menambahkanSession(Template $template, Request $request): void
    {
        $sessionSekarang = (int) $request->session()->get('checkout.template_id');

        if ($sessionSekarang && $sessionSekarang !== $template->id) {
            // Cadangkan data domain jika sebelumnya sudah memilih domain
            $domainName = $request->session()->get('checkout.domain_name');
            $domainPrice = $request->session()->get('checkout.domain_price');
            $domainTax = $request->session()->get('checkout.domain_tax');
            $domainBase = $request->session()->get('checkout.domain_price_base');
            $flow = $request->session()->get('checkout.flow');

            $request->session()->forget('checkout');

            if (!empty($domainName)) {
                $request->session()->put('checkout.domain_name', $domainName);
                $request->session()->put('checkout.domain_price', $domainPrice);
                $request->session()->put('checkout.domain_tax', $domainTax);
                $request->session()->put('checkout.domain_price_base', $domainBase);
                $request->session()->put('checkout.flow', $flow ?? 'domain-first');
            }
        }

        $request->session()->put('checkout.template_id', $template->id);
    }

    /**
     * Sinkronisasi data template dari API Next.js (Single Source of Truth) ke database Laravel
     */
    protected function sinkronisasiTemplateDariApi(): void
    {
        try {
            $frontendUrl = rtrim(config('app.frontend_url', 'http://localhost:3000'), '/');
            $response = Http::timeout(3)->get("{$frontendUrl}/api/templates");

            if ($response->successful()) {
                $templates = $response->json('data');
                if (is_array($templates) && !empty($templates)) {
                    foreach ($templates as $t) {
                        Template::updateOrCreate(
                            ['id' => (int) $t['id']],
                            [
                                'name'           => $t['name'] ?? '',
                                'category'       => $t['category'] ?? 'Umum',
                                'price'          => (int) ($t['price'] ?? 2000000),
                                'template_price' => (int) ($t['template_price'] ?? 1000000),
                                'server_price'   => (int) ($t['server_price'] ?? 500000),
                                'service_price'  => (int) ($t['service_price'] ?? 500000),
                                'template_desc'  => $t['template_desc'] ?? 'Lisensi Desain UI/UX Eksklusif & Source Code Clean',
                                'server_desc'    => $t['server_desc'] ?? 'Cloud Server Hosting 1 Tahun, NVMe High Speed & Free SSL',
                                'service_desc'   => $t['service_desc'] ?? 'Setup Domain, Deployment Instan & Garansi Pemeliharaan',
                                'preview'        => ltrim($t['image'] ?? '', '/'),
                            ]
                        );
                    }
                }
            }
        } catch (\Throwable $e) {
            Log::warning("Gagal sinkronisasi template dari API Next.js: " . $e->getMessage());
        }
    }
}
