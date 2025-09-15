import {getRequestConfig} from 'next-intl/server';
import {routing} from './src/i18n/routing';

export default getRequestConfig(async ({locale}) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  return {
    locale: locale as string,
    messages: (await import(`./src/app/messages/${locale}.json`)).default
  };
});