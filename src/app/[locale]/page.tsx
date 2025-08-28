"use client";

// import Link from "next/link"; // entfernt: wir nutzen LocaleLink
import Image from "next/image";
import { useTranslations } from "next-intl";
import { createNavigation } from "next-intl/navigation";
import { routing } from "@/i18n/routing";
import { useRef } from "react";

const { Link: LocaleLink } = createNavigation(routing);

export default function Home() {
  const t = useTranslations();
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const scrollByAmount = (dir: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8 * dir;
    el.scrollBy({ left: amount, behavior: "smooth" });
  };
  return (
    <main className="mx-auto max-w-screen-lg px-4 py-8">
      <section className="text-center mt-6">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-amber-400 via-pink-500 to-indigo-500 bg-clip-text text-transparent">
          {t("title")}
        </h1>
        <p className="mt-2 text-sm text-white/80">{t("chooseGame")}</p>
      </section>

      <section className="mt-8">
        <div className="relative">
          <button
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full bg-white/20 hover:bg-white/30"
            onClick={() => scrollByAmount(-1)}
            aria-label="prev"
          >
            ‹
          </button>
          <div ref={scrollRef} className="flex gap-6 overflow-x-auto snap-x pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth">
          <GameCard
            title={t("bombParty")}
            description="Der Klassiker"
            href="/game/bomb"
            color="from-orange-400 to-red-500"
            iconSrc="/bomb.svg"
          />
          <GameCard
            title="Quiz Show"
            description={t("comingSoon")}
            href={null}
            disabled
            color="from-fuchsia-400 to-blue-500"
            iconSrc="/icons/rocket.svg"
          />
          <GameCard
            title="Charades"
            description={t("comingSoon")}
            href={null}
            disabled
            color="from-green-400 to-teal-500"
            iconSrc="/icons/gift.svg"
          />
          </div>
          <button
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full bg-white/20 hover:bg-white/30"
            onClick={() => scrollByAmount(1)}
            aria-label="next"
          >
            ›
          </button>
        </div>
      </section>
    </main>
  );
}

function GameCard({
  title,
  description,
  href,
  color,
  iconSrc,
  disabled,
}: {
  title: string;
  description: string;
  href: string | null;
  color: string;
  iconSrc: string;
  disabled?: boolean;
}) {
  const content = (
    <div className={`snap-center min-w-[380px] sm:min-w-[560px] min-h-[320px] sm:min-h-[380px] rounded-[24px] p-7 text-white shadow-2xl bg-gradient-to-br ${color} ${disabled ? "opacity-60" : "hover:scale-[1.02]"} transition`}>
      <div className="flex items-center gap-4">
        <div className="relative h-12 w-12">
          <Image src={iconSrc} alt="" fill sizes="48px" />
        </div>
        <h3 className="text-2xl font-bold">{title}</h3>
      </div>
      <p className="mt-3 text-base">{description}</p>
      {!disabled && (
        <div className="relative mt-4 h-64 sm:h-80 w-full rounded-2xl overflow-hidden ring-1 ring-white/10">
          <Image src="/bearbomb.jpg" alt="Bär mit Bombe" fill sizes="(max-width: 640px) 420px, 720px" className="object-contain rounded-2xl" />
        </div>
      )}
    </div>
  );

  if (disabled || !href) return content;
  
  // Type-safe href validation
  const validHref: "/game/bomb" = href as "/game/bomb";
  
  return (
    <LocaleLink href={validHref} className="block">
      {content}
    </LocaleLink>
  );
}


