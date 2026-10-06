import VehicleCatalogPage from "@/app/_pages/VehicleCatalogPage";
import { pageMetadata } from "@/lib/seo";
import { translate } from "@/lib/i18n";

export const metadata = pageMetadata(
  "ms",
  "/kendaraan",
  translate("ms", "metadata.catalogTitle"),
  translate("ms", "metadata.catalogDescription")
);

export default function MelayuVehicleCatalogPage() {
  return <VehicleCatalogPage locale="ms" />;
}
