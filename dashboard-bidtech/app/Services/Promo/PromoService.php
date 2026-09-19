<?php

namespace App\Services\Promo;

use App\Models\Order;
use App\Models\Promo;
use App\Models\PromoUsage;
use App\Models\Template;
use Illuminate\Support\Facades\Log;

class PromoService
{
    /**
     * Validasi kode promo dan hitung nominal diskon secara real-time
     */
    public function validateAndCalculate(string $code, Template $template, int $domainPrice, ?string $email = null): array
    {
        $cleanCode = strtoupper(trim($code));

        if (empty($cleanCode)) {
            return [
                'valid'   => false,
                'message' => 'Silakan masukkan kode promo.',
            ];
        }

        /** @var Promo|null $promo */
        $promo = Promo::where('code', $cleanCode)->first();

        if (!$promo) {
            return [
                'valid'   => false,
                'message' => 'Kode promo tidak ditemukan. Periksa kembali penulisan kode promo Anda.',
            ];
        }

        // 1. Cek status aktif
        if (!$promo->is_active) {
            return [
                'valid'   => false,
                'message' => 'Kode promo ini sedang tidak aktif.',
            ];
        }

        // 2. Cek masa berlaku
        if ($promo->isExpired()) {
            return [
                'valid'   => false,
                'message' => 'Masa berlaku kode promo ini telah berakhir atau belum dimulai.',
            ];
        }

        // 3. Cek kuota pemakaian global
        if (!$promo->hasQuota()) {
            return [
                'valid'   => false,
                'message' => 'Mohon maaf, kuota penggunaan kode promo ini sudah habis.',
            ];
        }

        // 4. Cek target template spesifik jika ditentukan
        if (!empty($promo->target_template_id) && $promo->target_template_id !== $template->id) {
            $targetName = $promo->targetTemplate?->name ?? 'template tertentu';
            return [
                'valid'   => false,
                'message' => "Kode promo ini hanya dapat digunakan untuk {$targetName}.",
            ];
        }

        // 5. Cek pembatasan hak akses mitra (Whitelist Domain / Email)
        if ($promo->is_partner) {
            if (!empty($promo->allowed_domains) || !empty($promo->allowed_emails)) {
                if (empty($email)) {
                    return [
                        'valid'   => false,
                        'message' => "Kode promo kemitraan {$promo->partner_name} memerlukan email resmi mitra. Silakan isi data diri terlebih dahulu.",
                    ];
                }

                if (!$promo->isEmailAllowed($email)) {
                    return [
                        'valid'   => false,
                        'message' => "Email Anda ({$email}) tidak terdaftar dalam hak akses kemitraan resmi {$promo->partner_name}.",
                    ];
                }
            }
        }

        // 6. Cek kuota pemakaian per user / email
        if (!empty($email)) {
            $userUsageCount = PromoUsage::where('promo_id', $promo->id)
                ->where('email', strtolower(trim($email)))
                ->count();

            if ($userUsageCount >= $promo->usage_per_user) {
                return [
                    'valid'   => false,
                    'message' => 'Alamat email ini telah mencapai batas maksimal penggunaan kode promo tersebut.',
                ];
            }
        }

        // Hitung subtotal dan target perhitungan diskon
        $templatePrice = (int) ($template->template_price ?? 1000000);
        $serverPrice   = (int) ($template->server_price ?? 500000);
        $servicePrice  = (int) ($template->service_price ?? 500000);
        $packageTotal  = $templatePrice + $serverPrice + $servicePrice;
        $subtotal      = $packageTotal + $domainPrice;

        // 7. Cek minimal transaksi subtotal
        if ($promo->min_order_amount > 0 && $subtotal < $promo->min_order_amount) {
            return [
                'valid'   => false,
                'message' => 'Minimal pemesanan untuk menggunakan kode promo ini adalah Rp' . number_format($promo->min_order_amount, 0, ',', '.') . '.',
            ];
        }

        // Tentukan nilai dasar yang dipotong berdasarkan target_scope
        // Khusus override_price dengan scope 'all' (General Fixed Price):
        // Domain juga ikut di-override sehingga target dasar adalah seluruh subtotal (paket + domain).
        // Nominal reward_amount adalah harga pasti dalam Rupiah (Rp).
        $baseTargetAmount = match ($promo->target_scope) {
            'template' => $templatePrice,
            'server'   => $serverPrice,
            'service'  => $servicePrice,
            default    => ($promo->type === 'override_price') ? $subtotal : $packageTotal,
        };

        // 8. Cek minimal harga belanja berlaku (min_applicable_price) jika diatur
        // DIKECUALIKAN untuk tipe override_price — karena promo ini mematok harga ke fixed amount,
        // bukan potongan yang bergantung pada harga template. Berlaku ke semua template universal.
        if (!in_array($promo->type, ['override_price', 'free', 'bundle_price'])) {
            if (!empty($promo->min_applicable_price) && $baseTargetAmount < $promo->min_applicable_price) {
                $targetLabel = match ($promo->target_scope) {
                    'template' => 'paket template',
                    'server'   => 'biaya server',
                    'service'  => 'biaya layanan',
                    default    => 'pembelian paket',
                };
                return [
                    'valid'   => false,
                    'message' => "Kode promo {$promo->code} hanya berlaku untuk {$targetLabel} dengan harga minimal Rp" . number_format($promo->min_applicable_price, 0, ',', '.') . ".",
                ];
            }
        }

        // 9. Kalkulasi diskon berdasarkan tipe promo
        $calculatedDiscount = 0;

        switch ($promo->type) {
            case 'percentage':
                $rawDiscount = (int) round(($baseTargetAmount * $promo->reward_amount) / 100);
                $calculatedDiscount = $promo->max_discount 
                    ? min($rawDiscount, (int) $promo->max_discount) 
                    : $rawDiscount;
                break;

            case 'fixed':
                $calculatedDiscount = (int) $promo->reward_amount;
                // Validasi Penolakan: tolak jika nominal diskon >= harga item target
                if ($calculatedDiscount >= $baseTargetAmount) {
                    $targetName = match ($promo->target_scope) {
                        'template' => 'template',
                        'server'   => 'server',
                        'service'  => 'layanan',
                        default    => 'paket',
                    };
                    return [
                        'valid'   => false,
                        'message' => "Kode promo {$promo->code} tidak dapat digunakan karena nilai potongan (Rp" . number_format($calculatedDiscount, 0, ',', '.') . ") melebihi atau sama dengan harga {$targetName} Anda (Rp" . number_format($baseTargetAmount, 0, ',', '.') . "). Promo ini hanya berlaku untuk pembelian di atas Rp" . number_format($calculatedDiscount, 0, ',', '.') . ".",
                    ];
                }
                break;

            case 'override_price':
                // General Fixed Price / Services Fixed Price
                // Berlaku ke semua template
                // Untuk scope=all (General Fixed Price): Domain juga ikut! Total biaya akhir seluruh pesanan
                // dipatok tepat menjadi nominal Rupiah yang diatur ($promo->reward_amount).
                // Contoh: isi 1000 agar pembeli membayar tepat Rp 1.000.
                // Untuk scope spesifik (template/server/service): hanya komponen tersebut yang dipatok.
                $fixedPrice = (int) $promo->reward_amount;

                // Tolak jika harga normal sudah lebih murah atau sama dengan harga patokan promo
                if ($fixedPrice >= $baseTargetAmount) {
                    $targetLabel = ($promo->target_scope === 'all')
                        ? 'total pesanan termasuk domain (Rp' . number_format($baseTargetAmount, 0, ',', '.') . ')'
                        : 'biaya ' . $promo->target_scope . ' (Rp' . number_format($baseTargetAmount, 0, ',', '.') . ')';
                    return [
                        'valid'   => false,
                        'message' => "Kode promo {$promo->code} tidak berlaku karena harga normal {$targetLabel} sudah lebih murah atau sama dengan harga patokan promo (Rp" . number_format($fixedPrice, 0, ',', '.') . "). Promo ini tidak memberikan keuntungan tambahan.",
                    ];
                }
                $calculatedDiscount = max(0, $baseTargetAmount - $fixedPrice);
                break;

            case 'free':
                // Gratis Total Paket (template + server + layanan = Rp 0, domain tetap bayar)
                $calculatedDiscount = $packageTotal;
                break;

            case 'free_component':
                // Gratis komponen tertentu sesuai target_scope
                $calculatedDiscount = $baseTargetAmount;
                break;

            case 'bundle_price':
                // Harga bundle flat seluruh paket dipatok ke reward_amount
                $bundlePrice = (int) $promo->reward_amount;
                if ($bundlePrice >= $packageTotal) {
                    return [
                        'valid'   => false,
                        'message' => "Kode promo bundle {$promo->code} tidak berlaku karena harga bundle (Rp" . number_format($bundlePrice, 0, ',', '.') . ") tidak lebih hemat dari harga normal paket (Rp" . number_format($packageTotal, 0, ',', '.') . ").",
                    ];
                }
                $calculatedDiscount = max(0, $packageTotal - $bundlePrice);
                break;

            default:
                $calculatedDiscount = (int) $promo->reward_amount;
                break;
        }

        // Batasi diskon:
        // Khusus override_price dengan scope 'all', domain juga ikut sehingga diskon dapat memotong hingga seluruh subtotal.
        // Untuk tipe promo lain, batasan diskon maksimal adalah total paket (domain tidak ikut didiskon).
        $maxAllowedDiscount = ($promo->type === 'override_price' && $promo->target_scope === 'all')
            ? $subtotal
            : $packageTotal;
        $finalDiscount = min($maxAllowedDiscount, $calculatedDiscount);

        // 10. Hitung estimasi komisi mitra jika promo bertipe kemitraan
        $partnerCommission = 0;
        if ($promo->is_partner) {
            if ($promo->partner_commission_type === 'fixed') {
                $partnerCommission = (int) $promo->partner_commission_value;
            } elseif ($promo->partner_commission_type === 'percentage') {
                $partnerCommission = (int) round(($subtotal * $promo->partner_commission_value) / 100);
            }
        }

        $partnerLabel = $promo->partner_name ? " {$promo->partner_name}" : '';
        if ($promo->type === 'override_price') {
            if ($promo->target_scope === 'all') {
                $successMsg = $promo->is_partner
                    ? "Kode promo kemitraan{$partnerLabel} berhasil diterapkan! Total seluruh tagihan (termasuk domain) dipatok tepat menjadi Rp" . number_format($promo->reward_amount, 0, ',', '.') . " (Hemat Rp" . number_format($finalDiscount, 0, ',', '.') . ")."
                    : "Kode promo {$promo->code} berhasil diterapkan! Total seluruh tagihan (termasuk domain) dipatok tepat menjadi Rp" . number_format($promo->reward_amount, 0, ',', '.') . " (Hemat Rp" . number_format($finalDiscount, 0, ',', '.') . ").";
            } else {
                $targetDesc = 'biaya ' . $promo->target_scope;
                $successMsg = $promo->is_partner
                    ? "Kode promo kemitraan{$partnerLabel} berhasil diterapkan! {$targetDesc} dipatok menjadi Rp" . number_format($promo->reward_amount, 0, ',', '.') . " (Hemat Rp" . number_format($finalDiscount, 0, ',', '.') . "). Domain tetap berbayar normal."
                    : "Kode promo {$promo->code} berhasil diterapkan! {$targetDesc} dipatok menjadi Rp" . number_format($promo->reward_amount, 0, ',', '.') . " (Hemat Rp" . number_format($finalDiscount, 0, ',', '.') . "). Domain tetap berbayar normal.";
            }
        } elseif ($promo->type === 'free') {
            $successMsg = "Kode promo {$promo->code} berhasil diterapkan! Seluruh paket website gratis (Hemat Rp" . number_format($finalDiscount, 0, ',', '.') . ").";
        } elseif ($promo->type === 'free_component') {
            $compName = match ($promo->target_scope) {
                'service'  => 'Biaya Layanan',
                'server'   => 'Biaya Server',
                'template' => 'Biaya Template',
                default    => 'Biaya Komponen',
            };
            $successMsg = "Kode promo {$promo->code} berhasil diterapkan! {$compName} gratis (Hemat Rp" . number_format($finalDiscount, 0, ',', '.') . ").";
        } else {
            $successMsg = $promo->is_partner
                ? "Kode promo kemitraan{$partnerLabel} berhasil digunakan! Anda hemat Rp" . number_format($finalDiscount, 0, ',', '.')
                : "Kode promo {$promo->code} berhasil diterapkan! Anda hemat Rp" . number_format($finalDiscount, 0, ',', '.');
        }

        return [
            'valid'                     => true,
            'promo_id'                  => $promo->id,
            'code'                      => $promo->code,
            'name'                      => $promo->name,
            'description'               => $promo->description,
            'is_partner'                => (bool) $promo->is_partner,
            'partner_name'              => $promo->partner_name,
            'partner_code'              => $promo->partner_code,
            'discount_amount'           => $finalDiscount,
            'formatted_discount'        => 'Rp' . number_format($finalDiscount, 0, ',', '.'),
            'partner_commission_amount' => $partnerCommission,
            'new_total'                 => max(0, $subtotal - $finalDiscount),
            'formatted_new_total'       => 'Rp' . number_format(max(0, $subtotal - $finalDiscount), 0, ',', '.'),
            'message'                   => $successMsg,
        ];
    }

    /**
     * Catat penggunaan promo dan komisi mitra ke log audit promo_usages
     */
    public function recordUsage(Promo $promo, Order $order, int $discountAmount, int $commissionAmount = 0): void
    {
        try {
            PromoUsage::create([
                'promo_id'                  => $promo->id,
                'order_id'                  => $order->id,
                'email'                     => strtolower(trim($order->email)),
                'discount_amount'           => $discountAmount,
                'partner_commission_earned' => $commissionAmount,
                'created_at'                => now(),
            ]);

            $promo->increment('used_count');
        } catch (\Throwable $e) {
            Log::warning("Gagal mencatat promo_usages untuk order {$order->order_number}: " . $e->getMessage());
        }
    }
}
