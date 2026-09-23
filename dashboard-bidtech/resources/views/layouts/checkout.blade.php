<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>@yield('title', 'Checkout - Bidtech')</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body class="min-h-screen bg-[#F4F6F5] font-sans text-[#0B1B17] antialiased">

    {{-- Initial Page Load Skeleton Screen --}}
    @include('components.skeletons.checkout_page_skeleton')

    {{-- Main Page Content Container --}}
    <div id="page-content-wrapper" class="page-content-wrapper loading">
        @include('components.header_checkout')

        <main class="w-full">        
            @yield('content')
        </main>
    </div>

    <script>
        (function() {
            var skeletonHandled = false;
            function removeSkeleton() {
                if (skeletonHandled) return;
                skeletonHandled = true;

                var skeleton = document.getElementById('checkout-page-skeleton');
                var content = document.getElementById('page-content-wrapper');
                if (!skeleton) {
                    if (content) {
                        content.classList.remove('loading');
                        content.classList.add('loaded');
                    }
                    return;
                }

                // Micro delay (350ms) to ensure smooth shimmer perception without flashing
                setTimeout(function() {
                    skeleton.classList.add('fade-out');
                    if (content) {
                        content.classList.remove('loading');
                        content.classList.add('loaded');
                    }
                    if (window.lucide) {
                        lucide.createIcons();
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

            // Fallback timeout in case DOMContentLoaded was missed
            setTimeout(removeSkeleton, 1500);
        })();
    </script>
</body>
</html>