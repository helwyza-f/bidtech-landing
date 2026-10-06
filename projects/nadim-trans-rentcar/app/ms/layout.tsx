import "@/styles/globals.css";
import type { Viewport } from "next";
import { unstable_setRequestLocale } from "next-intl/server";
import RootDocument from "@/components/layout/RootDocument";
import { rootMetadata } from "@/lib/seo";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#020617",
};

export const metadata = rootMetadata("ms");

export default function MelayuLayout({ children }: { children: React.ReactNode }) {
  unstable_setRequestLocale("ms");
  return <RootDocument locale="ms">{children}</RootDocument>;
}
