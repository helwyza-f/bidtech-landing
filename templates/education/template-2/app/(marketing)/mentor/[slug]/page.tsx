import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock, Linkedin } from "lucide-react";
import { mentors, getMentorBySlug } from "@/lib/data/mentors";
import { getCoursesByMentor } from "@/lib/data/courses";
import { whatsappLink } from "@/lib/data/site";
import { buildMetadata, mentorJsonLd } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return mentors.map((mentor) => ({ slug: mentor.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const mentor = getMentorBySlug(slug);
  if (!mentor) return {};

  return buildMetadata({
    title: mentor.name,
    description: mentor.bio,
    path: `/mentor/${mentor.slug}`,
    image: mentor.photo,
    type: "article",
  });
}

export default async function MentorDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const mentor = getMentorBySlug(slug);

  if (!mentor) notFound();

  const taughtCourses = getCoursesByMentor(mentor.slug);

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(mentorJsonLd(mentor)) }}
      />
      <section className="border-b border-line bg-surface pt-24 pb-10 sm:pt-28 sm:pb-14">
        <div className="mx-auto w-full max-w-shell px-4 sm:px-6">
          <nav className="mb-5 flex items-center gap-1.5 text-xs text-muted-soft">
            <Link href="/mentor" className="hover:text-brand">
              Mentor
            </Link>
            <span>/</span>
            <span className="text-muted">{mentor.track}</span>
          </nav>

          <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <div className="relative aspect-[4/5] w-full max-w-[320px] overflow-hidden rounded-panel bg-ink">
                <Image
                  src={mentor.photo}
                  alt={mentor.name}
                  fill
                  sizes="(min-width: 1024px) 320px, 100vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-8">
              <span className="rounded-pill bg-brand-soft px-2.5 py-1 text-xs font-bold text-brand">
                {mentor.track}
              </span>

              <h1 className="mt-3 text-2xl font-semibold leading-[1.1] text-foreground sm:text-display-md">
                {mentor.name}
              </h1>
              <p className="mt-1.5 text-sm font-semibold text-muted sm:text-base">
                {mentor.role} · {mentor.company}
              </p>

              <p className="mt-4 max-w-[56ch] text-sm leading-relaxed text-muted sm:text-base">
                {mentor.bio}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {mentor.expertise.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-pill border border-line bg-background px-3 py-1 text-xs font-semibold text-muted"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href={whatsappLink(`Halo Nivora, saya mau tanya soal kelas ${mentor.name}`)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-11 items-center gap-2 rounded-pill bg-brand px-6 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(52,91,214,.22)] transition hover:bg-brand-dark sm:h-12"
                >
                  <span>Tanya soal kelasnya</span>
                  <ArrowUpRight size={16} />
                </a>
                {mentor.linkedinUrl && (
                  <a
                    href={mentor.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-11 items-center gap-2 rounded-pill border border-line px-5 text-sm font-semibold text-foreground transition hover:border-brand/30 sm:h-12"
                  >
                    <Linkedin size={15} />
                    <span>LinkedIn</span>
                  </a>
                )}
                <span className="text-xs font-semibold text-muted-soft">
                  {mentor.experienceYears}+ tahun pengalaman industri
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {taughtCourses.length > 0 && (
        <section className="bg-background py-14 sm:py-20">
          <div className="mx-auto w-full max-w-shell px-4 sm:px-6">
            <h2 className="mb-6 text-xl font-bold text-foreground sm:text-2xl">
              Kelas yang diajarkan {mentor.name}
            </h2>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {taughtCourses.map((course) => (
                <Link
                  key={course.slug}
                  href={`/kursus/${course.slug}`}
                  className="group block overflow-hidden rounded-card border border-line bg-surface"
                >
                  <div className="relative aspect-video w-full overflow-hidden">
                    <Image
                      src={course.image}
                      alt={course.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/0 to-transparent" />
                    <span className="absolute bottom-3 left-3 font-display text-lg italic text-white">
                      {course.category}
                    </span>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 text-[11px] font-semibold text-muted-soft">
                      <span>{course.level}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {course.duration}
                      </span>
                    </div>
                    <h3 className="mt-1.5 text-base font-bold leading-snug text-foreground group-hover:text-brand">
                      {course.title}
                    </h3>
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