<?php

namespace App\Http\Controllers\Admin;

use App\Enums\DomainStatus;
use App\Enums\OrderStatus;
use App\Enums\WebsiteStatus;
use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class AdminOrderController extends Controller
{
    /**
     * Tampilkan halaman kelola pesanan klien lengkap dengan filter & aksi status
     */
    public function index(Request $request)
    {
        $category       = $request->query('category', 'all');
        $status         = $request->query('status', 'all');
        $period         = $request->query('period', 'all');
        $selectedMonth  = (int) $request->query('month', date('n'));
        $selectedYear   = (int) $request->query('year', date('Y'));
        $search         = trim((string) $request->query('search', ''));

        // Query pesanan admin dengan relasi lengkap
        $ordersQuery = Order::with(['template', 'user']);

        if (!empty($search)) {
            $ordersQuery->where(function ($q) use ($search) {
                $q->where('order_number', 'like', "%{$search}%")
                  ->orWhere('full_name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('whatsapp', 'like', "%{$search}%")
                  ->orWhere('domain_name', 'like', "%{$search}%");
            });
        }

        if ($status !== 'all') {
            $ordersQuery->where('status', $status);
        }

        if ($category !== 'all') {
            $ordersQuery->whereHas('template', function ($q) use ($category) {
                $q->where('category', $category);
            });
        }

        if ($period === 'monthly') {
            $ordersQuery->whereYear('created_at', $selectedYear)
                        ->whereMonth('created_at', $selectedMonth);
        } elseif ($period === 'yearly') {
            $ordersQuery->whereYear('created_at', $selectedYear);
        }

        $orders = (clone $ordersQuery)->latest()->paginate(10)->withQueryString();

        // Metrik dinamis berdasarkan periode yang dipilih
        $periodQuery = Order::query();
        if ($period === 'monthly') {
            $periodQuery->whereYear('created_at', $selectedYear)
                        ->whereMonth('created_at', $selectedMonth);
        } elseif ($period === 'yearly') {
            $periodQuery->whereYear('created_at', $selectedYear);
        }

        $periodPaidOrders   = (clone $periodQuery)->where('status', OrderStatus::Paid)->get();
        $periodOmzet        = $periodPaidOrders->sum(fn($o) => $o->total_price);
        $periodTotalOrders  = (clone $periodQuery)->count();
        $periodPaidCount    = $periodPaidOrders->count();
        $periodUnpaidCount  = (clone $periodQuery)->where('status', OrderStatus::Unpaid)->count();
        $periodInvalidCount = (clone $periodQuery)->where('status', OrderStatus::Invalid)->count();

        // Daftar tahun yang ada pada database
        $availableYears = Order::selectRaw('YEAR(created_at) as y')
            ->distinct()
            ->orderBy('y', 'desc')
            ->pluck('y')
            ->filter()
            ->values()
            ->all();
        if (empty($availableYears)) {
            $availableYears = [(int) date('Y')];
        }

        $availableCategories = \App\Models\Template::distinct('category')
            ->pluck('category')
            ->filter()
            ->values()
            ->all();

        $monthsMap = [
            1 => 'Januari', 2 => 'Februari', 3 => 'Maret', 4 => 'April',
            5 => 'Mei', 6 => 'Juni', 7 => 'Juli', 8 => 'Agustus',
            9 => 'September', 10 => 'Oktober', 11 => 'November', 12 => 'Desember'
        ];

        $stats = [
            'period_omzet'         => $periodOmzet,
            'period_total'         => $periodTotalOrders,
            'period_paid'          => $periodPaidCount,
            'period_unpaid'        => $periodUnpaidCount,
            'period_invalid'       => $periodInvalidCount,
            'period'               => $period,
            'status'               => $status,
            'category'             => $category,
            'selected_month'       => $selectedMonth,
            'selected_year'        => $selectedYear,
            'search'               => $search,
            'available_years'      => $availableYears,
            'available_categories' => $availableCategories,
        ];

        return view('admin.orders.index', compact('orders', 'stats', 'monthsMap'));
    }

    /**
     * Perbarui status pesanan, domain, dan progres website secara manual oleh Admin
     */
    public function updateStatus(Request $request, Order $order): RedirectResponse
    {
        $validated = $request->validate([
            'order_status'   => ['required', 'string', 'in:unpaid,paid,invalid'],
            'domain_status'  => ['nullable', 'string', 'in:pending_registration,registered'],
            'domain_final'   => ['nullable', 'string', 'max:255'],
            'website_status' => ['nullable', 'string', 'in:in_progress,deployed,maintenance'],
        ], [
            'order_status.required' => 'Status pesanan wajib dipilih.',
            'order_status.in'       => 'Status pesanan tidak valid.',
            'domain_status.in'      => 'Status domain tidak valid.',
            'website_status.in'     => 'Status website tidak valid.',
        ]);

        // 1. Update Status Pesanan (Order)
        $newOrderStatus = OrderStatus::from($validated['order_status']);
        $order->status = $newOrderStatus;

        if ($newOrderStatus === OrderStatus::Paid) {
            if (!$order->paid_at) {
                $order->paid_at = now();
            }
            // Pastikan akun user klien terbuat jika belum ada
            $user = $order->getOrCreateUser();
        } elseif ($newOrderStatus === OrderStatus::Unpaid) {
            $order->paid_at = null;
            $user = $order->user ?: User::where('order_id', $order->id)->first();
        } else {
            // Invalid / Expired
            $user = $order->user ?: User::where('order_id', $order->id)->first();
        }

        if (!empty($validated['domain_final'])) {
            $order->domain_name = trim($validated['domain_final']);
        }

        $order->save();

        // 2. Update Status Domain & Website pada Akun Pengguna (User)
        if ($user) {
            if (!empty($validated['domain_status'])) {
                $user->domain_status = DomainStatus::from($validated['domain_status']);
            }

            if (!empty($validated['domain_final'])) {
                $user->domain_final = trim($validated['domain_final']);
            }

            if (!empty($validated['website_status'])) {
                $user->website_status = WebsiteStatus::from($validated['website_status']);
            }

            $user->save();
        }

        return back()->with('success', "Status pesanan & dashboard klien #{$order->order_number} berhasil diperbarui!");
    }
}
