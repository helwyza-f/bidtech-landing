<?php

use App\Http\Controllers\Admin\AdminTemplateController;
use App\Http\Controllers\Api\TemplateApiController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Checkout\CheckoutController;
use App\Http\Controllers\Dashboard\DashboardController;
use Illuminate\Support\Facades\Route;

// Redirect root ke login
Route::get('/', function () {
    return redirect()->route('login.view');
});

Route::middleware('guest')->group(function () {
    Route::get('/login', [LoginController::class, 'view'])->name('login.view');
    Route::post('/login', [LoginController::class, 'login'])->name('login');
});

// ==========================================
// API PUBLIK (TEMPLATES & DOMAIN SEARCH)
// ==========================================
// API Pencarian Domain Publik (untuk Hero Landing Page Next.js)
Route::get('/api/domain/search', [CheckoutController::class, 'cariDomainApi'])->name('api.domain.search');

// API Katalog Template Dinamis (Single Source of Truth untuk Website Next.js)
Route::get('/api/templates', [TemplateApiController::class, 'index'])->name('api.templates.index');
Route::get('/templates', [TemplateApiController::class, 'index']); // Alias
Route::get('/api/templates/{id}', [TemplateApiController::class, 'show'])->name('api.templates.show');

// API Tracking Penayangan Template (View Counter)
Route::post('/templates/view/{id}', [TemplateApiController::class, 'trackView'])->name('api.templates.track-view');
Route::post('/api/templates/view/{id}', [TemplateApiController::class, 'trackView']); // Alias

// ==========================================
// UNIFIED DASHBOARD & ADMIN CMS (/dashboard/*)
// Dilindungi middleware auth (dan admin untuk menu kelola)
// ==========================================
Route::middleware('auth')->group(function () {
    // 1. Dashboard Utama (Role-Based: Admin = Executive KPI Overview, Klien = Stepper Progres)
    Route::get('/dashboard', [DashboardController::class, 'view'])->name('dashboard');
    Route::get('/dashboard/index', [DashboardController::class, 'view'])->name('dashboard.index');

    // 2. Pesanan / Order (Role-Based: Admin = Kelola Pesanan Seluruh Klien, Klien = Detail Order & Invoice)
    Route::get('/dashboard/order', [DashboardController::class, 'order'])->name('dashboard.order');
    Route::get('/dashboard/orders', fn() => redirect()->route('dashboard.order'))->name('dashboard.orders');
    Route::post('/dashboard/order/{order}/update-status', [\App\Http\Controllers\Admin\AdminOrderController::class, 'updateStatus'])
        ->middleware('admin')
        ->name('dashboard.order.update-status');

    // 3. Admin Panel CMS (Templates, Promos, Usages, Partners)
    Route::middleware('admin')->prefix('dashboard')->name('dashboard.')->group(function () {
        // Katalog Template
        Route::post('/templates/{template}/toggle-active', [AdminTemplateController::class, 'toggleActive'])->name('templates.toggle-active');
        Route::resource('templates', AdminTemplateController::class);

        // Kode Promo & Afiliasi
        Route::get('/promos/partners', [\App\Http\Controllers\Admin\AdminPromoController::class, 'partners'])->name('promos.partners');
        Route::get('/promos/all-usages', [\App\Http\Controllers\Admin\AdminPromoController::class, 'allUsages'])->name('promos.all-usages');
        Route::get('/promos/{promo}/usages', [\App\Http\Controllers\Admin\AdminPromoController::class, 'usages'])->name('promos.usages');
        Route::post('/promos/{promo}/toggle-active', [\App\Http\Controllers\Admin\AdminPromoController::class, 'toggleActive'])->name('promos.toggle-active');
        Route::resource('promos', \App\Http\Controllers\Admin\AdminPromoController::class);
    });

    // Profil & Pengaturan Akun
    Route::put('/dashboard/profile', [DashboardController::class, 'updateProfile'])->name('dashboard.profile.update');
    Route::put('/dashboard/password', [DashboardController::class, 'updatePassword'])->name('dashboard.password.update');
    Route::match(['get', 'post'], '/logout', [LoginController::class, 'logout'])->name('logout');
});

