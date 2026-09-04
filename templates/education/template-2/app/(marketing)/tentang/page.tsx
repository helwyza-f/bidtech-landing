import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Tentang Nivora Academy",
  description: "Nivora Academy — akademi keterampilan digital yang percaya belajar seharusnya punya arah.",
};

export default function TentangPage() {
  return (
    <main className="mx-auto w-full max-w-shell px-4 py-32 sm:px-6">
      <span className="block text-sm font-semibold text-brand">Filosofi kami</span>
      <h1 className="mt-2 text-display-lg font-semibold leading-[1.08] text-foreground">
        Kami percaya belajar seharusnya punya arah.
      </h1>
      <div className="mt-6 max-w-prose space-y-4 text-body-lg text-muted">
        <p>
          Nivora Academy dimulai dari satu keresahan sederhana: begitu banyak orang punya
          tekad belajar teknologi, namun tersesat di tengah tutorial acak dan berhenti di
          tengah jalan tanpa menghasilkan karya.
        </p>
        <p>
          Kami mendesain setiap kurikulum bukan sebagai daftar video pasif, melainkan sebagai
          sistem navigasi yang mengarahkan setiap langkahmu — dari pemahaman logika, evaluasi
          kode, hingga siap menghadapi standar rekrutmen kerja nyata.
        </p>
      </div>

      <Link
        href="/#tentang"
        className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline"
      >
        <span>Lihat cerita lengkap di halaman utama</span>
        <ArrowUpRight size={16} />
      </Link>
    </main>
  );
}