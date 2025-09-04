import {defineRouting} from "next-intl/routing";

export const routing = defineRouting({
  locales: ["de", "en"],
  defaultLocale: "de",
  localePrefix: "always",
  pathnames: {
    '/': '/',
    '/game/bomb': '/game/bomb',
    '/game/truthordare': '/game/truthordare'
  }
} as const);

export type AppLocale = (typeof routing)["locales"][number];


