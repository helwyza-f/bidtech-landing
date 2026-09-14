<div class="mb-6 hidden max-lg:block max-lg:mt-4 max-md:mt-0">
    <div class="mb-3 grid grid-cols-4 gap-1.5">
        @for($i = 1; $i <= 4; $i++)
            <div @class(['h-1 rounded-full', 'bg-primary' => $i < $step, 'bg-sage' => $i === $step, 'bg-border' => $i > $step])></div>
        @endfor
    </div>
    <p class="text-[11px] font-medium text-ink-muted">
        Langkah {{ $step }} dari 4
    </p>
</div>  