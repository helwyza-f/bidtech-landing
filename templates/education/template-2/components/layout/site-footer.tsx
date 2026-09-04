"use client";

import { useRef } from "react";
import { MessageCircle } from "lucide-react";
import { site } from "@/lib/data/site";
import { footerNav } from "@/lib/data/navigation";
import { useScrollReveal } from "@/lib/hooks/use-scroll-reveal";
import { useReducedMotion } from "motion/react";

export function SiteFooter() {
  const rootRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  useScrollReveal(rootRef, {
    targets: ".footer-col",
    y: 24,
    stagger: 0.08,
    start: "top 90%",
    disabled: !!reduce,
  });

  return (
    <footer ref={rootRef} className="bg-ink text-white">
      <div className="mx-auto w-full max-w-shell px-4 py-16 sm:px-6 md:py-20">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="footer-col space-y-3">
            <a href="#" className="flex items-center gap-2.5">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-white text-lg font-bold text-ink">
                N
              </div>
              <span className="text-base font-extrabold tracking-tight text-white">
                Nivora<span className="text-signal">.</span> Academy
              </span>
            </a>
            <p className="max-w-[34ch] text-sm leading-relaxed text-white/70">
              Belajar skill digital yang relevan dengan kebutuhan industri sesungguhnya.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {site.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-xs font-semibold text-white/70 transition hover:border-white/40 hover:text-white"
                >
                  {s.label.slice(0, 2)}
                </a>
              ))}
            </div>
          </div>

          <div className="footer-col space-y-3">
            <h3 className="text-sm font-semibold text-white">Program</h3>
            <ul className="space-y-2 text-sm text-white/62">
              {footerNav.program.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="transition hover:text-white">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col space-y-3">
            <h3 className="text-sm font-semibold text-white">Perusahaan</h3>
            <ul className="space-y-2 text-sm text-white/62">
              {footerNav.perusahaan.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="transition hover:text-white">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col space-y-3">
            <h3 className="text-sm font-semibold text-white">Hubungi kami</h3>
            <ul className="space-y-2 text-sm text-white/62">
              <li>
                <a
                  href={site.contact.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 transition hover:text-white"
                >
                  <MessageCircle size={14} className="text-brand" />
                  <span>WhatsApp layanan siswa</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${site.contact.email}`} className="transition hover:text-white">
                  {site.contact.email}
                </a>
              </li>
              <li className="pt-1 text-xs text-white/40">{site.contact.cities}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-meta text-white/45 sm:flex-row">
          <p>© 2026 Nivora Academy. Seluruh hak cipta dilindungi undang-undang.</p>
          <div className="flex items-center gap-6">
            {footerNav.kontak.map((item) => (
              <a key={item.label} href={item.href} className="transition hover:text-white">
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
