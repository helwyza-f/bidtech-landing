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

interface AdminSidebarProps {
  collapsed: boolean;
  mobileOpen: boolean;
  onClose: () => void;
}

export function AdminSidebar({ collapsed, mobileOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {mobileOpen ? (
        <button
          aria-label="Tutup sidebar"
          className="fixed inset-0 z-30 bg-slate-950/25 backdrop-blur-[1px] lg:hidden"
          onClick={onClose}
          type="button"
        />
      ) : null}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 shrink-0 flex-col border-r border-slate-200 bg-white px-4 py-6 text-slate-900 shadow-xl transition-all duration-200 lg:static lg:translate-x-0 lg:shadow-none ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } ${collapsed ? "lg:w-20" : "lg:w-72"}`}
      >
        <div className={`mb-10 flex items-center px-2 ${collapsed ? "lg:justify-center" : "justify-between"}`}>
          <div className="text-xl font-extrabold">
            <span className={collapsed ? "lg:hidden" : ""}>
              BID<span className="text-[#63e009]">TECH</span>
            </span>
            <span className={`hidden text-[#63e009] ${collapsed ? "lg:inline" : ""}`}>B</span>
          </div>
          <button
            aria-label="Tutup sidebar"
            className="flex size-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 lg:hidden"
            onClick={onClose}
            type="button"
          >
            ×
          </button>
        </div>

        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const active = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                className={`group relative flex items-center rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                  collapsed ? "lg:justify-center lg:gap-0" : "gap-3"
                } ${
                  active
                    ? "bg-[#63e009] text-[#173b0b] shadow-[0_10px_24px_rgba(99,224,9,0.22)]"
                    : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                }`}
                href={item.href}
                key={item.href}
                onClick={onClose}
                title={collapsed ? item.label : undefined}
              >
                {active ? (
                  <span className="absolute -left-4 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-[#63e009]" />
                ) : null}
                <span className="shrink-0">
                  <Icon />
                </span>
                <span className={collapsed ? "lg:hidden" : ""}>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
