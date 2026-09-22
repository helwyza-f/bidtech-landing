{{-- Komponen Initial Page Load Skeleton untuk Layout Dashboard Bidtech --}}
<div id="dashboard-page-skeleton" class="page-skeleton-overlay fixed inset-0 z-[100] bg-canvas flex overflow-hidden" aria-hidden="true">
    <!-- Sidebar Skeleton -->
    <aside class="w-64 bg-surface border-r border-border p-6 flex flex-col justify-between shrink-0 hidden md:flex">
        <div class="space-y-6">
            <!-- Logo Placeholder -->
            <div class="h-8 w-32 rounded-lg bg-slate-200 animate-shimmer"></div>

            <!-- Navigation Links Skeleton -->
            <div class="space-y-2.5 pt-4">
                @foreach([1, 2, 3] as $item)
                    <div class="h-11 w-full rounded-2xl bg-slate-100 animate-shimmer flex items-center gap-3 px-3.5">
                        <div class="size-5 rounded-lg bg-slate-200"></div>
                        <div class="h-4 w-28 rounded-md bg-slate-200"></div>
                    </div>
                @endforeach
            </div>
        </div>

        <!-- User Profile Bottom Skeleton -->
        <div class="pt-4 border-t border-border flex items-center gap-3">
            <div class="size-10 rounded-full bg-slate-200 animate-shimmer shrink-0"></div>
            <div class="space-y-1.5 flex-1">
                <div class="h-3.5 w-24 rounded bg-slate-200 animate-shimmer"></div>
                <div class="h-3 w-32 rounded bg-slate-100 animate-shimmer"></div>
            </div>
        </div>
    </aside>

    <!-- Main Content Skeleton -->
    <main class="flex-1 p-6 sm:p-8 lg:p-10 overflow-y-auto space-y-8">
        <!-- Top Greeting Bar -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div class="space-y-2">
                <div class="h-8 w-64 rounded-xl bg-slate-200 animate-shimmer"></div>
                <div class="h-4 w-48 rounded-md bg-slate-100 animate-shimmer"></div>
            </div>
            <div class="flex items-center gap-3">
                <div class="h-10 w-28 rounded-xl bg-slate-200 animate-shimmer"></div>
                <div class="h-10 w-36 rounded-xl bg-emerald-100 animate-shimmer"></div>
            </div>
        </div>

        <!-- 3 Stat Metric Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            @foreach([1, 2, 3] as $stat)
                <div class="rounded-3xl border border-border bg-surface p-6 space-y-4 shadow-xs">
                    <div class="flex items-center justify-between">
                        <div class="h-4 w-24 rounded bg-slate-200 animate-shimmer"></div>
                        <div class="size-10 rounded-2xl bg-emerald-50 animate-shimmer"></div>
                    </div>
                    <div class="h-8 w-36 rounded-lg bg-slate-200 animate-shimmer"></div>
                    <div class="h-3.5 w-28 rounded bg-slate-100 animate-shimmer"></div>
                </div>
            @endforeach
        </div>

        <!-- Data Card / Order Details Skeleton -->
        <div class="rounded-3xl border border-border bg-surface p-6 sm:p-8 space-y-6 shadow-xs">
            <div class="flex items-center justify-between border-b border-border pb-5">
                <div class="space-y-1.5">
                    <div class="h-6 w-44 rounded-lg bg-slate-200 animate-shimmer"></div>
                    <div class="h-3.5 w-60 rounded bg-slate-100 animate-shimmer"></div>
                </div>
                <div class="h-9 w-24 rounded-xl bg-slate-100 animate-shimmer"></div>
            </div>

            <div class="space-y-3">
                @foreach([1, 2, 3, 4] as $row)
                    <div class="h-14 w-full rounded-2xl bg-slate-50 animate-shimmer border border-border-light flex items-center justify-between px-4">
                        <div class="flex items-center gap-3">
                            <div class="size-8 rounded-xl bg-slate-200"></div>
                            <div class="h-4 w-32 rounded bg-slate-200"></div>
                        </div>
                        <div class="h-4 w-20 rounded bg-slate-200"></div>
                    </div>
                @endforeach
            </div>
        </div>
    </main>
</div>
