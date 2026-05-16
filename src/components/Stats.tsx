"use client";

import { useEffect, useRef, useState } from "react";

interface StatDef {
  target: number;
  suffix: string;
  decimal?: boolean;
  label: string;
}

const stats: StatDef[] = [
  { target: 87, suffix: "%", label: "Win Rate" },
  { target: 320, suffix: "", label: "Operaciones cerradas" },
  { target: 3.2, suffix: "R", decimal: true, label: "Ratio medio R:R" },
  { target: 24, suffix: "", label: "Meses operando" },
];

const slides = [
  { word: "Planificar.", sub: "Cada operación empieza mucho antes de abrir la posición." },
  { word: "Actuar.", sub: "Con convicción, sin dudas. El plan manda." },
  { word: "Adaptarse.", sub: "El mercado cambia. Nuestra lectura también." },
  { word: "Planificar.", sub: "Cada operación empieza mucho antes de abrir la posición." },
  { word: "Actuar.", sub: "Con convicción, sin dudas. El plan manda." },
  { word: "Adaptarse.", sub: "El mercado cambia. Nuestra lectura también." },
];

function Counter({ target, suffix, decimal }: { target: number; suffix: string; decimal?: boolean }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          const duration = 1600;
          const startTime = performance.now();
          function tick(now: number) {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            setValue(decimal ? parseFloat((eased * target).toFixed(1)) : Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, decimal]);

  return (
    <span ref={ref}>
      {decimal ? value.toFixed(1) : value}
      {suffix && <span style={{ color: "#b8962e" }}>{suffix}</span>}
    </span>
  );
}

function ChevronLeft() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

