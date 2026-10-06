import HomePage from "@/app/_pages/HomePage";
import { pageMetadata } from "@/lib/seo";
import { translate } from "@/lib/i18n";

export const metadata = pageMetadata(
  "en-sg",
  "/",
  translate("en-sg", "metadata.homeTitle"),
  translate("en-sg", "metadata.homeDescription")
);

export default function EnglishSingaporeHomePage() {
  return <HomePage locale="en-sg" />;
}
