import { ChevronRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const sectionBadgeClass =
  "rounded-full border border-lime-300 bg-lime-50/90 px-5 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-green-700 shadow-sm";

export function CtaBannerSection() {
  return (
    <section className="px-4 pb-16 sm:px-5 md:px-8">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-[32px] border border-emerald-100 bg-[linear-gradient(135deg,#f2fbef_0%,#ffffff_52%,#eef7f1_100%)] px-6 py-12 text-center shadow-[0_30px_90px_rgba(15,23,42,0.08)]">
        <Badge className={sectionBadgeClass}>Custom Design</Badge>
        <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-bold tracking-tight text-slate-950">
          Tidak menemukan design yang sesuai?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-slate-600">
          Kami siap membuat tampilan custom yang lebih pas dengan brand dan kebutuhan bisnis Anda.
        </p>
        <Button
          className="mt-8 rounded-full bg-brand-primary px-8 text-slate-950 shadow-xl shadow-brand-primary/20 hover:bg-brand-primary-hover"
          size="lg"
        >
          Konsultasi Gratis
          <ChevronRight className="ml-2 size-4" />
        </Button>
      </div>
    </section>
  );
}
