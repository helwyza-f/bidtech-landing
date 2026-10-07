<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserHasRole
{
    /**
     * Gerbang role tunggal untuk semua role (dipakai sebagai alias 'role:ROLE1,ROLE2,...').
     * Navigasi browser biasa ditolak dengan redirect+flash; request AJAX/JSON (expectsJson())
     * ditolak dengan status JSON murni (401/403) mengikuti pola middleware 'auth' bawaan Laravel —
     * supaya endpoint fetch-based seperti autosave/upload gambar artikel tidak diam-diam "berhasil"
     * saat sebenarnya ditolak (fetch() mengikuti redirect secara transparan).
     */
    public function handle(Request $request, Closure $next, string ...$roles): Response
    {
        if (!Auth::check()) {
            abort_if($request->expectsJson(), 401);

            return redirect()->route('login.view')->with('info', 'Silakan login terlebih dahulu.');
        }

        if (!in_array(Auth::user()->role->value, $roles, true)) {
            abort_if($request->expectsJson(), 403);

            return redirect()->route('dashboard')->with('error', 'Anda tidak memiliki akses ke halaman ini.');
        }

        return $next($request);
    }
}
