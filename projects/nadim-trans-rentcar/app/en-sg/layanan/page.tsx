import ServicesPage from "@/app/_pages/ServicesPage";
import { pageMetadata } from "@/lib/seo";
import { translate } from "@/lib/i18n";

export const metadata = pageMetadata(
  "en-sg",
  "/layanan",
  translate("en-sg", "metadata.servicesTitle"),
  translate("en-sg", "metadata.servicesDescription")
);

export default function EnglishSingaporeServicesPage() {
  return <ServicesPage locale="en-sg" />;
}
