import Image from "next/image";
import { Marquee } from "@/components/ui/marquee";
import { testimonialsRowOne, testimonialsRowTwo, type Testimonial } from "@/lib/data/testimonials";

function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <div className="flex w-[380px] shrink-0 gap-4 rounded-card border border-line bg-surface p-5 shadow-soft">
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-brand-soft">
        <Image src={item.photo} alt={item.name} fill sizes="64px" className="object-cover" />
      </div>
      <div>
        <p className="text-sm leading-relaxed text-foreground">&ldquo;{item.quote}&rdquo;</p>
        <div className="mt-3 text-xs">
          <strong className="block font-bold text-foreground">{item.name}</strong>
          <span className="text-muted">
            {item.role} · {item.company}
          </span>
          <span className="ml-1 text-muted-soft">— {item.batch}</span>
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