"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useLanguage } from "../../providers/LanguageProvider";
import Link from "next/link";
import Image from "next/image";
import { categoriesDE, categoriesEN } from "./shared/categories";

type Player = { id: string; name: string };

export default function BombGamePage() {
  const { lang, t } = useLanguage();
  const [step, setStep] = useState<"players" | "categories" | "running" | "explode" | "lost" | "next" | "final">("players");
  const [players, setPlayers] = useState<Player[]>([]);
  const [newPlayer, setNewPlayer] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [roundLen, setRoundLen] = useState(30);
  const [rounds, setRounds] = useState(8);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [currentWord, setCurrentWord] = useState<string | null>(null);
  const [roundIndex, setRoundIndex] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const audioTick = useRef<HTMLAudioElement | null>(null);
  const audioExplosion = useRef<HTMLAudioElement | null>(null);
  const [volume, setVolume] = useState(0.7);
  const [muted, setMuted] = useState(false);
  const timerRef = useRef<number | null>(null);
  const postExplosionRef = useRef<number | null>(null);
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  const dict = useMemo(() => (lang === "de" ? categoriesDE : categoriesEN), [lang]);

  const canConfirmPlayers = players.length >= 2 && players.length <= 12;

  const startRound = () => {
    const pool = activeCategory ? dict[activeCategory] : Object.values(dict).flat();
    const word = pool[Math.floor(Math.random() * pool.length)];
    setCurrentWord(word);
    setStep("running");
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      // time up → explosion
      if (audioTick.current) {
        audioTick.current.pause();
        audioTick.current.currentTime = 0;
      }
      if (audioExplosion.current) {
        audioExplosion.current.volume = muted ? 0 : volume;
        audioExplosion.current.play().catch(() => {});
      }
      // Vibrationsfeedback (falls verfügbar)
      if (typeof navigator !== "undefined" && (navigator as any).vibrate) {
        (navigator as any).vibrate([100, 80, 120]);
      }
      setStep("explode");
      if (postExplosionRef.current) window.clearTimeout(postExplosionRef.current);
      postExplosionRef.current = window.setTimeout(() => setStep("lost"), 3000);
    }, roundLen * 1000);
    if (audioTick.current) {
      try {
        audioTick.current.volume = muted ? 0 : volume;
        audioTick.current.muted = false;
        audioTick.current.loop = true;
        audioTick.current.currentTime = 0;
        audioTick.current.play().catch(() => {});
      } catch {}
    }
  };

  const confirmLoser = (playerId: string) => {
    setScores(prev => ({ ...prev, [playerId]: (prev[playerId] ?? 0) + 1 }));
    if (audioTick.current) {
      audioTick.current.pause();
      audioTick.current.currentTime = 0;
    }
    if (timerRef.current) window.clearTimeout(timerRef.current);
    if (postExplosionRef.current) window.clearTimeout(postExplosionRef.current);
    if (roundIndex + 1 >= rounds) {
      setStep("final");
    } else {
      setRoundIndex(roundIndex + 1);
      setStep("next");
    }
  };

  const resetToHome = () => {
    setShowExitConfirm(true);
  };

  useEffect(() => {
    // keep volumes in sync
    const vol = muted ? 0 : volume;
    if (audioTick.current) audioTick.current.volume = vol;
    if (audioExplosion.current) audioExplosion.current.volume = vol;
  }, [volume, muted]);

  // Persist settings
  useEffect(() => {
    const data = (typeof window !== "undefined" && window.localStorage.getItem("wmb-settings"));
    if (data) {
      try {
        const parsed = JSON.parse(data);
        if (typeof parsed.roundLen === "number") setRoundLen(parsed.roundLen);
        if (typeof parsed.rounds === "number") setRounds(parsed.rounds);
        if (typeof parsed.volume === "number") setVolume(parsed.volume);
        if (typeof parsed.muted === "boolean") setMuted(parsed.muted);
      } catch {}
    }
  }, []);

  useEffect(() => {
    const payload = { roundLen, rounds, volume, muted };
    if (typeof window !== "undefined") {
      window.localStorage.setItem("wmb-settings", JSON.stringify(payload));
    }
  }, [roundLen, rounds, volume, muted]);

  useEffect(() => () => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    if (postExplosionRef.current) window.clearTimeout(postExplosionRef.current);
  }, []);

  return (
    <div className="mx-auto max-w-screen-sm px-4 py-4">
      <div className="flex items-center justify-between mb-2">
        <button onClick={resetToHome} aria-label="close" className="text-2xl">×</button>
        <div />
        <button
          aria-label="settings"
          aria-expanded={showSettings}
          aria-controls="settings-panel"
          onClick={() => setShowSettings(s => !s)}
          className="inline-flex"
        >
          <Image src="/settings.svg" alt="settings" width={24} height={24} className="invert" />
        </button>
      </div>
      {showSettings && (
        <div id="settings-panel" className="mb-4 rounded-lg bg-neutral-900/80 p-3 text-sm text-white/90 space-y-3 shadow-xl">
            <div>
              <div className="font-semibold">{t("howTo")}</div>
              <p className="opacity-80">Nenne reihum Begriffe aus der gewählten Kategorie. Wer die Bombe hält, wenn sie explodiert, verliert die Runde.</p>
            </div>
            <div>
              <label className="flex items-center justify-between gap-3">
                <span>{t("roundLength")} (10–90s)</span>
                <input type="range" min={10} max={90} value={roundLen} onChange={e => setRoundLen(parseInt(e.target.value))} />
              </label>
              <div className="text-right">{roundLen}s</div>
            </div>
            <div>
              <label className="flex items-center justify-between gap-3">
                <span>{t("roundCount")} (3–10)</span>
                <input type="range" min={3} max={10} value={rounds} onChange={e => setRounds(parseInt(e.target.value))} />
              </label>
              <div className="text-right">{rounds}</div>
            </div>
            <div>
              <div className="flex items-center justify-between gap-3">
                <span>{t("volume")} (0–100%)</span>
                <div className="flex items-center gap-2">
                  <button
                    aria-label={muted ? "Unmute" : "Mute"}
                    className="rounded bg-white/10 px-2 py-1"
                    onClick={() => setMuted(m => !m)}
                  >
                    {muted ? "🔇" : "🔊"}
                  </button>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={Math.round(volume * 100)}
                    onChange={e => { setMuted(false); setVolume(parseInt(e.target.value) / 100); }}
                  />
                </div>
              </div>
              <div className="text-right">{muted ? "0%" : `${Math.round(volume * 100)}%`}</div>
            </div>
        </div>
      )}

      {step === "players" && (
        <section>
          <h3 className="text-lg font-bold mb-2">{t("whoPlays")}</h3>
          <form
            onSubmit={e => {
              e.preventDefault();
              const name = newPlayer.trim();
              if (!name) return;
              if (players.length >= 12) return;
              setPlayers([...players, { id: crypto.randomUUID(), name }]);
              setNewPlayer("");
            }}
            className="flex gap-2"
          >
            <input
              className="flex-1 rounded-lg bg-neutral-900/50 px-3 py-2"
              placeholder={t("enterName")}
              value={newPlayer}
              onChange={e => setNewPlayer(e.target.value)}
            />
            <button className="px-3 rounded bg-emerald-600" type="submit">OK</button>
          </form>
          <ul className="mt-3 space-y-2">
            {players.map(p => (
              <li key={p.id} className="flex items-center justify-between rounded bg-neutral-900/50 px-3 py-2">
                <span>{p.name}</span>
                <button className="text-red-400" onClick={() => setPlayers(cur => cur.filter(x => x.id !== p.id))}>Entfernen</button>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex items-center justify-between">
            <div className="text-sm opacity-80">
              {players.length < 2 && <span>Mindestens 2 Spieler nötig</span>}
              {players.length > 12 && <span>Maximal 12 Spieler erlaubt</span>}
            </div>
            <button disabled={!canConfirmPlayers} className="rounded bg-amber-500 px-4 py-2 disabled:opacity-50" onClick={() => setStep("categories")}>{t("confirmPlayers")}</button>
          </div>
        </section>
      )}

      {step === "categories" && (
        <section>
          <h3 className="text-lg font-bold mb-3">{t("categories")}</h3>
          <div className="space-y-3">
            {Object.entries(dict).map(([cat, items]) => (
              <label key={cat} className={`flex items-center justify-between rounded-xl p-3 bg-neutral-900/50 cursor-pointer ${activeCategory === cat ? "ring-2 ring-amber-400" : ""}`}>
                <div>
                  <div className="font-semibold">{cat}</div>
                  <div className="text-xs opacity-70">{items.length} Begriffe</div>
                </div>
                <input type="radio" name="cat" checked={activeCategory === cat} onChange={() => setActiveCategory(cat)} />
              </label>
            ))}
          </div>
          <button className="mt-4 w-full rounded-xl bg-gradient-to-r from-orange-400 to-pink-500 py-3 font-bold" onClick={startRound}>
            {t("go")}
          </button>
        </section>
      )}

      {step === "running" && (
        <section className="pt-14">
          <div className="mx-auto h-64 w-64 relative">
            <Image src="/icons/bomb.svg" alt="bomb" fill sizes="256px" className="animate-pulse" />
          </div>
          <p className="mt-8 text-center text-2xl font-extrabold">{currentWord}</p>
          <audio ref={audioTick} src="/tick.mp3" preload="auto" playsInline />
          <audio ref={audioExplosion} src="/explosion.mp3" preload="auto" playsInline />
        </section>
      )}

      {step === "explode" && (
        <section className="pt-8 text-center">
          <div className="mx-auto h-64 w-64 relative">
            <Image src="/icons/explosion.svg" alt="explosion" fill sizes="256px" />
          </div>
          <p className="mt-4 font-bold">Boom!</p>
        </section>
      )}

      {step === "lost" && (
        <section className="pt-8 text-center">
          <div className="mx-auto h-64 w-64 relative">
            <Image src="/icons/explosion.svg" alt="explosion" fill sizes="256px" />
          </div>
          <p className="mt-4 font-bold">{t("whoLost")}</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {players.map(p => (
              <button key={p.id} className="rounded bg-red-600 py-2" onClick={() => confirmLoser(p.id)}>
                {p.name || "?"}
              </button>
            ))}
          </div>
        </section>
      )}

      {step === "next" && (
        <section className="pt-10 text-center">
          <p className="opacity-80">Runde {roundIndex + 1} / {rounds}</p>
          <button className="mt-4 rounded-xl bg-amber-500 px-5 py-3" onClick={startRound}>{t("start")}</button>
          <div className="mt-6 text-left">
            <h4 className="font-bold mb-2">Scoreboard</h4>
            <ul className="space-y-1">
              {players.map(p => (
                <li key={p.id} className="flex justify-between"><span>{p.name}</span><span>{scores[p.id] ?? 0}</span></li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {step === "final" && (
        <section className="pt-10 text-center">
          <h3 className="text-2xl font-extrabold mb-4">Endstand</h3>
          <ul className="space-y-1 text-left max-w-xs mx-auto">
            {[...players]
              .map(p => ({ p, s: scores[p.id] ?? 0 }))
              .sort((a, b) => b.s - a.s)
              .map(({ p, s }) => (
                <li key={p.id} className="flex justify-between"><span>{p.name}</span><span>{s}</span></li>
              ))}
          </ul>
          <div className="mt-6 flex justify-center gap-3">
            <button className="rounded bg-emerald-600 px-4 py-2" onClick={() => { setRoundIndex(0); setScores({}); setStep("players"); }}>Neu starten</button>
            <button className="rounded bg-gray-600 px-4 py-2" onClick={() => (window.location.href = "/")}>Home</button>
          </div>
        </section>
      )}

      {showExitConfirm && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-neutral-900 text-white p-5 space-y-3">
            <h4 className="text-lg font-bold">{t("exitTitle")}</h4>
            <p className="opacity-80">{t("exitBody")}</p>
            <div className="flex justify-end gap-2">
              <button className="rounded bg-gray-600 px-4 py-2" onClick={() => setShowExitConfirm(false)}>{t("no")}</button>
              <button className="rounded bg-red-600 px-4 py-2" onClick={() => (window.location.href = "/")}>{t("yes")}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


