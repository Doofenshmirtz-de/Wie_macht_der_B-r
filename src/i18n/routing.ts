import {defineRouting} from "next-intl/routing";

export const routing = defineRouting({
  locales: ["de", "en"],
  defaultLocale: "de",
  localePrefix: "always",
  pathnames: {
    '/': '/',
    '/game/bomb': '/game/bomb',
    '/game/truthordare': '/game/truthordare',
    '/game/neverhaveiever': '/game/neverhaveiever',
    '/faq': '/faq',
    '/blog': '/blog',
    '/impressum': '/impressum',
    '/datenschutz': '/datenschutz'
  }
} as const);

export type AppLocale = (typeof routing)["locales"][number];


