"use client";

import { useEffect, useRef, useState } from "react";

interface GlobalData {
  total_market_cap: { usd: number };
  total_volume: { usd: number };
  active_cryptocurrencies: number;
  market_cap_percentage: { btc: number };
}

interface StatItem {
  value: string;
  label: string;
  sub: string;
}

function formatTrillions(n: number): string {
  if (n >= 1e12) return `$${(n / 1e12).toFixed(2)}T`;
  if (n >= 1e9) return `$${(n / 1e9).toFixed(0)}B`;
  return `$${n.toLocaleString("es-ES")}`;
}

function formatBillions(n: number): string {
  if (n >= 1e12) return `$${(n / 1e12).toFixed(1)}T`;
  if (n >= 1e9) return `$${(n / 1e9).toFixed(0)}B`;
  return `$${n.toLocaleString("es-ES")}`;
}

function buildStats(data: GlobalData): StatItem[] {
  return [
    {
      value: formatTrillions(data.total_market_cap.usd),
      label: "Capitalización del mercado",
      sub: "Valor total del mercado cripto",
    },
    {
      value: formatBillions(data.total_volume.usd),
      label: "Volumen en 24 h",
      sub: "Operaciones en el último día",
    },
    {
      value: `${data.active_cryptocurrencies.toLocaleString("es-ES")}`,
      label: "Criptomonedas activas",
      sub: "Proyectos con mercado activo",
    },
    {
      value: `${data.market_cap_percentage.btc.toFixed(1)}%`,
      label: "Dominancia de BTC",
      sub: "Porcentaje del mercado total",
    },
  ];
}

const FALLBACK: StatItem[] = [
  { value: "$3.1T", label: "Capitalización del mercado", sub: "Valor total del mercado cripto" },
  { value: "$200B", label: "Volumen en 24 h", sub: "Operaciones en el último día" },
  { value: "17.000+", label: "Criptomonedas activas", sub: "Proyectos con mercado activo" },
  { value: "60%", label: "Dominancia de BTC", sub: "Porcentaje del mercado total" },
];

export default function Philosophy() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [stats, setStats] = useState<StatItem[]>(FALLBACK);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.coingecko.com/api/v3/global")
      .then((r) => r.json())
      .then((json) => {
        if (json?.data) setStats(buildStats(json.data));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      style={{
        padding: "clamp(5rem, 12vh, 9rem) clamp(1.5rem, 5vw, 4rem)",
        background: "#ffffff",
        borderTop: "0.5px solid rgba(0,0,0,0.06)",
      }}
    >
      <div style={{ maxWidth: "1060px", margin: "0 auto" }}>

        {/* Cabecera */}
        <div
          style={{
            marginBottom: "3.5rem",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <p style={{ fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "#b8962e", marginBottom: "0.8rem" }}>
            El mercado
          </p>
          <h2 style={{ fontSize: "clamp(1.9rem, 4.5vw, 3.4rem)", fontWeight: 700, letterSpacing: "-0.02em", color: "#1d1d1f", marginBottom: "1rem" }}>
            Una oportunidad sin precedentes.
          </h2>
          <p style={{ fontSize: "clamp(0.92rem, 1.4vw, 1.05rem)", fontWeight: 300, lineHeight: 1.65, color: "#1d1d1f", maxWidth: "560px" }}>
            Desde el génesis de Bitcoin en 2009, el mercado de criptomonedas ha generado
            una riqueza sin precedentes en la historia financiera. Saber operar en él
            es la ventaja competitiva del siglo XXI.
          </p>
        </div>

        {/* Stats grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            borderTop: "0.5px solid rgba(0,0,0,0.1)",
          }}
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              style={{
                padding: "2.5rem 1.5rem 2.5rem 0",
                borderLeft: i > 0 ? "0.5px solid rgba(0,0,0,0.1)" : "none",
                paddingLeft: i > 0 ? "1.5rem" : "0",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.6s ease ${0.1 + i * 0.1}s, transform 0.6s ease ${0.1 + i * 0.1}s`,
              }}
            >
              <div
                style={{
                  fontSize: "clamp(1.4rem, 2.6vw, 2.1rem)",
                  fontWeight: 700,
                  color: "#b8962e",
                  letterSpacing: "-0.02em",
                  marginBottom: "0.5rem",
                  opacity: loading ? 0.3 : 1,
                  transition: "opacity 0.4s ease",
                }}
              >
                {s.value}
              </div>
              <div style={{ fontSize: "0.88rem", fontWeight: 600, color: "#1d1d1f", marginBottom: "0.25rem" }}>
                {s.label}
              </div>
              <div style={{ fontSize: "0.75rem", fontWeight: 300, color: "#1d1d1f", opacity: 0.45 }}>
                {s.sub}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
