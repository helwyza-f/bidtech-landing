"use client";

export const HOME_SECTION_IDS = ["hero", "services", "templates", "portfolio", "contact"] as const;

const HEADER_OFFSET = 104;

export function isHomePath(pathname: string | null) {
  return pathname === "/" || pathname === "";
}

export function getSectionHref(hash: string) {
  return hash.startsWith("#") ? `/${hash}` : hash;
}

export function scrollToSection(hash: string, behavior: ScrollBehavior = "auto") {
  if (typeof window === "undefined" || !hash.startsWith("#")) return false;

  const target = document.querySelector<HTMLElement>(hash);
  if (!target) return false;

  const top = target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;

  window.scrollTo({
    top: Math.max(0, top),
    behavior,
  });

  const nextUrl = `${window.location.pathname}${hash}`;
  if (window.location.hash !== hash) {
    window.history.pushState(null, "", nextUrl);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  }

  return true;
}

export function getActiveHomeSection() {
  if (typeof window === "undefined") return "hero";

  const hashSection = window.location.hash.replace("#", "");
  if (HOME_SECTION_IDS.includes(hashSection as (typeof HOME_SECTION_IDS)[number])) {
    const target = document.getElementById(hashSection);
    const rect = target?.getBoundingClientRect();

    if (rect && Math.abs(rect.top - HEADER_OFFSET) < 48) {
      return hashSection as (typeof HOME_SECTION_IDS)[number];
    }
  }

  const checkpoint = window.innerHeight * 0.28 + HEADER_OFFSET;
  let activeSection: (typeof HOME_SECTION_IDS)[number] = "hero";

  for (const id of HOME_SECTION_IDS) {
    const element = document.getElementById(id);
    if (!element) continue;

    const rect = element.getBoundingClientRect();
    if (rect.top <= checkpoint) {
      activeSection = id;
    }
  }

  return activeSection;
}
