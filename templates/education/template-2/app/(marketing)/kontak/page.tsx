import type { Metadata } from "next";
import { MessageCircle, Mail, MapPin } from "lucide-react";
import { site } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Kontak",
  description: "Hubungi tim Nivora Academy via WhatsApp atau email.",
};

export default function KontakPage() {
  return (
    <main className="mx-auto w-full max-w-shell px-4 py-32 sm:px-6">
      <h1 className="text-display-lg font-semibold text-foreground">Hubungi kami</h1>
      <p className="mt-4 max-w-prose text-body-lg text-muted">
        Tim konselor akademik kami siap membantu menjawab pertanyaan seputar program, biaya,
        dan jadwal belajar.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-3">
        <a
          href={site.contact.whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="rounded-card border border-line bg-surface p-6 transition hover:border-brand/40"
        >
          <MessageCircle className="text-brand" size={22} />
          <h2 className="mt-4 text-sm font-bold text-foreground">WhatsApp</h2>
          <p className="mt-1 text-sm text-muted">Respons tercepat, 1x24 jam</p>
        </a>

        <a
          href={`mailto:${site.contact.email}`}
          className="rounded-card border border-line bg-surface p-6 transition hover:border-brand/40"
        >
          <Mail className="text-brand" size={22} />
          <h2 className="mt-4 text-sm font-bold text-foreground">Email</h2>
          <p className="mt-1 text-sm text-muted">{site.contact.email}</p>
        </a>

        <div className="rounded-card border border-line bg-surface p-6">
          <MapPin className="text-brand" size={22} />
          <h2 className="mt-4 text-sm font-bold text-foreground">Kota</h2>
          <p className="mt-1 text-sm text-muted">{site.contact.cities}</p>
        </div>
      </div>
    </main>
  );
}