import FaqPage from "@/app/_pages/FaqPage";
import { pageMetadata } from "@/lib/seo";
import { translate } from "@/lib/i18n";

export const metadata = pageMetadata("en", "/faq", translate("en", "metadata.faqTitle"), translate("en", "metadata.faqDescription"));

export default function EnglishFaqPage() {
  return <FaqPage locale="en" />;
}
