import { ArrowRight, Shield } from 'lucide-react';

export default function Metrics() {
  return (
    <section className="py-28 px-6 md:px-12 lg:px-20 bg-brand-surfaceMuted dark:bg-brand-black border-t border-brand-border dark:border-white/10 relative" id="metrik">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="space-y-6 max-w-4xl">
          <div className="inline-flex items-center gap-2.5">
            <span className="w-3 h-3 bg-brand-red inline-block rounded-xs"></span>
            <span className="font-mono text-xs text-brand-red font-bold tracking-widest uppercase">METRIK EKSEKUSI</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-brand-black dark:text-white leading-[1.12]">
            Nol toleransi deviasi. Struktur bawah tanah yang melindungi reputasi investasi Anda.
          </h2>
          <div className="flex items-center gap-4 pt-2">
            <a className="inline-flex items-center gap-2 text-brand-black dark:text-white text-sm font-semibold hover:text-brand-gold dark:hover:text-brand-gold transition group" href="#tentang">
              <span>Kisah Kami & Filosofi Teknik</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </a>
          </div>
        </div>
        
        <div className="relative rounded-[20px] overflow-hidden border border-brand-border dark:border-white/10 bg-white dark:bg-brand-carbon card-shadow h-[440px] lg:h-[540px]">
          <img alt="Civil engineers in safety vests inspecting deep foundation drilling worksite" className="w-full h-full object-cover object-center" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPIAkDoEGcFKi--1OgAPVOtSnW-o0X3JStdoAg6IZ996o9hyUgdCupBmYwQ4ikbeFxOCkEiMA57wbil57_ILj2334tvj61pc60yPGqQsn2IwLYKlQbA5JYl8Pwh7GhLUDPdT-GJ69CNYmb_7wmiHwOGu2mwNAhNmX68r1i9T5FKxdoYr64nw26i9AixnUn8dV-IFxU0Ap0XuJo1b18RupTCcnQOrCt2hVULkBDzrix5a0jwUyeSEGC" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent"></div>
          
          <div className="absolute bottom-8 left-8 right-8 lg:right-auto lg:max-w-md bg-white/95 dark:bg-brand-carbon/95 backdrop-blur-md p-6 rounded-[16px] border border-black/10 dark:border-white/10 card-shadow text-brand-black dark:text-white">
            <div className="font-mono text-xs text-brand-goldDark dark:text-brand-gold uppercase tracking-wider mb-2 flex items-center gap-2 font-bold">
              <Shield className="w-3.5 h-3.5" />
              <span>GARANSI KELURUSAN VERTIKAL</span>
            </div>
            <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
              "Penyimpangan vertikal bore pile lebih dari 1% dapat memicu keruntuhan struktural momen sekunder. Tim survei geodetik kami memonitor kelurusan inclinometer digital setiap 3 meter pengeboran."
            </p>
            <div className="mt-4 pt-3 border-t border-neutral-200 dark:border-white/10 flex items-center justify-between text-xs font-mono text-neutral-500 dark:text-neutral-400 font-medium">
              <span className="text-brand-black dark:text-white font-semibold">IR. HENDRA W., IPM.</span>
              <span>CHIEF GEOTECH SPECIALIST</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
