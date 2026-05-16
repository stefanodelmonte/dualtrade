/*
 * ============================================
 * Hero — Seccion principal de entrada
 * ============================================
 * 
 * - Titulo "Dual Trade" con "Trade" en dorado
 * - Subtitulo descriptivo
 * - Botones CTA (scroll suave a secciones)
 * - Glow dorado sutil de fondo
 * - Animaciones escalonadas al cargar la pagina
 * - Linea animada como indicador de scroll
 * 
 * ============================================
 */

"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

/* Curva de animacion tipo Apple */
const ease: [number, number, number, number] = [0, 0, 0.5, 1];

/* Componente auxiliar para animar cada bloque con delay */
function FadeIn({
  children,
  delay,
}: {
  children: ReactNode;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.85, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

export default function Hero() {
  /* Scroll suave a una seccion por ID */
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "7rem 2rem 5rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ── Glow dorado de fondo ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.6, ease }}
        style={{
          position: "absolute",
          top: "38%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "700px",
          height: "700px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(184,150,46,0.07) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      {/* ── Titulo principal ── */}
      <FadeIn delay={0.3}>
        <h1
          style={{
            fontSize: "clamp(3.2rem, 9vw, 7.5rem)",
            fontWeight: 700,
            lineHeight: 0.92,
            letterSpacing: "-0.03em",
            marginBottom: "1.8rem",
          }}
        >
          Dual <span style={{ color: "#b8962e" }}>Trade</span>
        </h1>
      </FadeIn>

      {/* ── Subtitulo ── */}
      <FadeIn delay={0.5}>
        <p
          style={{
            fontSize: "clamp(0.95rem, 1.6vw, 1.2rem)",
            fontWeight: 300,
            lineHeight: 1.55,
            color: "#1d1d1f",
            opacity: 0.6,
            maxWidth: "480px",
            marginBottom: "2.8rem",
          }}
        >
          Análisis técnico, gestión de riesgo y operativa disciplinada en
          Bitcoin, Ethereum y altcoins seleccionadas.
        </p>
      </FadeIn>

      {/* ── Boton CTA ── */}
      <FadeIn delay={0.65}>
        <button
          onClick={() => scrollTo("#enfoque")}
          style={{
            fontFamily: "'Times New Roman', Times, serif",
            fontSize: "0.9rem",
            fontWeight: 400,
            color: "#b8962e",
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.3rem",
            transition: "gap 0.3s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.gap = "0.5rem")}
          onMouseLeave={(e) => (e.currentTarget.style.gap = "0.3rem")}
        >
          Conocer más <span style={{ fontSize: "1.15rem" }}>&#8594;</span>
        </button>
      </FadeIn>

    </section>
  );
}
