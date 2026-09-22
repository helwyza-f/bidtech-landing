<div id="view-account-settings" class="page-view max-w-6xl">
    <!-- Top Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
            <h1 class="text-2xl lg:text-3xl font-bold text-ink">Pengaturan akun</h1>
            <p class="text-sm text-ink-muted mt-1">Kelola data profil, kontak notifikasi proyek, dan keamanan kata sandi Anda.</p>
        </div>
    </div>

    <!-- Alert Notifications -->
    @if(session('profile_success'))
        <div class="mt-6 flex items-center gap-3 bg-success-surface border border-success/20 text-success px-5 py-3.5 rounded-2xl text-sm">
            <i data-lucide="check-circle" class="w-5 h-5 shrink-0"></i>
            <span>{{ session('profile_success') }}</span>
        </div>
    @endif

    @if(session('password_success'))
        <div class="mt-6 flex items-center gap-3 bg-success-surface border border-success/20 text-success px-5 py-3.5 rounded-2xl text-sm">
            <i data-lucide="check-circle" class="w-5 h-5 shrink-0"></i>
            <span>{{ session('password_success') }}</span>
        </div>
    @endif

    @if(isset($errors) && $errors->any())
        <div class="mt-6 flex items-start gap-3 bg-warning-surface border border-warning/20 text-warning px-5 py-3.5 rounded-2xl text-sm">
            <i data-lucide="alert-circle" class="w-5 h-5 shrink-0 mt-0.5"></i>
            <div>
                <p class="font-semibold mb-1">Terdapat kesalahan pada formulir:</p>
                <ul class="list-disc list-inside space-y-0.5 text-xs">
                    @foreach($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        </div>
    @endif

    <!-- 2 Columns Layout -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-8">
        <!-- Left Column (7 Cols): Personal Info & Contact -->
        <div class="lg:col-span-7 bg-surface border border-border rounded-3xl p-7 shadow-sm">
            <h2 class="text-lg font-bold text-ink mb-2 flex items-center gap-2">
                <i data-lucide="user" class="w-5 h-5 text-primary"></i>
                <span>Informasi profil</span>
            </h2>
            <p class="text-xs text-ink-muted mb-6">Data ini digunakan untuk administrasi pesanan dan koordinasi pengerjaan website.</p>

            <form method="POST" action="{{ route('dashboard.profile.update') }}" class="space-y-5">
                @csrf
                @method('PUT')

                <div>
                    <label for="name" class="block text-xs font-semibold text-ink mb-1.5">
                        Nama lengkap
                    </label>
                    <input type="text" id="name" name="name" value="{{ old('name', $user->name) }}" required
                        class="w-full h-11 px-4 text-sm bg-surface border border-border rounded-xl outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition">
                </div>

                <div>
                    <label for="email" class="block text-xs font-semibold text-ink mb-1.5">
                        Alamat email
                    </label>
                    <div class="relative">
                        <input type="email" id="email" value="{{ $user->email }}" disabled
                            class="w-full h-11 px-4 text-sm bg-canvas text-ink-muted border border-border rounded-xl cursor-not-allowed">
                        <span class="absolute right-3 top-2.5 text-[11px] font-semibold text-ink-muted bg-surface px-2 py-0.5 rounded-md border border-border">
                            Terkunci
                        </span>
                    </div>
                    <p class="text-[11px] text-ink-muted mt-1.5">Email akun terikat dengan invoice pesanan. Hubungi CS jika ingin mengganti email.</p>
                </div>

                <div>
                    <label for="whatsapp" class="block text-xs font-semibold text-ink mb-1.5">
                        Nomor WhatsApp
                    </label>
                    <input type="text" id="whatsapp" name="whatsapp" value="{{ old('whatsapp', $user->whatsapp) }}" required placeholder="08xxxxxxxxxx"
                        class="w-full h-11 px-4 text-sm bg-surface border border-border rounded-xl outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition">
                    <p class="text-[11px] text-ink-muted mt-1.5">Tim IT Bidtech akan menghubungi Anda melalui nomor ini saat kickoff dan review.</p>
                </div>

                <div class="pt-3">
                    <button type="submit" class="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-bold transition cursor-pointer shadow-xs">
                        <i data-lucide="check" class="w-4 h-4 stroke-[2.5]"></i>
                        <span>Simpan perubahan profil</span>
                    </button>
                </div>
            </form>
        </div>

        <!-- Right Column (5 Cols): Password & Domain Info -->
        <div class="lg:col-span-5 space-y-6">
            <!-- Password Card -->
            <div class="bg-surface border border-border rounded-3xl p-7 shadow-sm">
                <h2 class="text-lg font-bold text-ink mb-2 flex items-center gap-2">
                    <i data-lucide="shield-check" class="w-5 h-5 text-primary"></i>
                    <span>Keamanan & kata sandi</span>
                </h2>
                <p class="text-xs text-ink-muted mb-5">Ganti kata sandi secara berkala untuk menjaga keamanan akun portal Anda.</p>

                <form method="POST" action="{{ route('dashboard.password.update') }}" class="space-y-4">
                    @csrf
                    @method('PUT')

                    <div>
                        <label for="current_password" class="block text-xs font-semibold text-ink mb-1.5">
                            Kata sandi saat ini
                        </label>
                        <input type="password" id="current_password" name="current_password" required
                            class="w-full h-10 px-3.5 text-sm bg-surface border border-border rounded-xl outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition">
                    </div>

                    <div>
                        <label for="password" class="block text-xs font-semibold text-ink mb-1.5">
                            Kata sandi baru
                        </label>
                        <input type="password" id="password" name="password" required placeholder="Minimal 8 karakter"
                            class="w-full h-10 px-3.5 text-sm bg-surface border border-border rounded-xl outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition">
                    </div>

                    <div>
                        <label for="password_confirmation" class="block text-xs font-semibold text-ink mb-1.5">
                            Konfirmasi kata sandi baru
                        </label>
                        <input type="password" id="password_confirmation" name="password_confirmation" required
                            class="w-full h-10 px-3.5 text-sm bg-surface border border-border rounded-xl outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition">
                    </div>

                    <div class="pt-2">
                        <button type="submit" class="w-full inline-flex items-center justify-center gap-2 bg-surface border border-border hover:bg-canvas text-ink px-4 py-2.5 rounded-xl text-sm font-semibold transition cursor-pointer">
                            <i data-lucide="key-round" class="w-4 h-4 text-primary"></i>
                            <span>Perbarui kata sandi</span>
                        </button>
                    </div>
                </form>
            </div>

            <!-- Domain Info Card -->
            <div class="bg-surface border border-border rounded-3xl p-6 shadow-sm">
                <div class="flex items-center gap-2 mb-3">
                    <i data-lucide="globe" class="w-4 h-4 text-primary"></i>
                    <h3 class="font-bold text-sm text-ink">Kepemilikan domain</h3>
                </div>
                <div class="space-y-2.5 text-xs">
                    <div class="flex justify-between items-center py-1">
                        <span class="text-ink-muted">Domain utama</span>
                        <span class="font-semibold text-ink">{{ $domainName }}</span>
                    </div>
                    <div class="flex justify-between items-center py-1 border-t border-canvas">
                        <span class="text-ink-muted">Status registrasi</span>
                        <span class="font-semibold {{ $isDomainRegistered ? 'text-success' : 'text-warning' }}">
                            {{ $isDomainRegistered ? 'Aktif' : 'Dalam Proses' }}
                        </span>
                    </div>
                    <div class="flex justify-between items-center py-1 border-t border-canvas">
                        <span class="text-ink-muted">Registrar</span>
                        <span class="font-semibold text-ink">IdCloudHost via Bidtech</span>
                    </div>
                    <div class="flex justify-between items-center py-1 border-t border-canvas">
                        <span class="text-ink-muted">Masa aktif hingga</span>
                        <span class="font-semibold text-ink">{{ $domainExpiryDate }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
