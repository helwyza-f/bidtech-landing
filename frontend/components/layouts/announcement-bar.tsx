"use client";

import { useLanguage } from "@/lib/i18n";

export function AnnouncementBar() {
  const { t } = useLanguage();
  const items = t.announcement.items;
  const loopItems = [...items, ...items];

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-brand-primary-dark via-brand-primary to-brand-primary-hover text-white">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2 sm:gap-4 sm:px-5 md:px-8">
        <span className="inline-flex shrink-0 items-center rounded-full bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-brand-primary-dark sm:px-3 sm:text-[11px]">
          {t.announcement.badge}
        </span>

        <div
          className="group relative flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]"
          role="marquee"
          aria-label={items.join(" — ")}
        >
          <div className="flex w-max animate-marquee items-center gap-8 group-hover:[animation-play-state:paused] motion-reduce:animate-none">
            {loopItems.map((text, index) => (
              <span
                aria-hidden={index >= items.length}
                className="flex shrink-0 items-center gap-8 whitespace-nowrap text-xs font-medium sm:text-sm"
                key={index}
              >
                {text}
                <span aria-hidden className="size-1 shrink-0 rounded-full bg-white/50" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
