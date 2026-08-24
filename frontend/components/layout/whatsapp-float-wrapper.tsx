"use client";

import { usePathname } from "next/navigation";
import { WhatsAppFloat } from "./whatsapp-float";

export function WhatsAppFloatWrapper() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  const isTemplatePreview = pathname?.startsWith("/templates/automotive");

  if (isAdmin || isTemplatePreview) return null;

  return <WhatsAppFloat />;
}
