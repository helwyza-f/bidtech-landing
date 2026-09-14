@extends('layouts.guest')

@section('title', 'Masuk ke Dashboard - Bidtech')

@section('content')

<div class="bg-white lg:grid lg:grid-cols-2">
    <section class="relative hidden min-h-screen overflow-hidden bg-forest p-12 text-white lg:flex lg:flex-col lg:justify-between xl:p-16">
        <img src="{{ asset('images/logo/logo.webp') }}" alt="" class="h-auto w-36 brightness-0 invert">

        <div class="relative z-10 max-w-lg">
            <h1 class="text-3xl font-bold leading-[1.35] xl:text-4xl">
                Pantau progres domain dan website-mu di satu tempat.
            </h1>
            <p class="mt-5 max-w-md text-sm leading-7 text-mint">
                Dari status pembayaran sampai website live —
                semua bisa kamu cek langsung dari sini.
            </p>
        </div>

        <p class="relative z-10 text-xs text-mint">
            © {{ date('Y') }} Bidtech
        </p>

        <div class="absolute -bottom-32 -right-32 size-96 rounded-full bg-white/[0.05]"></div>
        <div class="absolute right-16 top-40 size-48 rounded-full bg-white/[0.04]"></div>
    </section>

    <section class="flex min-h-screen flex-col bg-white">
        <div class="relative overflow-hidden bg-forest px-6 pb-8 pt-7 text-white lg:hidden">
            <div class="flex items-center gap-2">
                <img src="{{ asset('images/logo/logo.webp') }}" alt="" class="h-auto w-36 brightness-0 invert">
            </div>

            <h2 class="relative z-10 mt-7 max-w-xs text-xl font-bold leading-7">
                Pantau progres domain dan website-mu di satu tempat.
            </h2>

            <div class="absolute -bottom-16 -right-14 size-40 rounded-full bg-white/[0.06]"></div>
        </div>


        {{-- FORM WRAPPER --}}
        <div class="flex flex-1 items-center justify-center px-6 py-10 sm:px-10 lg:px-16">
            <div class="w-full max-w-sm">
                <h1 class="text-2xl font-bold tracking-tight text-ink">
                    Masuk ke dashboard
                </h1>

                <p class="mt-2 text-sm leading-6 text-ink-muted">
                    Gunakan email dan password yang dikirim saat order lunas
                </p>

                @if ($errors->any())
                    <div class="mt-6 flex gap-3 rounded-xl bg-danger-bg px-4 py-3 text-sm leading-6 text-danger-text">
                        <div class="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-danger text-[10px] font-bold text-white">
                            !
                        </div>
                        <div>
                            {{ $errors->first() }}
                        </div>
                    </div>
                @endif


                <form method="POST" action="{{ route('login') }}" class="mt-7">
                    @csrf
                    <div>
                        <label for="email" class="mb-2 block text-xs font-semibold text-ink-muted">
                            Email
                        </label>

                        <input id="email" type="email" name="email" value="{{ old('email') }}" placeholder="nama@email.com" autocomplete="email" autofocus required
                            class="
                                h-12 w-full rounded-xl border bg-white px-4
                                text-sm text-ink outline-none
                                transition
                                placeholder:text-slate-400
                                focus:border-primary
                                focus:ring-4
                                focus:ring-primary/10
                                {{ $errors->has('email')
                                    ? 'border-danger bg-danger-bg/30'
                                    : 'border-border'
                                }}
                            "
                        >

                    </div>

                    <div class="mt-5">
                        <label for="password" class="mb-2 block text-xs font-semibold text-ink-muted">
                            Password
                        </label>

                        <input id="password" type="password" name="password" placeholder="Password" autocomplete="current-password" required
                            class="
                                h-12 w-full rounded-xl border border-border
                                bg-white px-4 text-sm text-ink outline-none
                                transition
                                placeholder:text-slate-400
                                focus:border-primary
                                focus:ring-4
                                focus:ring-primary/10
                            "
                        >
                    </div>

                    <div class="mt-4 flex items-center justify-between gap-4">
                        <label class="flex cursor-pointer items-center gap-2 text-sm text-ink-muted">
                            <input type="checkbox" name="remember" value="1" class="size-4 rounded border-border accent-primary">
                            Ingat saya
                        </label>

                        <a href="#" class="text-sm font-semibold text-primary hover:text-primary-hover">
                            Lupa password?
                        </a>
                    </div>

                    <button type="submit"
                        class="
                            mt-6 flex h-12 w-full items-center justify-center
                            rounded-xl bg-primary px-4
                            text-sm font-semibold text-white
                            transition
                            hover:bg-primary-hover
                            focus:outline-none
                            focus:ring-4
                            focus:ring-primary/20
                        "
                    >
                        Masuk
                    </button>

                </form>

                <p class="mt-7 text-center text-xs leading-6 text-ink-muted">
                    Belum punya akun? Akun dashboard dibuat otomatis
                    setelah pesananmu lunas.
                </p>
            </div>
        </div>
    </section>
</div>
@endsection