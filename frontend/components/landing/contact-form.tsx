"use client";

import { Button } from "@/components/ui/button";
import { ContactFormProvider, useContactForm } from "@/providers/contact-form-provider";

interface SelectedPackage {
  service: string;
  plan: string;
  price: string;
}

export function ContactForm({ selectedPackage }: { selectedPackage: SelectedPackage | null }) {
  return (
    <ContactFormProvider selectedPackage={selectedPackage}>
      <ContactFormView />
    </ContactFormProvider>
  );
}

function ContactFormView() {
  const {
    company,
    description,
    name,
    service,
    services,
    t,
    whatsapp,
    handleCompanyChange,
    handleDescriptionChange,
    handleNameChange,
    handleServiceChange,
    handleSubmit,
    handleWhatsappChange,
  } = useContactForm();

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="text-xs font-semibold text-slate-600" htmlFor="contact-name">
            {t.contact.form.nameLabel}
          </label>
          <input
            className="mt-2 w-full rounded-2xl border border-emerald-100 bg-white px-4 py-3 text-sm text-slate-950 shadow-sm placeholder:text-slate-400 focus:border-brand-primary/60 focus:outline-none focus:ring-4 focus:ring-brand-primary/10"
            id="contact-name"
            onChange={handleNameChange}
            placeholder={t.contact.form.namePlaceholder}
            value={name}
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-600" htmlFor="contact-whatsapp">
            {t.contact.form.whatsappLabel}
          </label>
          <input
            className="mt-2 w-full rounded-2xl border border-emerald-100 bg-white px-4 py-3 text-sm text-slate-950 shadow-sm placeholder:text-slate-400 focus:border-brand-primary/60 focus:outline-none focus:ring-4 focus:ring-brand-primary/10"
            id="contact-whatsapp"
            onChange={handleWhatsappChange}
            placeholder={t.contact.form.whatsappPlaceholder}
            value={whatsapp}
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-600" htmlFor="contact-company">
            {t.contact.form.companyLabel}
          </label>
          <input
            className="mt-2 w-full rounded-2xl border border-emerald-100 bg-white px-4 py-3 text-sm text-slate-950 shadow-sm placeholder:text-slate-400 focus:border-brand-primary/60 focus:outline-none focus:ring-4 focus:ring-brand-primary/10"
            id="contact-company"
            onChange={handleCompanyChange}
            placeholder={t.contact.form.companyPlaceholder}
            value={company}
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-600" htmlFor="contact-service">
            {t.contact.form.serviceLabel}
          </label>
          <select
            className="mt-2 w-full rounded-2xl border border-emerald-100 bg-white px-4 py-3 text-sm text-slate-950 shadow-sm focus:border-brand-primary/60 focus:outline-none focus:ring-4 focus:ring-brand-primary/10"
            id="contact-service"
            onChange={handleServiceChange}
            value={service}
          >
            {services.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="text-xs font-semibold text-slate-600" htmlFor="contact-description">
          {t.contact.form.descriptionLabel}
        </label>
        <textarea
          className="mt-2 w-full resize-none rounded-2xl border border-emerald-100 bg-white px-4 py-3 text-sm text-slate-950 shadow-sm placeholder:text-slate-400 focus:border-brand-primary/60 focus:outline-none focus:ring-4 focus:ring-brand-primary/10"
          id="contact-description"
          onChange={handleDescriptionChange}
          placeholder={t.contact.form.descriptionPlaceholder}
          rows={4}
          value={description}
        />
      </div>

      <Button className="w-full text-slate-950" size="lg" type="submit">
        {t.contact.form.submit}
      </Button>
    </form>
  );
}
