"use client";

import { usePathname } from "next/navigation";

import { AdminSidebar } from "@/components/admin/sidebar";
import { LogoutButton } from "@/components/admin/logout-button";

const pageTitles: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/pesanan": "Pesanan",
};

export function AdminChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const title = pageTitles[pathname] ?? "Admin";

  return (
    <div className="flex min-h-screen bg-[#050505] text-white">
      <AdminSidebar />
      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-white/10 bg-[#0b0f12]/60 px-6 py-4 backdrop-blur">
          <span className="text-sm font-semibold text-zinc-300">{title}</span>
          <LogoutButton />
        </header>
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">{children}</main>
      </div>
    </div>
  );
}
