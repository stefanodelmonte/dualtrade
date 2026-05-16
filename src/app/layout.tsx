/*
 * ============================================
 * Layout raiz de la aplicacion
 * ============================================
 * 
 * - Configura metadata (titulo, descripcion)
 * - Importa los estilos globales
 * - Envuelve toda la app en el html base
 * 
 * ============================================
 */

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dual Trade",
  description:
    "Analisis tecnico, gestion de riesgo y operativa disciplinada en BTC, ETH y altcoins.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body>{children}</body>
    </html>
  );
}
