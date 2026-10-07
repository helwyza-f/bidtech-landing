<?php

use App\Http\Controllers\Api\DomainController;
use App\Http\Controllers\Api\TemplateController;
use Illuminate\Support\Facades\Route;

// API publik untuk frontend Next.js. Otomatis diberi prefix /api oleh bootstrap/app.php.

// Pencarian domain (Hero landing page)
Route::get('/domain/search', [DomainController::class, 'search'])->name('api.domain.search');

// Katalog template (single source of truth untuk website Next.js)
Route::get('/templates', [TemplateController::class, 'index'])->name('api.templates.index');
Route::get('/templates/{id}', [TemplateController::class, 'show'])->name('api.templates.show');

// Penghitung penayangan template
Route::post('/templates/view/{id}', [TemplateController::class, 'trackView'])->name('api.templates.track-view');
