import ServicesPage from "@/app/_pages/ServicesPage";
import { pageMetadata } from "@/lib/seo";
import { translate } from "@/lib/i18n";

export const metadata = pageMetadata(
  "ms",
  "/layanan",
  translate("ms", "metadata.servicesTitle"),
  translate("ms", "metadata.servicesDescription")
);

export default function MelayuServicesPage() {
  return <ServicesPage locale="ms" />;
}
