"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { createNavigation } from "next-intl/navigation";
import { routing } from "@/i18n/routing";

const { Link, useRouter } = createNavigation(routing);

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations();

  const canGoBack = pathname !== "/" && pathname !== `/${locale}`;

  return (
    <header className="sticky top-0 z-20 bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg">
      <div className="mx-auto max-w-screen-md px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-lg font-bold tracking-wide hover:opacity-90 transition">
          Wie macht der Bär
        </Link>

        <div className="flex items-center gap-3">
          <Link
            aria-label="Deutsch"
            href={pathname || "/"}
            locale="de"
            className={`relative h-7 w-10 rounded overflow-hidden ring-2 ${locale === "de" ? "ring-yellow-300" : "ring-transparent"}`}
          >
            <Image src="/flags/de.svg" alt="Deutsch" fill sizes="40px" />
          </Link>
          <Link
            aria-label="English"
            href={pathname || "/"}
            locale="en"
            className={`relative h-7 w-10 rounded overflow-hidden ring-2 ${locale === "en" ? "ring-yellow-300" : "ring-transparent"}`}
          >
            <Image src="/flags/gb.svg" alt="English" fill sizes="40px" />
          </Link>
        </div>
      </div>
    </header>
  );
}


