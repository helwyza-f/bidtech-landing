import { Check, ArrowUpRight } from "lucide-react";

import { membershipPlans } from "@/data/home";
import { siteConfig } from "@/data/site";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

import { createWhatsAppUrl } from "@/lib/whatsapp";

export function Membership() {
  return (
    <section
      id="membership"
      className="section-space bg-[#f4f2ee]"
    >
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Pilih Membership"
            title="Temukan paket yang sesuai."
            description="Pilih membership berdasarkan kebutuhan latihan dan tujuan kebugaran Anda."
            align="center"
          />
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-3 lg:items-stretch">
          {membershipPlans.map((plan, index) => {
            const href = createWhatsAppUrl(
              `Halo ${siteConfig.brand.name}, saya tertarik dengan Membership ${plan.name}. Bisa berikan informasi lebih lanjut?`
            );

            return (
              <Reveal
                key={plan.name}
                delay={index * 0.08}
                className="h-full"
              >
                <article
                  className={[
                    "group relative flex h-full flex-col overflow-hidden",
                    "rounded-[1.5rem] border p-7 sm:p-8",
                    "transition-transform duration-500",
                    plan.featured
                      ? [
                          "border-[var(--color-primary)]",
                          "bg-[#0b0b0b] text-white",
                          "shadow-[0_30px_100px_rgba(0,0,0,0.16)]",
                          "lg:-translate-y-5",
                        ].join(" ")
                      : [
                          "border-black/[0.08]",
                          "bg-white text-black",
                          "hover:-translate-y-2",
                        ].join(" "),
                  ].join(" ")}
                >
                  {plan.featured && (
                    <div className="absolute right-5 top-5 rounded-full bg-[var(--color-primary)] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-white">
                      Best Value
                    </div>
                  )}

                  <div>
                    <span
                      className={[
                        "text-xs font-semibold uppercase tracking-[0.18em]",
                        plan.featured
                          ? "text-[var(--color-primary)]"
                          : "text-black/45",
                      ].join(" ")}
                    >
                      {plan.name}
                    </span>

                    <div className="mt-7 flex items-end gap-2">
                      <strong className="font-heading text-[clamp(2.5rem,4vw,4.5rem)] font-bold leading-none tracking-[-0.065em]">
                        {plan.price}
                      </strong>

                      <span
                        className={[
                          "mb-1 text-xs",
                          plan.featured
                            ? "text-white/45"
                            : "text-black/45",
                        ].join(" ")}
                      >
                        {plan.period}
                      </span>
                    </div>

                    <p
                      className={[
                        "mt-6 min-h-[56px] text-sm leading-7",
                        plan.featured
                          ? "text-white/55"
                          : "text-black/50",
                      ].join(" ")}
                    >
                      {plan.description}
                    </p>
                  </div>

                  <div
                    className={[
                      "my-8 h-px",
                      plan.featured
                        ? "bg-white/10"
                        : "bg-black/[0.07]",
                    ].join(" ")}
                  />

                  <ul className="flex flex-1 flex-col gap-4">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-sm"
                      >
                        <span
                          className={[
                            "mt-0.5 flex size-5 shrink-0",
                            "items-center justify-center rounded-full",
                            plan.featured
                              ? "bg-[var(--color-primary)] text-white"
                              : "bg-black text-white",
                          ].join(" ")}
                        >
                          <Check
                            size={12}
                            strokeWidth={2.5}
                          />
                        </span>

                        <span
                          className={
                            plan.featured
                              ? "text-white/70"
                              : "text-black/65"
                          }
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={[
                      "group/button mt-9 flex min-h-13 py-3",
                      "items-center justify-between rounded-full",
                      "px-6 text-sm font-semibold",
                      "transition-all duration-300 active:scale-[0.98]",
                      plan.featured
                        ? [
                            "bg-[var(--color-primary)]",
                            "text-white",
                            "hover:bg-[var(--color-primary-hover)]",
                          ].join(" ")
                        : [
                            "bg-black text-white",
                            "hover:bg-[var(--color-primary)]",
                          ].join(" "),
                    ].join(" ")}
                  >
                    Daftar Sekarang

                    <ArrowUpRight
                      size={17}
                      className="transition-transform duration-300 group-hover/button:translate-x-1 group-hover/button:-translate-y-1"
                    />
                  </a>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}