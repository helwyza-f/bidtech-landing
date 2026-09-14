@extends('layouts.checkout')

@section('title', 'Pilih Domain')

@section('content')

<div class="flex flex-row max-lg:flex-col justify-between gap-4 lg:h-svh max-md:p-8">

    @include('components.stepper_checkout')

    <div class="w-full lg:p-8 space-y-4">
        <div class="flex flex-col border border-border bg-white lg:hidden mb-8 rounded-2xl overflow-hidden">
            @if($template->preview)
                <img src="{{ asset($template->preview) }}" alt="{{ $template->name }}" class="h-auto w-auto aspect-video shrink-0 object-cover">
            @endif
            <div class="space-y-2">
                <h2 class="text-center font-semibold p-2 pt-4">Ringkasan Pesanan</h2>
                <table class="w-full">
                    <tr class="border-t border-border">
                        <th scope="row" class="p-2 text-start px-4 text-sm">Template</th>
                        <td class="text-end p-2 px-4 text-sm">{{ $template->name }}</td>
                    </tr>
                    <tr class="border-t border-border">
                        <th scope="row" class="p-2 text-start px-4 text-sm">Harga Template</th>
                        <td class="text-end p-2 px-4 text-sm">Rp{{ number_format($template->price, 0, ',', '.') }}</td>
                    </tr>                        
                </table>
            </div>
        </div>

        <h1 class="text-2xl font-bold tracking-tight text-ink lg:text-[26px]">Cari domain untuk website-mu</h1>

        <p class="mt-2 text-sm leading-6 text-ink-muted">
            Cek ketersediaan domain dan pilih domain yang paling cocok.
        </p>

        <form method="GET" class="mt-7 flex gap-2">
            <input type="text" name="q" value="{{ request('q') }}" placeholder="namabisnismu" class="h-12 min-w-0 flex-1 rounded-xl border border-border bg-white px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-primary/10">
            <button type="submit" class="h-12 shrink-0 rounded-xl border border-border bg-white px-5 text-sm font-semibold transition hover:bg-mint-soft">Cari</button>
        </form>

        @error('domain')
            <p class="mt-3 text-xs text-danger-text">
                {{ $message }}
            </p>
        @enderror

        @if(count($domainResults))
            <div class="mt-7">
                <p class="mb-3 text-xs font-semibold text-ink-muted">
                    Hasil pencarian domain
                </p>

                <div class="space-y-2">
                    @foreach($domainResults as $result)
                        <form method="POST" action="{{ route('checkout.domain.select', $template) }}">
                            @csrf
                            <input type="hidden" name="domain" value="{{ $result['domain'] }}">
                            <button type="submit" @disabled(! $result['available'])
                                @class([
                                    'flex w-full items-center justify-between gap-5 rounded-xl border px-4 py-4 text-left transition',
                                    'border-primary bg-mint-soft hover:bg-mint' => $result['available'],
                                    'cursor-not-allowed border-dashed border-border bg-white opacity-60' => !$result['available'],
                                ])
                            >
                                <div>
                                    <div class="text-sm font-semibold text-ink">
                                        {{ $result['domain'] }}
                                    </div>
                                    <div class="mt-1 text-xs text-ink-muted">
                                        @if($result['available'])
                                            Rp{{ number_format($result['price'], 0, ',', '.') }} / tahun
                                        @else
                                            —
                                        @endif
                                    </div>
                                </div>

                                @if($result['available'])
                                    <span class="rounded-full bg-mint-soft px-3 py-1 text-[11px] font-semibold text-forest">
                                        Tersedia
                                    </span>
                                @else
                                    <span class="rounded-full border border-border bg-white px-3 py-1 text-[11px] font-semibold text-ink-muted">
                                        Sudah dipakai
                                    </span>
                                @endif
                            </button>
                        </form>
                    @endforeach
                </div>
            </div>
        @endif
    </div>

    @include('components.sidebar_checkout')
</div>

@endsection