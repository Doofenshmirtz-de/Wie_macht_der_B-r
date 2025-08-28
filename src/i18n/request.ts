import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import type { AbstractIntlMessages } from "next-intl";

export default getRequestConfig(async ({ locale }: { locale: string }) => {
  const supportedLocales = routing.locales as unknown as string[];
  const defaultLocale = routing.defaultLocale as unknown as string;
  const finalLocale = supportedLocales.includes(locale) ? locale : defaultLocale;

  const loaders: Record<string, () => Promise<{ default: AbstractIntlMessages }>> = {
    de: () => import("../app/messages/de.json"),
    en: () => import("../app/messages/en.json"),
  };

  const loader = loaders[finalLocale] || loaders[defaultLocale];
  const messages: AbstractIntlMessages = (await loader()).default;

  return {
    locale: finalLocale,
    messages,
  };
});


