"use client";

/*
 * ============================================
 * Footer — Pie de pagina
 * ============================================
 * 
 * - Copyright a la izquierda
 * - Links de redes sociales a la derecha
 * - Separador fino superior
 * - Responsive: se apila en movil
 * 
 * ============================================
 */

export default function Footer() {
  /* Links de redes */
  const socials = ["Twitter", "Telegram", "Discord"];

  return (
    <>
      {/* ── Linea separadora ── */}
      <div
        style={{
          maxWidth: "980px",
          margin: "0 auto",
          height: "0.5px",
          background: "rgba(0,0,0,0.08)",
        }}
      />

      {/* ── Footer ── */}
      <footer
        style={{
          maxWidth: "980px",
          margin: "0 auto",
          padding: "1.4rem clamp(1.5rem, 5vw, 4rem)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        {/* Copyright */}
        <span
          style={{
            fontSize: "0.72rem",
            color: "#1d1d1f",
            opacity: 0.4,
          }}
        >
          2026 Dual Trade
        </span>

        {/* Links */}
        <ul
          style={{
            display: "flex",
            gap: "1.6rem",
            listStyle: "none",
          }}
        >
          {socials.map((name) => (
            <li key={name}>
              <a
                href="#"
                style={{
                  fontSize: "0.72rem",
                  color: "#1d1d1f",
                  opacity: 0.4,
                  textDecoration: "none",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.4")}
              >
                {name}
              </a>
            </li>
          ))}
        </ul>
      </footer>
    </>
  );
}
