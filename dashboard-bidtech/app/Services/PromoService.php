<?php

namespace App\Services;

use App\Enums\OrderStatus;
use App\Models\Coupon;
use App\Models\Order;
use App\Models\Partner;

class PromoService
{
    // ---- Coupon administration ----

    public function list(array $filters = []): array
    {
        $query = Coupon::with('partner.user')->withCount('orders');
        $filled = fn (string $key) => isset($filters[$key]) && $filters[$key] !== '';

        if ($filled('search')) {
            $search = $filters['search'];
            $query->where(function ($q) use ($search) {
                $q->where('code', 'like', "%{$search}%")
                    ->orWhere('name', 'like', "%{$search}%")
                    ->orWhereHas('partner.user', fn ($u) => $u->where('name', 'like', "%{$search}%"));
            });
        }
        if ($filled('is_partner') && $filters['is_partner'] !== 'all') {
            $filters['is_partner'] === '1' ? $query->whereNotNull('partner_id') : $query->whereNull('partner_id');
        }
        if ($filled('is_active') && $filters['is_active'] !== 'all') {
            $query->where('is_active', $filters['is_active'] === '1');
        }

        return [
            'promos' => $query->orderBy('id', 'desc')->paginate(15)->withQueryString(),
            'stats' => [
                'total' => Coupon::count(),
                'active' => Coupon::where('is_active', true)->count(),
                'partner' => Coupon::whereNotNull('partner_id')->count(),
                'expired' => Coupon::where('valid_until', '<', now())->count(),
            ],
        ];
    }

    public function create(array $data): Coupon
    {
        return Coupon::create($data);
    }

    public function update(Coupon $promo, array $data): Coupon
    {
        $promo->update($data);

        return $promo;
    }

    public function delete(Coupon $promo): bool
    {
        if ($promo->orders()->exists()) {
            return false;
        }
        $promo->delete();

        return true;
    }

    public function toggleActive(Coupon $promo): Coupon
    {
        $promo->is_active = ! $promo->is_active;
        $promo->save();

        return $promo;
    }

    public function partnersList()
    {
        return Partner::with('user')->get();
    }

    // ---- Reporting ----

    public function usages(Coupon $promo): array
    {
        return [
            'promo' => $promo,
            'usages' => $promo->orders()->with('template')->orderByDesc('id')->paginate(20),
            'totalDiscount' => $promo->orders()->sum('discount_amount'),
            'totalCommission' => $promo->orders()->where('status', OrderStatus::Paid)->sum('partner_commission_amount'),
        ];
    }

    public function allUsages(?int $promoId = null, ?string $search = null): array
    {
        $query = Order::with(['coupon.partner.user', 'template'])->whereNotNull('coupon_id');
        if ($promoId) {
            $query->where('coupon_id', $promoId);
        }
        if ($search !== null && $search !== '') {
            $query->where(function ($q) use ($search) {
                $q->where('email', 'like', "%{$search}%")
                    ->orWhere('order_number', 'like', "%{$search}%")
                    ->orWhereHas('coupon', fn ($c) => $c->where('code', 'like', "%{$search}%"));
            });
        }

        $base = Order::whereNotNull('coupon_id');

        return [
            'usages' => $query->orderByDesc('id')->paginate(20)->withQueryString(),
            'promos' => Coupon::orderBy('code')->get(),
            'stats' => [
                'total_redeem' => (clone $base)->count(),
                'total_discount' => (clone $base)->sum('discount_amount'),
                'total_commission' => (clone $base)->where('status', OrderStatus::Paid)->sum('partner_commission_amount'),
                'unique_users' => (clone $base)->distinct('email')->count('email'),
            ],
        ];
    }

    public function partners(): array
    {
        $partners = Partner::with(['user', 'coupons' => fn ($q) => $q->withCount('orders')])
            ->get()
            ->map(function (Partner $partner) {
                $couponIds = $partner->coupons->pluck('id');
                $orders = Order::whereIn('coupon_id', $couponIds);
                $paidOrders = (clone $orders)->where('status', OrderStatus::Paid);

                return [
                    'partner' => $partner,
                    'coupons' => $partner->coupons,
                    'total_redeem' => (clone $orders)->count(),
                    'total_discount' => (clone $orders)->sum('discount_amount'),
                    'total_commission' => (clone $paidOrders)->sum('partner_commission_amount'),
                ];
            });

        return [
            'partnersGrouped' => $partners,
            'stats' => [
                'total_partners' => $partners->count(),
                'total_promos' => $partners->sum(fn ($p) => $p['coupons']->count()),
                'total_redeem' => $partners->sum('total_redeem'),
                'total_commission' => $partners->sum('total_commission'),
            ],
        ];
    }
}
