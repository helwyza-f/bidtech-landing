<?php

namespace App\Services;

use App\Enums\DomainStatus;
use App\Enums\OrderStatus;
use App\Enums\WebsiteStatus;
use App\Models\Order;
use App\Models\Coupon;
use App\Enums\Role;
use App\Models\Template;
use App\Models\User;
use Illuminate\Contracts\Session\Session;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Str;

class OrderService
{
    public const FLOW_DOMAIN_FIRST = 'domain-first';

    public const FLOW_TEMPLATE_FIRST = 'template-first';

    private const DOMAIN_KEYS = ['domain_name', 'domain_price', 'domain_tax', 'domain_price_base'];

    private const MONTHS = [
        1 => 'Januari', 2 => 'Februari', 3 => 'Maret', 4 => 'April',
        5 => 'Mei', 6 => 'Juni', 7 => 'Juli', 8 => 'Agustus',
        9 => 'September', 10 => 'Oktober', 11 => 'November', 12 => 'Desember',
    ];

    public function __construct(
        private readonly DomainService $domains,
        private readonly TemplateService $templates,
        private readonly UserService $users,
    ) {}

    // ---- Checkout session ----

    public function selectTemplate(Session $session, Template $template, string $flow): void
    {
        $current = (int) $session->get('checkout.template_id');
        if ($current && $current !== $template->id) {
            $domain = [];
            foreach (self::DOMAIN_KEYS as $key) {
                $domain[$key] = $session->get("checkout.{$key}");
            }
            $session->forget('checkout');
            if (! empty($domain['domain_name'])) {
                foreach ($domain as $key => $value) {
                    $session->put("checkout.{$key}", $value);
                }
            }
        }
        $session->put('checkout.template_id', $template->id);
        $session->put('checkout.flow', $flow);
    }

    public function changeDomain(
        Session $session,
        string $domain,
        int $price = 0,
        int $base = 0,
        int $tax = 0,
        string $flow = self::FLOW_DOMAIN_FIRST,
    ): array {
        $quote = $this->domains->quotePrice($domain, $price, $base, $tax);
        $session->put('checkout.domain_name', $domain);
        $session->put('checkout.domain_price', $quote['price']);
        $session->put('checkout.domain_tax', $quote['tax']);
        $session->put('checkout.domain_price_base', $quote['base']);
        $session->put('checkout.flow', $flow);

        return $quote;
    }

    public function selectDomain(Session $session, string $domain, int $pricePerYear = 0): array
    {
        $pricePerYear = $this->domains->quotePrice($domain, $pricePerYear)['price'];
        $total = $this->domains->quotePrice($domain, $pricePerYear * DomainService::DURATION_YEARS);
        $this->changeDomain($session, $domain, $total['price'], $total['base'], $total['tax'], self::FLOW_TEMPLATE_FIRST);
        $session->put('checkout.domain_duration', DomainService::DURATION_YEARS);
        $session->put('checkout.domain_price_per_year', $pricePerYear);

        return [
            'price_per_year' => $pricePerYear,
            'duration' => DomainService::DURATION_YEARS,
            'total' => $total,
        ];
    }

    public function updateDomainDuration(Session $session): ?array
    {
        $domain = $session->get('checkout.domain_name');
        if (! $domain) {
            return null;
        }
        $pricePerYear = (int) ($session->get('checkout.domain_price_per_year') ?: config('domain.default_price'));
        $total = $this->domains->quotePrice($domain, $pricePerYear * DomainService::DURATION_YEARS);
        $session->put('checkout.domain_duration', DomainService::DURATION_YEARS);
        $session->put('checkout.domain_price', $total['price']);
        $session->put('checkout.domain_tax', $total['tax']);
        $session->put('checkout.domain_price_base', $total['base']);

        return [
            'domain' => $domain,
            'price_per_year' => $pricePerYear,
            'duration' => DomainService::DURATION_YEARS,
            'total' => $total,
        ];
    }

    public function saveCustomerDetails(Session $session, array $customer): void
    {
        $session->put('checkout.customer', [
            'name' => $customer['name'],
            'email' => $customer['email'],
            'whatsapp' => $customer['whatsapp'],
            'notes' => $customer['notes'] ?? '',
        ]);
    }

    // ---- Orders ----

