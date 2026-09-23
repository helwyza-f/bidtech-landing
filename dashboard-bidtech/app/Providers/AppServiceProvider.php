<?php

namespace App\Providers;

use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Paksa semua URL yang digenerate (url(), asset(), route()) memakai APP_URL,
        // bukan Host header request. Tanpa ini, jika request masuk lewat host/port
        // internal (mis. proxy atau frontend yang salah tebak port), url()/asset()
        // akan mengembalikan port/host internal tersebut ke publik (contoh: :8000
        // ikut muncul di checkout_url dan URL gambar template).
        $appUrl = config('app.url');

        if (!empty($appUrl)) {
            URL::forceRootUrl($appUrl);

            if (str_starts_with($appUrl, 'https://')) {
                URL::forceScheme('https');
            }
        }
    }
}
