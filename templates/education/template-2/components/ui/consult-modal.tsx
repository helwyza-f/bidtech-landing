"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, X } from "lucide-react";
import { useLockScroll } from "@/lib/hooks/use-lock-scroll";

export type ConsultModalType = "konsultasi" | "tes-minat";

type ConsultModalProps = {
  open: boolean;
  type: ConsultModalType;
  onClose: () => void;
};

export function ConsultModal({ open, type, onClose }: ConsultModalProps) {
  useLockScroll(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const isInterestTest = type === "tes-minat";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="consult-modal-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-[500px] space-y-5 rounded-[28px] border border-line bg-surface p-6 shadow-2xl sm:p-8"
          >
            <button
              onClick={onClose}
              className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full border border-line text-muted transition hover:bg-background hover:text-foreground"
              aria-label="Tutup jendela"
            >
              <X size={18} />
            </button>

            <div>
              <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-brand">
                {isInterestTest ? "Asesmen minat 5 menit" : "Konsultasi karier gratis"}
              </span>
              <h3 id="consult-modal-title" className="text-2xl font-bold text-foreground">
                {isInterestTest ? "Cari tahu jalur belajarmu" : "Diskusikan rencana belajarmu"}
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-muted sm:text-sm">
                {isInterestTest
                  ? "Isi 3 pertanyaan singkat di bawah, konselor kami akan mengirimkan rekomendasi silabus yang paling sesuai."
                  : "Tinggalkan kontakmu, konselor akademik Nivora akan menghubungi dalam 1x24 jam via WhatsApp."}
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                onClose();
              }}
              className="space-y-3.5"
            >
              <div>
                <label htmlFor="consult-name" className="mb-1 block text-xs font-semibold text-foreground">
                  Nama lengkap
                </label>
                <input
                  id="consult-name"
                  type="text"
                  required
                  placeholder="Contoh: Rian Pratama"
                  className="h-11 w-full rounded-xl border border-line px-4 text-sm text-foreground placeholder:text-muted-soft focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/10"
                />
              </div>

              <div>
                <label htmlFor="consult-phone" className="mb-1 block text-xs font-semibold text-foreground">
                  Nomor WhatsApp aktif
                </label>
                <input
                  id="consult-phone"
                  type="tel"
                  required
                  placeholder="08xxxxxxxxxx"
                  className="h-11 w-full rounded-xl border border-line px-4 text-sm text-foreground placeholder:text-muted-soft focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/10"
                />
              </div>

              <div>
                <label htmlFor="consult-interest" className="mb-1 block text-xs font-semibold text-foreground">
                  Minat bidang / pertanyaan
                </label>
                <select
                  id="consult-interest"
                  className="h-11 w-full rounded-xl border border-line px-3 text-sm text-foreground focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/10"
                >
                  <option value="web">Web Programming (Next.js / Frontend)</option>
                  <option value="design">UI/UX & Product Design (Figma)</option>
                  <option value="data">Data Analytics & SQL</option>
                  <option value="excel">Excel & Otomasi Kerja</option>
                  <option value="bootcamp">Bootcamp Intensif 12 Minggu</option>
                  <option value="beasiswa">Program Beasiswa 70%</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-pill bg-brand text-sm font-semibold text-white shadow-md transition hover:bg-brand-dark"
                >
                  <span>Kirim & hubungkan ke konselor</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </form>

            <p className="text-center text-[10px] text-muted-soft">
              Privasi Anda terjamin. Kami tidak pernah mengirim spam komersial.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
