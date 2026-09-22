{{-- Komponen Initial Page Load Skeleton untuk Layout Checkout Bidtech --}}
<div id="checkout-page-skeleton" class="page-skeleton-overlay fixed inset-0 z-[100] bg-[#F4F6F5] overflow-hidden pointer-events-none" aria-hidden="true">
    <!-- Header Stepper Skeleton -->
    <header class="border-b border-[#E4E9E6] bg-white sticky top-0 z-50">
        <div class="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
            <!-- Logo Placeholder -->
            <div class="flex items-center gap-2">
                <div class="h-8 w-28 sm:w-36 rounded-lg bg-slate-200 animate-shimmer"></div>
            </div>

            <!-- Stepper Pills Skeleton -->
            <div class="flex items-center gap-2 sm:gap-4">
                @foreach([1, 2, 3, 4] as $n)
                    <div class="flex items-center gap-2 shrink-0">
                        <div class="size-6 sm:size-7 rounded-full bg-slate-200 animate-shimmer"></div>
                        <div class="hidden sm:block h-3.5 w-14 rounded-md bg-slate-200 animate-shimmer"></div>
                    </div>
                    @if($n < 4)
                        <div class="h-0.5 w-4 sm:w-10 bg-slate-200 animate-shimmer"></div>
                    @endif
                @endforeach
            </div>
        </div>
    </header>

    @if(request()->routeIs('checkout.pilih-template*'))
        <!-- ================= SKELETON KHUSUS KATALOG PILIH TEMPLATE ================= -->
        <main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-10 space-y-8">
            <!-- Header Info & Badge -->
            <div class="space-y-4">
                <div class="flex items-center justify-between">
                    <div class="h-6 w-48 rounded-full bg-emerald-100/70 animate-shimmer"></div>
                    <div class="h-4 w-44 rounded bg-slate-200 animate-shimmer"></div>
                </div>
                <div class="space-y-2">
                    <div class="h-8 w-72 sm:w-96 rounded-xl bg-slate-200 animate-shimmer"></div>
                    <div class="h-4 w-full max-w-xl rounded-md bg-slate-200/80 animate-shimmer"></div>
                </div>

                <!-- Banner Domain Terpilih Placeholder -->
                <div class="rounded-2xl border-2 border-emerald-200 bg-emerald-50/50 p-4 sm:px-6 shadow-xs flex items-center justify-between gap-4">
                    <div class="flex items-center gap-3.5">
                        <div class="size-11 rounded-xl bg-emerald-300/60 animate-shimmer shrink-0"></div>
                        <div class="space-y-2">
                            <div class="h-5 w-40 rounded-md bg-slate-200 animate-shimmer"></div>
                            <div class="h-3.5 w-48 rounded bg-slate-200/70 animate-shimmer"></div>
                        </div>
                    </div>
                    <div class="h-10 w-28 rounded-xl bg-slate-200 animate-shimmer shrink-0"></div>
                </div>

                <!-- Filter Kategori Tabs Skeleton -->
                <div class="flex items-center gap-2 overflow-x-auto pt-2">
                    @foreach([1, 2, 3, 4, 5] as $cat)
                        <div class="h-10 w-24 sm:w-28 rounded-xl bg-white border border-slate-200 animate-shimmer shrink-0"></div>
                    @endforeach
                </div>
            </div>

            <!-- Grid 6 Template Cards Skeleton (3 Kolom) -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                @foreach([1, 2, 3, 4, 5, 6] as $card)
                    <div class="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-xs space-y-4 pb-5">
                        <!-- Image thumbnail placeholder -->
                        <div class="h-48 sm:h-52 w-full bg-slate-200 animate-shimmer"></div>
                        <div class="px-5 space-y-3">
                            <div class="flex items-center justify-between">
                                <div class="h-5 w-20 rounded-full bg-emerald-100/70 animate-shimmer"></div>
                                <div class="h-4 w-16 rounded bg-slate-100 animate-shimmer"></div>
                            </div>
                            <div class="h-6 w-3/4 rounded-lg bg-slate-200 animate-shimmer"></div>
                            <div class="h-4 w-full rounded bg-slate-100 animate-shimmer"></div>
                            <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
                                <div class="h-6 w-28 rounded-md bg-slate-200 animate-shimmer"></div>
                                <div class="h-10 w-28 rounded-xl bg-emerald-400/60 animate-shimmer"></div>
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>
        </main>
    @else
        <!-- ================= SKELETON 2-KOLOM (DOMAIN, DATA DIRI, RINGKASAN, BAYAR) ================= -->
        <main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">

                <!-- Kolom Kiri: Konten Utama (8 Kolom) -->
                <div class="lg:col-span-8 space-y-6">
                    <!-- Badge Langkah & Header Teks -->
                    <div class="flex items-center justify-between">
                        <div class="h-6 w-32 rounded-full bg-emerald-100/70 animate-shimmer"></div>
                        <div class="h-5 w-24 rounded-full bg-slate-200 animate-shimmer"></div>
                    </div>

                    <div class="space-y-2">
                        <div class="h-8 sm:h-9 w-3/4 max-w-md rounded-xl bg-slate-200 animate-shimmer"></div>
                        <div class="h-4 w-5/6 max-w-lg rounded-md bg-slate-200/80 animate-shimmer"></div>
                    </div>

                    <!-- Input / Search Bar / Form Header Placeholder -->
                    <div class="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-xs">
                        <div class="flex flex-col sm:flex-row gap-3 items-center">
                            <div class="h-12 w-full rounded-xl bg-slate-100 animate-shimmer"></div>
                            <div class="h-12 w-full sm:w-36 rounded-xl bg-emerald-100/80 animate-shimmer shrink-0"></div>
                        </div>
                    </div>

                    <!-- 3 Kartu Rekomendasi / Form Field Cards -->
                    <div class="space-y-3.5">
                        @foreach([1, 2, 3] as $item)
                            <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
                                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div class="space-y-2">
                                        <div class="flex items-center gap-2">
                                            <div class="h-5 w-40 rounded-md bg-slate-200 animate-shimmer"></div>
                                            <div class="h-5 w-20 rounded-full bg-emerald-100/70 animate-shimmer"></div>
                                        </div>
                                        <div class="h-4 w-28 rounded-md bg-slate-200/70 animate-shimmer"></div>
                                    </div>
                                    <div class="flex items-center gap-3">
                                        <div class="h-6 w-24 rounded-md bg-slate-200 animate-shimmer"></div>
                                        <div class="h-10 w-24 rounded-xl bg-emerald-200/80 animate-shimmer"></div>
                                    </div>
                                </div>
                            </div>
                        @endforeach
                    </div>
                </div>

                <!-- Kolom Kanan: Sidebar Ringkasan (4 Kolom) -->
                <div class="lg:col-span-4 space-y-4">
                    <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-5">
                        <!-- Title Sidebar -->
                        <div class="flex items-center justify-between border-b border-slate-100 pb-4">
                            <div class="h-5 w-32 rounded-md bg-slate-200 animate-shimmer"></div>
                            <div class="size-6 rounded-full bg-slate-100 animate-shimmer"></div>
                        </div>

                        <!-- Template Info Placeholder -->
                        <div class="flex items-center gap-3.5">
                            <div class="size-16 rounded-xl bg-slate-200 animate-shimmer shrink-0"></div>
                            <div class="space-y-2 flex-1">
                                <div class="h-4 w-3/4 rounded-md bg-slate-200 animate-shimmer"></div>
                                <div class="h-3.5 w-1/2 rounded-md bg-slate-100 animate-shimmer"></div>
                            </div>
                        </div>

                        <!-- Domain Info Box Placeholder -->
                        <div class="rounded-xl border border-slate-100 bg-slate-50 p-3.5 space-y-2">
                            <div class="h-3.5 w-20 rounded bg-slate-200 animate-shimmer"></div>
                            <div class="h-4 w-40 rounded-md bg-slate-200 animate-shimmer"></div>
                        </div>

                        <!-- Price Calculation Rows -->
                        <div class="space-y-2.5 pt-2 border-t border-slate-100">
                            <div class="flex justify-between items-center">
                                <div class="h-3.5 w-24 rounded bg-slate-100 animate-shimmer"></div>
                                <div class="h-3.5 w-20 rounded bg-slate-200 animate-shimmer"></div>
                            </div>
                            <div class="flex justify-between items-center">
                                <div class="h-3.5 w-20 rounded bg-slate-100 animate-shimmer"></div>
                                <div class="h-3.5 w-16 rounded bg-slate-200 animate-shimmer"></div>
                            </div>
                            <div class="flex justify-between items-center pt-2 border-t border-dashed border-slate-200">
                                <div class="h-4 w-28 rounded bg-slate-200 animate-shimmer"></div>
                                <div class="h-6 w-28 rounded bg-emerald-200/80 animate-shimmer"></div>
                            </div>
                        </div>

                        <!-- Action Button CTA Placeholder -->
                        <div class="h-12 w-full rounded-xl bg-emerald-400/50 animate-shimmer"></div>
                    </div>

                    <!-- Guarantee / Security Note Placeholder -->
                    <div class="flex items-center justify-center gap-2 py-2">
                        <div class="size-4 rounded-full bg-slate-200 animate-shimmer"></div>
                        <div class="h-3.5 w-44 rounded bg-slate-200/70 animate-shimmer"></div>
                    </div>
                </div>

            </div>
        </main>
    @endif
</div>
