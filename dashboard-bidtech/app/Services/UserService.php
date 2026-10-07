<?php

namespace App\Services;

use App\Enums\Role;
use App\Models\Order;
use App\Models\User;
use Illuminate\Contracts\Session\Session;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class UserService
{
    private const DEFAULT_PASSWORD = 'Password123!';

    // ---- Authentication ----

    public function login(array $credentials, bool $remember, Session $session): void
    {
        if (! Auth::attempt($credentials, $remember)) {
            throw ValidationException::withMessages(['email' => 'Email atau password salah.']);
        }
        $session->regenerate();
    }

    public function logout(Session $session): void
    {
        Auth::logout();
        $session->invalidate();
        $session->regenerateToken();
    }

    // ---- Account settings ----

    public function updateProfile(User $user, array $data): void
    {
        $user->update($data);
    }

    public function updatePassword(User $user, string $newPassword): void
    {
        $user->update(['password' => Hash::make($newPassword)]);
    }

    public function updateAuthorProfile(User $user, array $data): void
    {
        $user->update($data);
    }

    // ---- Client accounts ----

    public function createClientAccount(Order $order): User
    {
        return $order->client ?? $this->createClient($order);
    }

    public function normalizeClientEmail(Order $order, User $user): void
    {
        $expected = $order->clientEmail();
        if ($user->email === $expected) {
            return;
        }
        if (User::where('email', $expected)->where('id', '!=', $user->id)->exists()) {
            return;
        }
        $user->update(['email' => $expected]);
    }

    public function syncClientAccountFromOrder(Order $order): User
    {
        $user = $order->client;
        if (! $user) {
            return $this->createClientAccount($order);
        }

        $user->update([
            'name' => $order->full_name,
            'email' => $order->clientEmail(),
            'whatsapp' => $order->whatsapp,
        ]);

        return $user;
    }

    private function createClient(Order $order): User
    {
        $name = $order->clientEmailName();
        $email = $order->clientEmail($name);
        if (User::where('email', $email)->exists()) {
            $email = $order->clientEmailWithOrderNumber($name);
        }

        $user = User::create([
            'name' => $order->full_name,
            'email' => $email,
            'whatsapp' => $order->whatsapp,
            'password' => Hash::make(self::DEFAULT_PASSWORD),
            'role' => Role::Klien,
        ]);
        $order->update(['client_id' => $user->id, 'domain_final' => $order->domain_name]);
        return $user;
    }
}
