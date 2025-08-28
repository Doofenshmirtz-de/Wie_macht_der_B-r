import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { setRequestLocale, getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import type { AppLocale } from "@/i18n/routing";
import { Header } from "../ui/Header";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type MaybePromise<T> = T | Promise<T>;

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: MaybePromise<{ locale: string }>;
};

export default async function LocaleLayout(props: LocaleLayoutProps) {
  const { children } = props;
  const params = await props.params;
  const locale = (params as { locale: string })?.locale as AppLocale;
  if (!routing.locales.includes(locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className="mx-auto max-w-screen-md md:max-w-screen-lg lg:max-w-screen-xl px-2 sm:px-4">
        <div className="my-3 rounded-[18px] border border-white/10 panel-bg backdrop-blur-md shadow-xl overflow-hidden">
          <Header />
          {children}
        </div>
      </div>
    </NextIntlClientProvider>
  );
}


