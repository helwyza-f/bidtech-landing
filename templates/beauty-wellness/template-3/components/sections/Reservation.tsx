"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteConfig } from "@/data/site";
import { haircutsData } from "@/data/haircuts";

export function Reservation() {
  const [fullName, setFullName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [selectedCutKey, setSelectedCutKey] = useState("twoblock");
  const [bookDate, setBookDate] = useState("");
  const [clientNote, setClientNote] = useState("");
  const [todayStr, setTodayStr] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");

  const sectionRef = useRef<HTMLElement>(null);
  const infoColRef = useRef<HTMLDivElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setTodayStr(today);
    setBookDate(today);

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Studio Info Left Column entrance
      if (infoColRef.current) {
        gsap.fromTo(
          infoColRef.current.children,
          { x: -20, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.75,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: infoColRef.current,
              start: "top 90%",
              once: true,
            },
          }
        );
      }

      // 2. Form Card Right Column entrance
      if (formCardRef.current) {
        gsap.fromTo(
          formCardRef.current,
          { x: 20, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: formCardRef.current,
              start: "top 90%",
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    // Listen to custom cut selection event from ServicesCatalogue
    const handleCutSelected = (e: Event) => {
      const customEvent = e as CustomEvent<{ cutKey: string }>;
      if (customEvent.detail?.cutKey) {
        setSelectedCutKey(customEvent.detail.cutKey);
      }
    };

    window.addEventListener("agak-rapi-select-cut", handleCutSelected);
    return () => {
      ctx.revert();
      window.removeEventListener("agak-rapi-select-cut", handleCutSelected);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cut = haircutsData.find((c) => c.key === selectedCutKey);
    const cutName = cut ? `${cut.name} (${cut.priceFormatted})` : selectedCutKey;

    setConfirmationMessage(
      `Terima kasih, ${fullName}! Jadwal ${cutName} pada tanggal ${bookDate} telah dicatat. Tim kami akan segera menghubungi nomor ${phoneNum} via WhatsApp untuk konfirmasi slot.`
    );
    setIsSubmitted(true);
  };

  return (
    <section
      ref={sectionRef}
      id="reservasi"
      className="py-20 md:py-28 border-b transition-colors"
      style={{ borderColor: "var(--border-color)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Studio Information Left Column */}
          <div ref={infoColRef} className="lg:col-span-5 space-y-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-zinc-500">
                // RESERVASI LANGSUNG
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold mt-2">
                Hubungi kami // Reservasi & konsultasi.
              </h2>
            </div>

            <div
              className="p-6 rounded-[4px] border space-y-4 text-xs font-mono transition-colors"
              style={{
                backgroundColor: "var(--bg-surface)",
                borderColor: "var(--border-color)",
              }}
            >
              <div>
                <span className="text-zinc-500 block mb-1">LOKASI STUDIO</span>
                <p className="font-bold text-sm font-sans">{siteConfig.location.address}</p>
                <span className="text-zinc-400 text-[11px] block mt-0.5">
                  {siteConfig.location.notes}
                </span>
              </div>

              <div className="border-t pt-3" style={{ borderColor: "var(--border-color)" }}>
                <span className="text-zinc-500 block mb-1">JAM OPERASIONAL</span>
                <div className="flex justify-between">
                  <span>SENIN – JUMAT</span>
                  <span className="font-semibold">{siteConfig.schedule.weekdays}</span>
                </div>
                <div className="flex justify-between mt-1">
                  <span>SABTU – MINGGU</span>
                  <span className="font-semibold">{siteConfig.schedule.weekends}</span>
                </div>
              </div>

              <div className="border-t pt-3" style={{ borderColor: "var(--border-color)" }}>
                <span className="text-zinc-500 block mb-1">KONTAK CEPAT WHATSAPP</span>
                <p className="font-bold text-sm">{siteConfig.contact.phone}</p>
              </div>
            </div>
          </div>

          {/* Reservation Form Card Right Column */}
          <div
            ref={formCardRef}
            className="lg:col-span-7 p-6 sm:p-8 rounded-[4px] border shadow-sm transition-colors will-change-transform"
            style={{
              backgroundColor: "var(--bg-surface)",
              borderColor: "var(--border-color)",
            }}
          >
            <div
              className="flex items-center justify-between pb-4 border-b mb-6 text-xs font-mono"
              style={{ borderColor: "var(--border-color)" }}
            >
              <span className="font-bold">// FORMULIR JADWAL KUNJUNGAN</span>
              <span className="text-zinc-500">KONFIRMASI OTOMATIS</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="fullName"
                    className="block font-mono text-xs text-zinc-500 uppercase mb-1.5"
                  >
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Contoh: Arya Baskara"
                    className="w-full px-3.5 py-2.5 rounded-[2px] border text-sm focus:outline-none focus:border-lime-400 transition-colors"
                    style={{
                      backgroundColor: "var(--bg-base)",
                      borderColor: "var(--border-color)",
                      color: "var(--text-main)",
                    }}
                  />
                </div>
                <div>
                  <label
                    htmlFor="phoneNum"
                    className="block font-mono text-xs text-zinc-500 uppercase mb-1.5"
                  >
                    Nomor WhatsApp
                  </label>
                  <input
                    type="tel"
                    id="phoneNum"
                    required
                    value={phoneNum}
                    onChange={(e) => setPhoneNum(e.target.value)}
                    placeholder="0812-xxxx-xxxx"
                    className="w-full px-3.5 py-2.5 rounded-[2px] border text-sm focus:outline-none focus:border-lime-400 transition-colors"
                    style={{
                      backgroundColor: "var(--bg-base)",
                      borderColor: "var(--border-color)",
                      color: "var(--text-main)",
                    }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="serviceSelect"
                    className="block font-mono text-xs text-zinc-500 uppercase mb-1.5"
                  >
                    Pilihan Potongan
                  </label>
                  <select
                    id="serviceSelect"
                    value={selectedCutKey}
                    onChange={(e) => setSelectedCutKey(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-[2px] border text-sm focus:outline-none focus:border-lime-400 transition-colors"
                    style={{
                      backgroundColor: "var(--bg-base)",
                      borderColor: "var(--border-color)",
                      color: "var(--text-main)",
                    }}
                  >
                    {haircutsData.map((cut) => (
                      <option key={cut.key} value={cut.key}>
                        {cut.name} — {cut.priceFormatted}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="bookDate"
                    className="block font-mono text-xs text-zinc-500 uppercase mb-1.5"
                  >
                    Pilihan Tanggal
                  </label>
                  <input
                    type="date"
                    id="bookDate"
                    required
                    min={todayStr}
                    value={bookDate}
                    onChange={(e) => setBookDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-[2px] border text-sm focus:outline-none focus:border-lime-400 transition-colors"
                    style={{
                      backgroundColor: "var(--bg-base)",
                      borderColor: "var(--border-color)",
                      color: "var(--text-main)",
                    }}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="clientNote"
                  className="block font-mono text-xs text-zinc-500 uppercase mb-1.5"
                >
                  Catatan Khusus Rambut (Opsional)
                </label>
                <textarea
                  id="clientNote"
                  rows={3}
                  value={clientNote}
                  onChange={(e) => setClientNote(e.target.value)}
                  placeholder="Contoh: Ada pusaran rambut ganda di belakang, mohon disesuaikan."
                  className="w-full px-3.5 py-2.5 rounded-[2px] border text-sm focus:outline-none focus:border-lime-400 transition-colors"
                  style={{
                    backgroundColor: "var(--bg-base)",
                    borderColor: "var(--border-color)",
                    color: "var(--text-main)",
                  }}
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-[2px] font-mono text-xs uppercase font-bold tracking-widest transition-all duration-200 hover:opacity-90 active:scale-[0.99]"
                style={{
                  backgroundColor: "var(--text-main)",
                  color: "var(--bg-base)",
                }}
              >
                KONFIRMASI JADWAL PRESISE →
              </button>

              {/* In-Page Confirmation Toast Box */}
              {isSubmitted && (
                <div
                  className="p-4 rounded-[4px] border mt-3 text-xs font-mono animate-fade-in"
                  style={{
                    backgroundColor: "var(--bg-accent)",
                    borderColor: "var(--border-color)",
                  }}
                >
                  <div
                    className="flex items-center gap-2 font-bold mb-1"
                    style={{ color: "var(--accent-lime-fg)" }}
                  >
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: "var(--accent-lime)" }}
                    />
                    <span>JADWAL BERHASIL TERCATAT</span>
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed">
                    {confirmationMessage}
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
