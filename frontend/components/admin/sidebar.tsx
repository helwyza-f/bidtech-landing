"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function DashboardIcon() {
  return (
    <svg fill="none" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
      <rect height="8" rx="1.5" stroke="currentColor" strokeWidth="1.8" width="8" x="3" y="3" />
      <rect height="4" rx="1.5" stroke="currentColor" strokeWidth="1.8" width="8" x="13" y="3" />
      <rect height="12" rx="1.5" stroke="currentColor" strokeWidth="1.8" width="8" x="13" y="9" />
      <rect height="4" rx="1.5" stroke="currentColor" strokeWidth="1.8" width="8" x="3" y="13" />
    </svg>
  );
}

function OrdersIcon() {
  return (
    <svg fill="none" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4 6h16M4 6l1.5 12.5A2 2 0 0 0 7.49 20h9.02a2 2 0 0 0 1.99-1.5L20 6M4 6l-.7-2.5A1 1 0 0 0 2.34 3H1M9 10h6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

const navItems = [
  { href: "/admin", label: "Dashboard", icon: DashboardIcon },
  { href: "/admin/pesanan", label: "Pesanan", icon: OrdersIcon },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-white/10 bg-[#0b0f12] px-4 py-6">
      <div className="mb-10 px-2 text-xl font-extrabold">
        BID<span className="text-[#63e009]">TECH</span>
      </div>
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => {
          const active = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                active
                  ? "bg-[#63e009]/10 text-[#63e009]"
                  : "text-zinc-400 hover:bg-white/5 hover:text-white"
              }`}
              href={item.href}
              key={item.href}
            >
              {active ? (
                <span className="absolute -left-4 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-[#63e009]" />
              ) : null}
              <Icon />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
