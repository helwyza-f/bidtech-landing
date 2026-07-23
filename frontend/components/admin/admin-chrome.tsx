"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";

import { AdminSidebar } from "@/components/admin/sidebar";
import { LogoutButton } from "@/components/admin/logout-button";

const pageTitles: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/pesanan": "Pesanan",
};

export function AdminChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const title = pageTitles[pathname] ?? "Admin";

  return (
    <div className="flex min-h-screen bg-[#f4f7f4] text-slate-950">
      <AdminSidebar
        collapsed={sidebarCollapsed}
        mobileOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex min-h-20 items-center justify-between border-b border-slate-200 bg-white px-5 py-4 sm:px-8">
          <div className="flex items-center gap-3">
            <button
              aria-label="Buka sidebar"
              className="flex size-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 transition hover:border-lime-400 hover:text-slate-950 lg:hidden"
              onClick={() => setMobileSidebarOpen(true)}
              type="button"
            >
              <span className="flex w-4 flex-col gap-1">
                <span className="h-0.5 w-full rounded-full bg-current" />
                <span className="h-0.5 w-full rounded-full bg-current" />
                <span className="h-0.5 w-full rounded-full bg-current" />
              </span>
            </button>
            <button
              aria-label="Perkecil atau buka sidebar"
              className="hidden size-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 transition hover:border-lime-400 hover:text-slate-950 lg:flex"
              onClick={() => setSidebarCollapsed((collapsed) => !collapsed)}
              type="button"
            >
              <span className="flex w-4 flex-col gap-1">
                <span className="h-0.5 w-full rounded-full bg-current" />
                <span className="h-0.5 w-full rounded-full bg-current" />
                <span className="h-0.5 w-full rounded-full bg-current" />
              </span>
            </button>
            <span className="text-lg font-bold text-slate-950 sm:text-xl">{title} Admin</span>
          </div>
          <div className="flex items-center gap-3 text-right">
            <div className="hidden sm:block">
              <p className="text-sm font-bold text-slate-900">Administrator</p>
              <p className="text-xs text-slate-500">BidTech</p>
            </div>
            <div className="flex size-10 items-center justify-center rounded-full bg-[#63e009]/20 text-sm font-extrabold text-green-700">
              A
            </div>
            <LogoutButton />
          </div>
        </header>
        <main className="w-full flex-1 px-4 py-8 sm:px-8 lg:px-10">{children}</main>
      </div>
    </div>
  );
}
