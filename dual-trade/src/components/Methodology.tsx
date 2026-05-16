"use client";

import { useState, useEffect, useRef } from "react";

const pairs = [
  { symbol: "BTCUSDT", label: "BTC / USDT" },
  { symbol: "ETHUSDT", label: "ETH / USDT" },
  { symbol: "SOLUSDT", label: "SOL / USDT" },
];

export default function Methodology() {
  const [active, setActive] = useState(0);
  const chartRef = useRef<HTMLDivElement>(null);
  const newsRef = useRef<HTMLDivElement>(null);
  const tvLoaded = useRef(false);

  /* Carga el script de TradingView chart una sola vez */
  useEffect(() => {
    if (tvLoaded.current) return;
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = () => {
      tvLoaded.current = true;
      createChart(pairs[0].symbol);
    };
    document.head.appendChild(script);
  }, []);

  /* Recrea el chart al cambiar de par */
  useEffect(() => {
    if (tvLoaded.current) createChart(pairs[active].symbol);
  }, [active]);

  /* Carga el widget de noticias */
  useEffect(() => {
    const el = newsRef.current;
    if (!el) return;
    el.innerHTML = "";
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-timeline.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      feedMode: "all_symbols",
      colorTheme: "dark",
      isTransparent: false,
      displayMode: "regular",
      width: "100%",
      height: 560,
      locale: "es",
    });
    el.appendChild(script);
  }, []);

  function createChart(symbol: string) {
    const el = chartRef.current;
    if (!el || !(window as unknown as Record<string, unknown>).TradingView) return;
    el.innerHTML = "";
    /* eslint-disable @typescript-eslint/no-explicit-any */
    new (window as any).TradingView.widget({
      symbol: "BINANCE:" + symbol,
      interval: "60",
      timezone: "Europe/Madrid",
      theme: "dark",
      style: "1",
      locale: "es",
      enable_publishing: false,
      allow_symbol_change: false,
      hide_top_toolbar: false,
      save_image: false,
      container_id: "tv-chart-methodology",
      width: "100%",
      height: 700,
      backgroundColor: "#1d1d1f",
      gridColor: "rgba(255,255,255,0.03)",
    });
    /* eslint-enable @typescript-eslint/no-explicit-any */
  }

  return (
    <div>

      {/* ══ ANALISIS TECNICO ══ */}
      <section
        id="tecnico"
        style={{
          padding: "clamp(5rem, 12vh, 9rem) clamp(1.5rem, 5vw, 4rem)",
          background: "#ffffff",
          borderTop: "0.5px solid rgba(0,0,0,0.06)",
        }}
      >
        <div style={{ maxWidth: "1060px", margin: "0 auto" }}>

          {/* Cabecera */}
          <div style={{ marginBottom: "2.8rem" }}>
            <p style={{ fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "#b8962e", marginBottom: "0.8rem" }}>
              01 — Metodologia
            </p>
            <h2 style={{ fontSize: "clamp(1.9rem, 4.5vw, 3.4rem)", fontWeight: 700, letterSpacing: "-0.02em", color: "#1d1d1f", marginBottom: "1rem" }}>
              Analisis Tecnico.
            </h2>
            <p style={{ fontSize: "clamp(0.92rem, 1.4vw, 1.05rem)", fontWeight: 300, lineHeight: 1.65, color: "#1d1d1f", maxWidth: "580px" }}>
              Leemos el precio tal como es. Estructura de mercado, zonas de liquidez
              y confluencias en multiples temporalidades. La accion del precio como
              guia principal, sin indicadores de muleta.
            </p>
            <p
              style={{
                fontSize: "clamp(0.92rem, 1.4vw, 1.05rem)",
                fontWeight: 300,
                lineHeight: 1.65,
                color: "#1d1d1f",
                maxWidth: "580px",
                marginTop: "1rem",
              }}
            >
              Hemos probado, y seguimos probando, diversas estrategias de trading.
              Aplicamos la mas adecuada segun el momento del mercado, adaptandonos
              a las condiciones sin perder de vista lo mas importante: una gestion
              de riesgo solida que proteja el capital en todo momento.
            </p>
          </div>

          {/* Widget grafico */}
          <div style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(0,0,0,0.08)" }}>
            {/* Tabs */}
            <div style={{ display: "flex", background: "#1d1d1f", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
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
                    color: active === i ? "#b8962e" : "rgba(255,255,255,0.45)",
                    cursor: "pointer",
                    borderBottom: active === i ? "2px solid #b8962e" : "2px solid transparent",
                    transition: "color 0.2s",
                  }}
                >
                  {p.label}
                </button>
              ))}
            </div>
            <div id="tv-chart-methodology" ref={chartRef} style={{ height: "700px", background: "#1d1d1f" }} />
          </div>

        </div>
      </section>

      {/* ══ ANALISIS FUNDAMENTAL ══ */}
      <section
        id="fundamental"
        style={{
          padding: "clamp(5rem, 12vh, 9rem) clamp(1.5rem, 5vw, 4rem)",
          background: "#ffffff",
          borderTop: "0.5px solid rgba(0,0,0,0.06)",
        }}
      >
        <div style={{ maxWidth: "1060px", margin: "0 auto" }}>

          {/* Cabecera */}
          <div style={{ marginBottom: "2.8rem" }}>
            <p style={{ fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "#b8962e", marginBottom: "0.8rem" }}>
              02 — Metodologia
            </p>
            <h2 style={{ fontSize: "clamp(1.9rem, 4.5vw, 3.4rem)", fontWeight: 700, letterSpacing: "-0.02em", color: "#1d1d1f", marginBottom: "1rem" }}>
              Analisis Fundamental.
            </h2>
            <p style={{ fontSize: "clamp(0.92rem, 1.4vw, 1.05rem)", fontWeight: 300, lineHeight: 1.65, color: "#1d1d1f", maxWidth: "580px" }}>
              Tenemos en cuenta todas las posibles causas que pueden afectar al
              precio. No podemos adivinar el futuro con certeza absoluta, pero
              acertando el numero adecuado de veces, nuestro dinero nunca
              dejara de crecer.
            </p>
          </div>

          {/* Widget noticias */}
          <div style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(0,0,0,0.08)" }}>
            <div
              className="tradingview-widget-container"
              ref={newsRef}
              style={{ height: "560px", background: "#1d1d1f" }}
            />
          </div>

        </div>
      </section>

    </div>
  );
}
