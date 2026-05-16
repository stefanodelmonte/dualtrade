"use client";

import React, { useMemo } from "react";
import styles from "./BackgroundDots.module.css";

type Dot = {
  top: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  alpha: number;
};

const rand = (min: number, max: number) => Math.random() * (max - min) + min;

export default function BackgroundDots() {
  const count = 36; // between 30 and 40

  const dots = useMemo<Dot[]>(() => {
    return Array.from({ length: count }).map(() => {
      const side = Math.random() < 0.5 ? "left" : "right";
      const top = rand(2, 98); // vertical distribution
      const left =
        side === "left"
          ? rand(0.5, 15) // first 15%
          : 100 - rand(0.5, 15); // last 15%
      const size = rand(2, 3); // px
      const duration = rand(2, 6); // seconds
      const delay = rand(0, 6); // seconds
      const alpha = rand(0.15, 0.4);
      return { top, left, size, duration, delay, alpha };
    });
  }, [count]);

  return (
    <div className={styles.background} aria-hidden="true" role="presentation">
      {dots.map((d, i) => (
        <span
          key={i}
          className={styles.dot}
          style={{
            top: `${d.top}%`,
            left: `${d.left}%`,
            width: `${d.size}px`,
            height: `${d.size}px`,
            backgroundColor: `rgba(184,150,46,${d.alpha})`,
            animationDuration: `${d.duration}s`,
            animationDelay: `${d.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
