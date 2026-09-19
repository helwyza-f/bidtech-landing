<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
    <div>
        <div class="flex items-center gap-2.5">
            <h1 class="text-2xl lg:text-3xl font-bold text-ink">Halo, {{ $firstName }}</h1>
            @if(!empty($isAdmin) && $isAdmin)
                <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary-100 text-primary-800 border border-primary-200/50">
                    <i data-lucide="shield-check" class="w-3.5 h-3.5"></i>
                    <span>Administrator</span>
                </span>
            @endif
        </div>
        <p class="text-sm text-ink-muted mt-1">
            @if(!empty($isAdmin) && $isAdmin)
                Selamat datang di panel kontrol utama Bidtech. Pantau pesanan klien dan kelola modul sistem.
            @else
                Ini progres website <span class="font-medium text-ink">{{ $domainName }}</span> kamu
            @endif
        </p>
    </div>
    <div class="flex items-center gap-3 self-start sm:self-auto bg-surface sm:bg-transparent p-2.5 sm:p-0 rounded-2xl border sm:border-0 border-border">
        <div class="w-10 h-10 rounded-full bg-success-surface text-primary font-bold flex items-center justify-center text-sm shrink-0">
            {{ $initials }}
        </div>
        <div>
            <div class="text-sm font-semibold text-ink leading-tight flex items-center gap-1.5">
                {{ $user->name }}
            </div>
            <div class="text-xs text-ink-muted">{{ $user->email }}</div>
        </div>
    </div>
</div>
