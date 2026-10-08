"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { MouseEvent, ReactNode } from "react";

import { getSectionHref, isHomePath, scrollToSection } from "@/lib/section-navigation";

type SmartNavLinkProps = {
  children: ReactNode;
  className?: string;
  href: string;
  onNavigate?: () => void;
};

export function SmartNavLink({ children, className, href, onNavigate }: SmartNavLinkProps) {
  const pathname = usePathname();
  const router = useRouter();
  const isHashLink = href.startsWith("#");

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onNavigate?.();

    const normalizePath = (p: string | null) => (p || "").replace(/\/$/, "") || "/";
    const currentPath = normalizePath(pathname);
    const targetPath = normalizePath(href);

    // 1. Jika mengklik menu link yang sama dengan halaman yang sedang aktif saat ini:
    // (misal di Beranda klik logo/Beranda, di /template-website klik Cari Design, di /tutorial klik Tutorial, dll)
    if (!isHashLink && currentPath === targetPath) {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      if (window.location.hash) {
        window.history.pushState(null, "", href);
        window.dispatchEvent(new HashChangeEvent("hashchange"));
      }
      return;
    }

    if (!isHashLink) {
      // Pindah ke rute halaman lain: pastikan posisi selalu kembali ke paling atas
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }

    event.preventDefault();

    if (!isHomePath(pathname)) {
      router.push(getSectionHref(href));
      return;
    }

    scrollToSection(href, "smooth");
  };

  return (
    <Link className={className} href={isHashLink && !isHomePath(pathname) ? getSectionHref(href) : href} onClick={handleClick}>
      {children}
    </Link>
  );
}
