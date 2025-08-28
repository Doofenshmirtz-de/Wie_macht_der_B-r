import {defineRouting} from "next-intl/routing";

export const routing = defineRouting({
  locales: ["de", "en"],
  defaultLocale: "de",
  localePrefix: "always",
  pathnames: {
    '/': '/',
    '/game/bomb': '/game/bomb'
  }
});

export type AppLocale = (typeof routing)["locales"][number];


