import { AdminChrome } from "@/features/admin/components/admin-chrome";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminChrome>{children}</AdminChrome>;
}
