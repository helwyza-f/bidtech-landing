import VehicleCatalogPage from "@/app/_pages/VehicleCatalogPage";
import { pageMetadata } from "@/lib/seo";
import { translate } from "@/lib/i18n";

export const metadata = pageMetadata("id", "/kendaraan", translate("id", "metadata.catalogTitle"), translate("id", "metadata.catalogDescription"));

export default function IndonesianVehicleCatalogPage() {
  return <VehicleCatalogPage locale="id" />;
}
