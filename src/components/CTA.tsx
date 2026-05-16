/*
 * ============================================
 * CTA — Llamada a la accion final
 * ============================================
 * 
 * Seccion centrada al final de la pagina con
 * titulo, subtitulo y boton de contacto.
 * 
 * ============================================
 */

"use client";

import Reveal from "./Reveal";

export default function CTA() {
  return (
    <section
      id="cta"
      style={{
        textAlign: "center",
        padding: "clamp(5rem, 12vh, 9rem) 2rem",
        background: "#ffffff",
        borderTop: "0.5px solid rgba(0,0,0,0.06)",
      }}
    >
      <Reveal>
        {/* ── Titulo ── */}
        <h2
          style={{
            fontSize: "clamp(1.9rem, 4.5vw, 3.4rem)",
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: "-0.02em",
            color: "#1d1d1f",
          }}
        >
          Metodo. Paciencia. Ejecucion.
        </h2>

        {/* ── Subtitulo ── */}
        <h2
          style={{
            fontSize: "clamp(1.9rem, 4.5vw, 3.4rem)",
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: "-0.02em",
            color: "#1d1d1f",
            opacity: 0.35,
            marginBottom: "1rem",
          }}
        >
          Si compartes la vision, hablemos.
        </h2>

        {/* ── Texto ── */}
        <p
          style={{
            fontSize: "clamp(0.92rem, 1.4vw, 1.1rem)",
            fontWeight: 300,
            lineHeight: 1.6,
            color: "#1d1d1f",
            opacity: 0.5,
            maxWidth: "560px",
            margin: "0.8rem auto 2.5rem",
          }}
        >
          El mercado premia a quien respeta el proceso.
        </p>

        {/* ── Boton ── */}
        <button
          style={{
            fontFamily: "'Times New Roman', Times, serif",
            fontSize: "0.9rem",
            fontWeight: 400,
            color: "#ffffff",
            background: "#1d1d1f",
            border: "none",
            borderRadius: "980px",
            padding: "0.8rem 2rem",
            cursor: "pointer",
            transition: "all 0.35s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#333";
            e.currentTarget.style.transform = "scale(1.03)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#1d1d1f";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          Contactar
        </button>
      </Reveal>
    </section>
  );
}
