/*
 * ============================================
 * Philosophy — Cita principal / filosofia
 * ============================================
 * 
 * Seccion intermedia con una frase grande centrada
 * y un glow dorado sutil de fondo.
 * 
 * Sirve como pausa visual entre el grafico
 * y la seccion de estadisticas.
 * 
 * ============================================
 */

"use client";

import Reveal from "./Reveal";

export default function Philosophy() {
  return (
    <section
      style={{
        textAlign: "center",
        padding: "clamp(6rem, 14vh, 11rem) 2rem",
        position: "relative",
        background: "#ffffff",
      }}
    >
      {/* ── Glow dorado de fondo ── */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(184,150,46,0.06) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      <Reveal>
        {/* ── Cita ── */}
        <p
          style={{
            fontSize: "clamp(2.2rem, 5.5vw, 4rem)",
            fontWeight: 700,
            lineHeight: 1.12,
            letterSpacing: "-0.02em",
            color: "#1d1d1f",
            maxWidth: "700px",
            margin: "0 auto 1.5rem",
            position: "relative",
          }}
        >
          La probabilidad no garantiza cada operacion.{" "}
          <span style={{ color: "#b8962e" }}>Garantiza el resultado de todas.</span>
        </p>

        {/* ── Subtexto ── */}
        <p
          style={{
            fontSize: "1rem",
            fontWeight: 300,
            color: "#1d1d1f",
            opacity: 0.4,
            position: "relative",
          }}
        >
          El principio que rige cada decision.
        </p>
      </Reveal>
    </section>
  );
}
