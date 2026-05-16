"use client";

const tokens = [
  { symbol: "BTC", name: "Bitcoin" },
  { symbol: "ETH", name: "Ethereum" },
  { symbol: "SOL", name: "Solana" },
  { symbol: "BNB", name: "BNB" },
  { symbol: "ADA", name: "Cardano" },
  { symbol: "XRP", name: "Ripple" },
  { symbol: "AVAX", name: "Avalanche" },
  { symbol: "DOT", name: "Polkadot" },
];

/* Cuatro copias para que nunca haya hueco visible */
const items = [...tokens, ...tokens, ...tokens, ...tokens];

export default function Ribbon() {
  return (
    <div
      style={{
        overflow: "hidden",
        borderTop: "0.5px solid rgba(0,0,0,0.08)",
        borderBottom: "0.5px solid rgba(0,0,0,0.08)",
        padding: "0.85rem 0",
        background: "#ffffff",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "max-content",
          animation: "ribbon-slide 28s linear infinite",
        }}
      >
        {items.map((t, i) => (
          <span
            key={i}
            style={{
              fontSize: "0.78rem",
              fontWeight: 400,
              letterSpacing: "0.06em",
              color: "#1d1d1f",
              whiteSpace: "nowrap",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              opacity: 0.5,
              paddingRight: "3.5rem",
            }}
          >
            <strong style={{ color: "#b8962e", fontWeight: 700, opacity: 1 }}>
              {t.symbol}
            </strong>
            {t.name}
          </span>
        ))}
      </div>

      <style jsx>{`
        @keyframes ribbon-slide {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
