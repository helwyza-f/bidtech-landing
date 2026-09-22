@php 
    $step = $step ?? 1; 

    // Deteksi pasti berdasarkan route aktif agar tidak bergantung pada sisa session
    if (request()->routeIs('checkout.domain*')) {
        $currentFlow = 'template-first';
    } elseif (request()->routeIs('checkout.pilih-template*')) {
        $currentFlow = 'domain-first';
    } else {
        $currentFlow = $flow ?? (session('checkout.flow') ?? 'template-first');
    }

    $step1Label = $currentFlow === 'domain-first' ? 'Template' : 'Domain';
@endphp

<header class="border-b border-[#E4E9E6] bg-white sticky top-0 z-50">
    <div class="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
        <!-- Sisi Kiri: Logo BIDTECH -->
        <a href="{{ url('https://bidtech.co.id') }}" class="flex items-center gap-2">
            <img src="{{ asset('images/logo/logo.webp') }}" alt="Logo Bidtech" class="h-7 sm:h-8 w-auto object-contain">
        </a>

        <!-- Sisi Kanan: Keterangan Stepper (Template/Domain, Data diri, Ringkasan, Bayar) -->
        <div class="flex items-center gap-2 sm:gap-4 overflow-x-auto">
            @foreach([
                1 => $step1Label,
                2 => 'Data diri',
                3 => 'Ringkasan',
                4 => 'Bayar',
            ] as $number => $label)
                <div class="flex items-center gap-2 shrink-0">
                    <span @class([
                        'flex size-6 sm:size-7 items-center justify-center rounded-full text-xs font-bold transition',
                        'bg-[#22C55E] text-white shadow-xs' => $number <= $step,
                        'bg-[#E4E9E6] text-[#6B7B75]' => $number > $step,
                    ])>
                        {{ $number < $step ? '✓' : $number }}
                    </span>
                    <span @class([
                        'text-xs sm:text-sm transition',
                        'font-bold text-[#0B1B17]' => $number === $step,
                        'font-medium text-[#0B1B17]' => $number < $step,
                        'font-medium text-[#6B7B75]' => $number > $step,
                    ])>
                        {{ $label }}
                    </span>
                </div>

                @if($number < 4)
                    <div @class([
                        'h-0.5 w-6 sm:w-12 shrink-0 transition',
                        'bg-[#22C55E]' => $number < $step,
                        'bg-[#E4E9E6]' => $number >= $step,
                    ])></div>
                @endif
            @endforeach
        </div>
    </div>
</header>