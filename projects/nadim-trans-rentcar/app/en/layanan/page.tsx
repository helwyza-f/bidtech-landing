import ServicesPage from "@/app/_pages/ServicesPage";
import { pageMetadata } from "@/lib/seo";
import { translate } from "@/lib/i18n";

export const metadata = pageMetadata("en", "/layanan", translate("en", "metadata.servicesTitle"), translate("en", "metadata.servicesDescription"));

export default function EnglishServicesPage() {
  return <ServicesPage locale="en" />;
}
