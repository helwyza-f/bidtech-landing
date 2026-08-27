import { siteConfig } from "@/data/site";

export function createWhatsAppUrl(
  message?: string
) {
  const baseUrl = `https://wa.me/${siteConfig.contact.whatsapp}`;

  if (!message) {
    return baseUrl;
  }

  return `${baseUrl}?text=${encodeURIComponent(message)}`;
}