// ==========================================
// LEGACY BACKWARD COMPATIBILITY REDIRECTS (/admin/* -> /dashboard/*)
// ==========================================
Route::prefix('admin')->name('admin.')->middleware(['auth', 'admin'])->group(function () {
    Route::get('/orders', fn() => redirect()->route('dashboard.order'))->name('orders.index');
    Route::post('/orders/{order}/update-status', [\App\Http\Controllers\Admin\AdminOrderController::class, 'updateStatus'])->name('orders.update-status');

    Route::post('/templates/{template}/toggle-active', [AdminTemplateController::class, 'toggleActive'])->name('templates.toggle-active');
    Route::get('/templates', fn() => redirect()->route('dashboard.templates.index'))->name('templates.index');
    Route::get('/templates/create', fn() => redirect()->route('dashboard.templates.create'))->name('templates.create');
    Route::post('/templates', [AdminTemplateController::class, 'store'])->name('templates.store');
    Route::get('/templates/{template}', fn($t) => redirect()->route('dashboard.templates.show', $t))->name('templates.show');
    Route::get('/templates/{template}/edit', fn($t) => redirect()->route('dashboard.templates.edit', $t))->name('templates.edit');
    Route::put('/templates/{template}', [AdminTemplateController::class, 'update'])->name('templates.update');
    Route::delete('/templates/{template}', [AdminTemplateController::class, 'destroy'])->name('templates.destroy');

    Route::get('/promos/partners', fn() => redirect()->route('dashboard.promos.partners'))->name('promos.partners');
    Route::get('/promos/all-usages', fn() => redirect()->route('dashboard.promos.all-usages'))->name('promos.all-usages');
    Route::get('/promos/{promo}/usages', fn($p) => redirect()->route('dashboard.promos.usages', $p))->name('promos.usages');
    Route::post('/promos/{promo}/toggle-active', [\App\Http\Controllers\Admin\AdminPromoController::class, 'toggleActive'])->name('promos.toggle-active');
    Route::get('/promos', fn() => redirect()->route('dashboard.promos.index'))->name('promos.index');
    Route::get('/promos/create', fn() => redirect()->route('dashboard.promos.create'))->name('promos.create');
    Route::post('/promos', [\App\Http\Controllers\Admin\AdminPromoController::class, 'store'])->name('promos.store');
    Route::get('/promos/{promo}', fn($p) => redirect()->route('dashboard.promos.show', $p))->name('promos.show');
    Route::get('/promos/{promo}/edit', fn($p) => redirect()->route('dashboard.promos.edit', $p))->name('promos.edit');
    Route::put('/promos/{promo}', [\App\Http\Controllers\Admin\AdminPromoController::class, 'update'])->name('promos.update');
    Route::delete('/promos/{promo}', [\App\Http\Controllers\Admin\AdminPromoController::class, 'destroy'])->name('promos.destroy');
});

Route::prefix('checkout')->name('checkout.')->group(function () {
    // Alur Baru: Domain-First (Domain dipilih di Landing Page, lalu Pilih Template di sini)
    Route::get('/pilih-template', [CheckoutController::class, 'halamanPilihTemplate'])->name('pilih-template');
    Route::match(['get', 'post'], '/pilih-template/{template}', [CheckoutController::class, 'prosesPilihTemplate'])->name('pilih-template.select');
    Route::post('/pilih-template/domain', [CheckoutController::class, 'updateDomainAjax'])->name('pilih-template.domain.update');

    Route::get('/{template}/domain', [CheckoutController::class, 'masukHalamanCheckout'])->name('domain');
    Route::get('/{template}/domain/search', [CheckoutController::class, 'cariDomainAjax'])->name('domain.search');
    Route::post('/{template}/domain/select', [CheckoutController::class, 'pilihDomain'])->name('domain.select');
    Route::post('/{template}/domain/duration', [CheckoutController::class, 'updateDomainDurationAjax'])->name('domain.duration');

    Route::get('/{template}/data-diri', [CheckoutController::class, 'halamanDataDiri'])->name('data-diri');
    Route::post('/{template}/data-diri', [CheckoutController::class, 'simpanDataDiri'])->name('data-diri.store');

    Route::get('/{template}/ringkasan', [CheckoutController::class, 'halamanRingkasan'])->name('ringkasan');
    Route::post('/{template}/promo/apply', [CheckoutController::class, 'terapkanPromoAjax'])->name('promo.apply');
    Route::post('/{template}/promo/remove', [CheckoutController::class, 'hapusPromoAjax'])->name('promo.remove');

    // Halaman Bayar dengan nomor order di URL: /checkout/{template}/bayar/{order_number}
    Route::get('/{template}/bayar/{order:order_number}', [CheckoutController::class, 'halamanBayar'])->name('bayar');
    Route::get('/{template}/bayar', [CheckoutController::class, 'halamanBayarRedirect'])->name('bayar.redirect');
    Route::post('/{template}/bayar', [CheckoutController::class, 'prosesPembayaran'])->name('bayar.process');
    Route::get('/{template}/status/{order:order_number}', [CheckoutController::class, 'cekStatusOrder'])->name('status.check');

    // Akses langsung via nomor order (link invoice di email: /checkout/bayar/{order_number})
    Route::get('/bayar/{order:order_number}', [CheckoutController::class, 'bukaBayarViaNomorOrder'])->name('bayar.direct');

    // Route unduh dan cetak PDF invoice resmi (Belum Lunas & Sudah Lunas)
    Route::get('/invoice/{order:order_number}/download', [CheckoutController::class, 'downloadPdfInvoice'])->name('invoice.download');
    Route::get('/invoice/{order:order_number}', [CheckoutController::class, 'halamanInvoice'])->name('invoice');
});

Route::post('/webhook/xendit', [\App\Http\Controllers\Payment\XenditWebhookController::class, 'handle'])->name('webhook.xendit');
Route::post('/webhook/idcloudhost', [\App\Http\Controllers\Domain\IdCloudHostWebhookController::class, 'handle'])->name('webhook.idcloudhost');