import HomePage from "@/app/_pages/HomePage";
import { pageMetadata } from "@/lib/seo";
import { translate } from "@/lib/i18n";

export const metadata = pageMetadata("id", "/", translate("id", "metadata.homeTitle"), translate("id", "metadata.homeDescription"));

export default function IndonesianHomePage() {
  return <HomePage locale="id" />;
}
