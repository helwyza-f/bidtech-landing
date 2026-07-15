import Image from "next/image";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/8 bg-black/45 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-5 py-4 md:px-8">
        <a className="flex items-center gap-3" href="#hero">
          <Image
            src="/images/bidtech-logo.jpeg"
            alt="BidTech logo"
            width={52}
            height={52}
            className="rounded-2xl border border-lime-300/20 object-cover"
          />
          <div>
            <p className="font-[family-name:var(--font-sora)] text-base font-semibold">BidTech</p>
            <p className="text-xs text-zinc-400">Solusi Digital Inovatif untuk Bisnis</p>
          </div>
        </a>

        <nav className="hidden items-center gap-6 text-sm text-zinc-400 md:flex">
          {navItems.map((item) => (
            <a className="transition hover:text-lime-300" href={item.href} key={item.label}>
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
