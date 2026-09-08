"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { ConsultModal, type ConsultModalType } from "@/components/ui/consult-modal";

type ConsultModalContextValue = {
  openConsult: () => void;
  openInterestTest: () => void;
};

const ConsultModalContext = createContext<ConsultModalContextValue | null>(null);

/**
 * Satu sumber state untuk modal konsultasi/tes minat, dipakai bersama oleh
 * SiteHeader (lewat SiteChrome, terpasang global di semua halaman) dan
 * section-section homepage (Hero, CTA) yang juga perlu memicu modal yang
 * sama — supaya tidak ada dua instance modal terpisah yang tidak sinkron.
 */
export function ConsultModalProvider({ children }: { children: ReactNode }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<ConsultModalType>("konsultasi");

  const openConsult = () => {
    setModalType("konsultasi");
    setModalOpen(true);
  };

  const openInterestTest = () => {
    setModalType("tes-minat");
    setModalOpen(true);
  };

  return (
    <ConsultModalContext.Provider value={{ openConsult, openInterestTest }}>
      {children}
      <ConsultModal open={modalOpen} type={modalType} onClose={() => setModalOpen(false)} />
    </ConsultModalContext.Provider>
  );
}

export function useConsultModal() {
  const ctx = useContext(ConsultModalContext);
  if (!ctx) {
    throw new Error("useConsultModal harus dipakai di dalam <ConsultModalProvider>");
  }
  return ctx;
}