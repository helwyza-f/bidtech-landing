"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/pesanan", label: "Pesanan" },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-56 shrink-0 flex-col border-r border-white/10 bg-[#0b0f12] px-4 py-6">
      <div className="mb-8 px-2 text-xl font-extrabold">
        BID<span className="text-[#63e009]">TECH</span>
      </div>
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => {
          const active = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
          return (
            <Link
              className={`rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                active
                  ? "bg-[#63e009]/10 text-[#63e009]"
                  : "text-zinc-400 hover:bg-white/5 hover:text-white"
              }`}
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
