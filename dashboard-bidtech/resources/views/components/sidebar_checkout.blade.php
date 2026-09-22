<aside class="w-full lg:sticky lg:top-20 xl:top-24 z-20">
    <div class="rounded-3xl border border-[#E4E9E6] bg-white p-6 lg:p-7 shadow-xs max-h-[calc(100vh-6rem)] overflow-y-auto">
        <h2 class="text-base font-bold text-[#0B1B17]">
            Ringkasan pesanan
        </h2>

        <!-- Template Preview Thumbnail -->
        <div class="mt-4 overflow-hidden rounded-2xl border border-[#E4E9E6] bg-[#F4F6F5] aspect-[16/10]">
            @if($template->preview)
                <img src="{{ asset($template->preview) }}" alt="{{ $template->name }}" class="h-full w-full object-cover">
            @else
                <div class="flex h-full w-full items-center justify-center text-xs text-[#6B7B75]">
                    Preview tidak tersedia
                </div>
            @endif
        </div>

        <!-- Template Info -->
        <div class="mt-4">
            <h3 class="text-base font-bold text-[#0B1B17] leading-snug">
                {{ $template->name }}
            </h3>
            <p class="text-xs text-[#6B7B75] mt-0.5">
                Template Website
            </p>

            <a href="{{ $template->landing_url }}" target="_blank" class="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl border border-[#22C55E] py-2 px-4 text-xs font-semibold text-[#1E7A53] hover:bg-[#E7F4EE] transition">
                <span>Lihat Detail Template</span>
                <svg class="size-3.5" fill="none" viewBox="0 0 24 24" stroke-width="2.2" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round"
                     d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
            </a>
        </div>

        <!-- Cost Breakdown -->
        <div class="mt-5 space-y-2.5">
            @php
                $tPrice = (int) ($template->template_price ?? 1000000);
                $sPrice = (int) ($template->server_price ?? 500000);
                $vPrice = (int) ($template->service_price ?? 500000);
                $dPrice = (int) ($checkout['domain_price'] ?? 0);
                $promoSession = session('checkout.promo');
                $discAmount = (int) ($promoSession['discount_amount'] ?? 0);
                $estTotal = max(0, $tPrice + $sPrice + $vPrice + $dPrice - $discAmount);
            @endphp

            <div class="flex items-center justify-between text-xs sm:text-sm">
                <span class="text-[#6B7B75]">1. Desain Template</span>
                <span class="font-semibold text-[#0B1B17]">
                    Rp{{ number_format($tPrice, 0, ',', '.') }}
                </span>
            </div>

            <div class="flex items-center justify-between text-xs sm:text-sm">
                <span class="text-[#6B7B75]">2. Cloud Server (1 Thn)</span>
                <span class="font-semibold text-[#0B1B17]">
                    Rp{{ number_format($sPrice, 0, ',', '.') }}
                </span>
            </div>

            <div class="flex items-center justify-between text-xs sm:text-sm">
                <span class="text-[#6B7B75]">3. Setup & Deployment</span>
                <span class="font-semibold text-[#0B1B17]">
                    Rp{{ number_format($vPrice, 0, ',', '.') }}
                </span>
            </div>

            <!-- Domain Item Box -->
            <div id="sidebar-domain-box">
                @if(!empty($checkout['domain_name']))
                    @php
                        $duration = (int) ($checkout['domain_duration'] ?? 1);
                        $pricePerYear = (int) ($checkout['domain_price_per_year'] ?? round(($checkout['domain_price'] ?? 185000) / max(1, $duration)));
                    @endphp
                    <div class="rounded-xl bg-[#E7F4EE] px-3.5 py-2 text-xs text-[#1E7A53] font-semibold flex items-center justify-between">
                        <div>
                            <span>Domain: <strong>{{ $checkout['domain_name'] }}</strong></span>
                            <div class="text-[10px] text-[#2E6806] font-normal mt-0.5">
                                {{ $duration }} Tahun (Rp{{ number_format($pricePerYear, 0, ',', '.') }}/thn &bull; PPN 11%)
                            </div>
                        </div>
                        <span class="text-xs sm:text-sm font-bold">
                            Rp{{ number_format($checkout['domain_price'] ?? 0, 0, ',', '.') }}
                        </span>
                    </div>
                @else
                    <div class="rounded-xl bg-[#F4F6F5] px-3.5 py-2 text-xs text-[#6B7B75] flex items-center justify-between">
                        <span>4. Registrasi Domain</span>
                        <span class="font-medium text-amber-700">Belum dipilih</span>
                    </div>
                @endif
            </div>

            @if($discAmount > 0)
                <div class="rounded-xl bg-[#E7F4EE] px-3.5 py-2 text-xs text-emerald-800 font-semibold flex items-center justify-between">
                    <span>Diskon ({{ $promoSession['code'] ?? 'Promo' }})</span>
                    <span class="font-extrabold text-[#1E7A53]">-Rp{{ number_format($discAmount, 0, ',', '.') }}</span>
                </div>
            @endif

            <hr class="border-[#E4E9E6] my-3">

            <!-- Estimasi Total -->
            <div class="flex items-baseline justify-between">
                <div>
                    <span class="text-sm font-medium text-[#4A5551]">Estimasi total</span>
                    <div class="text-[11px] text-[#6B7B75]">Sudah termasuk PPN</div>
                </div>
                <strong id="sidebar-total-price" class="text-2xl font-black text-[#1E7A53] tabular-nums">
                    Rp{{ number_format($estTotal, 0, ',', '.') }}
                </strong>
            </div>

            <!-- CTA Button -->
            <div class="pt-3" id="sidebar-cta-wrapper">
                @if(($step ?? 1) === 1)
                    @if(!empty($checkout['domain_name']))
                        <a href="{{ route('checkout.data-diri', $template) }}" id="btn-lanjut-datadiri" class="flex w-full items-center justify-center gap-2 rounded-xl bg-[#22C55E] hover:bg-[#16a34a] py-3.5 px-5 text-sm font-semibold text-white shadow-sm transition">
                            <span>Lanjut ke Data Diri</span>
                            <svg class="size-4" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                            </svg>
                        </a>
                    @else
                        <button type="button" disabled id="btn-lanjut-datadiri-disabled" class="flex w-full items-center justify-center gap-2 rounded-xl bg-[#BAC7C2] py-3.5 px-5 text-sm font-semibold text-white cursor-not-allowed shadow-xs">
                            <span>Lanjut ke Data Diri</span>
                            <svg class="size-4" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                            </svg>
                        </button>
                        <p id="sidebar-hint" class="mt-2 text-center text-xs text-[#6B7B75]">
                            Pilih domain terlebih dahulu untuk melanjutkan.
                        </p>
                    @endif
                @elseif(($step ?? 1) === 2)
                    <button type="button" onclick="document.getElementById('data-diri-form')?.requestSubmit()" id="btn-sidebar-submit-datadiri" class="flex w-full items-center justify-center gap-2 rounded-xl bg-[#22C55E] hover:bg-[#16a34a] py-3.5 px-5 text-sm font-semibold text-white shadow-sm transition cursor-pointer">
                        <span>Lanjut ke Ringkasan</span>
                        <svg class="size-4" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                        </svg>
                    </button>
                @elseif(($step ?? 1) === 3)
                    <a href="{{ route('checkout.bayar.redirect', $template) }}" id="btn-sidebar-bayar" class="flex w-full items-center justify-center gap-2 rounded-xl bg-[#22C55E] hover:bg-[#16a34a] py-3.5 px-5 text-sm font-semibold text-white shadow-sm transition cursor-pointer">
                        <span>Bayar Sekarang</span>
                        <svg class="size-4" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                        </svg>
                    </a>
                @endif
            </div>
        </div>
    </div>
</aside>