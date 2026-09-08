"use client";

import type { ReactNode } from "react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { useConsultModal } from "@/components/providers/consult-modal-provider";

/**
 * Header + footer, dipasang SEKALI di root layout supaya konsisten di
 * semua halaman (homepage maupun halaman detail seperti /kursus/[slug])
 * — bukan cuma di app/page.tsx. Modal konsultasinya sendiri dikelola
 * ConsultModalProvider yang membungkus ini di root layout.
 */
export function SiteChrome({ children }: { children: ReactNode }) {
  const { openConsult } = useConsultModal();

  return (
    <div className="bg-background text-foreground antialiased selection:bg-brand/15 selection:text-foreground">
      <SiteHeader onOpenConsult={openConsult} />
      {children}
      <SiteFooter />
    </div>
  );
}