export default function Stats() {
  const [current, setCurrent] = useState(0);
  const dragStart = useRef(0);

  const prev = () => setCurrent((c) => Math.max(0, c - 1));
  const next = () => setCurrent((c) => Math.min(slides.length - 1, c + 1));

  const onTouchStart = (e: React.TouchEvent) => { dragStart.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    const delta = dragStart.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) { if (delta > 0) next(); else prev(); }
  };
  const onMouseDown = (e: React.MouseEvent) => { dragStart.current = e.clientX; };
  const onMouseUp = (e: React.MouseEvent) => {
    const delta = dragStart.current - e.clientX;
    if (Math.abs(delta) > 40) { if (delta > 0) next(); else prev(); }
  };

  return (
    <section
      id="resultados"
      style={{
        padding: "clamp(5rem, 12vh, 9rem) clamp(1.5rem, 5vw, 4rem)",
        background: "#ffffff",
        borderTop: "0.5px solid rgba(0,0,0,0.06)",
      }}
    >
      <div style={{ maxWidth: "980px", margin: "0 auto" }}>

        {/* Titulo */}
        <h2 style={{ fontSize: "clamp(1.9rem, 4.5vw, 3.4rem)", fontWeight: 700, letterSpacing: "-0.02em", color: "#1d1d1f", textAlign: "center", marginBottom: "3rem" }}>
          Nuestros resultados.
        </h2>

        {/* Texto diferenciador */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", marginBottom: "5rem", borderTop: "0.5px solid rgba(0,0,0,0.08)", paddingTop: "3rem" }}>
          <div>
            <p style={{ fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "#b8962e", marginBottom: "1rem" }}>
              Disciplina, no suerte
            </p>
            <p style={{ fontSize: "clamp(0.92rem, 1.3vw, 1.05rem)", fontWeight: 300, lineHeight: 1.75, color: "#1d1d1f" }}>
              Operar en mercados financieros no es apostar. Cada decisión que tomamos
              está respaldada por un análisis previo, un plan definido y una gestión
              de riesgo que limita la exposición del capital antes de abrir cualquier
              posición. El azar no tiene cabida en nuestro proceso.
            </p>
          </div>
          <div>
            <p style={{ fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "#b8962e", marginBottom: "1rem" }}>
              Proceso sobre resultado
            </p>
            <p style={{ fontSize: "clamp(0.92rem, 1.3vw, 1.05rem)", fontWeight: 300, lineHeight: 1.75, color: "#1d1d1f" }}>
              Un casino necesita que pierdas para ganar. Nosotros necesitamos entender
              el mercado para operar con ventaja estadística real. La diferencia es el
              método: repetible, medible y mejorable. No buscamos golpes de suerte,
              construimos un sistema que funciona en el tiempo.
            </p>
          </div>
        </div>

        {/* Cabecera carrusel */}
        <div style={{ marginBottom: "1.4rem" }}>
          <p style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#1d1d1f" }}>
            Operaciones
          </p>
        </div>

        {/* Carrusel — una sola slide visible */}
        <div
          style={{ position: "relative", borderRadius: "10px", overflow: "hidden", cursor: "grab", userSelect: "none" }}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Slides con crossfade + zoom */}
          <div style={{ position: "relative", width: "100%", aspectRatio: "16/9" }}>
            {slides.map((s, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  inset: 0,
                  border: "1px solid rgba(0,0,0,0.08)",
                  borderRadius: "10px",
                  background: "#fafafa",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.8rem",
                  opacity: i === current ? 1 : 0,
                  transform: i === current ? "scale(1)" : i < current ? "scale(1.03)" : "scale(0.97)",
                  transition: "opacity 0.65s cubic-bezier(0.4, 0, 0.2, 1), transform 0.65s cubic-bezier(0.4, 0, 0.2, 1)",
                  pointerEvents: i === current ? "auto" : "none",
                }}
              >
                <div style={{ width: "28px", height: "1.5px", background: "#b8962e", marginBottom: "0.4rem" }} />
                <p style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 700, color: "#1d1d1f", letterSpacing: "-0.02em", margin: 0 }}>
                  {s.word}
                </p>
                <p style={{ fontSize: "0.88rem", fontWeight: 300, color: "#1d1d1f", opacity: 0.5, margin: 0, textAlign: "center", maxWidth: "340px", lineHeight: 1.55 }}>
                  {s.sub}
                </p>
              </div>
            ))}
          </div>

          {/* Flechas superpuestas */}
          <button
            onClick={prev}
            disabled={current === 0}
            style={{
              position: "absolute",
              left: "1rem",
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(255,255,255,0.85)",
              backdropFilter: "blur(8px)",
              border: "none",
              borderRadius: "50%",
              width: "44px",
              height: "44px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: current === 0 ? "default" : "pointer",
              color: current === 0 ? "rgba(0,0,0,0.2)" : "#1d1d1f",
              opacity: current === 0 ? 0 : 1,
              transition: "opacity 0.25s ease, color 0.25s ease",
              boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
            }}
          >
            <ChevronLeft />
          </button>

          <button
            onClick={next}
            disabled={current === slides.length - 1}
            style={{
              position: "absolute",
              right: "1rem",
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(255,255,255,0.85)",
              backdropFilter: "blur(8px)",
              border: "none",
              borderRadius: "50%",
              width: "44px",
              height: "44px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: current === slides.length - 1 ? "default" : "pointer",
              color: current === slides.length - 1 ? "rgba(0,0,0,0.2)" : "#1d1d1f",
              opacity: current === slides.length - 1 ? 0 : 1,
              transition: "opacity 0.25s ease, color 0.25s ease",
              boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
            }}
          >
            <ChevronRight />
          </button>
        </div>

        {/* Dots */}
        <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginTop: "1.4rem" }}>
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              style={{
                width: i === current ? "22px" : "6px",
                height: "6px",
                borderRadius: "3px",
                border: "none",
                background: i === current ? "#1d1d1f" : "rgba(0,0,0,0.18)",
                cursor: "pointer",
                padding: 0,
                transition: "all 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
              }}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
