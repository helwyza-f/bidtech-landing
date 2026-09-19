<div class="bg-surface border border-border rounded-3xl p-7 shadow-sm flex flex-col justify-between h-full">
    <div>
        <h3 class="font-bold text-sm text-ink">Tim yang menangani proyekmu</h3>
        <div class="flex items-center gap-3.5 mt-4">
            <div class="w-11 h-11 rounded-2xl bg-success-surface text-primary font-bold flex items-center justify-center text-sm shrink-0">
                IT
            </div>
            <div>
                <div class="text-sm font-semibold text-ink">Tim IT Bidtech</div>
                <div class="text-xs text-ink-muted">Kontak untuk kickoff proyek</div>
            </div>
        </div>

        <a href="https://wa.me/6281234567890?text={{ urlencode('Halo Tim IT Bidtech, saya ingin menanyakan progres website untuk order ' . $orderNumber) }}" 
           target="_blank" 
           rel="noopener noreferrer"
           class="w-full mt-4 border border-border hover:border-primary hover:bg-success-surface/40 text-ink font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition text-sm cursor-pointer">
            <i data-lucide="message-circle" class="w-4 h-4 text-whatsapp"></i>
            <span>Hubungi via WhatsApp</span>
        </a>
    </div>

    <div class="pt-6 border-t border-border mt-6">
        <h4 class="font-bold text-sm text-ink mb-3">Order</h4>
        <div class="flex justify-between items-center text-xs py-1.5">
            <span class="text-ink-muted">Nomor order</span>
            <span class="font-mono font-bold text-ink">{{ $orderNumber }}</span>
        </div>
        <div class="flex justify-between items-center text-xs py-1.5">
            <span class="text-ink-muted">Total dibayar</span>
            <span class="font-bold text-ink text-sm">Rp{{ number_format($totalPaid, 0, ',', '.') }}</span>
        </div>

        <button type="button" onclick="switchTab('detail-order')" class="w-full mt-4 border border-border hover:bg-canvas text-ink font-medium py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 text-xs transition cursor-pointer">
            <span>Lihat detail order</span>
            <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
        </button>
    </div>
</div>
