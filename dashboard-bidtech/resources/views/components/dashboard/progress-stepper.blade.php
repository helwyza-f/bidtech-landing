<div class="bg-surface border border-border rounded-3xl p-7 shadow-sm flex flex-col h-full">
    <h2 class="text-lg font-bold text-ink mb-7 flex items-center gap-2">
        <i data-lucide="milestone" class="w-5 h-5 text-primary"></i>
        <span>Progres proyekmu</span>
    </h2>

    <div class="relative space-y-8 pl-4">
        <!-- Timeline Item 1: Pembayaran -->
        <div class="relative flex items-start gap-4">
            <div class="w-8 h-8 rounded-full bg-success text-white flex items-center justify-center flex-shrink-0 z-10 shadow-xs">
                <i data-lucide="check" class="w-4 h-4 stroke-[3]"></i>
            </div>
            <div class="w-0.5 bg-border absolute left-4 top-8 -bottom-8"></div>
            <div>
                <p class="text-sm font-semibold text-ink">Pembayaran diterima</p>
                <p class="text-xs text-ink-muted mt-0.5">{{ $paidAtFormatted }}</p>
            </div>
        </div>

        <!-- Timeline Item 2: Domain -->
        <div class="relative flex items-start gap-4">
            @if($isDomainRegistered)
                <div class="w-8 h-8 rounded-full bg-success text-white flex items-center justify-center flex-shrink-0 z-10 shadow-xs">
                    <i data-lucide="check" class="w-4 h-4 stroke-[3]"></i>
                </div>
            @else
                <div class="w-8 h-8 rounded-full bg-success text-white flex items-center justify-center flex-shrink-0 z-10 ring-4 ring-success-surface">
                    <i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i>
                </div>
            @endif
            <div class="w-0.5 bg-border absolute left-4 top-8 -bottom-8"></div>
            <div>
                <p class="text-sm font-semibold text-ink">
                    {{ $isDomainRegistered ? 'Domain aktif & terhubung' : 'Domain diproses tim kami' }}
                </p>
                <p class="text-xs text-ink-muted mt-0.5">
                    {{ $isDomainRegistered ? 'DNS dan domain telah terkonfigurasi ke server' : 'Registrasi ke IdCloudHost sedang berjalan' }}
                </p>
            </div>
        </div>

        <!-- Timeline Item 3: Pengerjaan Website -->
        <div class="relative flex items-start gap-4">
            @if($isWebsiteLive)
                <div class="w-8 h-8 rounded-full bg-success text-white flex items-center justify-center flex-shrink-0 z-10 shadow-xs">
                    <i data-lucide="check" class="w-4 h-4 stroke-[3]"></i>
                </div>
            @elseif($isWebsiteInProgress)
                <div class="w-8 h-8 rounded-full bg-success text-white flex items-center justify-center flex-shrink-0 z-10 ring-4 ring-success-surface">
                    <i data-lucide="circle-dot" class="w-4 h-4 animate-pulse"></i>
                </div>
            @else
                <div class="w-8 h-8 rounded-full bg-border text-ink-muted flex items-center justify-center flex-shrink-0 z-10">
                    <i data-lucide="circle-dot" class="w-4 h-4"></i>
                </div>
            @endif
            <div class="w-0.5 bg-border absolute left-4 top-8 -bottom-8"></div>
            <div>
                <p class="text-sm font-medium {{ $isWebsiteInProgress || $isWebsiteLive ? 'text-ink font-semibold' : 'text-ink-muted' }}">
                    Website dikerjakan
                </p>
                <p class="text-xs {{ $isWebsiteInProgress || $isWebsiteLive ? 'text-ink-muted' : 'text-ink-muted/70' }} mt-0.5">
                    {{ $isWebsiteLive ? 'Pengerjaan kode dan penyesuaian aset selesai' : 'Tim developer sedang menyesuaikan aset dan konten website' }}
                </p>
            </div>
        </div>

        <!-- Timeline Item 4: Website Live -->
        <div class="relative flex items-start gap-4">
            @if($isWebsiteLive)
                <div class="w-8 h-8 rounded-full bg-success text-white flex items-center justify-center flex-shrink-0 z-10 shadow-xs ring-4 ring-success-surface">
                    <i data-lucide="sparkles" class="w-4 h-4"></i>
                </div>
            @else
                <div class="w-8 h-8 rounded-full bg-border text-ink-muted flex items-center justify-center flex-shrink-0 z-10">
                    <i data-lucide="sparkles" class="w-4 h-4"></i>
                </div>
            @endif
            <div>
                <p class="text-sm font-medium {{ $isWebsiteLive ? 'text-ink font-semibold' : 'text-ink-muted' }}">
                    Website live
                </p>
                <p class="text-xs {{ $isWebsiteLive ? 'text-success font-medium' : 'text-ink-muted/70' }} mt-0.5">
                    {{ $domainName }} {{ $isWebsiteLive ? 'sudah live dan dapat diakses publik' : 'akan siap diakses setelah proses selesai' }}
                </p>
            </div>
        </div>
    </div>
</div>
