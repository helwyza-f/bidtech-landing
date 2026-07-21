"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n";

interface SelectedPackage {
  service: string;
  plan: string;
  price: string;
}

export function ContactForm({ selectedPackage }: { selectedPackage: SelectedPackage | null }) {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [company, setCompany] = useState("");
  const [service, setService] = useState(selectedPackage?.service ?? t.contact.form.services[0]);
  const [description, setDescription] = useState(
    selectedPackage ? `Saya tertarik dengan paket ${selectedPackage.plan} (${selectedPackage.price}).` : "",
  );

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const message = [
      `Halo BidTech, saya ${name || "-"} dari ${company || "-"}.`,
      `Nomor WhatsApp: ${whatsapp || "-"}`,
      `Jenis Layanan: ${service}`,
      `Deskripsi Proyek: ${description || "-"}`,
    ].join("\n");

    window.open(`https://wa.me/628217601455?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="text-xs font-medium text-zinc-400" htmlFor="contact-name">
            {t.contact.form.nameLabel}
          </label>
          <input
            className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-lime-300/50 focus:outline-none"
            id="contact-name"
            onChange={(e) => setName(e.target.value)}
            placeholder={t.contact.form.namePlaceholder}
            value={name}
          />
        </div>

        <div>
          <label className="text-xs font-medium text-zinc-400" htmlFor="contact-whatsapp">
            {t.contact.form.whatsappLabel}
          </label>
          <input
            className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-lime-300/50 focus:outline-none"
            id="contact-whatsapp"
            onChange={(e) => setWhatsapp(e.target.value)}
            placeholder={t.contact.form.whatsappPlaceholder}
            value={whatsapp}
          />
        </div>

        <div>
          <label className="text-xs font-medium text-zinc-400" htmlFor="contact-company">
            {t.contact.form.companyLabel}
          </label>
          <input
            className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-lime-300/50 focus:outline-none"
            id="contact-company"
            onChange={(e) => setCompany(e.target.value)}
            placeholder={t.contact.form.companyPlaceholder}
            value={company}
          />
        </div>

        <div>
          <label className="text-xs font-medium text-zinc-400" htmlFor="contact-service">
            {t.contact.form.serviceLabel}
          </label>
          <select
            className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white focus:border-lime-300/50 focus:outline-none"
            id="contact-service"
            onChange={(e) => setService(e.target.value)}
            value={service}
          >
            {t.contact.form.services.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="text-xs font-medium text-zinc-400" htmlFor="contact-description">
          {t.contact.form.descriptionLabel}
        </label>
        <textarea
          className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-lime-300/50 focus:outline-none"
          id="contact-description"
          onChange={(e) => setDescription(e.target.value)}
          placeholder={t.contact.form.descriptionPlaceholder}
          rows={4}
          value={description}
        />
      </div>

      <Button className="w-full" size="lg" type="submit">
        {t.contact.form.submit}
      </Button>
    </form>
  );
}
