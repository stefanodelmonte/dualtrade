"use client";

export default function Contact() {
  return (
    <section
      id="contactanos"
      style={{
        position: "relative",
        zIndex: 2,
        padding: "clamp(5rem, 12vh, 9rem) clamp(1.5rem, 5vw, 4rem)",
        background: "#ffffff",
        borderTop: "0.5px solid rgba(0,0,0,0.12)",
      }}
    >
      <div style={{ maxWidth: "760px", margin: "0 auto" }}>

        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <h2 style={{ fontSize: "clamp(1.9rem, 4.5vw, 3.4rem)", fontWeight: 700, letterSpacing: "-0.02em", color: "#1d1d1f", marginBottom: "0.8rem" }}>
            Contáctanos.
          </h2>
          <p style={{ fontSize: "1rem", fontWeight: 300, color: "#888888", maxWidth: "420px", margin: "0 auto" }}>
            Estamos disponibles por estos canales. Elige el que prefieras.
          </p>
        </div>

        {/* Gmail */}
        <a
          href="mailto:contactdualtrade@gmail.com"
          style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.4rem 1.8rem", border: "1px solid rgba(0,0,0,0.12)", borderRadius: "14px", textDecoration: "none", marginBottom: "1rem", background: "#ffffff" }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#b8962e"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(0,0,0,0.12)"; }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#b8962e" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m2 7 10 7 10-7" />
            </svg>
            <div>
              <div style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "#999" }}>Gmail</div>
              <div style={{ fontSize: "1rem", color: "#1d1d1f" }}>contactdualtrade@gmail.com</div>
            </div>
          </div>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#b8962e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17 17 7M17 7H7M17 7v10" />
          </svg>
        </a>

        {/* Discord */}
        <a
          href="https://discord.gg/dualtrade"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.4rem 1.8rem", border: "1px solid rgba(0,0,0,0.12)", borderRadius: "14px", textDecoration: "none", marginBottom: "1rem", background: "#ffffff" }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#b8962e"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(0,0,0,0.12)"; }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#b8962e">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
            </svg>
            <div>
              <div style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "#999" }}>Discord</div>
              <div style={{ fontSize: "1rem", color: "#1d1d1f" }}>discord.gg/dualtrade</div>
            </div>
          </div>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#b8962e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17 17 7M17 7H7M17 7v10" />
          </svg>
        </a>

        {/* X */}
        <a
          href="https://x.com/DualTrade_"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.4rem 1.8rem", border: "1px solid rgba(0,0,0,0.12)", borderRadius: "14px", textDecoration: "none", background: "#ffffff" }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#b8962e"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(0,0,0,0.12)"; }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#b8962e">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L2.17 2.25h6.768l4.26 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            <div>
              <div style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "#999" }}>X</div>
              <div style={{ fontSize: "1rem", color: "#1d1d1f" }}>@DualTrade_</div>
            </div>
          </div>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#b8962e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17 17 7M17 7H7M17 7v10" />
          </svg>
        </a>

      </div>
    </section>
  );
}