    public function create(Template $template, array $checkout): Order
    {
        $customer = $checkout['customer'];
        $domainPrice = (int) ($checkout['domain_price'] ?? config('domain.default_price'));
        $duration = (int) ($checkout['domain_duration'] ?? 1);
        $pricePerYear = (int) ($checkout['domain_price_per_year'] ?? round($domainPrice / max(1, $duration)));
        $promo = $checkout['promo'] ?? null;
        $prices = $template->priceBreakdown($domainPrice);

        return Order::create([
            'order_number' => 'ORD-'.date('Ymd').'-'.strtoupper(Str::random(5)),
            'template_id' => $template->id,
            'domain_name' => $checkout['domain_name'],
            'domain_price' => $domainPrice,
            'domain_duration' => $duration,
            'domain_price_per_year' => $pricePerYear,
            'template_price' => $prices['templatePrice'],
            'server_price' => $prices['serverPrice'],
            'service_price' => $prices['servicePrice'],
            'template_desc' => $template->template_desc,
            'server_desc' => $template->server_desc,
            'service_desc' => $template->service_desc,
            'coupon_id' => $promo['coupon_id'] ?? $promo['promo_id'] ?? null,
            'coupon_code' => $promo['code'] ?? null,
            'discount_amount' => (int) ($promo['discount_amount'] ?? 0),
            'is_partner_order' => (bool) ($promo['is_partner'] ?? false),
            'partner_name' => $promo['partner_name'] ?? null,
            'partner_commission_amount' => (int) ($promo['partner_commission_amount'] ?? 0),
            'full_name' => $customer['name'],
            'email' => $customer['email'],
            'whatsapp' => $customer['whatsapp'],
            'status' => OrderStatus::Unpaid,
            'paid_at' => null,
            'xendit_invoice_id' => null,
            'xendit_payment_url' => null,
            'payment_expires_at' => now()->addDay(),
        ]);
    }

