import { Marquee } from "@/components/ui/marquee";
import { testimonialsRowOne, testimonialsRowTwo, type Testimonial } from "@/lib/data/testimonials";

function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <div className="w-[360px] shrink-0 rounded-card border border-line bg-surface p-6 shadow-soft">
      <p className="text-sm leading-relaxed text-foreground">&ldquo;{item.quote}&rdquo;</p>
      <div className="mt-4 flex items-center gap-3 border-t border-line pt-4">
        <div className="grid h-9 w-9 place-items-center rounded-full bg-brand-soft text-xs font-bold text-brand">
          {item.initials}
        </div>
        <div>
          <strong className="block text-xs font-bold text-foreground">{item.name}</strong>
          <span className="text-[11px] text-muted">{item.role}</span>
        </div>
      </div>
    </div>
  );
}

function TestimonialRow({ items }: { items: Testimonial[] }) {
  return (
    <>
      {items.map((item) => (
        <TestimonialCard key={item.name} item={item} />
      ))}
    </>
  );
}

export function TestimonialsSection() {
  return (
    <section className="overflow-hidden border-t border-line bg-background py-20 md:py-28">
      <div className="mx-auto mb-12 w-full max-w-shell px-4 sm:px-6">
        <h2 className="text-display-lg font-semibold text-foreground">Yang berubah setelah lulus</h2>
      </div>

      <Marquee ariaLabel="Testimoni alumni Nivora Academy, baris pertama" speed="slow" className="mb-5">
        <TestimonialRow items={testimonialsRowOne} />
        <div aria-hidden="true" className="flex items-center gap-10 md:gap-16">
          <TestimonialRow items={testimonialsRowOne} />
        </div>
      </Marquee>

      <Marquee ariaLabel="Testimoni alumni Nivora Academy, baris kedua" speed="reverse">
        <TestimonialRow items={testimonialsRowTwo} />
        <div aria-hidden="true" className="flex items-center gap-10 md:gap-16">
          <TestimonialRow items={testimonialsRowTwo} />
        </div>
      </Marquee>
    </section>
  );
}
