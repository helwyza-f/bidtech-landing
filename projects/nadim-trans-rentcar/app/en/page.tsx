import HomePage from "@/app/_pages/HomePage";
import { pageMetadata } from "@/lib/seo";
import { translate } from "@/lib/i18n";

export const metadata = pageMetadata("en", "/", translate("en", "metadata.homeTitle"), translate("en", "metadata.homeDescription"));

export default function EnglishHomePage() {
  return <HomePage locale="en" />;
}
