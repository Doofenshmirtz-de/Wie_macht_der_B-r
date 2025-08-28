import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ locale }: { locale: string }) => {
  const supportedLocales = routing.locales as unknown as string[];
  const defaultLocale = routing.defaultLocale as unknown as string;
  const finalLocale = supportedLocales.includes(locale) ? locale : defaultLocale;

  const loaders = {
    de: () => import("../app/messages/de.json"),
    en: () => import("../app/messages/en.json"),
  } as const;

  const loader = (loaders as Record<string, () => Promise<any>>)[finalLocale] || loaders[defaultLocale as keyof typeof loaders];
  const messages = (await loader()).default;

  return {
    locale: finalLocale,
    messages,
  };
});


