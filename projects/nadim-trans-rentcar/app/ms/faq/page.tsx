import FaqPage from "@/app/_pages/FaqPage";
import { pageMetadata } from "@/lib/seo";
import { translate } from "@/lib/i18n";

export const metadata = pageMetadata(
  "ms",
  "/faq",
  translate("ms", "metadata.faqTitle"),
  translate("ms", "metadata.faqDescription")
);

export default function MelayuFaqPage() {
  return <FaqPage locale="ms" />;
}
