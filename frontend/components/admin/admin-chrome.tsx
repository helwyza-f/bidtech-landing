"use client";

import { usePathname } from "next/navigation";

import { AdminSidebar } from "@/components/admin/sidebar";
import { LogoutButton } from "@/components/admin/logout-button";

export function AdminChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-[#050505] text-white">
      <AdminSidebar />
      <div className="flex-1">
        <div className="flex items-center justify-end border-b border-white/10 px-6 py-4">
          <LogoutButton />
        </div>
        <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">{children}</main>
      </div>
    </div>
  );
}
