"use client";

import {
  createContext,
  useContext,
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from "react";

import { useLanguage } from "@/lib/i18n";

interface SelectedPackage {
  service: string;
  plan: string;
  price: string;
}

interface ContactFormContextValue {
  company: string;
  description: string;
  name: string;
  service: string;
  services: string[];
  t: ReturnType<typeof useLanguage>["t"];
  whatsapp: string;
  handleCompanyChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleDescriptionChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  handleNameChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleServiceChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  handleSubmit: (event: FormEvent) => void;
  handleWhatsappChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const ContactFormContext = createContext<ContactFormContextValue | null>(null);

export function ContactFormProvider({
  children,
  selectedPackage,
}: {
  children: ReactNode;
  selectedPackage: SelectedPackage | null;
}) {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [company, setCompany] = useState("");
  const [service, setService] = useState(selectedPackage?.service ?? t.contact.form.services[0]);
  const [description, setDescription] = useState(
    selectedPackage ? `Saya tertarik dengan paket ${selectedPackage.plan} (${selectedPackage.price}).` : "",
  );

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, whatsapp, company, service, description }),
    }).catch(() => {
      // Non-blocking: order storage failing shouldn't stop the user from reaching us via WhatsApp.
    });

    const message = [
      `Halo BidTech, saya ${name || "-"} dari ${company || "-"}.`,
      `Nomor WhatsApp: ${whatsapp || "-"}`,
      `Jenis Layanan: ${service}`,
      `Deskripsi Proyek: ${description || "-"}`,
    ].join("\n");

    window.open(`https://wa.me/628217601455?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <ContactFormContext.Provider
      value={{
        company,
        description,
        name,
        service,
        services: t.contact.form.services,
        t,
        whatsapp,
        handleCompanyChange: (event) => setCompany(event.target.value),
        handleDescriptionChange: (event) => setDescription(event.target.value),
        handleNameChange: (event) => setName(event.target.value),
        handleServiceChange: (event) => setService(event.target.value),
        handleSubmit,
        handleWhatsappChange: (event) => setWhatsapp(event.target.value),
      }}
    >
      {children}
    </ContactFormContext.Provider>
  );
}

export function useContactForm() {
  const context = useContext(ContactFormContext);

  if (!context) {
    throw new Error("useContactForm must be used inside ContactFormProvider");
  }

  return context;
}
