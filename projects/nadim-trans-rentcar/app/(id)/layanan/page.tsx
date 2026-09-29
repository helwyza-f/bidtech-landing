import ServicesPage from "@/app/_pages/ServicesPage";
import { pageMetadata } from "@/lib/seo";
import { translate } from "@/lib/i18n";

export const metadata = pageMetadata("id", "/layanan", translate("id", "metadata.servicesTitle"), translate("id", "metadata.servicesDescription"));

export default function IndonesianServicesPage() {
  return <ServicesPage locale="id" />;
}
