<div class="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
    <!-- Card 1: Domain -->
    <div class="bg-surface border border-border rounded-2xl p-6 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between min-h-[155px]">
        <div class="flex items-center justify-between">
            <span class="text-xs font-semibold text-ink-muted">Domain</span>
            <div class="w-8 h-8 rounded-full bg-primary-100 text-primary-800 flex items-center justify-center shrink-0">
                <i data-lucide="globe" class="w-4 h-4"></i>
            </div>
        </div>
        <div class="my-3">
            <div class="text-xl lg:text-2xl font-bold tracking-tight text-ink break-all">
                {{ $domainName }}
            </div>
        </div>
        <div>
            @if($isDomainRegistered)
                <div class="inline-flex items-center gap-1.5 bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-xs w-max font-semibold border border-primary-200/60">
                    <i data-lucide="check" class="w-3.5 h-3.5 stroke-[2.5]"></i>
                    <span>Domain aktif</span>
                </div>
            @else
                <div class="inline-flex items-center gap-1.5 bg-warning-surface text-warning px-3 py-1 rounded-full text-xs w-max font-semibold border border-warning/20">
                    <i data-lucide="refresh-cw" class="w-3.5 h-3.5 animate-spin"></i>
                    <span>Diproses tim kami</span>
                </div>
            @endif
        </div>
    </div>

    <!-- Card 2: Status Website -->
    <div class="bg-surface border border-border rounded-2xl p-6 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between min-h-[155px]">
        <div class="flex items-center justify-between">
            <span class="text-xs font-semibold text-ink-muted">Status website</span>
            <div class="w-8 h-8 rounded-full bg-primary-100 text-primary-800 flex items-center justify-center shrink-0">
                <i data-lucide="activity" class="w-4 h-4"></i>
            </div>
        </div>
        <div class="my-3">
            <div class="text-xl lg:text-2xl font-bold tracking-tight text-ink">
                {{ $isWebsiteLive ? 'Website Live' : 'Dikerjakan' }}
            </div>
        </div>
        <div>
            @if($isWebsiteLive)
                <div class="inline-flex items-center gap-1.5 bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-xs w-max font-semibold border border-primary-200/60">
                    <i data-lucide="sparkles" class="w-3.5 h-3.5"></i>
                    <span>Siap diakses</span>
                </div>
            @else
                <div class="inline-flex items-center gap-1.5 bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-xs w-max font-semibold border border-primary-200/60">
                    <i data-lucide="clock" class="w-3.5 h-3.5"></i>
                    <span>Website dikerjakan</span>
                </div>
            @endif
        </div>
    </div>

    <!-- Card 3: Template -->
    <div class="bg-surface border border-border rounded-2xl p-6 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between min-h-[155px]">
        <div class="flex items-center justify-between">
            <span class="text-xs font-semibold text-ink-muted">Template</span>
            <div class="w-8 h-8 rounded-full bg-primary-100 text-primary-800 flex items-center justify-center shrink-0">
                <i data-lucide="layout" class="w-4 h-4"></i>
            </div>
        </div>
        <div class="my-3">
            <div class="text-xl lg:text-2xl font-bold tracking-tight text-ink truncate" title="{{ $template?->name ?? 'Pilihan Template' }}">
                {{ $template?->name ?? 'Pilihan Template' }}
            </div>
        </div>
        <div>
            <div class="inline-flex items-center gap-1.5 bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-xs w-max font-semibold border border-primary-200/60">
                <i data-lucide="check-circle" class="w-3.5 h-3.5"></i>
                <span>Lunas {{ $paidDateShort }}</span>
            </div>
        </div>
    </div>
</div>
