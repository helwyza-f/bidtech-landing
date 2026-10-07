<?php

namespace App\Http\Controllers;

use App\Services\OrderService;
use App\Services\UserService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Password;
use Illuminate\View\View;

/**
 * Pengaturan akun milik pengguna yang sedang login.
 */
class PengaturanController extends Controller
{
    /**
     * Tampilkan halaman edit profil mandiri.
     */
    public function edit(Request $request, OrderService $orders): View
    {
        $user = $request->user();
        $portal = $orders->clientPortal($user);

        return view('pages.edit-profil', [
            'user' => $user,
            'domainName' => $portal['domainName'],
            'isDomainRegistered' => $portal['isDomainRegistered'],
            'domainExpiryDate' => $portal['domainExpiryDate'],
        ]);
    }

    /**
     * Perbarui profil akun (Nama & No. WhatsApp)
     */
    public function updateProfile(Request $request, UserService $users): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:150'],
            'whatsapp' => ['required', 'string', 'max:30'],
        ], [
            'name.required' => 'Nama lengkap wajib diisi.',
            'whatsapp.required' => 'Nomor WhatsApp wajib diisi.',
        ]);

        $users->updateProfile($request->user(), $validated);

        return $this->backToSettings()
            ->with('profile_success', 'Profil dan nomor kontak berhasil diperbarui.');
    }

    /**
     * Perbarui byline publik (nama tampil & foto) milik akun media sendiri.
     */
    public function updateAuthorProfile(Request $request, UserService $users): RedirectResponse
    {
        $user = $request->user();
        abort_unless($user->isMedia(), 403);

        $validated = $request->validate([
            'author_name' => ['required', 'string', 'max:150'],
            'photo' => ['nullable', 'string', 'max:2048'],
        ], [
            'author_name.required' => 'Nama tampil publik wajib diisi.',
        ]);

        $users->updateAuthorProfile($user, $validated);

        return $this->backToSettings()
            ->with('profile_success', 'Profil penulis (byline) berhasil diperbarui.');
    }

    /**
     * Perbarui kata sandi akun
     */
    public function updatePassword(Request $request, UserService $users): RedirectResponse
    {
        $validated = $request->validate([
            'current_password' => ['required', 'current_password'],
            'password' => ['required', 'confirmed', Password::min(8)],
        ], [
            'current_password.required' => 'Kata sandi saat ini wajib diisi.',
            'current_password.current_password' => 'Kata sandi saat ini tidak sesuai.',
            'password.required' => 'Kata sandi baru wajib diisi.',
            'password.confirmed' => 'Konfirmasi kata sandi baru tidak cocok.',
            'password.min' => 'Kata sandi baru minimal 8 karakter.',
        ]);

        $users->updatePassword($request->user(), $validated['password']);

        return $this->backToSettings()
            ->with('password_success', 'Kata sandi akun Anda berhasil diperbarui.');
    }

    private function backToSettings(): RedirectResponse
    {
        return redirect()->back();
    }
}
