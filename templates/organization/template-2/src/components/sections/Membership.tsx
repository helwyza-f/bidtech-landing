'use client';

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { colors } from "@lib/color";
import { useLanguage } from "@lib/LanguageContext";
import { CONTACT } from "@constants/index";

const PEEK = 76;

export default function MembershipSection() {
  const [activePlan, setActivePlan] = useState(1);
  const [activeBenefit, setActiveBenefit] = useState(0);
  const { t, language } = useLanguage();

  // Keep the card we're leaving layered above the rest *only while it slides
  // back* into the stack (prevents the mid-animation "jump"). It must drop back
  // afterwards, otherwise it stays on top and buries the card behind it.
  const [leavingPlan, setLeavingPlan] = useState<number | null>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const selectPlan = (index: number) => {
    if (index === activePlan) return;
    setLeavingPlan(activePlan);
    setActivePlan(index);
    clearTimeout(leaveTimer.current);
    leaveTimer.current = setTimeout(() => setLeavingPlan(null), 600);
  };
  useEffect(() => () => clearTimeout(leaveTimer.current), []);

  const MEMBERSHIP_PLANS = [
    {
      name: language === "id" ? "Sahabat Relawan" : "Community Volunteer",
      shortName: language === "id" ? "Relawan" : "Volunteer",
      fee: language === "id" ? "Gratis / Dedikasi Waktu" : "Free / Time Commitment",
      validity: language === "id" ? "Terbuka & Fleksibel" : "Open & Flexible",
      description: language === "id"
        ? "Terlibat langsung dalam aksi kemanusiaan lapangan, posko sembako, mengajar adik-adik asuh, atau tim medis keliling."
        : "Directly engage in field humanitarian responses, food pantry distribution, youth tutoring, or mobile clinic teams.",
      audience: language === "id" ? "Mahasiswa, pemuda, & masyarakat umum" : "Students, youth, & active citizens",
      cta: language === "id" ? "Daftar Relawan" : "Join as Volunteer",
      accent: "#a5dded",
    },
    {
      name: language === "id" ? "Donatur Peduli" : "Caring Supporter",
      shortName: language === "id" ? "Donatur" : "Supporter",
      fee: language === "id" ? "Mulai Rp 100.000 / bln" : "From IDR 100,000 / mo",
      validity: language === "id" ? "Rutin Bulanan" : "Monthly Recurring",
      description: language === "id"
        ? "Mendanai beasiswa pendidikan anak yatim dhuafa, modal usaha UMKM desa, dan operasional ambulans gratis secara berkelanjutan."
        : "Sustain educational scholarships for vulnerable children, rural micro-grants, and free community ambulance operations.",
      audience: language === "id" ? "Pribadi dermawan & keluarga peduli" : "Individual donors & caring families",
      cta: language === "id" ? "Mulai Berdonasi" : "Start Donating",
      featured: true,
      accent: "#053f5c",
    },
    {
      name: language === "id" ? "Mitra Korporasi & CSR" : "Corporate & CSR Partner",
      shortName: language === "id" ? "Mitra CSR" : "CSR Partner",
      fee: language === "id" ? "Sinergi Program Kemitraan" : "Custom Program Sponsorship",
      validity: language === "id" ? "Per Proyek / Tahunan" : "Per Project / Annual",
      description: language === "id"
        ? "Kolaborasi penyaluran dana CSR terstruktur dengan pelaporan Social Return on Investment (SROI) dan publikasi media resmi."
        : "Structured corporate social responsibility execution complete with SROI impact audits and official public media visibility.",
      audience: language === "id" ? "Perusahaan, BUMN, & Yayasan Filantropi" : "Corporations, SOEs, & Philanthropies",
      cta: language === "id" ? "Konsultasi CSR" : "Inquire Partnership",
      accent: "#e6f7fb",
    },
  ];

  const MEMBERSHIP_BENEFITS = [
    {
      benefit: language === "id" ? "Laporan Akuntabilitas & Transparansi Rutin" : "Regular Accountability & Impact Audits",
      value: language === "id"
        ? "Menerima laporan berkala penyaluran dana donasi dan dokumentasi foto/video penerima manfaat langsung."
        : "Receive periodic donation disbursement statements and direct beneficiary photo/video documentation.",
      type: language === "id" ? "Semua Donatur & Mitra" : "All Donors & Partners",
      note: language === "id" ? "Dikirim via WhatsApp dan email resmi." : "Delivered via official WhatsApp and email.",
    },
    {
      benefit: language === "id" ? "Sertifikat Dedikasi Sosial & Piagam Apresiasi" : "Official Humanitarian Service Credential",
      value: language === "id"
        ? "Piagam resmi penghargaan kerelawanan dan dedikasi kemanusiaan dari Yayasan Bhakti Nusantara."
        : "Official certificate of volunteer recognition and social service issued by Yayasan Bhakti Nusantara.",
      type: language === "id" ? "Relawan & Mitra Donatur" : "Volunteers & Partners",
      note: language === "id" ? "Dapat digunakan untuk portofolio sosial/akademik." : "Verifiable for social & academic portfolios.",
    },
    {
      benefit: language === "id" ? "Undangan Temu Akbar & Jambore Relawan" : "Exclusive Invitation to Annual Volunteer Jamboree",
      value: language === "id"
        ? "Akses ke jambore tahunan, gathering silaturahmi akbar, dan workshop pembekalan tanggap darurat."
        : "Access to annual volunteer gatherings, community friendship galas, and emergency response briefings.",
      type: language === "id" ? "Semua Relawan Terdaftar" : "All Registered Volunteers",
      note: language === "id" ? "Diadakan serentak di berbagai regional." : "Hosted concurrently across multiple regions.",
    },
    {
      benefit: language === "id" ? "Hak Kunjungan Lapangan & Penyerahan Bantuan" : "Field Visit & Direct Handover Privileges",
      value: language === "id"
        ? "Kesempatan mendampingi tim relawan langsung ke lokasi binaan untuk menyerahkan bantuan sosial."
        : "Opportunity to accompany frontline relief teams to assisted villages and personally hand over aid.",
      type: language === "id" ? "Donatur & Mitra Korporasi" : "Supporters & CSR Partners",
      note: language === "id" ? "Didampingi tim koordinator lapangan." : "Escorted by certified field coordinators.",
    },
    {
      benefit: language === "id" ? "Eksklusif: Laporan Dampak Sosial CSR & Media Branding" : "Exclusive: SROI Impact Audit & CSR Co-Branding",
      value: language === "id"
        ? "Dokumentasi komprehensif, publikasi siaran pers, dan laporan audit dampak sosial untuk kepatuhan ESG korporasi."
        : "Comprehensive CSR impact documentation, press release distribution, and ESG social compliance reporting.",
      type: language === "id" ? "Mitra Korporasi & CSR" : "Corporate & CSR Partners",
      note: language === "id" ? "Dikelola penuh oleh divisi Humas & Kemitraan." : "Managed end-to-end by PR & Partnership division.",
      featured: true,
    },
  ];

  const PLAN_HIGHLIGHTS = [
    language === "id" ? "Sertifikat Resmi & Lencana Sahabat Bhakti Nusantara" : "Official Credential & Humanitarian Service Badge",
    language === "id" ? "Laporan Audit Akuntabilitas Donasi Berkala" : "Audited Financial & Program Transparency Reports",
    language === "id" ? "Undangan Khusus Jambore & Aksi Kemanusiaan Nasional" : "Exclusive Invitation to National Outreach Jamborees",
  ];

  const selectedPlan = MEMBERSHIP_PLANS[activePlan];

  const prevPlan = () =>
    selectPlan((activePlan - 1 + MEMBERSHIP_PLANS.length) % MEMBERSHIP_PLANS.length);
  const nextPlan = () =>
    selectPlan((activePlan + 1) % MEMBERSHIP_PLANS.length);

  const buildWaLink = (plan: (typeof MEMBERSHIP_PLANS)[number]) => {
    const message =
      language === "id"
        ? `Halo Sekretariat Yayasan Bhakti Nusantara, saya ingin berpartisipasi dan bergabung sebagai *${plan.name}* (${plan.fee}).\n\nMohon informasi panduan dan formulir pendaftarannya. Terima kasih.`
        : `Hello Secretariat of Yayasan Bhakti Nusantara, I would like to get involved as *${plan.name}* (${plan.fee}).\n\nCould you share the participation guidelines and registration form? Thank you.`;
    return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;
  };

  const nextBenefit = () => {
    setActiveBenefit((prev) => (prev + 1) % MEMBERSHIP_BENEFITS.length);
  };

  const prevBenefit = () => {
    setActiveBenefit((prev) => (prev - 1 + MEMBERSHIP_BENEFITS.length) % MEMBERSHIP_BENEFITS.length);
  };

  return (
    <section id="membership" className="py-16 md:py-24 px-4 md:px-8 bg-[#eef6f8]">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[0.82fr_1.18fr] gap-8 md:gap-12 mb-12">
          <div className="lg:pt-6">
            <h2 className="text-xs font-bold tracking-widest uppercase mb-4 inline-flex rounded-full px-4 py-2 bg-white border border-slate-200" style={{ color: colors.primary }}>
              {t("membership.label")}
            </h2>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-snug text-black mb-5">
              {t("membership.heading")}
            </h3>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              {t("membership.desc")}
            </p>
            <div className="mt-7 grid grid-cols-3 gap-3 max-w-lg">
              <div className="rounded-xl bg-white p-4 border border-slate-200">
                <p className="text-2xl font-bold" style={{ color: colors.primary }}>0+</p>
                <p className="text-xs text-gray-500">{t("membership.stats.members")}</p>
              </div>
              <div className="rounded-xl bg-white p-4 border border-slate-200">
                <p className="text-2xl font-bold" style={{ color: colors.primary }}>0</p>
                <p className="text-xs text-gray-500">{t("membership.stats.countries")}</p>
              </div>
              <div className="rounded-xl bg-white p-4 border border-slate-200">
                <p className="text-2xl font-bold" style={{ color: colors.primary }}>1 thn</p>
                <p className="text-xs text-gray-500">{t("membership.stats.validity")}</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-[1fr_0.9fr] gap-5 md:gap-6 items-stretch">
            <div className="md:hidden">
              <div className="grid grid-cols-3 gap-2 rounded-xl bg-white p-2 border border-gray-200 shadow-sm">
                {MEMBERSHIP_PLANS.map((plan, index) => {
                  const isActive = activePlan === index;

                  return (
                    <button
                      type="button"
                      key={plan.name}
                      aria-pressed={isActive}
                      onClick={() => setActivePlan(index)}
                      className={`rounded-lg px-2 py-3 text-xs font-bold leading-tight transition-all ${
                        isActive ? "text-white shadow-md" : "text-gray-600"
                      }`}
                      style={{
                        backgroundColor: isActive ? colors.primary : "#f8fafc",
                      }}
                    >
                      {plan.shortName}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="hidden md:flex md:flex-col">
             <div className="relative min-h-[520px]">
              {MEMBERSHIP_PLANS.map((plan, index) => {
                const isActive = activePlan === index;
                // Non-active cards fan out above, each keeping a clickable header strip;
                // the active card drops below them so its body never covers the others.
                const nonActiveRank = index < activePlan ? index : index - 1;
                const stackY = isActive
                  ? (MEMBERSHIP_PLANS.length - 1) * PEEK
                  : nonActiveRank * PEEK;

                return (
                  <button
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => selectPlan(index)}
                    key={plan.name}
                    className="w-full text-left rounded-2xl p-6 border flex flex-col min-h-[270px] transition-[transform,background-color,border-color,box-shadow] duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform md:absolute md:inset-x-0 md:[transform:translateY(var(--stack-y))_rotate(var(--stack-rotate))_scale(var(--stack-scale))] focus:outline-none focus:ring-2 focus:ring-offset-2 mb-5 md:mb-0"
                    style={{
                      backgroundColor: isActive ? colors.primary : "#ffffff",
                      borderColor: isActive ? colors.primary : "#e5e7eb",
                      boxShadow: isActive ? "0 28px 60px rgba(5, 63, 92, 0.28)" : "0 10px 28px rgba(15, 23, 42, 0.08)",
                      zIndex: isActive ? 30 : leavingPlan === index ? 25 : 10 + nonActiveRank,
                      transformOrigin: "center top",
                      "--tw-ring-color": colors.secondary,
                      "--stack-y": `${stackY}px`,
                      "--stack-rotate": `${isActive ? 0 : (nonActiveRank - 1) * 2}deg`,
                      "--stack-scale": isActive ? 1 : 0.96,
                    } as CSSProperties & Record<string, string | number>}
                  >
                    <div className="flex items-start justify-between gap-4 mb-8">
                      <div>
                        <p className={`text-sm font-semibold mb-3 transition-colors duration-500 ${isActive ? "text-white/75" : "text-gray-500"}`}>
                          {plan.audience}
                        </p>
                        <h4 className={`text-xl md:text-2xl font-bold leading-tight transition-colors duration-500 ${isActive ? "text-white" : "text-black"}`}>
                          {plan.name}
                        </h4>
                      </div>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors duration-500 ${isActive ? "bg-white/15 text-white" : "text-gray-500"}`}
                      >
                        {isActive ? (language === "id" ? "Terpilih" : "Selected") : (language === "id" ? "Lihat" : "View")}
                      </span>
                    </div>

                    <div className="mt-auto">
                      <p className={`text-2xl md:text-3xl font-bold mb-4 transition-colors duration-500 ${isActive ? "text-white" : "text-black"}`}>
                        {plan.fee}
                      </p>
                      <p className={`text-sm leading-relaxed transition-colors duration-500 ${isActive ? "text-white/80" : "text-gray-600"}`}>
                        {plan.description}
                      </p>
                      <p className={`mt-5 text-sm font-bold text-white transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-0"}`}>
                        {language === "id" ? "Ketuk untuk melihat benefit" : "Tap to explore benefits"}
                      </p>
                    </div>
                  </button>
                );
              })}
             </div>

             {/* Prev / next control for the card stack */}
             <div className="flex items-center justify-center gap-5 mt-1">
               <button
                 type="button"
                 onClick={prevPlan}
                 aria-label={language === "id" ? "Membership sebelumnya" : "Previous membership"}
                 className="h-10 w-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 shadow-sm transition-all hover:border-slate-300 hover:text-black hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer"
                 style={{ "--tw-ring-color": colors.secondary } as CSSProperties}
               >
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                 </svg>
               </button>

               <div className="flex gap-2">
                 {MEMBERSHIP_PLANS.map((plan, index) => (
                   <button
                     type="button"
                     key={plan.name}
                     onClick={() => selectPlan(index)}
                     aria-label={plan.shortName}
                     className="h-2 rounded-full transition-all duration-300"
                     style={{
                       width: activePlan === index ? "1.5rem" : "0.5rem",
                       backgroundColor: activePlan === index ? colors.primary : "#cbd5e1",
                     }}
                   />
                 ))}
               </div>

               <button
                 type="button"
                 onClick={nextPlan}
                 aria-label={language === "id" ? "Membership berikutnya" : "Next membership"}
                 className="h-10 w-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 shadow-sm transition-all hover:border-slate-300 hover:text-black hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer"
                 style={{ "--tw-ring-color": colors.secondary } as CSSProperties}
               >
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                 </svg>
               </button>
             </div>
            </div>

            <article
              className="rounded-2xl border p-6 md:p-7 min-h-[360px] flex flex-col justify-between shadow-xl shadow-slate-200/70"
              style={{ backgroundColor: "#ffffff", borderColor: "#d7e2e8" }}
            >
              <div>
                <p className="text-xs md:text-sm font-bold uppercase tracking-widest mb-3" style={{ color: colors.primary }}>
                  {t("membership.selectedLabel")}
                </p>
                <h4 className="text-2xl md:text-2xl font-bold text-black mb-4">{selectedPlan.name}</h4>
                <p className="text-3xl md:text-3xl font-bold text-black mb-5 leading-tight">{selectedPlan.fee}</p>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">{selectedPlan.description}</p>

                <div className="mt-6 space-y-3">
                  {PLAN_HIGHLIGHTS.map((highlight) => (
                    <div key={highlight} className="flex items-center gap-3 text-sm font-medium text-gray-700">
                      <span
                        className="h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold bg-slate-100"
                        style={{ color: colors.primary }}
                      >
                        +
                      </span>
                      {highlight}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 grid gap-3">
                <div
                  className={`rounded-xl p-4 border ${
                    selectedPlan.featured ? "border-transparent" : "bg-gray-50 border-gray-100"
                  }`}
                  style={{
                    backgroundColor: selectedPlan.featured ? colors.primary : undefined,
                  }}
                >
                  <p
                    className="text-xs font-bold uppercase tracking-widest mb-1"
                    style={{ color: selectedPlan.featured ? "#ffffff" : colors.primary }}
                  >
                    {t("membership.stats.validity")}
                  </p>
                  <p className={`text-lg font-bold ${selectedPlan.featured ? "text-white" : "text-black"}`}>
                    {selectedPlan.validity}
                  </p>
                </div>
                <a
                  href={buildWaLink(selectedPlan)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90 cursor-pointer"
                  style={{ backgroundColor: colors.primary }}
                >
                  {selectedPlan.cta}
                </a>
              </div>
            </article>
          </div>
        </div>

        <div className="bg-transparent border-transparent shadow-none md:bg-white md:rounded-2xl md:border md:border-gray-200 p-0 md:p-8 md:shadow-sm">
          <div className="max-w-3xl mb-4 md:mb-8">
            <div className="flex items-center justify-between gap-4 mb-2">
              <h4 className="text-xl md:text-2xl font-bold text-black">{t("membership.benefitTitle")}</h4>
            </div>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed hidden sm:block">
              {t("membership.benefitDesc")}
            </p>
          </div>

          {/* Mobile view */}
          <div className="md:hidden">
            {/* Card Container */}
            {(() => {
              const item = MEMBERSHIP_BENEFITS[activeBenefit];
              return (
                <article className="w-full rounded-xl border border-[#e8eef2] bg-white px-5 py-5 shadow-[0_6px_18px_rgba(15,23,42,0.04)]">
                  <div className="flex min-h-[130px] flex-col">
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <h5 className="text-base font-bold text-black leading-tight">{item.benefit}</h5>
                      <span
                        className={`mt-0.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold whitespace-nowrap ${
                          item.featured ? "text-white" : "text-slate-500"
                        }`}
                        style={{
                          backgroundColor: item.featured ? colors.primary : "#f8fafc",
                        }}
                      >
                        {item.featured ? (language === "id" ? "Tipe 2" : "Type 2") : (language === "id" ? "Termasuk" : "Included")}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">{item.value}</p>
                    <p className="mt-auto text-xs text-gray-500 leading-relaxed">
                      {item.note}
                    </p>
                  </div>
                </article>
              );
            })()}

            {/* Pagination & Navigation Row */}
            <div className="flex items-center justify-center gap-6 mt-5">
              <button
                type="button"
                onClick={prevBenefit}
                className="h-8 w-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 active:bg-slate-100 shadow-sm transition-all focus:outline-none cursor-pointer"
                aria-label="Previous benefit"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>

              <div className="flex gap-2">
                {MEMBERSHIP_BENEFITS.map((_, idx) => (
                  <button
                    type="button"
                    key={idx}
                    onClick={() => setActiveBenefit(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      activeBenefit === idx ? "w-6" : "w-2"
                    }`}
                    style={{
                      backgroundColor: activeBenefit === idx ? colors.primary : "#cbd5e1",
                    }}
                    aria-label={`Go to benefit ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={nextBenefit}
                className="h-8 w-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 active:bg-slate-100 shadow-sm transition-all focus:outline-none cursor-pointer"
                aria-label="Next benefit"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>
          </div>

          <div className="hidden md:grid md:grid-cols-2 xl:grid-cols-5 gap-3 md:gap-4">
            {MEMBERSHIP_BENEFITS.map((item) => (
              <article
                key={item.benefit}
                className="group rounded-2xl border border-[#e8eef2] bg-white p-5 min-h-[260px] flex flex-col text-left shadow-[0_8px_24px_rgba(15,23,42,0.04)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#053f5c] hover:bg-[#053f5c] hover:shadow-[0_18px_42px_rgba(5,63,92,0.18)]"
              >
                <div className="flex items-center justify-end gap-3 mb-6">
                  <span
                    className={`rounded-full px-3 py-1 text-[11px] font-bold transition-colors duration-300 ease-out group-hover:bg-white group-hover:text-[#053f5c] ${
                      item.featured ? "bg-white text-[#053f5c]" : "bg-[#f8fafc] text-slate-500"
                    }`}
                  >
                    {item.featured ? (language === "id" ? "Tipe 2" : "Type 2") : (language === "id" ? "Termasuk" : "Included")}
                  </span>
                </div>

                <h5 className="text-lg font-bold mb-3 leading-tight text-black transition-colors duration-300 ease-out group-hover:text-white">
                  {item.benefit}
                </h5>
                <p className="text-sm leading-relaxed mb-5 text-gray-600 transition-colors duration-300 ease-out group-hover:text-white/80">
                  {item.value}
                </p>

                <div className="mt-auto border-t border-slate-100 pt-4 transition-colors duration-300 ease-out group-hover:border-white/15">
                  <p className="text-sm leading-relaxed mb-4 text-gray-500 transition-colors duration-300 ease-out group-hover:text-white/75">
                    {item.note}
                  </p>
                  <span
                    className="inline-flex rounded-full px-3 py-1 text-xs font-semibold transition-colors duration-300 ease-out group-hover:bg-white group-hover:text-[#053f5c]"
                    style={{
                      backgroundColor: item.featured ? colors.primary : "#eef6f8",
                      color: item.featured ? "#ffffff" : colors.primary,
                    }}
                  >
                    {item.type}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
