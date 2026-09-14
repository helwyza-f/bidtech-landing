<header class="border-b border-border bg-white px-5 py-4 lg:px-12 lg:py-5">
    <div class="mx-auto flex max-w-[1400px] items-center justify-between">
        <a href="{{ url('https://bidtech.co.id') }}" class="flex items-center gap-2.5">
            <img src="{{ asset('images/logo/logo.webp') }}" alt="Logo Bidtech" class="w-32 h-auto brightness-50">
        </a>

        <div class="hidden items-center gap-4 lg:flex">
            @foreach([
                1 => 'Domain',
                2 => 'Data diri',
                3 => 'Ringkasan',
                4 => 'Bayar',
            ] as $number => $label)
                <div @class(['flex items-center gap-2 text-sm', 'font-semibold text-ink' => $step === $number, 'text-ink-muted' => $step !== $number])>
                    <span @class(['flex size-6 items-center justify-center rounded-full text-[11px] font-bold', 'bg-primary text-white' => $number < $step, 'bg-sage text-white' => $number === $step, 'bg-border text-white' => $number > $step])>
                        {{ $number < $step ? '✓' : $number }}
                    </span>
                    {{ $label }}
                </div>

                @if($number < 4)
                    <div class="h-px w-6 bg-border"></div>
                @endif
            @endforeach
        </div>
    </div>
</header>