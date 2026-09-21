'use client';
import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
    }, 5000);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <footer className="relative bg-brand-stone dark:bg-brand-black border-t border-brand-border dark:border-white/10 pt-24 pb-16 px-6 md:px-12 lg:px-20 overflow-hidden" id="kontak">
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 pointer-events-none select-none text-[10vw] font-extrabold tracking-tighter text-black/[0.03] dark:text-white/[0.03] leading-none whitespace-nowrap font-mono">
        PT AFINDO CONSTRUCTION
      </div>
      <div className="max-w-7xl mx-auto space-y-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-16 border-b border-brand-borderDark dark:border-white/10">
          <div className="lg:col-span-6 space-y-2">
            <div className="font-mono text-xs text-brand-goldDark dark:text-brand-gold uppercase tracking-widest font-semibold">BULLETIN GEOTEKNIK INDONESIA</div>
            <h3 className="text-2xl sm:text-3xl font-bold text-brand-black dark:text-white tracking-tight">Dapatkan analisis tanah dan wawasan teknik berkala.</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-md">Kajian kasus proyek deep foundation, mitigasi gempa sub-struktur, dan pembaruan regulasi SNI.</p>
          </div>
          <div className="lg:col-span-6">
            <form className="flex flex-col sm:flex-row gap-3" onSubmit={handleSubscribe}>
              <div className="relative flex-1">
                <input className="w-full bg-white dark:bg-brand-carbon border border-brand-borderDark dark:border-white/20 text-brand-black dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 text-sm px-6 py-3.5 rounded-full focus:outline-none focus:border-brand-black dark:focus:border-white transition duration-200 shadow-sm" placeholder="name@email.com" required type="email" />
              </div>
              <button className="bg-brand-black dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-200 text-white dark:text-brand-black font-semibold text-sm px-8 py-3.5 rounded-full whitespace-nowrap transition duration-200 shadow-md active:scale-95" type="submit">
                Berlangganan
              </button>
            </form>
            {subscribed && (
              <p className="text-xs text-emerald-700 font-mono mt-2" id="subscribe-msg">✓ Terima kasih! Anda terdaftar dalam bulletin teknik PT Afindo Construction.</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-4">
            <div className="flex items-center">
              <img src="/images/hero/afindo-logo.png" alt="PT Afindo Logo" className="h-10 w-auto object-contain dark:brightness-0 dark:invert" />
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              PT Afindo Construction.<br />
              Menara Gracia Lt. 18, Jl. HR Rasuna Said Kav. C-17, Kuningan, Jakarta Selatan 12940.
            </p>
            <div className="text-xs font-mono text-neutral-600 dark:text-neutral-400 space-y-1">
              <div>T: +62 21 5290 8800</div>
              <div>E: teknik@afindo-construction.id</div>
            </div>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-mono text-xs font-bold text-brand-goldDark dark:text-brand-gold tracking-widest uppercase">NAVIGASI</h4>
            <ul className="space-y-2.5 text-xs text-neutral-600 dark:text-neutral-400">
              <li><a className="hover:text-black dark:hover:text-white transition" href="#beranda">Beranda Utama</a></li>
              <li><a className="hover:text-black dark:hover:text-white transition" href="#tentang">Tentang Kami & Tim Ahli</a></li>
              <li><a className="hover:text-black dark:hover:text-white transition" href="#layanan">Spesialisasi Sub-Struktur</a></li>
              <li><a className="hover:text-black dark:hover:text-white transition" href="#proyek">Portofolio & Studi Kasus</a></li>
              <li><a className="hover:text-black dark:hover:text-white transition" href="#metrik">Metrik & Standar K3</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-mono text-xs font-bold text-brand-goldDark dark:text-brand-gold tracking-widest uppercase">HALAMAN UTILITAS</h4>
            <ul className="space-y-2.5 text-xs text-neutral-600 dark:text-neutral-400">
              <li><button className="hover:text-black dark:hover:text-white transition flex items-center gap-1" onClick={() => alert('Spesifikasi teknis katalog PDF akan diunduh.')}>Katalog Rig & Alat (PDF)</button></li>
              <li><button className="hover:text-black dark:hover:text-white transition" onClick={() => alert('Sertifikasi ISO & K3 resmi dapat diverifikasi via tim legal.')}>Verifikasi Sertifikasi ISO</button></li>
              <li><button className="hover:text-black dark:hover:text-white transition" onClick={() => alert('Portal kalkulator geoteknik untuk estimasi awal beban tiang.')}>Kalkulator Estimasi Tiang</button></li>
              <li><a className="hover:text-black dark:hover:text-white transition" href="#">Kebijakan Privasi & Legal</a></li>
              <li><a className="hover:text-black dark:hover:text-white transition" href="#">Kepatuhan Lingkungan AMDAL</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-mono text-xs font-bold text-brand-goldDark dark:text-brand-gold tracking-widest uppercase">JARINGAN SOSIAL</h4>
            <ul className="space-y-2.5 text-xs text-neutral-600 dark:text-neutral-400">
              <li><a className="hover:text-black dark:hover:text-white transition flex items-center gap-2" href="https://linkedin.com" target="_blank" rel="noreferrer"><span>LinkedIn Corporate</span><ArrowUpRight className="w-3 h-3" /></a></li>
              <li><a className="hover:text-black dark:hover:text-white transition flex items-center gap-2" href="https://instagram.com" target="_blank" rel="noreferrer"><span>Dokumentasi Lapangan (IG)</span><ArrowUpRight className="w-3 h-3" /></a></li>
              <li><a className="hover:text-black dark:hover:text-white transition flex items-center gap-2" href="https://youtube.com" target="_blank" rel="noreferrer"><span>YouTube Site Timelapse</span><ArrowUpRight className="w-3 h-3" /></a></li>
              <li><a className="hover:text-black dark:hover:text-white transition flex items-center gap-2" href="https://twitter.com" target="_blank" rel="noreferrer"><span>X (Engineering Updates)</span><ArrowUpRight className="w-3 h-3" /></a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-brand-borderDark dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          <div>© 2025 PT AFINDO CONSTRUCTION. HAK CIPTA DILINDUNGI UNDANG-UNDANG.</div>
          <div className="flex items-center gap-4">
            <span>KODE SISTEM: PND-SUB-2025</span>
            <span className="text-brand-goldDark dark:text-brand-gold font-semibold">WCAG AAA COMPLIANT</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
