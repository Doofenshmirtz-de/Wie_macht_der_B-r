"use client";

import React, { useEffect, useRef } from "react";
import type { Ticker, Application as PixiApplication } from "pixi.js";

type PixiCanvasProps = {
  className?: string;
  style?: React.CSSProperties;
  /** Wird aufgerufen, sobald die Pixi Application initialisiert wurde */
  onAppReady?: (app: PixiApplication) => void;
  /** Hintergrundfarbe als Hex (z.B. 0x000000). Standard: transparent */
  background?: number;
};

/**
 * Leichtgewichtige Pixi v8 Canvas-Komponente.
 * - Initialisiert Pixi nur im Client
 * - Passt sich per ResizeObserver der Containergröße an
 * - Räumt bei Unmount sauber auf
 */
export default function PixiCanvas({
  className,
  style,
  onAppReady,
  background,
}: PixiCanvasProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const appRef = useRef<PixiApplication | null>(null);

  useEffect(() => {
    let isCancelled = false;
    let resizeObserver: ResizeObserver | null = null;
    let tickerFn: ((ticker: Ticker) => void) | null = null;

    async function init() {
      const container = containerRef.current;
      if (!container) return;

      const { Application, Graphics } = await import("pixi.js");

      if (isCancelled) return;

      const initialWidth = container.clientWidth || 300;
      const initialHeight = container.clientHeight || 150;

      const app = new Application();
      await app.init({
        width: initialWidth,
        height: initialHeight,
        antialias: true,
        backgroundAlpha: background === undefined ? 0 : 1,
        background: background ?? 0x000000,
        resolution: Math.min(window.devicePixelRatio || 1, 2),
      });

      // Canvas anhängen
      container.appendChild(app.canvas as HTMLCanvasElement);
      appRef.current = app;

      // Demo-Grafik (einfacher Indikator, dass Pixi läuft)
      const g = new Graphics();
      g.beginFill(0xffc107);
      g.drawCircle(0, 0, 40);
      g.endFill();
      g.x = app.renderer.width / 2;
      g.y = app.renderer.height / 2;
      app.stage.addChild(g);

      tickerFn = (ticker: Ticker) => {
        // deltaTime ist in einigen Versionen von Pixi ggf. anders benannt.
        const delta = (ticker as unknown as { deltaTime?: number }).deltaTime ?? 1;
        g.rotation += 0.02 * delta;
      };
      app.ticker.add(tickerFn);

      // Resize-Handling
      resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          if (!app || !entry.contentRect) return;
          const w = Math.max(1, Math.floor(entry.contentRect.width));
          const h = Math.max(1, Math.floor(entry.contentRect.height));
          if (w > 0 && h > 0) {
            app.renderer.resize(w, h);
            g.x = app.renderer.width / 2;
            g.y = app.renderer.height / 2;
          }
        }
      });
      resizeObserver.observe(container);

      onAppReady?.(app);
    }

    init();

    return () => {
      isCancelled = true;
      const app = appRef.current;
      if (app) {
        if (tickerFn) {
          try { app.ticker.remove(tickerFn); } catch {}
        }
        // Canvas vom DOM lösen, bevor wir zerstören
        try {
          const canvas: HTMLCanvasElement | null = app.canvas ?? null;
          if (canvas && canvas.parentNode) {
            canvas.parentNode.removeChild(canvas);
          }
        } catch {}
        try { app.destroy(); } catch {}
        appRef.current = null;
      }
      if (resizeObserver) {
        try { resizeObserver.disconnect(); } catch {}
        resizeObserver = null;
      }
    };
  }, [onAppReady, background]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        ...style,
      }}
    />
  );
}


