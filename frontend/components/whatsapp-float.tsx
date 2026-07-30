"use client";

import Image from "next/image";

export function WhatsAppFloat() {
  return (
    <a
      aria-label="Chat via WhatsApp"
      className="group fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-[calc(1rem+env(safe-area-inset-right))] z-[999] flex items-center gap-3 rounded-full border border-white/10 bg-black/80 px-3 py-3 shadow-2xl shadow-black/40 backdrop-blur-md transition hover:border-[#63E009]/50 hover:bg-black sm:bottom-5 sm:right-5 sm:px-3.5 sm:py-2.5"
      href="https://wa.me/628217601455"
      rel="noreferrer"
      target="_blank"
    >
      <span className="absolute -left-1 -top-1 size-3 rounded-full bg-[#63E009] shadow-[0_0_18px_rgba(99,224,9,0.85)]" />
      <span className="relative flex size-12 items-center justify-center overflow-hidden rounded-full sm:size-12">
        <Image alt="WhatsApp" src="/logo/logo_wa.webp" fill className="object-contain p-0.5" />
      </span>
      <span className="mr-1 hidden max-w-0 whitespace-nowrap text-sm font-semibold text-white opacity-0 transition-all duration-200 group-hover:max-w-[180px] group-hover:opacity-100 sm:inline">
        Chat WhatsApp
      </span>
    </a>
  );
}
