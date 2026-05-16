/*
 * ============================================
 * Pagina principal — Dual Trade
 * ============================================
 * 
 * Compone todas las secciones en orden:
 * 
 * 1. Navbar    — navegacion fija con blur
 * 2. Hero      — titulo principal + CTAs
 * 3. Ribbon    — ticker de criptomonedas
 * 4. Approach  — metodologia / enfoque (3 cards)
 * 5. Chart     — grafico TradingView en vivo (dark)
 * 6. Philosophy — cita central
 * 7. Stats     — estadisticas animadas
 * 8. CTA       — llamada a la accion final
 * 9. Footer    — pie de pagina
 * 
 * ============================================
 */

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Ribbon from "@/components/Ribbon";
import Approach from "@/components/Approach";
import Methodology from "@/components/Methodology";
import Philosophy from "@/components/Philosophy";
import Stats from "@/components/Stats";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BackgroundDots from "@/components/BackgroundDots";
import BackgroundCandles from "@/components/BackgroundCandles";

export default function Home() {
  return (
    <>
      <BackgroundDots />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar />
        <BackgroundCandles />
        <Hero />
        <Ribbon />
        <Approach />
        <Methodology />
        <Philosophy />
        <Stats />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
