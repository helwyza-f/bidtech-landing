import { MessageCircle } from 'lucide-react';

export default function FloatingWhatsApp() {
  return (
    <aside aria-label="Kontak Cepat WhatsApp" className="fixed bottom-6 right-6 z-40">
      <a
        href="https://wa.me/6281234567890?text=Halo%20Teh.in,%20saya%20mau%20order%20menu%20segar"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center gap-3 bg-[#25D366] hover:bg-[#1EBE5D] text-white pl-4 pr-5 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        aria-label="Chat via WhatsApp"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
        </span>

        <MessageCircle className="w-5 h-5 fill-white" />
        <span className="font-nav text-xs font-bold tracking-wide uppercase">
          Order Cepat
        </span>
      </a>
    </aside>
  );
}
