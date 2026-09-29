import { getRequestConfig } from "next-intl/server";
import { getMessages, type Locale } from "@/lib/i18n";

export default getRequestConfig(async ({ requestLocale }) => {
  const requestedLocale = await requestLocale;
  const resolvedLocale: Locale = requestedLocale === "en" ? "en" : "id";

  return {
    locale: resolvedLocale,
    messages: getMessages(resolvedLocale),
  };
});
