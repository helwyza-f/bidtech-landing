"use client";

import { useLanguage } from "@/lib/i18n";

export function AnnouncementBar() {
  const { t } = useLanguage();
  const items = t.announcement.items;
  const loopItems = [...items, ...items, ...items];

  return (
    <div className="relative overflow-hidden bg-[#4FB307] text-white shadow-xs">
      <div className="mx-auto flex max-w-7xl items-center gap-2.5 px-3 py-1.5 sm:gap-3.5 sm:px-5 sm:py-2 md:px-8">
        {/* Badge: Orange Pill */}
        <span className="inline-flex shrink-0 items-center rounded-full bg-[#FB923C] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-xs sm:text-[11px]">
          {t.announcement.badge}
        </span>

        {/* Marquee Content */}
        <div
          className="group relative flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_3%,black_97%,transparent)]"
          role="marquee"
          aria-label={items.join(" • ")}
        >
          <div className="flex w-max animate-marquee items-center gap-6 group-hover:[animation-play-state:paused] motion-reduce:animate-none">
            {loopItems.map((text, index) => {
              const isContact = text.includes("0821-7601-455");
              return (
                <span
                  aria-hidden={index >= items.length}
                  className="flex shrink-0 items-center gap-6 whitespace-nowrap text-xs font-semibold sm:text-[13px] text-white tracking-wide"
                  key={index}
                >
                  {isContact ? (
                    <a
                      href="https://wa.me/628217601455?text=Halo%20Bidtech%2C%20saya%20tertarik%20dengan%20promo%20pembuatan%20website%20%26%20aplikasi."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline flex items-center gap-1.5 cursor-pointer hover:text-amber-100 transition-colors"
                    >
                      {text}
                    </a>
                  ) : (
                    <span>{text}</span>
                  )}
                  <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-white/70" />
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
