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

                        <div class="relative">
                            <input id="password" type="password" name="password" placeholder="Password" autocomplete="current-password" required
                                class="
                                    h-12 w-full rounded-xl border border-border
                                    bg-white pl-4 pr-11 text-sm text-ink outline-none
                                    transition
                                    placeholder:text-slate-400
                                    focus:border-primary
                                    focus:ring-4
                                    focus:ring-primary/10
                                "
                            >
                            <button type="button" onclick="toggleLoginPassword()" id="btn-toggle-login-pass" class="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-ink transition cursor-pointer" aria-label="Lihat password">
                                <svg id="icon-eye-login" class="size-4.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 .696 10.75 10.75 0 0 1-19.876 0"/>
                                    <circle cx="12" cy="12" r="3"/>
                                </svg>
                                <svg id="icon-eye-off-login" class="size-4.5 hidden" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/>
                                    <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/>
                                    <path d="M17.479 17.499A10.75 10.75 0 0 1 2.062 12.35a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.125-5.323"/>
                                    <line x1="2" x2="22" y1="2" y2="22"/>
                                </svg>
                            </button>
                        </div>
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

<script>
function toggleLoginPassword() {
    const input = document.getElementById('password');
    const eyeIcon = document.getElementById('icon-eye-login');
    const eyeOffIcon = document.getElementById('icon-eye-off-login');
    const btn = document.getElementById('btn-toggle-login-pass');
    if (!input) return;

    if (input.type === 'password') {
        input.type = 'text';
        if (eyeIcon) eyeIcon.classList.add('hidden');
        if (eyeOffIcon) eyeOffIcon.classList.remove('hidden');
        if (btn) btn.setAttribute('aria-label', 'Sembunyikan password');
    } else {
        input.type = 'password';
        if (eyeIcon) eyeIcon.classList.remove('hidden');
        if (eyeOffIcon) eyeOffIcon.classList.add('hidden');
        if (btn) btn.setAttribute('aria-label', 'Lihat password');
    }
}
</script>
@endsection