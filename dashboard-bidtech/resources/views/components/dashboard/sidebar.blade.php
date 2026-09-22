<aside id="sidebar" class="w-64 min-h-screen bg-surface border-r border-border px-5 py-6 flex flex-col justify-between flex-shrink-0 sticky top-0 h-screen overflow-y-auto select-none">
    <div>
        <!-- Brand Logo & Top Action -->
        <div class="flex items-center justify-between sidebar-top-wrapper px-1 transition-all">
            <a href="{{ route('dashboard') }}" class="sidebar-logo-full flex items-center gap-2">
                <img src="{{ asset('images/logo/logo.webp') }}" alt="Logo Bidtech" class="h-7 w-auto object-contain">
                @if(auth()->check() && auth()->user()->isAdmin())
                    <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary-100 text-primary-800 uppercase tracking-wider">Admin</span>
                @endif
            </a>
            <a href="{{ route('dashboard') }}" class="sidebar-logo-mini hidden w-8 h-8 rounded-xl bg-primary text-primary-foreground font-black text-sm items-center justify-center shadow-xs" title="Bidtech Portal">
                B
            </a>
            <button type="button" onclick="toggleSidebar()" id="sidebar-toggle-btn" 
                class="text-ink-muted hover:text-ink p-1.5 rounded-lg hover:bg-canvas transition cursor-pointer" 
                title="Ciutkan/Perluas Sidebar">
                <i data-lucide="panel-left" class="w-4 h-4"></i>
            </button>
        </div>

        <!-- MAIN Navigation -->
        <div class="mt-8">
            <p class="sidebar-header-section text-[11px] font-semibold text-ink-muted tracking-wider uppercase mb-3 px-2">MAIN</p>
            <nav class="space-y-1">
                @if(auth()->check() && auth()->user()->isAdmin())
                    <a href="{{ route('dashboard') }}" id="nav-dashboard" title="Dashboard Admin"
                        class="sidebar-nav-btn w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-2xl font-semibold text-sm transition {{ request()->routeIs('dashboard') && !request()->routeIs('dashboard.order*') ? 'bg-success-surface text-success' : 'text-ink-muted hover:bg-canvas hover:text-ink' }} cursor-pointer">
                        <i data-lucide="layout-grid" class="w-4 h-4 shrink-0"></i>
                        <span class="sidebar-text truncate">Dashboard</span>
                    </a>
                @else
                    <a href="{{ route('dashboard') }}" id="nav-dashboard" title="Dashboard"
                        class="sidebar-nav-btn w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-2xl font-semibold text-sm transition {{ request()->routeIs('dashboard') && !request()->routeIs('dashboard.order*') ? 'bg-success-surface text-success' : 'text-ink-muted hover:bg-canvas hover:text-ink' }} cursor-pointer">
                        <i data-lucide="layout-grid" class="w-4 h-4 shrink-0"></i>
                        <span class="sidebar-text truncate">Dashboard</span>
                    </a>

                    <a href="{{ route('dashboard.order') }}" id="nav-detail" title="Detail Order & Invoice"
                        class="sidebar-nav-btn w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-2xl font-medium text-sm transition {{ request()->routeIs('dashboard.order*') ? 'bg-success-surface text-success font-semibold' : 'text-ink-muted hover:bg-canvas hover:text-ink' }} cursor-pointer">
                        <i data-lucide="briefcase" class="w-4 h-4 shrink-0"></i>
                        <span class="sidebar-text truncate">Detail Order</span>
                    </a>
                @endif
            </nav>
        </div>

        @if(auth()->check() && auth()->user()->isAdmin())
        {{-- ADMIN PANEL Navigation (Hanya untuk Admin) --}}
        <div class="mt-6">
            <p class="sidebar-header-section text-[11px] font-semibold text-ink-muted tracking-wider uppercase mb-3 px-2">ADMIN PANEL</p>
            <nav class="space-y-1">
                <a href="{{ route('dashboard.order') }}" title="Kelola Pesanan Klien"
                   class="sidebar-nav-btn w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-2xl font-medium text-sm transition {{ request()->routeIs('dashboard.order*') ? 'bg-success-surface text-success font-semibold' : 'text-ink-muted hover:bg-canvas hover:text-ink' }} cursor-pointer">
                    <i data-lucide="shopping-bag" class="w-4 h-4 shrink-0"></i>
                    <span class="sidebar-text truncate">Kelola Pesanan</span>
                </a>

                <a href="{{ route('dashboard.templates.index') }}" title="Katalog Template"
                   class="sidebar-nav-btn w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-2xl font-medium text-sm transition {{ request()->routeIs('dashboard.templates.*') || request()->routeIs('admin.templates.*') ? 'bg-success-surface text-success font-semibold' : 'text-ink-muted hover:bg-canvas hover:text-ink' }} cursor-pointer">
                    <i data-lucide="layout-template" class="w-4 h-4 shrink-0"></i>
                    <span class="sidebar-text truncate">Katalog Template</span>
                </a>

                <a href="{{ route('dashboard.promos.index') }}" title="Kelola Kode Promo"
                   class="sidebar-nav-btn w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-2xl font-medium text-sm transition {{ request()->routeIs('dashboard.promos.index') || request()->routeIs('dashboard.promos.create') || request()->routeIs('dashboard.promos.edit') || request()->routeIs('admin.promos.*') ? 'bg-success-surface text-success font-semibold' : 'text-ink-muted hover:bg-canvas hover:text-ink' }} cursor-pointer">
                    <i data-lucide="ticket-percent" class="w-4 h-4 shrink-0"></i>
                    <span class="sidebar-text truncate">Kode Promo</span>
                </a>

                <a href="{{ route('dashboard.promos.all-usages') }}" title="Riwayat Penggunaan Promo"
                   class="sidebar-nav-btn w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-2xl font-medium text-sm transition {{ request()->routeIs('dashboard.promos.all-usages') || request()->routeIs('dashboard.promos.usages') ? 'bg-success-surface text-success font-semibold' : 'text-ink-muted hover:bg-canvas hover:text-ink' }} cursor-pointer">
                    <i data-lucide="history" class="w-4 h-4 shrink-0"></i>
                    <span class="sidebar-text truncate">Riwayat Redeem</span>
                </a>

                <a href="{{ route('dashboard.promos.partners') }}" title="Afiliasi Mitra & Komisi"
                   class="sidebar-nav-btn w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-2xl font-medium text-sm transition {{ request()->routeIs('dashboard.promos.partners') ? 'bg-success-surface text-success font-semibold' : 'text-ink-muted hover:bg-canvas hover:text-ink' }} cursor-pointer">
                    <i data-lucide="users" class="w-4 h-4 shrink-0"></i>
                    <span class="sidebar-text truncate">Mitra & Komisi</span>
                </a>
            </nav>
        </div>
        @endif
    </div>

    <!-- SUPPORT Navigation -->
    <div class="space-y-1 pt-6">
        <p class="sidebar-header-section text-[11px] font-semibold text-ink-muted tracking-wider uppercase mb-3 px-2">SUPPORT</p>
        <nav class="space-y-1">
            @if(request()->routeIs('dashboard'))
                <button type="button" onclick="switchTab('account-settings')" id="nav-account" title="Settings"
                    class="sidebar-nav-btn w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-2xl font-medium text-sm transition text-ink-muted hover:bg-canvas hover:text-ink cursor-pointer">
                    <i data-lucide="settings" class="w-4 h-4 shrink-0"></i>
                    <span class="sidebar-text truncate">Settings</span>
                </button>
            @else
                <a href="{{ route('dashboard', ['tab' => 'account-settings']) }}" id="nav-account" title="Settings"
                    class="sidebar-nav-btn w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-2xl font-medium text-sm transition text-ink-muted hover:bg-canvas hover:text-ink cursor-pointer">
                    <i data-lucide="settings" class="w-4 h-4 shrink-0"></i>
                    <span class="sidebar-text truncate">Settings</span>
                </a>
            @endif

            <a href="https://wa.me/6281234567890?text={{ urlencode('Halo Tim Bidtech, saya ingin meminta bantuan terkait website saya.') }}" 
               target="_blank" rel="noopener noreferrer" title="Help Center"
               class="sidebar-nav-btn w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-2xl font-medium text-sm text-ink-muted hover:bg-canvas hover:text-ink transition cursor-pointer">
                <i data-lucide="help-circle" class="w-4 h-4 shrink-0"></i>
                <span class="sidebar-text truncate">Help Center</span>
            </a>

            <form method="POST" action="{{ route('logout') }}" class="w-full">
                @csrf
                <button type="submit" title="Logout"
                    class="sidebar-nav-btn w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-2xl font-medium text-sm text-ink-muted hover:bg-danger-bg hover:text-danger transition cursor-pointer">
                    <i data-lucide="log-out" class="w-4 h-4 shrink-0"></i>
                    <span class="sidebar-text truncate">Logout</span>
                </button>
            </form>
        </nav>
    </div>
</aside>
