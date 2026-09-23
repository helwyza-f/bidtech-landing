<?php

namespace App\Http\Controllers\Dashboard;

use App\Enums\DomainStatus;
use App\Enums\OrderStatus;
use App\Enums\WebsiteStatus;
use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Promo;
use App\Models\Template;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class DashboardController extends Controller
{
    /**
     * Tampilkan antarmuka portal klien dashboard (dan overview untuk admin)
     */
    public function view(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user()->load('order.template');
        $order = $user->order;
        $template = $order?->template;
        $isAdmin = $user->isAdmin();

        // Ambil nama depan untuk sapaan
        $nameParts = explode(' ', trim($user->name));
        $firstName = $nameParts[0] ?? ($isAdmin ? 'Admin' : 'Klien');

        // Hitung inisial nama (maks 2 huruf)
        $initials = '';
        foreach (array_slice($nameParts, 0, 2) as $part) {
            if (!empty($part)) {
                $initials .= strtoupper(substr($part, 0, 1));
            }
        }
        $initials = $initials ?: ($isAdmin ? 'AD' : 'BK');

        // Nama domain utama
        $domainName = $user->domain_final ?: ($order?->domain_name ?: ($isAdmin ? 'admin.bidtech.id' : 'bisnis.com'));

        // Total biaya pesanan & rincian komponen
        $templatePrice  = $order?->template_price ?? $template?->template_price ?? 1000000;
        $serverPrice    = $order?->server_price ?? $template?->server_price ?? 500000;
        $servicePrice   = $order?->service_price ?? $template?->service_price ?? 500000;
        $domainPrice    = $order?->domain_price ?? 185000;
        $discountAmount = (int) ($order?->discount_amount ?? 0);
        $totalPaid      = $order ? $order->total_price : max(0, $templatePrice + $serverPrice + $servicePrice + $domainPrice - $discountAmount);

        // Format tanggal lunas & estimasi perpanjangan domain
        $paidAtDate = $order?->paid_at ?? now();
        $paidAtFormatted = $paidAtDate->locale('id')->translatedFormat('j M Y, H:i') . ' WIB';
        $paidDateShort = $paidAtDate->locale('id')->translatedFormat('j M Y');
        $domainExpiryDate = $paidAtDate->copy()->addYear()->locale('id')->translatedFormat('j M Y');

        // Nomor order
        $orderNumber = $order?->order_number ?? ($isAdmin ? 'PORTAL-ADMIN' : '#BT-' . date('Ymd') . '-001');

        // Status Progres Stepper (1 s/d 4)
        $isDomainRegistered = ($user->domain_status === DomainStatus::Registered);
        $isWebsiteLive = ($user->website_status === WebsiteStatus::Deployed);
        $isWebsiteInProgress = ($user->website_status === WebsiteStatus::InProgress);

        // Statistik khusus jika yang login adalah Administrator
        $adminStats = null;
        if ($isAdmin) {
            $paidOrders = Order::where('status', OrderStatus::Paid)->get();
            $totalOmzet = $paidOrders->sum(fn($o) => $o->total_price);

            // Leaderboard 5 template paling laku
            $topTemplates = Template::withCount(['orders as sales_count' => function ($q) {
                    $q->where('status', OrderStatus::Paid);
                }])
                ->orderBy('sales_count', 'desc')
                ->take(5)
                ->get();

            // 5 Pesanan Klien Terbaru
            $recentOrders = Order::with(['template', 'user'])->latest()->take(5)->get();

            $adminStats = [
                'total_users'      => User::where('is_admin', false)->count(),
                'total_orders'     => Order::count(),
                'paid_orders'      => $paidOrders->count(),
                'unpaid_orders'    => Order::where('status', OrderStatus::Unpaid)->count(),
                'invalid_orders'   => Order::where('status', OrderStatus::Invalid)->count(),
                'total_omzet'      => $totalOmzet,
                'total_templates'  => Template::count(),
                'active_templates' => Template::where('is_active', true)->count(),
                'total_promos'     => Promo::count(),
                'active_promos'    => Promo::where('is_active', true)->count(),
                'top_templates'    => $topTemplates,
                'recent_orders'    => $recentOrders,
            ];
        }



        return view('dashboard.index', compact(
            'user',
            'order',
            'template',
            'isAdmin',
            'adminStats',
            'firstName',
            'initials',
            'domainName',
            'templatePrice',
            'serverPrice',
            'servicePrice',
            'domainPrice',
            'discountAmount',
            'totalPaid',
            'paidAtFormatted',
            'paidDateShort',
            'domainExpiryDate',
            'orderNumber',
            'isDomainRegistered',
            'isWebsiteLive',
            'isWebsiteInProgress'
        ));
    }

    /**
     * Tampilkan antarmuka pesanan:
     * - Role Admin: Kelola Pesanan Seluruh Klien (delegasi ke AdminOrderController@index)
     * - Role Klien: Detail Order & Lembar Invoice Klien (dashboard.order-client)
     */
    public function order(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        // Jika Admin, tampilkan antarmuka Kelola Pesanan Klien
        if ($user->isAdmin()) {
            return app(\App\Http\Controllers\Admin\AdminOrderController::class)->index($request);
        }

        // Jika Klien biasa, muat rincian order & invoice klien
        $user->load('order.template');
        $order = $user->order;
        $template = $order?->template;
        $isAdmin = false;

        $nameParts = explode(' ', trim($user->name));
        $firstName = $nameParts[0] ?? 'Klien';
        $initials = '';
        foreach (array_slice($nameParts, 0, 2) as $part) {
            if (!empty($part)) {
                $initials .= strtoupper(substr($part, 0, 1));
            }
        }
        $initials = $initials ?: 'BK';

        $domainName = $user->domain_final ?: ($order?->domain_name ?: 'bisnis.com');
        $templatePrice  = $order?->template_price ?? $template?->template_price ?? 1000000;
        $serverPrice    = $order?->server_price ?? $template?->server_price ?? 500000;
        $servicePrice   = $order?->service_price ?? $template?->service_price ?? 500000;
        $domainPrice    = $order?->domain_price ?? 185000;
        $discountAmount = (int) ($order?->discount_amount ?? 0);
        $totalPaid      = $order ? $order->total_price : max(0, $templatePrice + $serverPrice + $servicePrice + $domainPrice - $discountAmount);

        $paidAtDate = $order?->paid_at ?? ($order?->created_at ?? now());
        $paidAtFormatted = $paidAtDate->locale('id')->translatedFormat('j M Y, H:i') . ' WIB';
        $paidDateShort = $paidAtDate->locale('id')->translatedFormat('j M Y');
        $domainExpiryDate = $paidAtDate->copy()->addYear()->locale('id')->translatedFormat('j M Y');
        $orderNumber = $order?->order_number ?? '#BT-' . date('Ymd') . '-001';

        $isDomainRegistered = ($user->domain_status === DomainStatus::Registered);
        $isWebsiteLive = ($user->website_status === WebsiteStatus::Deployed);
        $isWebsiteInProgress = ($user->website_status === WebsiteStatus::InProgress);

        return view('dashboard.order-client', compact(
            'user',
            'order',
            'template',
            'isAdmin',
            'firstName',
            'initials',
            'domainName',
            'templatePrice',
            'serverPrice',
            'servicePrice',
            'domainPrice',
            'discountAmount',
            'totalPaid',
            'paidAtFormatted',
            'paidDateShort',
            'domainExpiryDate',
            'orderNumber',
            'isDomainRegistered',
            'isWebsiteLive',
            'isWebsiteInProgress'
        ));
    }

    /**
     * Perbarui profil akun (Nama & No. WhatsApp)
     */
    public function updateProfile(Request $request)
    {
        $validated = $request->validate([
            'name'     => ['required', 'string', 'max:150'],
            'whatsapp' => ['required', 'string', 'max:30'],
        ], [
            'name.required'     => 'Nama lengkap wajib diisi.',
            'whatsapp.required' => 'Nomor WhatsApp wajib diisi.',
        ]);

        /** @var \App\Models\User $user */
        $user = Auth::user();
        $user->update($validated);

        return redirect()->route('dashboard', ['tab' => 'account-settings'])
            ->with('profile_success', 'Profil dan nomor kontak berhasil diperbarui.');
    }

    /**
     * Perbarui kata sandi akun
     */
    public function updatePassword(Request $request)
    {
        $validated = $request->validate([
            'current_password' => ['required', 'current_password'],
            'password'         => ['required', 'confirmed', Password::min(8)],
        ], [
            'current_password.required'         => 'Kata sandi saat ini wajib diisi.',
            'current_password.current_password' => 'Kata sandi saat ini tidak sesuai.',
            'password.required'                 => 'Kata sandi baru wajib diisi.',
            'password.confirmed'                => 'Konfirmasi kata sandi baru tidak cocok.',
            'password.min'                      => 'Kata sandi baru minimal 8 karakter.',
        ]);

        /** @var \App\Models\User $user */
        $user = Auth::user();
        $user->update([
            'password' => Hash::make($validated['password']),
        ]);

        return redirect()->route('dashboard', ['tab' => 'account-settings'])
            ->with('password_success', 'Kata sandi akun Anda berhasil diperbarui.');
    }
}
