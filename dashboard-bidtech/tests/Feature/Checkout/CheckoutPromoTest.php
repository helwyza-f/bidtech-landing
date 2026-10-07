<?php

namespace Tests\Feature\Checkout;

use App\Enums\DiscountType;
use App\Models\Coupon;
use App\Models\Order;
use App\Models\Template;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

/**
 * Test karakterisasi kupon di checkout: penerapan, kuota, dan penolakan saat order dibuat.
 */
class CheckoutPromoTest extends TestCase
{
    use RefreshDatabase;

    private Template $template;

    protected function setUp(): void
    {
        parent::setUp();

        config(['services.xendit.key' => null, 'services.fonnte.token' => null]);
        Mail::fake();
        Http::fake(['*' => Http::response([], 500)]);

        $this->template = Template::create([
            'slug' => 'template-uji', 'name' => 'Template Uji', 'category' => 'Umum', 'price' => 2000000,
            'template_price' => 1000000, 'server_price' => 500000, 'service_price' => 500000,
        ]);
    }

    private function makeCoupon(array $overrides = []): Coupon
    {
        return Coupon::create(array_merge([
            'code' => 'HEMAT100',
            'name' => 'Hemat 100rb',
            'subtotal_discount_type' => DiscountType::Nominal,
            'subtotal_discount_amount' => 100000,
            'is_active' => true,
            'usage_limit' => null,
            'user_usage_limit' => 1,
        ], $overrides));
    }

    private function checkoutWith(Coupon $coupon): array
    {
        return ['checkout' => [
            'template_id'  => 1,
            'domain_name'  => 'tokoku.com',
            'domain_price' => 185000,
            'customer'     => ['name' => 'Budi', 'email' => 'Budi@Example.com', 'whatsapp' => '0812', 'notes' => ''],
            'promo'        => [
                'coupon_id'                 => $coupon->id,
                'code'                      => $coupon->code,
                'is_partner'                => true,
                'partner_name'              => 'Mitra A',
                'discount_amount'           => 100000,
                'partner_commission_amount' => 5000,
            ],
        ]];
    }

    public function test_apply_valid_promo_stores_it_in_session(): void
    {
        $this->makeCoupon();

        $this->withSession(['checkout' => ['domain_price' => 185000]])
            ->postJson(route('checkout.promo.apply', $this->template), ['code' => 'HEMAT100', 'email' => 'budi@example.com'])
            ->assertOk()
            ->assertJson(['status' => 'success', 'promo_code' => 'HEMAT100', 'discount_amount' => 100000]);

        $this->assertSame('HEMAT100', session('checkout.promo.code'));
        $this->assertSame(100000, session('checkout.promo.discount_amount'));
    }

    public function test_order_with_promo_snapshots_discount(): void
    {
        $coupon = $this->makeCoupon();

        $this->withSession($this->checkoutWith($coupon))->get(route('checkout.bayar.redirect', $this->template));

        $order = Order::firstOrFail();
        $this->assertSame($coupon->id, $order->coupon_id);
        $this->assertSame('HEMAT100', $order->coupon_code);
        $this->assertSame(100000, $order->discount_amount);
        $this->assertTrue($order->is_partner_order);
        $this->assertSame('Mitra A', $order->partner_name);
        $this->assertSame(5000, $order->partner_commission_amount);
        $this->assertSame(2085000, $order->total_price);

        $this->assertSame(1, $coupon->orders()->count());
        $this->assertNull(session('checkout.promo'));
    }

    public function test_exhausted_promo_is_rejected_and_no_order_is_created(): void
    {
        $coupon = $this->makeCoupon(['usage_limit' => 1]);
        Order::create([
            'order_number' => 'ORD-PRE-1', 'template_id' => 1, 'domain_name' => 'lain.com', 'domain_price' => 1,
            'full_name' => 'Lain', 'email' => 'lain@example.com', 'whatsapp' => '1', 'status' => 'unpaid',
            'coupon_id' => $coupon->id, 'coupon_code' => $coupon->code, 'discount_amount' => 100000,
        ]);

        $this->withSession($this->checkoutWith($coupon))
            ->get(route('checkout.bayar.redirect', $this->template))
            ->assertRedirect(route('checkout.ringkasan', $this->template))
            ->assertSessionHas('error');

        $this->assertSame(1, Order::count());
        $this->assertNull(session('checkout.promo'));
    }

    public function test_email_that_already_used_promo_is_rejected(): void
    {
        $coupon = $this->makeCoupon(['usage_limit' => null, 'user_usage_limit' => 1]);
        $this->withSession($this->checkoutWith($coupon))->get(route('checkout.bayar.redirect', $this->template));
        $this->assertSame(1, Order::count());

        $this->flushSession();
        $this->withSession($this->checkoutWith($coupon))
            ->get(route('checkout.bayar.redirect', $this->template))
            ->assertRedirect(route('checkout.ringkasan', $this->template))
            ->assertSessionHas('error');

        $this->assertSame(1, Order::count());
        $this->assertSame(1, $coupon->orders()->count());
    }

    public function test_deleted_promo_is_rejected(): void
    {
        $coupon = $this->makeCoupon();
        $session = $this->checkoutWith($coupon);
        $coupon->delete();

        $this->withSession($session)
            ->get(route('checkout.bayar.redirect', $this->template))
            ->assertRedirect(route('checkout.ringkasan', $this->template));

        $this->assertSame(0, Order::count());
    }
}
