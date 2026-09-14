<?php

namespace App\Support;

use App\Models\User;

class GenerateUniqueUserEmail
{
    // Fungsi untuk generate email untuk user setelah order telah paid
    public static function make(string $email): string
    {
        // Hilangkan spasi di input function email
        $email = strtolower(trim($email));

        // Cek apakah emailnya sudah terdaftar atau belum
        if (!User::where('email', $email)->exists()){
            return $email;
        }

        // pola dari email yang dimasuki
        // achul@gmail.com
        // maka kita akan mengambil achul

        [$username, $domain] = explode("@", $email, 2);

        $counter = 1;

        do {
            $candidate = "{$username}{$counter}@{$domain}";
            $counter++;
        }
        while (
            User::where('email', $candidate)->exists()
        );

        return $candidate;
    }
}