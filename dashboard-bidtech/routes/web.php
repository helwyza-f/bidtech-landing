<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Checkout\CheckoutController;
use App\Http\Controllers\Dashboard\DashboardController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::get('/login', [LoginController::class, 'view'])->name('login.view');
    Route::post('/login', [LoginController::class, 'login'])->name('login');
    
    Route::prefix('checkout')->name('checkout.')->group(function () {
        Route::get('/{template}/domain', [CheckoutController::class, 'masukHalamanCheckout'])->name('domain');
    });
});

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'view'])->name('dashboard');
});