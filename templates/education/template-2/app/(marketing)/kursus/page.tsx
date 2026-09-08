import { buildMetadata } from "@/lib/seo";
import { CourseCatalog } from "@/components/course-catalog";

export const metadata = buildMetadata({
  title: "Katalog Kursus",
  description: "Katalog kursus praktis Nivora Academy di jalur Web, Design, Data, dan Excel — cari dan filter sesuai kebutuhanmu.",
  path: "/kursus",
});

export default function KursusPage() {
  return (
    <main className="mx-auto w-full max-w-shell px-4 pb-20 pt-24 sm:px-6 sm:pb-28 sm:pt-28">
      <h1 className="text-2xl font-semibold text-foreground sm:text-display-md">Katalog kursus</h1>
      <p className="mt-2.5 max-w-prose text-sm text-muted sm:mt-3 sm:text-base">
        Kursus mandiri yang bisa diakses selamanya, disusun langsung oleh mentor praktisi industri.
      </p>

      <div className="mt-6 sm:mt-8">
        <CourseCatalog />
      </div>
    </main>
  );
}