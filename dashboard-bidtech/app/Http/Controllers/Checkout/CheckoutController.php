<?php

namespace App\Http\Controllers\Checkout;

use App\Http\Controllers\Controller;
use App\Models\Template;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;
use Illuminate\Support\Str;

class CheckoutController extends Controller
{
    /**
     * Masuk ke halamana checkout pertama kali dan mengisi data halaman dengan
     * session sebelumnya jika ada
     */
    public function masukHalamanCheckout(Template $template, Request $request): View {
        // menambahkan session template id
        $this->menambahkanSession($template, $request);
        
        // mengarahkan user ke halaman view checkout.domain
        // dan mengisi data-data halaman nya juga
        return view('checkout.domain', [
            'template'      => $template,
            'checkout'      => $request->session()->get('checkout', []),
            'domainResults' => $request->session()->get('checkout.domain_results', []),
            'step'          => 1,
        ]);
    }

    /**
     * Fungsi untuk mencari domain berdasarkan nama bisnis yang dimasukkan
     * Dan memberikan output berupa JSON atau list-list domain beserta harganya
     * dari IdCloudHost
     */
    public function mencariDomain(Request $request): JsonResponse {
        // Validasikan bahwa nama bisnis harus diinput, dan berupa string
        // dan minimal 4 huruf dan maksimal 100 huruf
        $request->validate([
            'namaBisnis' => ['required', 'string', 'min:4', 'max:100'],
        ]);

        // sanitize nama bisnis untuk tidak spasi dan tidak kapital
        $sanitizedNamaBisnis = Str::slug(strtolower(trim($request->string('namaBisnis')->toString())), '');
        
        // Jika nama bisnis tersanitasi lebih kecil dari 4, maka batalkan pencarian
        if (strlen($sanitizedNamaBisnis) < 4) {
            return response()->json([
                'message' => 'Nama bisnis minimal 4 karakter.',
                'domains' => [],
            ], 422);
        }

        
    }

    /**
     * Menambahkan data id template yang dipilih dari web bidtech
     * ke session user dengan key checkout.template_id
     */
    private function menambahkanSession(Template $template, Request $request): void {
        // Session checkout.template_id
        $sessionSekarang = (int) $request->session()->get('checkout.template_id'); 

        // Menghapus session lama jika tidak cocok dengan id template sekarang
        if ( $sessionSekarang and $sessionSekarang !== $template->id) {
            $request->session()->forget('checkout');
        }

        // Menambahkan data id template yang dipilih ke session
        $request->session()->put('checkout.template_id', $template->id);
    }
}
