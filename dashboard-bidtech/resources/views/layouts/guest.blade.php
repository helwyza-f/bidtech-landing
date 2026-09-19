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
    @vite(['resources/css/app.css', 'resources/js/app.js',])
</head>
<body class="antialiased">
    {{-- Initial Page Load Skeleton Screen --}}
    @include('components.skeletons.auth_page_skeleton')

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