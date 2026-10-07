<?php

namespace App\Http\Controllers;

use App\Services\UserService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class LoginController extends Controller
{
    public function view(): View
    {
        return view('pages.login');
    }

    public function login(Request $request, UserService $users): RedirectResponse
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        $users->login($credentials, $request->boolean('remember'), $request->session());

        // Teruskan user (klien maupun admin) ke halaman dashboard utama
        return redirect()->intended(route('dashboard'));
    }

    public function logout(Request $request, UserService $users): RedirectResponse
    {
        $users->logout($request->session());

        return redirect()->route('login.view');
    }
}
