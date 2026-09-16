"use client";

import { Phone } from "lucide-react";

export function WhatsAppFloat() {
  return (
    <a
      aria-label="Chat via WhatsApp"
      className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-[calc(1rem+env(safe-area-inset-right))] z-[999] flex size-14 items-center justify-center transition hover:-translate-y-0.5 sm:bottom-6 sm:right-6 sm:size-16"
      href="https://wa.me/628217601455"
      rel="noreferrer"
      target="_blank"
    >
      <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#28d146] text-white shadow-[0_10px_24px_rgba(15,23,42,0.18)] ring-1 ring-[#20b83a]/20 sm:size-14">
        <Phone className="size-7 fill-white sm:size-8" strokeWidth={2.8} />
      </span>
    </a>
  );
}
