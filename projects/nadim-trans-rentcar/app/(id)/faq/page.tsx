import FaqPage from "@/app/_pages/FaqPage";
import { pageMetadata } from "@/lib/seo";
import { translate } from "@/lib/i18n";

export const metadata = pageMetadata("id", "/faq", translate("id", "metadata.faqTitle"), translate("id", "metadata.faqDescription"));

export default function IndonesianFaqPage() {
  return <FaqPage locale="id" />;
}
