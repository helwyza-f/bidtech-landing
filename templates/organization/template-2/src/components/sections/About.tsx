'use client';

import Image from "next/image";
import { colors } from "@lib/color";
import { STATISTICS, asset } from "@constants/index";
import AnimatedCounter from "@components/ui/AnimatedCounter";
import ScrollReveal from "@components/ui/ScrollReveal";
import { useLanguage } from "@lib/LanguageContext";
import { TranslationKey } from "@constants/translations";

const ORG_DEPARTMENTS = (t: (key: TranslationKey) => string) => [
  {
    title: t("about.org.roleKetuaUmum") === "Executive Chairperson" ? "Social Aid & Disaster Relief" : "Divisi Bantuan Sosial & Bencana",
    head: { name: "Ahmad Zulfikar, S.Sos.", role: t("about.org.roleKetuaUmum") === "Executive Chairperson" ? "Head of Social Aid" : "Kepala Divisi Bantuan Sosial" },
    staff: [
      { name: "Rizky Ramadhan", role: t("about.org.roleKetuaUmum") === "Executive Chairperson" ? "Staff Logistics & Outposts" : "Staff Logistik & Posko" },
      { name: "Fathur Rohman", role: t("about.org.roleKetuaUmum") === "Executive Chairperson" ? "Staff Field Distribution" : "Staff Distribusi Lapangan" }
    ]
  },
  {
    title: t("about.org.roleKetuaUmum") === "Executive Chairperson" ? "Education & Scholarships" : "Divisi Pendidikan & Beasiswa",
    head: { name: "Ratih Anggraini, S.Pd.", role: t("about.org.roleKetuaUmum") === "Executive Chairperson" ? "Head of Education" : "Kepala Divisi Pendidikan" },
    staff: [
      { name: "Nurul Hidayah", role: t("about.org.roleKetuaUmum") === "Executive Chairperson" ? "Staff Student Mentorship" : "Staff Pembinaan Beasiswa" }
    ]
  },
  {
    title: t("about.org.roleKetuaUmum") === "Executive Chairperson" ? "Community Empowerment & MSMEs" : "Divisi Pemberdayaan UMKM",
    head: { name: "Hendro Wibowo, S.E.", role: t("about.org.roleKetuaUmum") === "Executive Chairperson" ? "Head of MSME Empowerment" : "Kepala Divisi Pemberdayaan UMKM" },
    staff: []
  },
  {
    title: t("about.org.roleKetuaUmum") === "Executive Chairperson" ? "Volunteers & Regional Chapters" : "Divisi Relawan & Cabang",
    head: { name: "Siti Marwah, S.I.Kom.", role: t("about.org.roleKetuaUmum") === "Executive Chairperson" ? "Head of Volunteers" : "Kepala Divisi Relawan" },
    staff: [
      { name: "Galih Wicaksono", role: t("about.org.roleKetuaUmum") === "Executive Chairperson" ? "Staff Volunteer Outreach" : "Staff Koordinator Relawan" },
      { name: "Annisa Permata", role: t("about.org.roleKetuaUmum") === "Executive Chairperson" ? "Staff Field Training" : "Staff Pembekalan Relawan" }
    ]
  },
  {
    title: t("about.org.roleKetuaUmum") === "Executive Chairperson" ? "Public Relations & CSR Partnerships" : "Divisi Humas & Kemitraan",
    head: { name: "Bagas Pratama, S.H.", role: t("about.org.roleKetuaUmum") === "Executive Chairperson" ? "Head of PR & Partnerships" : "Kepala Divisi Kemitraan" },
    staff: [
      { name: "Tri Wahyuni", role: t("about.org.roleKetuaUmum") === "Executive Chairperson" ? "Staff Media & Publications" : "Staff Publikasi & Media" }
    ]
  }
];

