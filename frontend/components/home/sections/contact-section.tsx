import { Mail, MapPin, MessageCircleMore } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "@/components/animations/reveal";
import { ContactForm } from "@/components/home/components/contact-form";
import { useLanguage } from "@/lib/i18n";

export function ContactSection() {
  const { t } = useLanguage();

  return (
    <section
      className="landing-panel relative mx-auto max-w-7xl px-4 py-7 sm:px-5 sm:py-8 md:px-8 md:py-10"
      id="contact"
    >
      <div className="pointer-events-none absolute inset-x-4 top-8 -z-10 h-80 rounded-[48px] bg-[radial-gradient(circle_at_25%_15%,rgba(95,201,74,0.13),transparent_34%),linear-gradient(135deg,rgba(245,255,242,0.9),rgba(255,255,255,0.75))]" />
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.32em] text-brand-primary">
          {t.contact.badge}
        </p>
        <h2 className="font-[family-name:var(--font-sora)] text-3xl font-semibold leading-tight text-slate-950 md:text-4xl">
          {t.contact.titlePrefix} <span className="text-brand-primary">{t.contact.titleHighlight}</span>
        </h2>
        <p className="mt-4 leading-7 text-slate-500">{t.contact.subtitle}</p>
      </Reveal>

      <div className="mt-12 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal className="space-y-6" y={16}>
          {t.contact.info.map((item, index) => {
            const Icon = [MessageCircleMore, Mail, MapPin][index];
            const isLocation = "batam" in item;

            if (isLocation) {
              return (
                <div className="grid gap-5" key={item.label}>
                  <Card className="overflow-hidden border border-emerald-100 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
                    <CardContent className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-brand-primary/10 text-brand-primary">
                          <MapPin className="size-5" />
                        </div>
                        <div>
                          <p className="text-base font-bold text-slate-950">{item.label} Batam</p>
                          <p className="mt-1 text-sm leading-relaxed text-slate-500">{(item as any).batam}</p>
                        </div>
                      </div>

                      <div className="overflow-hidden rounded-2xl border border-emerald-100 bg-emerald-50/40">
                        <iframe
                          allowFullScreen
                          className="h-52 w-full border-0"
                          loading="lazy"
                          referrerPolicy="strict-origin-when-cross-origin"
                          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2311.377!2d104.07543166924557!3d1.1058157731502605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sid!2sid!4v1785208829256!5m2!1sid!2sid"
                          title={`${t.contact.mapTitlePrefix} Batam`}
                        />
                      </div>

                      <a
                        className="flex items-center justify-center rounded-full border border-emerald-100 bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition hover:border-brand-primary/40 hover:bg-emerald-50"
                        href="https://www.google.com/maps/search/?api=1&query=1.1058157731502605%2C104.07543166924557"
                        rel="noreferrer"
                        target="_blank"
                      >
                        {t.contact.openLocation} Batam
                      </a>
                    </CardContent>
                  </Card>

                  <Card className="overflow-hidden border border-emerald-100 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
                    <CardContent className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-brand-primary/10 text-brand-primary">
                          <MapPin className="size-5" />
                        </div>
                        <div>
                          <p className="text-base font-bold text-slate-950">{item.label} Jakarta</p>
                          <p className="mt-1 text-sm leading-relaxed text-slate-500">{(item as any).jakarta}</p>
                        </div>
                      </div>

                      <div className="overflow-hidden rounded-2xl border border-emerald-100 bg-emerald-50/40">
                        <iframe
                          allowFullScreen
                          className="h-52 w-full border-0"
                          loading="lazy"
                          referrerPolicy="strict-origin-when-cross-origin"
                          src="https://www.google.com/maps?q=-6.207275,106.822519&z=16&output=embed"
                          title={`${t.contact.mapTitlePrefix} Jakarta`}
                        />
                      </div>

                      <a
                        className="flex items-center justify-center rounded-full border border-emerald-100 bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition hover:border-brand-primary/40 hover:bg-emerald-50"
                        href="https://www.google.com/maps/search/?api=1&query=-6.207275%2C106.822519"
                        rel="noreferrer"
                        target="_blank"
                      >
                        {t.contact.openLocation} Jakarta
                      </a>
                    </CardContent>
                  </Card>
                </div>
              );
            }

            const isEmail = index === 1;
            const content = (
              <CardContent className="flex items-center gap-4 rounded-[28px] border border-emerald-100 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.07)]">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                  <Icon className="size-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-950">{item.label}</p>
                  <p className="text-sm text-slate-500">{(item as any).value}</p>
                  {(item as any).note && <p className="text-xs font-medium text-brand-primary">{(item as any).note}</p>}
                </div>
              </CardContent>
            );

            return isEmail ? (
              <a key={item.label} className="block" href={`mailto:${(item as any).value}`} rel="noreferrer" target="_blank">
                <Card className="border-0 bg-transparent !shadow-none transition hover:-translate-y-0.5">{content}</Card>
              </a>
            ) : (
              <Card className="border-0 bg-transparent !shadow-none" key={item.label}>{content}</Card>
            );
          })}

          </Reveal>

        <Reveal delay={100} y={16}>
          <Card className="border border-emerald-100 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.09)]">
            <CardContent>
              <ContactForm selectedPackage={null} />
            </CardContent>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
