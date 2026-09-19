<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>@yield('title', 'Bidtech Client Portal')</title>

    <!-- Google Fonts: Inter & Plus Jakarta Sans -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">

    <!-- Lucide Icons -->
    <script src="https://unpkg.com/lucide@latest"></script>

    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="bg-canvas text-ink antialiased min-h-screen flex font-sans">

    {{-- Initial Page Load Skeleton Screen --}}
    @include('components.skeletons.dashboard_page_skeleton')

    <!-- ================= SIDEBAR ================= -->
    @include('components.dashboard.sidebar')

    <!-- ================= MAIN CONTENT ================= -->
    <main class="flex-1 p-6 sm:p-8 lg:p-10 overflow-y-auto min-h-screen">
        @yield('content')
    </main>

    <script>
        const activeNavClass = 'sidebar-nav-btn w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-2xl font-semibold text-sm transition bg-success-surface text-success cursor-pointer';
        const inactiveNavClass = 'sidebar-nav-btn w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-2xl font-medium text-sm transition text-ink-muted hover:bg-canvas hover:text-ink cursor-pointer';

        // Toggle Sidebar (Kecilkan / Besarkan)
        function toggleSidebar() {
            const sidebar = document.getElementById('sidebar');
            if (!sidebar) return;

            const isCollapsed = sidebar.classList.toggle('collapsed');
            localStorage.setItem('bidtech_sidebar_collapsed', isCollapsed ? 'true' : 'false');

            if (window.lucide) {
                lucide.createIcons();
            }
        }

        // Tab Navigation Switcher (Dashboard, Detail Order, Account Settings)
        function switchTab(tabName) {
            const tabConfig = {
                'dashboard': { view: 'view-dashboard', btn: 'nav-dashboard' },
                'detail-order': { view: 'view-detail-order', btn: 'nav-detail' },
                'account-settings': { view: 'view-account-settings', btn: 'nav-account' }
            };

            if (!tabConfig[tabName]) return;

            Object.keys(tabConfig).forEach(key => {
                const viewEl = document.getElementById(tabConfig[key].view);
                const btnEl = document.getElementById(tabConfig[key].btn);

                if (viewEl) {
                    if (key === tabName) {
                        viewEl.classList.add('active');
                    } else {
                        viewEl.classList.remove('active');
                    }
                }

                if (btnEl) {
                    btnEl.className = (key === tabName) ? activeNavClass : inactiveNavClass;
                }
            });

            if (window.lucide) {
                lucide.createIcons();
            }

            // Scroll ke atas dengan mulus saat berpindah tab
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Inisialisasi pada saat halaman selesai dimuat
        document.addEventListener('DOMContentLoaded', () => {
            // Pulihkan status sidebar jika sebelumnya diciutkan
            if (localStorage.getItem('bidtech_sidebar_collapsed') === 'true') {
                const sidebar = document.getElementById('sidebar');
                if (sidebar) {
                    sidebar.classList.add('collapsed');
                }
            }

            if (window.lucide) {
                lucide.createIcons();
            }

            // Cek apakah ada query ?tab=... atau hash #... di URL
            const urlParams = new URLSearchParams(window.location.search);
            const tabParam = urlParams.get('tab') || window.location.hash.replace('#', '');
            if (tabParam && ['dashboard', 'detail-order', 'account-settings'].includes(tabParam)) {
                switchTab(tabParam);
            }

            // Hilangkan Dashboard Skeleton dengan transisi halus
            const skeleton = document.getElementById('dashboard-page-skeleton');
            if (skeleton) {
                setTimeout(function() {
                    skeleton.classList.add('fade-out');
                    setTimeout(function() {
                        if (skeleton && skeleton.parentNode) {
                            skeleton.parentNode.removeChild(skeleton);
                        }
                    }, 400);
                }, 350);
            }
        });
    </script>
    @stack('scripts')
</body>
</html>
