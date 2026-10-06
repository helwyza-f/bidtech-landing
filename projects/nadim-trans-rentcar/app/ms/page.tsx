import HomePage from "@/app/_pages/HomePage";
import { pageMetadata } from "@/lib/seo";
import { translate } from "@/lib/i18n";

export const metadata = pageMetadata(
  "ms",
  "/",
  translate("ms", "metadata.homeTitle"),
  translate("ms", "metadata.homeDescription")
);

export default function MelayuHomePage() {
  return <HomePage locale="ms" />;
}
