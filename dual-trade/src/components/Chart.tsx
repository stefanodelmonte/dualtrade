/*
 * ============================================
 * Chart — Grafico de TradingView en tiempo real
 * ============================================
 * 
 * - Widget de TradingView con tema DARK
 * - Tabs para cambiar entre BTC, ETH y SOL
 * - Se carga el script de TradingView una sola vez
 * - Al cambiar de tab se recrea el widget
 * 
 * ============================================
 */

"use client";

import { useState, useEffect, useRef } from "react";
import Reveal from "./Reveal";

/* Pares disponibles */
const pairs = [
  { symbol: "BTCUSDT", label: "BTC / USDT" },
  { symbol: "ETHUSDT", label: "ETH / USDT" },
  { symbol: "SOLUSDT", label: "SOL / USDT" },
];

export default function Chart() {
  const [active, setActive] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoaded = useRef(false);

  /* Cargar el script de TradingView una sola vez */
  useEffect(() => {
    if (scriptLoaded.current) return;

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = () => {
      scriptLoaded.current = true;
      createWidget(pairs[0].symbol);
    };
    document.head.appendChild(script);
  }, []);

  /* Recrear widget al cambiar de par */
  useEffect(() => {
    if (scriptLoaded.current) {
      createWidget(pairs[active].symbol);
    }
  }, [active]);

  /* Crear el widget de TradingView */
  function createWidget(symbol: string) {
    const el = containerRef.current;
    if (!el || !(window as unknown as Record<string, unknown>).TradingView) return;

    el.innerHTML = "";

    /* eslint-disable @typescript-eslint/no-explicit-any */
    new (window as any).TradingView.widget({
      symbol: "BINANCE:" + symbol,
      interval: "60",
      timezone: "Europe/Madrid",
      theme: "dark",               /* DARK MODE */
      style: "1",
      locale: "es",
      enable_publishing: false,
      allow_symbol_change: false,
      hide_top_toolbar: false,
      save_image: false,
      container_id: "tv-chart",
      width: "100%",
      height: 760,
      backgroundColor: "#1d1d1f",  /* Fondo negro */
      gridColor: "rgba(255,255,255,0.03)",
    });
    /* eslint-enable @typescript-eslint/no-explicit-any */
  }

  return (
    <section
      id="mercado"
      style={{
        padding: "clamp(5rem, 12vh, 9rem) clamp(1.5rem, 5vw, 4rem)",
        background: "#ffffff",
      }}
    >
      <div style={{ maxWidth: "1060px", margin: "0 auto" }}>
        {/* ── Titulo de seccion ── */}
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <h2
              style={{
                fontSize: "clamp(1.9rem, 4.5vw, 3.4rem)",
                fontWeight: 700,
                lineHeight: 1.08,
                letterSpacing: "-0.02em",
                color: "#1d1d1f",
              }}
            >
              Mercado en tiempo real.
            </h2>
            <p
              style={{
                fontSize: "clamp(0.92rem, 1.4vw, 1.1rem)",
                fontWeight: 300,
                lineHeight: 1.6,
                color: "#1d1d1f",
                opacity: 0.5,
                maxWidth: "560px",
                margin: "0.6rem auto 0",
              }}
            >
              Graficos en vivo desde Binance. Selecciona un par y analiza la
              estructura.
            </p>
          </div>
        </Reveal>

        {/* ── Contenedor del grafico ── */}
        <Reveal y={20}>
          <div
            style={{
              borderRadius: "16px",
              overflow: "hidden",
              border: "1px solid rgba(0,0,0,0.08)",
              boxShadow: "0 2px 24px rgba(0,0,0,0.05)",
            }}
          >
            {/* Tabs de pares */}
            <div
              style={{
                display: "flex",
                borderBottom: "1px solid rgba(29,29,31,0.1)",
                background: "#1d1d1f",
              }}
            >
              {pairs.map((p, i) => (
                <button
                  key={p.symbol}
                  onClick={() => setActive(i)}
                  style={{
                    fontFamily: "'Times New Roman', Times, serif",
                    fontSize: "0.78rem",
                    fontWeight: active === i ? 600 : 400,
                    padding: "0.85rem 1.6rem",
                    border: "none",
                    background: "transparent",
                    color: active === i ? "#b8962e" : "rgba(255,255,255,0.5)",
                    cursor: "pointer",
                    position: "relative",
                    transition: "color 0.25s ease",
                    borderBottom:
                      active === i ? "2px solid #b8962e" : "2px solid transparent",
                  }}
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Widget */}
            <div
              id="tv-chart"
              ref={containerRef}
              style={{
                height: "760px",
                background: "#1d1d1f",
              }}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
