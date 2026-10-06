import { getRequestConfig } from "next-intl/server";
import { getMessages, LOCALES, type Locale } from "@/lib/i18n";

export default getRequestConfig(async ({ requestLocale }) => {
  const requestedLocale = await requestLocale;
  const resolvedLocale: Locale = (LOCALES as readonly string[]).includes(requestedLocale as string)
    ? (requestedLocale as Locale)
    : "id";

  return {
    locale: resolvedLocale,
    messages: getMessages(resolvedLocale),
  };
});
