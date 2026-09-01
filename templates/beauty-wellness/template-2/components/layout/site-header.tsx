"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { officialStores } from "../../data/stores";
import { SearchOverlay } from "../search/search-overlay";
import { ArrowUpRight, Menu, Search, X } from "lucide-react";

export function SiteHeader() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [storesOpen, setStoresOpen] = useState(false);
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 72);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nav = [
    ["Products", "/products"],
    ["Skin Concerns", "/skin-concerns"],
    ["Ingredients", "/ingredients"],
    ["Skin Notes", "/skin-notes"],
  ] as const;

  return (
    <>
      <div className="announcement">Thoughtful skincare for everyday consistency.</div>
      <header className={`siteHeader ${compact ? "is-compact" : ""}`}>
        <nav className="siteHeader__inner" aria-label="Primary navigation">
          <div className="siteHeader__left desktopNav">
            {nav.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
          </div>

          <button
            className="menuButton mobileOnly items-center"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={18} strokeWidth={3} />
          </button>

          <Link className="wordmark" href="/" aria-label="Chulla home">CHULLA</Link>

          <div className="siteHeader__right">
            <button
              className="headerTextButton searchTrigger flex gap-2 flex-row-reverse items-center"
              onClick={() => setSearchOpen(true)}
              aria-label="Search products"
            >
              <Search size={16} strokeWidth={1.5} className="max-sm:hidden"/>
              <span className="searchTrigger__label">Search</span>
            </button>
            <Link className="desktopNav" href="/our-approach">Our Approach</Link>
            <div className="storesPopoverWrap desktopNav">
              <button className="headerTextButton flex flex-row gap-2 items-center" onClick={() => setStoresOpen((value) => !value)} aria-expanded={storesOpen}>
                <span>Official Stores</span>
                <ArrowUpRight size={14} strokeWidth={1.5} />
              </button>
              {storesOpen && (
                <div className="storesPopover">
                  {Object.values(officialStores).map((store) => (
                    <a key={store.label} href={store.href} target="_blank" rel="noopener noreferrer" className="flex flex-row gap-2">
                      {store.label}
                      <ArrowUpRight size={14} strokeWidth={1.5} />
                    </a>
                  ))}
                  <small>You’ll leave Chulla to check availability, price, promotions, and shipping.</small>
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>

      {menuOpen && (
        <div className="mobileMenu" role="dialog" aria-modal="true" aria-label="Mobile menu">
          <div className="mobileMenu__top">
            <span className="wordmark">CHULLA</span>
            <button className="iconButton flex flex-row items-center gap-2" onClick={() => setMenuOpen(false)}>
              <span>Close</span>
              <X size={16} strokeWidth={1.5} />
            </button>
          </div>
          <div className="mobileMenu__links">
            {nav.map(([label, href]) => <Link key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</Link>)}
            <Link href="/our-approach" onClick={() => setMenuOpen(false)}>Our Approach</Link>
          </div>
          <div className="mobileMenu__stores">
            <span className="eyebrow">Official stores</span>
            {Object.values(officialStores).map((store) => (
              <a key={store.label} href={store.href} target="_blank" rel="noopener noreferrer">
                {store.label}
                <ArrowUpRight
                  size={16}
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </a>
            ))}
          </div>
        </div>
      )}

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
