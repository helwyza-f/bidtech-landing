"use client";

import { DynamicNavbar } from "@/components/ui/dynamic-navbar";
import { ScrollSmoother } from "gsap/ScrollSmoother";

export function Navbar() {
  const handleOrderClick = () => {
    const el = document.getElementById("menu") || document.getElementById("dishes");
    if (!el) return;
    const smoother = ScrollSmoother.get();
    if (smoother) {
      smoother.scrollTo(el, true, "top 80px");
    } else {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <DynamicNavbar
      brand="Deny Restaurant"
      items={[
        { label: "Categories", href: "#categories" },
        { label: "Dishes", href: "#dishes" },
        { label: "Menu", href: "#menu" },
        { label: "Story", href: "#story" },
      ]}
      ctaLabel="Order Now"
      onCtaClick={handleOrderClick}
    />
  );
}

