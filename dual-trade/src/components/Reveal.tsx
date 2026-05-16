/*
 * ============================================
 * Reveal — Componente de animacion al scroll
 * ============================================
 * 
 * Envuelve cualquier contenido y lo anima con 
 * un fade-in desde abajo cuando entra en el viewport.
 * 
 * Props:
 *   - children: contenido a animar
 *   - delay: retraso en segundos (default 0)
 *   - y: distancia del desplazamiento inicial (default 40)
 * 
 * Usa la curva de Apple: cubic-bezier(0, 0, 0.5, 1)
 * 
 * ============================================
 */

"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
}

export default function Reveal({ children, delay = 0, y = 40 }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.95,
        delay,
        ease: [0, 0, 0.5, 1] as [number, number, number, number],
      }}
    >
      {children}
    </motion.div>
  );
}