const LEADERSHIP_TEAM = (t: (key: TranslationKey) => string) => ({
  ketuaUmum: {
    name: "H. Rahmat Hidayat, S.Sos., M.Si.",
    role: t("about.org.roleKetuaUmum"),
    image: "/img/avatar-chair.webp",
    alt: "H. Rahmat Hidayat, S.Sos., M.Si. - Ketua Umum",
    cardWidth: "w-56 md:w-64",
    imageSize: "h-28 w-28 md:h-32 md:w-32"
  },
  coFounderLeft: {
    name: "Ir. Hendra Gunawan, M.T.",
    role: t("about.org.roleCoFounder"),
    image: "/img/avatar-founder-1.webp",
    alt: "Ir. Hendra Gunawan, M.T. - Dewan Pembina",
    cardWidth: "w-52 md:w-60",
    imageSize: "h-26 w-26 md:h-30 md:w-30"
  },
  coFounderRight: {
    name: "Dr. Sarah Kusuma, M.M.",
    role: t("about.org.roleCoFounder"),
    image: "/img/avatar-founder-2.webp",
    alt: "Dr. Sarah Kusuma, M.M. - Dewan Pengawas",
    cardWidth: "w-52 md:w-60",
    imageSize: "h-26 w-26 md:h-30 md:w-30"
  },
  ketuaHarian: {
    name: "Bambang Prasetyo, S.Pd.",
    role: t("about.org.roleKetuaHarian"),
    cardWidth: "w-64 md:w-72"
  }
});

