import VehicleCatalogPage from "@/app/_pages/VehicleCatalogPage";
import { pageMetadata } from "@/lib/seo";
import { translate } from "@/lib/i18n";

export const metadata = pageMetadata("en", "/kendaraan", translate("en", "metadata.catalogTitle"), translate("en", "metadata.catalogDescription"));

export default function EnglishVehicleCatalogPage() {
  return <VehicleCatalogPage locale="en" />;
}
