<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Dashboard Bidtech">
    <title>@yield('title', 'Bidtech Dashboard')</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="antialiased">
    {{-- Initial Page Load Skeleton Screen --}}
    <div id="auth-page-skeleton" class="page-skeleton-overlay fixed inset-0 z-[100] bg-white overflow-hidden" aria-hidden="true">
        <div class="h-full lg:grid lg:grid-cols-2">
            <!-- Sisi Kiri (Desktop Panel) -->
            <div class="relative hidden min-h-screen bg-[#0E2502] p-12 lg:flex lg:flex-col lg:justify-between xl:p-16">
                <div class="h-8 w-36 rounded-lg bg-white/10 animate-shimmer"></div>
                <div class="space-y-4 max-w-lg">
                    <div class="h-10 w-3/4 rounded-xl bg-white/10 animate-shimmer"></div>
                    <div class="h-10 w-1/2 rounded-xl bg-white/10 animate-shimmer"></div>
                    <div class="h-4 w-5/6 rounded-md bg-white/5 animate-shimmer"></div>
                </div>
                <div class="h-4 w-28 rounded bg-white/10 animate-shimmer"></div>
            </div>
            <!-- Sisi Kanan (Form Panel) -->
            <div class="flex min-h-screen flex-col justify-center px-6 py-10 sm:px-10 lg:px-16">
                <div class="mx-auto w-full max-w-sm space-y-6">
                    <div class="lg:hidden h-8 w-32 rounded-lg bg-slate-200 animate-shimmer"></div>
                    <div class="space-y-2">
                        <div class="h-8 w-56 rounded-xl bg-slate-200 animate-shimmer"></div>
                        <div class="h-4 w-72 rounded-md bg-slate-100 animate-shimmer"></div>
                    </div>
                    <div class="space-y-4 pt-2">
                        <div class="space-y-1.5">
                            <div class="h-4 w-20 rounded bg-slate-200 animate-shimmer"></div>
                            <div class="h-12 w-full rounded-xl bg-slate-100 animate-shimmer"></div>
                        </div>
                        <div class="space-y-1.5">
                            <div class="h-4 w-24 rounded bg-slate-200 animate-shimmer"></div>
                            <div class="h-12 w-full rounded-xl bg-slate-100 animate-shimmer"></div>
                        </div>
                    </div>
                    <div class="pt-2">
                        <div class="h-12 w-full rounded-xl bg-emerald-300/60 animate-shimmer"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="auth-content-wrapper" class="page-content-wrapper loading">
        @yield('content')
    </div>

    <script>
        (function() {
            var handled = false;
            function removeSkeleton() {
                if (handled) return;
                handled = true;
                var skeleton = document.getElementById('auth-page-skeleton');
                var content = document.getElementById('auth-content-wrapper');
                if (!skeleton) {
                    if (content) {
                        content.classList.remove('loading');
                        content.classList.add('loaded');
                    }
                    return;
                }
                setTimeout(function() {
                    skeleton.classList.add('fade-out');
                    if (content) {
                        content.classList.remove('loading');
                        content.classList.add('loaded');
                    }
                    setTimeout(function() {
                        if (skeleton && skeleton.parentNode) {
                            skeleton.parentNode.removeChild(skeleton);
                        }
                    }, 400);
                }, 350);
            }

            if (document.readyState === 'complete' || document.readyState === 'interactive') {
                removeSkeleton();
            } else {
                document.addEventListener('DOMContentLoaded', removeSkeleton);
                window.addEventListener('load', removeSkeleton);
            }
            setTimeout(removeSkeleton, 1500);
        })();
    </script>
</body>
</html>
