import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock, BookOpen, ArrowRight, CheckCircle2 } from "lucide-react";
import { courses, getCourseBySlug, getRelatedCourses } from "@/lib/data/courses";
import { mentors } from "@/lib/data/mentors";
import { whatsappLink } from "@/lib/data/site";
import { buildMetadata, courseJsonLd } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) return {};

  return buildMetadata({
    title: course.title,
    description: course.description,
    path: `/kursus/${course.slug}`,
    image: course.image,
    type: "article",
  });
}

export default async function CourseDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) notFound();

  const mentor = mentors.find((m) => m.slug === course.mentorSlug);
  const related = getRelatedCourses(course);
  const totalTopics = course.syllabus.reduce((sum, mod) => sum + mod.topics.length, 0);

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd(course)) }}
      />
      {/* Hero detail */}
      <section className="border-b border-line bg-surface pt-24 pb-8 sm:pt-28 sm:pb-12">
        <div className="mx-auto w-full max-w-shell px-4 sm:px-6">
          <nav className="mb-5 flex items-center gap-1.5 text-xs text-muted-soft">
            <Link href="/kursus" className="hover:text-brand">
              Kursus
            </Link>
            <span>/</span>
            <span className="text-muted">{course.category}</span>
          </nav>

          <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-muted-soft">
                <span className="rounded-pill bg-brand-soft px-2.5 py-1 text-brand">{course.category}</span>
                <span>{course.level}</span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  {course.duration}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <BookOpen size={12} />
                  {course.lessons}
                </span>
              </div>

              <h1 className="mt-3 text-2xl font-semibold leading-[1.1] text-foreground sm:text-display-lg">
                {course.title}
              </h1>

              <p className="mt-4 max-w-[56ch] text-sm leading-relaxed text-muted sm:text-base">
                {course.description}
              </p>

              {mentor && (
                <Link
                  href={`/mentor/${mentor.slug}`}
                  className="mt-6 flex w-fit items-center gap-3 rounded-2xl border border-line bg-background p-3 pr-5 transition hover:border-brand/30"
                >
                  <div className="relative h-11 w-11 overflow-hidden rounded-full bg-brand-soft">
                    <Image src={mentor.photo} alt={mentor.name} fill sizes="44px" className="object-cover" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-soft">Diajarkan oleh</p>
                    <p className="text-sm font-bold text-foreground">{mentor.name}</p>
                  </div>
                  <ArrowRight size={15} className="ml-2 text-muted-soft" />
                </Link>
              )}
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-video w-full overflow-hidden rounded-panel bg-brand-soft">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  sizes="(min-width: 1024px) 480px, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Silabus */}
      <section className="border-b border-line bg-background py-14 sm:py-20">
        <div className="mx-auto w-full max-w-shell px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <div className="mb-6 flex items-baseline justify-between">
                <h2 className="text-xl font-bold text-foreground sm:text-2xl">Silabus kelas</h2>
                <span className="text-xs font-semibold text-muted-soft">
                  {course.syllabus.length} modul · {totalTopics} topik
                </span>
              </div>

              <div className="space-y-4">
                {course.syllabus.map((mod, idx) => (
                  <div key={mod.title} className="rounded-card border border-line bg-surface p-5 sm:p-6">
                    <div className="flex items-center gap-3">
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-soft text-xs font-bold text-brand">
                        {idx + 1}
                      </span>
                      <h3 className="text-base font-bold text-foreground">{mod.title}</h3>
                    </div>
                    <ul className="mt-3 space-y-2 pl-11">
                      {mod.topics.map((topic) => (
                        <li key={topic} className="flex items-start gap-2 text-sm text-muted">
                          <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-brand/60" />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA sticky */}
            <div className="lg:col-span-5">
              <div className="rounded-panel border border-line bg-surface p-6 lg:sticky lg:top-28 sm:p-8">
                <h3 className="text-lg font-bold text-foreground">Mulai belajar sekarang</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted sm:text-sm">
                  Akses selamanya, materi bisa diulang kapan saja, dan mentor siap membantu lewat sesi konsultasi.
                </p>

                <a
                  href={whatsappLink(`Halo Nivora, saya mau tanya soal kursus ${course.title}`)}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-pill bg-brand text-sm font-semibold text-white shadow-md transition hover:bg-brand-dark"
                >
                  <span>Tanya & daftar via WhatsApp</span>
                  <ArrowUpRight size={16} />
                </a>

                <dl className="mt-6 space-y-2.5 border-t border-line pt-5 text-xs">
                  <div className="flex justify-between">
                    <dt className="text-muted">Level</dt>
                    <dd className="font-semibold text-foreground">{course.level}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted">Durasi</dt>
                    <dd className="font-semibold text-foreground">{course.duration}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted">Jumlah materi</dt>
                    <dd className="font-semibold text-foreground">{course.lessons}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted">Akses</dt>
                    <dd className="font-semibold text-brand">Selamanya</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related courses */}
      {related.length > 0 && (
        <section className="bg-surface py-14 sm:py-20">
          <div className="mx-auto w-full max-w-shell px-4 sm:px-6">
            <h2 className="mb-6 text-xl font-bold text-foreground sm:text-2xl">Kursus terkait</h2>
            <div className="grid gap-5 sm:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/kursus/${r.slug}`}
                  className="group block overflow-hidden rounded-card border border-line bg-background"
                >
                  <div className="relative aspect-video w-full overflow-hidden">
                    <Image
                      src={r.image}
                      alt={r.title}
                      fill
                      sizes="(min-width: 640px) 33vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-bold text-foreground group-hover:text-brand">{r.title}</h3>
                    <p className="mt-1 text-xs text-muted">{r.mentor}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}