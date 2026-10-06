import FaqPage from "@/app/_pages/FaqPage";
import { pageMetadata } from "@/lib/seo";
import { translate } from "@/lib/i18n";

export const metadata = pageMetadata(
  "en-sg",
  "/faq",
  translate("en-sg", "metadata.faqTitle"),
  translate("en-sg", "metadata.faqDescription")
);

export default function EnglishSingaporeFaqPage() {
  return <FaqPage locale="en-sg" />;
}
