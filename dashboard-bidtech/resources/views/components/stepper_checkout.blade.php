@php $step = $step ?? 1; @endphp

<div class="w-full border-b border-[#E4E9E6]/60 bg-transparent py-5">
    <div class="mx-auto flex max-w-7xl items-center gap-2 sm:gap-4 px-4 sm:px-6 lg:px-8 overflow-x-auto">
        @foreach([
            1 => 'Domain',
            2 => 'Data diri',
            3 => 'Ringkasan',
            4 => 'Bayar',
        ] as $number => $label)
            <div class="flex items-center gap-2 shrink-0">
                <span @class([
                    'flex size-7 items-center justify-center rounded-full text-xs font-bold transition',
                    'bg-[#22C55E] text-white shadow-xs' => $number <= $step,
                    'bg-[#E4E9E6] text-[#6B7B75]' => $number > $step,
                ])>
                    {{ $number < $step ? '✓' : $number }}
                </span>
                <span @class([
                    'text-sm transition',
                    'font-bold text-[#0B1B17]' => $number === $step,
                    'font-medium text-[#0B1B17]' => $number < $step,
                    'font-medium text-[#6B7B75]' => $number > $step,
                ])>
                    {{ $label }}
                </span>
            </div>

            @if($number < 4)
                <div @class([
                    'h-0.5 w-10 sm:w-16 shrink-0 transition',
                    'bg-[#22C55E]' => $number < $step,
                    'bg-[#E4E9E6]' => $number >= $step,
                ])></div>
            @endif
        @endforeach
    </div>
</div>  