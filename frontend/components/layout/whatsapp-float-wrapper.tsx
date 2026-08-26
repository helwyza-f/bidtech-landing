"use client";

import { usePathname } from "next/navigation";
import { WhatsAppFloat } from "./whatsapp-float";

export function WhatsAppFloatWrapper() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) return null;

  return <WhatsAppFloat />;
}
