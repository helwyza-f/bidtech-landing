"use client";

import Image from "next/image";
import Link from "next/link";
import { Car, Clock, ShieldCheck, ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const t = useTranslations();
  const stats = [
    { value: "20+", label: t("hero.fleet"), icon: Car },
    { value: "24/7", label: t("hero.service"), icon: Clock },
    { value: "100%", label: t("hero.trusted"), icon: ShieldCheck },
  ];

  return (
    <section id="home" className="relative flex min-h-[100dvh] w-full flex-col justify-between overflow-hidden bg-slate-950 pt-16 pb-3 text-white sm:pt-20 sm:pb-6 md:pt-24 md:pb-8 xl:pt-32">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-slate-950 select-none">
        <Image src="/images/background-3.webp" alt="" fill sizes="100vw" className="origin-top-right scale-100 object-cover object-[20%_12%] brightness-[0.95] contrast-[1.05] md:object-[20%_20%] xl:object-[70%_20%]" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black/85 via-black/55 to-transparent md:via-black/35" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-slate-950 via-slate-950/20 to-black/30" />
        <div className="pointer-events-none absolute top-[18%] right-[10%] z-[2] h-[38vw] w-[38vw] rounded-full bg-amber-400/15 blur-[120px]" />
      </div>

      <div className="relative z-20 mx-auto flex w-full max-w-7xl flex-grow items-center justify-center px-4 py-2 sm:px-6 sm:py-4 md:py-6 lg:px-8 xl:justify-start">
        <div className="mx-auto flex w-full max-w-2xl flex-col items-center space-y-3 text-center sm:space-y-4 md:max-w-3xl md:space-y-4 lg:max-w-4xl lg:space-y-5 xl:mx-0 xl:max-w-2xl xl:items-start xl:space-y-6 xl:text-left 2xl:max-w-3xl">
          <div className="w-full space-y-1 sm:space-y-3 md:space-y-4">
            <div className="desktop-reveal flex items-center justify-center gap-1.5 xl:justify-start">
              <span className="h-2 w-5 -skew-x-12 rounded-[1px] bg-gradient-to-r from-amber-200 to-yellow-400 shadow-sm" />
              <span className="h-2 w-5 -skew-x-12 rounded-[1px] bg-gradient-to-r from-[#D4AF37] to-[#B89222] shadow-sm" />
              <span className="h-2 w-5 -skew-x-12 rounded-[1px] bg-gradient-to-r from-[#8A6510] to-[#5A4211] shadow-sm" />
            </div>
            <h1 className="desktop-reveal font-bebas text-center text-[32px] font-black italic uppercase leading-[0.95] tracking-wider text-white drop-shadow-xl xs:text-[38px] sm:text-5xl md:text-5xl lg:text-[60px] xl:text-left xl:text-[68px] 2xl:text-[76px]">
              <span className="block py-0.5">{t("hero.titleLineOne")}</span>
              <span className="block py-0.5">{t("hero.titleLineTwoPrefix")} <span className="text-amber-400 drop-shadow-[0_2px_15px_rgba(212,175,55,0.4)]">{t("hero.titleAccent")}</span></span>
            </h1>
            <p className="desktop-reveal mx-auto max-w-md text-center text-[11px] leading-snug text-gray-200/95 drop-shadow sm:max-w-lg sm:text-sm md:text-base lg:max-w-2xl lg:text-lg xl:mx-0 xl:max-w-xl xl:text-left">{t("hero.description")}</p>
            <p className="desktop-reveal mx-auto max-w-md text-center text-[10px] font-bold uppercase tracking-wide text-amber-300 drop-shadow sm:max-w-lg sm:text-xs md:text-sm lg:max-w-2xl xl:mx-0 xl:max-w-xl xl:text-left">{t("hero.tagline")}</p>
          </div>

          <div className="desktop-reveal mx-auto flex w-full max-w-lg flex-col items-center justify-center gap-2 pt-0.5 sm:flex-row sm:gap-4 sm:pt-1 xl:mx-0 xl:justify-start">
            <Link href="#collection" className="block w-full sm:w-auto"><Button size="lg" className="flex h-9 w-full items-center justify-center gap-4 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 px-5 py-2.5 text-xs font-black uppercase tracking-wider text-slate-950 shadow-lg shadow-amber-500/30 transition-transform hover:scale-[1.02] active:scale-95 sm:h-12 sm:w-auto sm:px-7 sm:py-4 sm:text-sm"><span>{t("hero.exploreFleet")}</span><span>→</span></Button></Link>
            <Link href="#collection" className="block w-full sm:w-auto"><Button size="lg" variant="outline" className="h-9 w-full rounded-xl border border-amber-400/40 bg-white/10 px-5 py-2.5 text-center text-xs font-bold uppercase tracking-wider text-amber-200 backdrop-blur-md transition-transform hover:scale-[1.02] hover:border-amber-300 hover:bg-white/20 hover:text-white active:scale-95 sm:h-12 sm:w-auto sm:px-7 sm:py-4 sm:text-sm">{t("hero.bookNow")}</Button></Link>
          </div>

          <div className="desktop-car desktop-reveal relative my-1 w-full max-w-[340px] select-none pt-2 pb-1 pointer-events-none sm:my-2 sm:max-w-[460px] sm:pt-3 sm:pb-2 md:max-w-[580px] md:pt-4 md:pb-3 lg:max-w-[660px] xl:absolute xl:right-[1%] xl:bottom-[3%] xl:z-10 xl:w-[50%] xl:max-w-[720px] 2xl:right-[2%] 2xl:bottom-[4%] 2xl:max-w-[850px]">
            <div className="relative"><div className="absolute top-1/2 left-1/2 h-[65%] w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/15 blur-2xl md:blur-3xl xl:h-[75%] xl:bg-gradient-to-tr xl:from-amber-500/20 xl:via-yellow-500/10 xl:to-transparent" />
              <Image src="/images/Alphard.webp" alt={t("hero.imageAlt")} width={1661} height={947} priority sizes="(max-width: 639px) 92vw, (max-width: 1023px) 460px, (max-width: 1279px) 660px, (max-width: 1535px) 720px, 850px" className="relative z-10 h-auto w-full object-contain drop-shadow-[0_16px_25px_rgba(0,0,0,0.85)] md:drop-shadow-[0_24px_35px_rgba(0,0,0,0.9)] xl:drop-shadow-[0_28px_40px_rgba(0,0,0,0.9)]" />
              <div className="absolute -bottom-1 right-[6%] left-[6%] h-4 rounded-[100%] bg-black/90 blur-md md:-bottom-2 md:h-6 md:blur-lg xl:right-[5%] xl:left-[5%] xl:h-7 xl:bg-black/95 xl:blur-xl" />
            </div>
          </div>

          <div className="desktop-reveal mx-auto flex w-full max-w-lg items-center justify-between gap-3 border-t border-white/20 pt-3 sm:justify-center sm:gap-8 sm:pt-4 md:max-w-2xl md:gap-10 md:pt-5 lg:max-w-3xl lg:gap-12 xl:mx-0 xl:max-w-full xl:justify-start xl:gap-8">
            {stats.map(({ value, label, icon: Icon }, index) => <div key={label} className="contents">{index > 0 && <div className="h-10 w-px shrink-0 bg-white/20 sm:h-12 lg:h-14" />}<div className="flex flex-col items-center space-y-0.5 xl:items-start sm:space-y-1"><div className="flex h-5 items-center justify-center text-amber-400 sm:h-6 xl:justify-start"><Icon className="h-4 w-4 sm:h-5 sm:w-5" /></div><div className="font-bebas text-center text-2xl font-bold leading-none tracking-wide text-white sm:text-3xl lg:text-4xl xl:text-left xl:text-5xl">{value}</div><div className="text-center text-[9px] font-bold uppercase tracking-wider text-gray-300 sm:text-[10px] lg:text-xs xl:text-left">{label}</div></div></div>)}
          </div>
        </div>
      </div>

      <div className="relative z-20 flex w-full justify-center pt-2 pb-1 sm:pt-4 sm:pb-2"><a href="#collection" className="group flex flex-col items-center gap-1 text-white/75 transition-colors hover:text-amber-300"><span className="text-[9px] font-bold uppercase tracking-[3px] sm:text-xs">{t("hero.scroll")}</span><ChevronDown className="h-3.5 w-3.5 animate-bounce text-amber-400 group-hover:text-amber-300 sm:h-4 sm:w-4" /></a></div>
    </section>
  );
}
