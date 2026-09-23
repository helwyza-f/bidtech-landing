<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class LoginController extends Controller
{
    public function view()
    {
        return view('auth.login');
    }

    public function login(Request $request)
    {
        // Validasi informasi login kayak email dan password
        $login = $request->validate([
            'email'     => ['required', 'email'],
            'password'  => ['required', 'string'],
        ]);

        // Validasi atau coba login, dan kembalikan pesan email atau password salah jika gagal
        if (!Auth::attempt($login, $request->boolean('remember'))){
            throw ValidationException::withMessages([
                'email' => "Email atau password salah.",
            ]);
        }
        
        // Reset session
        $request->session()->regenerate();

        // Teruskan user (klien maupun admin) ke halaman dashboard utama
        return redirect()->intended(route('dashboard'));
    }

    public function logout(Request $request)
    {
        // Logout akun sekarang
        Auth::logout();

        // Hapus semua session
        $request->session()->invalidate();

        // Regenerate token di session
        $request->session()->regenerateToken();

        return redirect()->route('login.view');
    }
}
