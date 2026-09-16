import Image from "next/image";
import Link from "next/link";
import { ExternalLink, ShoppingCart } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { TEMPLATES } from "@/lib/data/template";

export function TemplateCard({ template }: { template: (typeof TEMPLATES)[number] }) {
  const Icon = template.icon;

  return (
    <Card className="group flex flex-col overflow-hidden border border-emerald-100 bg-white shadow-[0_12px_36px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-2 hover:border-brand-primary/50 hover:shadow-[0_20px_60px_rgba(95,201,74,0.18)]">
      <div className="relative h-48 max-md:h-72 max-sm:h-40 overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-blue-50 p-3 sm:p-4">
        <Image
          alt={`${template.name} design preview`}
          className="h-full w-full object-cover object-top aspect-video transition-transform duration-500 group-hover:scale-[1.04]"
          draggable={false}
          fill
          src={template.image}
        />
      </div>

      <CardContent className="flex flex-1 flex-col space-y-3 p-4 sm:space-y-3.5 sm:p-5 h-full">
        <div className="flex max-w-[65%] w-fit h-fit py-2.5 items-start gap-x-1.5 truncate text-[11px] font-bold text-slate-700 sm:gap-2 sm:text-xs">
          <Icon className="size-3.5 shrink-0 text-brand-primary" />
          <span className="truncate">{template.category}</span>
        </div>

        <div>
          <h3 className="text-base font-bold text-slate-950 transition-colors duration-200 group-hover:text-brand-primary sm:text-lg">
            {template.name}
          </h3>
          <p className="mt-1 text-xs text-slate-500">
            {template.subcategory}
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {template.tags.map((tag) => (
            <Badge
              className="border border-emerald-100 bg-white px-2 py-0.5 text-[9px] font-semibold tracking-[0.1em] text-slate-600 transition hover:bg-emerald-50 hover:text-slate-700 sm:px-2.5 sm:py-1 sm:text-[10px]"
              key={tag}
            >
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex gap-2 pt-2 sm:gap-3 sm:pt-3 h-full items-end">
          <Link
            className="flex-1"
            href={template.previewHref ?? "#"}
            rel={template.previewHref ? "noreferrer" : undefined}
            target={template.previewHref ? "_blank" : undefined}
          >
            <Button
              className="h-9 w-full gap-1 rounded-full border border-slate-200 bg-white text-xs font-medium text-slate-700 transition-all hover:border-brand-primary/50 hover:bg-emerald-50 hover:text-slate-900 sm:h-10 sm:gap-1.5 sm:text-sm"
              size="sm"
              variant="outline"
            >
              <ExternalLink className="size-3.5" />
              <span>Lihat</span>
            </Button>
          </Link>
          <Button
            className="h-9 flex-1 gap-1 rounded-full bg-brand-primary text-xs font-medium text-slate-950 shadow-md shadow-brand-primary/20 transition-all hover:bg-brand-primary-hover hover:shadow-lg hover:shadow-brand-primary/30 sm:h-10 sm:gap-1.5 sm:text-sm"
            size="sm"
            onClick={() => {
              const message = `Halo Bidtech! Saya tertarik mendigitalisasikan perusahaan/organisasi saya dengan template website ${template.name}.`
              const whatsappUrl = `https://wa.me/628217601455?text=${encodeURIComponent(message)}`;
              window.open(
                whatsappUrl,
                "_blank"
              )
            }}
          >
            <ShoppingCart className="size-3.5" />
            <span>Beli</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