export default function AboutSection() {
  const { t } = useLanguage();
  const departments = ORG_DEPARTMENTS(t);
  const leadership = LEADERSHIP_TEAM(t);
  const connectorColor = "#94a3b8";

  return (
    <section id="about" className="py-16 md:py-24 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Label */}
        <ScrollReveal animation="slide-up">
          <h2 className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: colors.primary }}>
            {t("about.label")}
          </h2>
        </ScrollReveal>

        {/* Heading + Description */}
        <ScrollReveal animation="slide-up" delay={100}>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-16">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-snug text-black">
              {t("about.heading")}
            </h3>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              {t("about.desc")}
            </p>
          </div>
        </ScrollReveal>

        {/* Visi / Misi / Nilai Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Visi */}
          <ScrollReveal animation="slide-up" delay={150} className="flex">
            <div className="p-8 rounded-xl bg-gray-50 border border-transparent transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-xl hover:shadow-slate-200/50 hover:bg-white hover:border-slate-100 flex-1">
              <div className="flex items-center gap-3 mb-5">
                <svg className="w-7 h-7 flex-shrink-0" fill="none" stroke="black" strokeWidth="1.6" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.644C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.437 0 .644C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <h4 className="text-xl font-bold text-black">{t("about.vision.title")}</h4>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                {t("about.vision.text")}
              </p>
            </div>
          </ScrollReveal>

          {/* Misi - Highlighted */}
          <ScrollReveal animation="slide-up" delay={300} className="flex">
            <div className="p-8 rounded-xl transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-xl hover:shadow-teal-950/20 flex-1" style={{ backgroundColor: colors.primary }}>
              <div className="flex items-center gap-3 mb-5">
                <svg className="w-7 h-7 flex-shrink-0" fill="none" stroke="white" strokeWidth="1.6" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="9" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="12" r="5" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="12" r="1" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <h4 className="text-xl font-bold text-white">{t("about.mission.title")}</h4>
              </div>
              <ul className="text-white/85 text-xs space-y-3.5">
                <li>
                  <strong className="text-white block text-sm font-semibold mb-0.5">{t("about.mission.networking.title")}</strong>
                  {t("about.mission.networking.text")}
                </li>
                <li>
                  <strong className="text-white block text-sm font-semibold mb-0.5">{t("about.mission.exchange.title")}</strong>
                  {t("about.mission.exchange.text")}
                </li>
                <li>
                  <strong className="text-white block text-sm font-semibold mb-0.5">{t("about.mission.collab.title")}</strong>
                  {t("about.mission.collab.text")}
                </li>
                <li>
                  <strong className="text-white block text-sm font-semibold mb-0.5">{t("about.mission.opportunity.title")}</strong>
                  {t("about.mission.opportunity.text")}
                </li>
              </ul>
            </div>
          </ScrollReveal>

          {/* Core Values */}
          <ScrollReveal animation="slide-up" delay={450} className="flex">
            <div className="p-8 rounded-xl bg-gray-50 flex flex-col justify-between border border-transparent transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-xl hover:shadow-slate-200/50 hover:bg-white hover:border-slate-100 flex-1">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <svg className="w-7 h-7 flex-shrink-0" fill="none" stroke="black" strokeWidth="1.6" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                  <h4 className="text-xl font-bold text-black">{t("about.coreValues.title")}</h4>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                  <strong>{t("about.coreValues.text1")}</strong>{t("about.coreValues.text2")}
                </p>
                <p className="text-gray-600 text-xs leading-relaxed">
                  {t("about.coreValues.text3")}
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Divider */}
        <hr className="border-gray-200 mb-12" />

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATISTICS.map((stat, idx) => {
            const label = stat.label === "Berdiri Sejak" 
              ? (t("about.org.roleKetuaUmum") === "General Chairman" ? "Established Since" : "Berdiri Sejak")
              : stat.label === "Simpatisan"
              ? (t("about.org.roleKetuaUmum") === "General Chairman" ? "Sympathizers" : "Simpatisan")
              : stat.label === "Anggota Terdaftar"
              ? (t("about.org.roleKetuaUmum") === "General Chairman" ? "Registered Members" : "Anggota Terdaftar")
              : (t("about.org.roleKetuaUmum") === "General Chairman" ? "Cross-Border Countries" : "Negara Cross-Border");
            return (
              <ScrollReveal key={stat.label} animation="scale-up" delay={idx * 100} className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-1" style={{ color: colors.primary }}>
                  <AnimatedCounter value={stat.value} />
                </div>
                <p className="text-sm text-gray-500">{label}</p>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Org Structure Sub-section */}
        <div className="mt-20 border-t border-gray-100 pt-16">
          <ScrollReveal animation="slide-up" className="text-center mb-12">
            <h2 className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: colors.primary }}>
              {t("about.org.label")}
            </h2>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-snug text-black mb-4">
              {t("about.org.heading")}
            </h3>
            <p className="text-base text-gray-600 max-w-2xl mx-auto mb-6">
              {t("about.org.desc")}
            </p>
          </ScrollReveal>

          {/* Org Tree Visualization */}
          <div className="flex flex-col items-center">
            {/* Top Leadership Row: Co-Founder (Left) - Ketua Umum (Center) - Co-Founder (Right) */}
            <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
              <div className="relative w-full flex flex-col md:flex-row items-center justify-center gap-8 md:gap-14 lg:gap-20">
                {/* Horizontal Connector Line on Desktop running behind the circular photos */}
                <div 
                  className="hidden md:block absolute top-14 left-[15%] right-[15%] h-px -z-0"
                  style={{ backgroundColor: connectorColor }}
                ></div>

                {/* Left: Co-Founder 1 */}
                <ScrollReveal animation="slide-up" delay={100} className="relative z-10 flex flex-col items-center text-center">
                  <div className={`${leadership.coFounderLeft.cardWidth} flex flex-col items-center text-center transition-transform hover:scale-[1.03] duration-300`}>
                    <div className={`relative ${leadership.coFounderLeft.imageSize} overflow-hidden rounded-full border-[3.5px] shadow-lg bg-white`} style={{ borderColor: colors.primary }}>
                      <Image
                        src={asset(leadership.coFounderLeft.image)}
                        alt={leadership.coFounderLeft.alt}
                        fill
                        sizes="(max-width: 768px) 7rem, 8rem"
                        className="object-cover object-center"
                        priority
                      />
                    </div>
                    <div className="pt-3">
                      <p className="font-bold text-sm md:text-base leading-snug text-slate-900">{leadership.coFounderLeft.name}</p>
                      <p className="text-[10px] md:text-[11px] text-slate-400 mt-1 uppercase font-semibold tracking-wider">{leadership.coFounderLeft.role}</p>
                    </div>
                  </div>
                </ScrollReveal>

                {/* Center: Ketua Umum */}
                <ScrollReveal animation="slide-up" delay={150} className="relative z-10 flex flex-col items-center text-center">
                  <div className={`${leadership.ketuaUmum.cardWidth} flex flex-col items-center text-center transition-transform hover:scale-[1.03] duration-300`}>
                    <div className={`relative ${leadership.ketuaUmum.imageSize} overflow-hidden rounded-full border-[4px] shadow-xl bg-white`} style={{ borderColor: colors.primary }}>
                      <Image
                        src={asset(leadership.ketuaUmum.image)}
                        alt={leadership.ketuaUmum.alt}
                        fill
                        sizes="(max-width: 768px) 8rem, 9rem"
                        className="object-cover object-center"
                        priority
                      />
                    </div>
                    <div className="pt-3">
                      <p className="font-bold text-base md:text-lg leading-snug text-slate-900">{leadership.ketuaUmum.name}</p>
                      <p className="text-[11px] md:text-xs text-slate-400 mt-1 uppercase font-semibold tracking-wider">{leadership.ketuaUmum.role}</p>
                    </div>
                  </div>
                </ScrollReveal>

                {/* Right: Co-Founder 2 */}
                <ScrollReveal animation="slide-up" delay={200} className="relative z-10 flex flex-col items-center text-center">
                  <div className={`${leadership.coFounderRight.cardWidth} flex flex-col items-center text-center transition-transform hover:scale-[1.03] duration-300`}>
                    <div className={`relative ${leadership.coFounderRight.imageSize} overflow-hidden rounded-full border-[3.5px] shadow-lg bg-white`} style={{ borderColor: colors.primary }}>
                      <Image
                        src={asset(leadership.coFounderRight.image)}
                        alt={leadership.coFounderRight.alt}
                        fill
                        sizes="(max-width: 768px) 7rem, 8rem"
                        className="object-cover object-center"
                        priority
                      />
                    </div>
                    <div className="pt-3">
                      <p className="font-bold text-sm md:text-base leading-snug text-slate-900">{leadership.coFounderRight.name}</p>
                      <p className="text-[10px] md:text-[11px] text-slate-400 mt-1 uppercase font-semibold tracking-wider">{leadership.coFounderRight.role}</p>
                    </div>
                  </div>
                </ScrollReveal>
              </div>

              {/* Vertical connector line from center (Ketua Umum) down to Ketua Harian */}
              <div className="w-px h-8 mt-4" style={{ backgroundColor: connectorColor }}></div>

              {/* Ketua Harian / Sekjen */}
              <ScrollReveal animation="slide-up" delay={250}>
                <div
                  className={`${leadership.ketuaHarian.cardWidth} text-white p-5 rounded-2xl shadow-lg text-center transition-transform hover:scale-[1.02] duration-300`}
                  style={{ backgroundColor: colors.primary }}
                >
                  <p className="font-bold text-lg">{leadership.ketuaHarian.name}</p>
                  <p className="text-xs opacity-80 mt-1 uppercase tracking-wide">{leadership.ketuaHarian.role}</p>
                </div>
              </ScrollReveal>

              {/* Connector line down to departments */}
              <div className="w-px h-8" style={{ backgroundColor: connectorColor }}></div>
            </div>

            {/* Departments Row */}
            <div className="w-full relative mt-2">
              {/* Horizontal Line connecting columns on desktop */}
              <div className="absolute top-0 left-[10%] right-[10%] h-px hidden md:block" style={{ backgroundColor: connectorColor }}></div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-4 justify-items-center relative">
                {departments.map((dept, idx) => (
                  <ScrollReveal key={idx} animation="slide-up" delay={idx * 100 + 100} className="w-full max-w-[290px] md:max-w-none flex flex-col items-center">
                    <div className="px-4 py-2 md:p-0 w-full flex flex-col items-center">
                      {/* Vertical line from connector to department head on desktop */}
                      <div className="w-px h-6 hidden md:block" style={{ backgroundColor: connectorColor }}></div>

                      {/* Department Header/Title */}
                      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3 md:mt-2 text-center">
                        {dept.title}
                      </p>

                      {/* Department Head Card */}
                      <div
                        className="border-2 p-4 rounded-xl shadow-md w-full max-w-[200px] text-center bg-white transition-all hover:shadow-lg duration-300"
                        style={{ borderColor: colors.secondary }}
                      >
                        <p className="font-bold text-sm text-black leading-tight">{dept.head.name}</p>
                        <p className="text-[10px] text-gray-500 mt-1 uppercase font-medium">{dept.head.role}</p>
                      </div>

                      {/* Staff list */}
                      {dept.staff.length > 0 && (
                        <div className="flex flex-col items-center w-full">
                          {dept.staff.map((staff, sIdx) => (
                            <div key={`${dept.title}-${staff.name}-${sIdx}`} className="flex flex-col items-center w-full">
                              {/* Vertical connector line */}
                              <div className="w-px h-4" style={{ backgroundColor: connectorColor }}></div>

                              {/* Staff Card */}
                              <div className="bg-white border border-slate-200 text-slate-800 p-3 rounded-lg shadow-sm w-full max-w-[170px] text-center hover:bg-slate-50 transition-colors duration-200">
                                <p className="font-semibold text-xs text-slate-800">{staff.name}</p>
                                <p className="text-[9px] text-slate-400 mt-0.5 uppercase tracking-wider">{staff.role}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Partners Sub-section */}
        <div className="mt-24 border-t border-gray-100 pt-16">
          <ScrollReveal animation="slide-up" className="text-center mb-10">
            <h2 className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: colors.primary }}>
              {t("about.partners.label")}
            </h2>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-snug text-black mb-4">
              {t("about.partners.heading")}
            </h3>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              {t("about.partners.desc")}
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto mt-8">
            {/* Partner 1 */}
            <ScrollReveal animation="scale-up" delay={100}>
              <div className="group flex items-center justify-center p-3 md:p-6 bg-slate-50/70 rounded-2xl border border-slate-100 hover:border-slate-200 transition-all duration-300 h-24 md:h-28 hover:bg-white hover:shadow-lg hover:shadow-slate-200/50">
                <Image
                  src={asset("/img/partner-logo-1.svg")}
                  alt="Dinas Sosial RI"
                  width={140}
                  height={60}
                  style={{ width: "auto", height: "auto" }}
                  className="max-h-12 md:max-h-14 w-auto object-contain transition-all duration-300 group-hover:scale-105"
                />
              </div>
            </ScrollReveal>

            {/* Partner 2 */}
            <ScrollReveal animation="scale-up" delay={200}>
              <div className="group flex items-center justify-center p-3 md:p-6 bg-slate-50/70 rounded-2xl border border-slate-100 hover:border-slate-200 transition-all duration-300 h-24 md:h-28 hover:bg-white hover:shadow-lg hover:shadow-slate-200/50">
                <Image
                  src={asset("/img/partner-logo-2.svg")}
                  alt="Dompet Peduli"
                  width={140}
                  height={60}
                  style={{ width: "auto", height: "auto" }}
                  className="max-h-12 md:max-h-14 w-auto object-contain transition-all duration-300 group-hover:scale-105"
                />
              </div>
            </ScrollReveal>

            {/* Partner 3 */}
            <ScrollReveal animation="scale-up" delay={300}>
              <div className="group flex items-center justify-center p-3 md:p-6 bg-slate-50/70 rounded-2xl border border-slate-100 hover:border-slate-200 transition-all duration-300 h-24 md:h-28 hover:bg-white hover:shadow-lg hover:shadow-slate-200/50">
                <Image
                  src={asset("/img/partner-logo-3.svg")}
                  alt="Bakti Sehat"
                  width={140}
                  height={60}
                  style={{ width: "auto", height: "auto" }}
                  className="max-h-12 md:max-h-14 w-auto object-contain transition-all duration-300 group-hover:scale-105"
                />
              </div>
            </ScrollReveal>

            {/* Partner 4 */}
            <ScrollReveal animation="scale-up" delay={400}>
              <div className="group flex items-center justify-center p-3 md:p-6 bg-slate-50/70 rounded-2xl border border-slate-100 hover:border-slate-200 transition-all duration-300 h-24 md:h-28 hover:bg-white hover:shadow-lg hover:shadow-slate-200/50">
                <Image
                  src={asset("/img/partner-logo-4.svg")}
                  alt="Sahabat UMKM"
                  width={140}
                  height={60}
                  style={{ width: "auto", height: "auto" }}
                  className="max-h-12 md:max-h-14 w-auto object-contain transition-all duration-300 group-hover:scale-105"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>

      </div>
    </section>
  );
}
