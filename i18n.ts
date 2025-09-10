import {getRequestConfig} from 'next-intl/server';
import {routing} from './src/i18n/routing';
import type {AbstractIntlMessages} from 'next-intl';

// Exponiert die Konfiguration direkt an next-intl, damit Auto-Discovery funktioniert
export default getRequestConfig(async ({locale}: {locale?: string}) => {
  const supportedLocales = routing.locales as unknown as string[];
  const defaultLocale = routing.defaultLocale as unknown as string;
  const candidate = locale ?? defaultLocale;
  const finalLocale = supportedLocales.includes(candidate) ? candidate : defaultLocale;

  const loaders: Record<string, () => Promise<{default: AbstractIntlMessages}>> = {
    de: () => import('./src/app/messages/de.json'),
    en: () => import('./src/app/messages/en.json'),
  };

  const loader = loaders[finalLocale] || loaders[defaultLocale];
  const messages: AbstractIntlMessages = (await loader()).default;

  return {
    locale: finalLocale,
    messages,
  };
});
