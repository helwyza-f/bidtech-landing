import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function MarketingLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#020303_0%,#080b0c_55%,#050505_100%)]">
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:linear-gradient(180deg,rgba(0,0,0,0.8),transparent)]" />
      <SiteHeader />
      {children}
      <SiteFooter />
    </div>
  );
}