    public function list(array $filters = []): array
    {
        $category = $filters['category'] ?? 'all';
        $status = $filters['status'] ?? 'all';
        $period = $filters['period'] ?? 'all';
        $month = (int) ($filters['month'] ?? date('n'));
        $year = (int) ($filters['year'] ?? date('Y'));
        $search = trim((string) ($filters['search'] ?? ''));
        $orders = Order::with(['template', 'client']);
        if ($search !== '') {
            $orders->where(function ($query) use ($search) {
                $query->where('order_number', 'like', "%{$search}%")
                    ->orWhere('full_name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('whatsapp', 'like', "%{$search}%")
                    ->orWhere('domain_name', 'like', "%{$search}%");
            });
        }
        if ($status !== 'all') {
            $orders->where('status', $status);
        }
        if ($category !== 'all') {
            $orders->whereHas('template', fn ($query) => $query->where('category', $category));
        }
        $this->limitToPeriod($orders, $period, $year, $month);
        $periodQuery = Order::query();
        $this->limitToPeriod($periodQuery, $period, $year, $month);
        $paidOrders = (clone $periodQuery)->where('status', OrderStatus::Paid)->get();

        return [
            'orders' => $orders->latest()->paginate(10)->withQueryString(),
            'stats' => [
                'period_omzet' => $paidOrders->sum(fn ($order) => $order->total_price),
                'period_total' => (clone $periodQuery)->count(),
                'period_paid' => $paidOrders->count(),
                'period_unpaid' => (clone $periodQuery)->where('status', OrderStatus::Unpaid)->count(),
                'period_invalid' => (clone $periodQuery)->where('status', OrderStatus::Invalid)->count(),
                'period' => $period,
                'status' => $status,
                'category' => $category,
                'selected_month' => $month,
                'selected_year' => $year,
                'search' => $search,
                'available_years' => $this->availableYears(),
                'available_categories' => Template::distinct('category')->pluck('category')->filter()->values()->all(),
            ],
            'monthsMap' => self::MONTHS,
        ];
    }

    public function updateStatus(Order $order, array $data): void
    {
        $newStatus = OrderStatus::from($data['order_status']);
        $order->status = $newStatus;
        if ($newStatus === OrderStatus::Paid) {
            if (! $order->paid_at) {
                $order->paid_at = now();
            }
            $user = $this->users->createClientAccount($order);
        } else {
            if ($newStatus === OrderStatus::Unpaid) {
                $order->paid_at = null;
            }
            $user = $order->client;
        }
        if (! empty($data['domain_final'])) {
            $order->domain_name = trim($data['domain_final']);
        }
        $order->save();
        if (! empty($data['domain_status'])) {
            $order->domain_status = DomainStatus::from($data['domain_status']);
        }
        if (! empty($data['domain_final'])) {
            $order->domain_final = trim($data['domain_final']);
        }
        if (! empty($data['website_status'])) {
            $order->website_status = WebsiteStatus::from($data['website_status']);
        }
        $order->save();
    }

    public function ensureExpiry(Order $order): void
    {
        if (! $order->payment_expires_at) {
            $order->update(['payment_expires_at' => $order->created_at ? $order->created_at->addDay() : now()->addDay()]);
        }
    }

    public function markPaid(Order $order): void
    {
        $order->update(['status' => OrderStatus::Paid, 'paid_at' => now()]);
    }

    public function markInvalid(Order $order): void
    {
        $order->update(['status' => OrderStatus::Invalid]);
    }

    // ---- Dashboards ----

    public function dashboardAdmin(User $user): array
    {
        return $this->clientPortal($user) + ['adminStats' => $this->adminStats()];
    }

    public function dashboardClient(User $user): array
    {
        return $this->clientPortal($user) + ['adminStats' => null];
    }

    public function clientOrder(User $user): array
    {
        return $this->clientPortal($user, fallbackToCreatedAt: true);
    }

    public function clientPortal(User $user, bool $fallbackToCreatedAt = false): array
    {
        $user->loadMissing('orders.template');
        $order = $user->orders()->latest('paid_at')->latest('id')->first();
        $template = $order?->template;
        $isAdmin = $user->isAdmin();
        $nameParts = explode(' ', trim($user->name));
        $prices = Template::breakdown(
            $order?->template_price ?? $template?->template_price ?? Template::DEFAULT_TEMPLATE_PRICE,
            $order?->server_price ?? $template?->server_price ?? Template::DEFAULT_SERVER_PRICE,
            $order?->service_price ?? $template?->service_price ?? Template::DEFAULT_SERVICE_PRICE,
            $order?->domain_price ?? config('domain.default_price'),
            (int) ($order?->discount_amount ?? 0),
        );
        $paidAt = $order?->paid_at ?? ($fallbackToCreatedAt ? ($order?->created_at ?? now()) : now());

        return [
            'user' => $user,
            'order' => $order,
            'template' => $template,
            'isAdmin' => $isAdmin,
            'firstName' => $nameParts[0] ?? ($isAdmin ? 'Admin' : 'Klien'),
            'initials' => $this->initials($nameParts) ?: ($isAdmin ? 'AD' : 'BK'),
            'domainName' => $order?->domain_final ?: ($order?->domain_name ?: ($isAdmin ? 'admin.bidtech.id' : 'bisnis.com')),
            'templatePrice' => $prices['templatePrice'],
            'serverPrice' => $prices['serverPrice'],
            'servicePrice' => $prices['servicePrice'],
            'domainPrice' => $prices['domainPrice'],
            'discountAmount' => $prices['discountAmount'],
            'totalPaid' => $order ? $order->total_price : $prices['totalPrice'],
            'paidAtFormatted' => $paidAt->locale('id')->translatedFormat('j M Y, H:i').' WIB',
            'paidDateShort' => $paidAt->locale('id')->translatedFormat('j M Y'),
            'domainExpiryDate' => $paidAt->copy()->addYear()->locale('id')->translatedFormat('j M Y'),
            'orderNumber' => $order?->order_number ?? ($isAdmin ? 'PORTAL-ADMIN' : '#BT-'.date('Ymd').'-001'),
            'isDomainRegistered' => $order?->domain_status === DomainStatus::Registered,
            'isWebsiteLive' => $order?->website_status === WebsiteStatus::Deployed,
            'isWebsiteInProgress' => $order?->website_status === WebsiteStatus::InProgress,
        ];
    }

    private function limitToPeriod(Builder $query, string $period, int $year, int $month): void
    {
        if ($period === 'monthly') {
            $query->whereYear('created_at', $year)->whereMonth('created_at', $month);
        } elseif ($period === 'yearly') {
            $query->whereYear('created_at', $year);
        }
    }

    private function availableYears(): array
    {
        $years = Order::query()->pluck('created_at')->filter()
            ->map(fn ($date) => (int) $date->format('Y'))
            ->unique()->sortDesc()->values()->all();

        return $years ?: [(int) date('Y')];
    }

    private function initials(array $nameParts): string
    {
        $initials = '';
        foreach (array_slice($nameParts, 0, 2) as $part) {
            if (! empty($part)) {
                $initials .= strtoupper(substr($part, 0, 1));
            }
        }

        return $initials;
    }

    private function adminStats(): array
    {
        $paidOrders = Order::where('status', OrderStatus::Paid)->get();
        $topTemplates = Template::withCount(['orders as sales_count' => function ($query) {
            $query->where('status', OrderStatus::Paid);
        }])->orderBy('sales_count', 'desc')->take(5)->get();

        return [
            'total_users' => User::where('role', Role::Klien)->count(),
            'total_orders' => Order::count(),
            'paid_orders' => $paidOrders->count(),
            'unpaid_orders' => Order::where('status', OrderStatus::Unpaid)->count(),
            'invalid_orders' => Order::where('status', OrderStatus::Invalid)->count(),
            'total_omzet' => $paidOrders->sum(fn ($order) => $order->total_price),
            'total_templates' => Template::count(),
            'active_templates' => Template::where('is_active', true)->count(),
            'total_promos' => Coupon::count(),
            'active_promos' => Coupon::where('is_active', true)->count(),
            'top_templates' => $topTemplates,
            'recent_orders' => Order::with(['template', 'client'])->latest()->take(5)->get(),
        ];
    }
}
