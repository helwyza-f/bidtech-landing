<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>@yield('title', 'Dashboard Admin - Bidtech')</title>

    <!-- Google Fonts: Inter & Plus Jakarta Sans -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">

    <!-- Lucide Icons -->
    <script src="https://unpkg.com/lucide@latest"></script>

    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="bg-canvas text-ink antialiased min-h-screen flex font-sans">

    <!-- ================= SIDEBAR ================= -->
    @include('components.dashboard.sidebar')

    <!-- ================= KONTEN UTAMA ================= -->
    <main class="flex-1 p-6 sm:p-8 lg:p-10 overflow-y-auto min-h-screen">
        <!-- Flash Message Alerts -->
        @if(session('success'))
            <div class="mb-6 flex items-center gap-3 p-4 rounded-2xl bg-success-surface border border-primary-200 text-success text-sm font-medium shadow-xs">
                <i data-lucide="check-circle-2" class="w-5 h-5 text-success shrink-0"></i>
                <span>{{ session('success') }}</span>
            </div>
        @endif

        @if(session('warning'))
            <div class="mb-6 flex items-center gap-3 p-4 rounded-2xl bg-warning-surface border border-warning/20 text-warning-text text-sm font-medium shadow-xs">
                <i data-lucide="alert-triangle" class="w-5 h-5 text-warning shrink-0"></i>
                <span>{{ session('warning') }}</span>
            </div>
        @endif

        @if(isset($errors) && $errors->any())
            <div class="mb-6 p-4 rounded-2xl bg-danger-bg border border-danger/20 text-danger-text text-sm font-medium shadow-xs">
                <div class="flex items-center gap-2 mb-2 font-semibold">
                    <i data-lucide="alert-circle" class="w-5 h-5 text-danger shrink-0"></i>
                    <span>Terdapat beberapa kesalahan pengisian:</span>
                </div>
                <ul class="list-disc list-inside space-y-1 text-xs text-danger-text">
                    @foreach($errors->all() as $err)
                        <li>{{ $err }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        @yield('content')
    </main>

    <script>
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
        });
    </script>
    @stack('scripts')
</body>
</html>
