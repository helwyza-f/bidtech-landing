import VehicleCatalogPage from "@/app/_pages/VehicleCatalogPage";
import { pageMetadata } from "@/lib/seo";
import { translate } from "@/lib/i18n";

export const metadata = pageMetadata(
  "en-sg",
  "/kendaraan",
  translate("en-sg", "metadata.catalogTitle"),
  translate("en-sg", "metadata.catalogDescription")
);

export default function EnglishSingaporeVehicleCatalogPage() {
  return <VehicleCatalogPage locale="en-sg" />;
}
