<aside class="border-l border-border bg-white px-10 py-12 max-lg:hidden max-w-2/5">
    <h2 class="text-sm font-bold text-forest">
        Ringkasan pesanan
    </h2>

    <div class="mt-5 overflow-hidden rounded-2xl border border-border bg-canvas">
        @if($template->preview)
            <img src="{{ asset($template->preview) }}" alt="{{ $template->name }}" class="aspect-video w-full object-cover">
        @else
            <div class="flex aspect-video items-center justify-center bg-mint-soft text-xs text-ink-muted">
                Preview tidak tersedia
            </div>
        @endif
    </div>

    <div class="mt-5 space-y-0">
        <div class="flex items-start justify-between gap-5 border-b border-border py-3 text-sm">
            <span class="text-ink-muted">Template</span>
            <strong class="max-w-[190px] text-right text-xs leading-5">
                {{ $template->name }}
            </strong>
        </div>

        @if(!empty($checkout['domain_name']))
            <div class="flex items-center justify-between gap-4 py-3 text-sm">
                <span class="text-ink-muted">Domain</span>
                <strong class="text-xs">{{ $checkout['domain_name'] }}</strong>
            </div>

            <div class="flex items-center justify-between gap-4 border-b border-border pb-3 text-sm">
                <span class="text-ink-muted">Harga domain</span>
                <strong class="text-xs">
                    Rp{{ number_format($checkout['domain_price'] ?? 0, 0, ',', '.') }}
                </strong>
            </div>
        @endif

        <div class="flex items-center justify-between gap-4 py-3 text-sm">
            <span class="text-ink-muted">Harga template</span>
            <strong class="text-xs">
                Rp{{ number_format($template->price, 0, ',', '.') }}
            </strong>
        </div>

        <div class="mt-2 flex items-end justify-between gap-4 border-t border-border pt-5">
            <span class="text-sm text-ink-muted">Estimasi total</span>
            <strong class="text-xl font-bold tabular-nums text-forest">
                Rp{{ number_format($template->price + ($checkout['domain_price'] ?? 0), 0, ',', '.') }}
            </strong>
        </div>
    </div>
</aside>