/*
 * ============================================
 * Navbar — Barra de navegacion fija
 * ============================================
 * 
 * - Fija en la parte superior con efecto blur
 * - Cambia opacidad al hacer scroll
 * - Menu hamburguesa animado en movil
 * - Links con smooth scroll a las secciones
 * 
 * ============================================
 */

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* Links de navegacion */
const links = [
  { label: "Enfoque", href: "#enfoque" },
  { label: "Mercado", href: "#mercado" },
  { label: "Resultados", href: "#resultados" },
  { label: "Contacto", href: "#contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  /* Detectar scroll para cambiar fondo del nav */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 1000,
        height: "52px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 clamp(1.5rem, 5vw, 4rem)",
        background: scrolled
          ? "rgba(255,255,255,0.95)"
          : "rgba(255,255,255,0.75)",
        backdropFilter: "saturate(180%) blur(20px)",
        WebkitBackdropFilter: "saturate(180%) blur(20px)",
        borderBottom: "0.5px solid rgba(0,0,0,0.08)",
        transition: "background 0.35s ease",
      }}
    >
      {/* ── Logo ── */}
      <a
        href="#"
        style={{
          fontFamily: "'Times New Roman', Times, serif",
          fontSize: "1.1rem",
          fontWeight: 700,
          letterSpacing: "0.04em",
          color: "#1d1d1f",
          textDecoration: "none",
        }}
      >
        Dual <span style={{ color: "#b8962e" }}>Trade</span>
      </a>

      {/* ── Links desktop ── */}
      <ul
        style={{
          display: "flex",
          gap: "2.2rem",
          listStyle: "none",
          alignItems: "center",
        }}
        className="nav-desktop"
      >
        {links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              style={{
                fontFamily: "'Times New Roman', Times, serif",
                fontSize: "0.8rem",
                fontWeight: 400,
                color: "#1d1d1f",
                textDecoration: "none",
                opacity: 0.7,
                transition: "opacity 0.25s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.7")}
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>

      {/* ── Hamburguesa movil ── */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Menu"
        className="nav-hamburger"
        style={{
          display: "none",
          flexDirection: "column",
          gap: "4px",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "6px",
        }}
      >
        <span
          style={{
            display: "block",
            width: "18px",
            height: "1.5px",
            background: "#1d1d1f",
            transition: "all 0.3s ease",
            transform: menuOpen
              ? "rotate(45deg) translate(3px, 3px)"
              : "none",
          }}
        />
        <span
          style={{
            display: "block",
            width: "18px",
            height: "1.5px",
            background: "#1d1d1f",
            transition: "all 0.3s ease",
            opacity: menuOpen ? 0 : 1,
          }}
        />
        <span
          style={{
            display: "block",
            width: "18px",
            height: "1.5px",
            background: "#1d1d1f",
            transition: "all 0.3s ease",
            transform: menuOpen
              ? "rotate(-45deg) translate(3px, -3px)"
              : "none",
          }}
        />
      </button>

      {/* ── Menu movil desplegable ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            style={{
              position: "absolute",
              top: "52px",
              left: 0,
              width: "100%",
              background: "rgba(255,255,255,0.97)",
              backdropFilter: "blur(20px)",
              display: "flex",
              flexDirection: "column",
              gap: "1.2rem",
              padding: "1.5rem 2rem 2rem",
              listStyle: "none",
              borderBottom: "0.5px solid rgba(0,0,0,0.08)",
            }}
          >
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontFamily: "'Times New Roman', Times, serif",
                    fontSize: "0.95rem",
                    color: "#1d1d1f",
                    textDecoration: "none",
                  }}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      {/* ── Responsive: ocultar/mostrar ── */}
      <style jsx>{`
        @media (max-width: 768px) {
          .nav-desktop {
            display: none !important;
          }
          .nav-hamburger {
            display: flex !important;
          }
        }
      `}</style>
    </nav>
  );
}
