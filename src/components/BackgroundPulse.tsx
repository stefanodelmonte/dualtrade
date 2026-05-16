"use client";

import React, { useMemo, useState, useCallback } from "react";
import styles from "./BackgroundPulse.module.css";

type Variant = {
  id: string;
  d: string;
};

const rand = (min: number, max: number) => Math.random() * (max - min) + min;

function makePolyline(baseY: number, spikes = 3) {
  const width = 1000;
  const points = [] as { x: number; y: number }[];
  const steps = 40;
  for (let i = 0; i <= steps; i++) {
    const x = (i / steps) * width;
    let y = baseY;
    if (Math.random() < spikes / steps) {
      // spike up or down
      y = baseY + (Math.random() < 0.5 ? -1 : 1) * rand(30, 120);
    } else {
      // small jitter
      y = baseY + rand(-6, 6);
    }
    points.push({ x, y });
  }
  // build path d
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) d += ` L ${points[i].x} ${points[i].y}`;
  return d;
}

export default function BackgroundPulse() {
  const lines = 2; // 2 lines on desktop for subtler effect
  const variants = 2; // fewer variants to reduce on-screen spikes

  const generated = useMemo(() => {
    return Array.from({ length: lines }).map((_, li) => {
      const baseY = 180 + li * 260 + rand(-12, 12); // two heights within viewBox
      const singleDuration = rand(5, 8); // faster traverse
      const variantsArr: Variant[] = Array.from({ length: variants }).map((__, vi) => ({
        id: `line${li}-v${vi}`,
        // only 1-2 spikes per path to keep spikes rare
        d: makePolyline(baseY, Math.round(rand(1, 2))),
      }));
      return { baseY, singleDuration, variants: variantsArr };
    });
  }, []);

  const [lengths, setLengths] = useState<Record<string, number>>({});
  const setRef = useCallback((id: string) => (el: SVGPathElement | null) => {
    if (el && !(id in lengths)) {
      const len = Math.round(el.getTotalLength());
      setLengths((s) => ({ ...s, [id]: len }));
    }
  }, [lengths]);

  return (
    <div className={styles.container} aria-hidden="true" role="presentation">
      <svg viewBox="0 0 1000 1000" preserveAspectRatio="none">
        {generated.map((line, li) => {
          const totalCycle = line.singleDuration * variants;
          return line.variants.map((v, vi) => {
            const id = v.id;
            const len = lengths[id] ?? 1000;
            const style: React.CSSProperties = {
              // per-path CSS vars
              // @ts-ignore
              ['--base-opacity' as any]: `${rand(0.08, 0.15)}`,
              // animation configured per-variant: full cycle length
              animationDuration: `${totalCycle}s`,
              animationDelay: `${vi * line.singleDuration}s`,
              // path length
              // @ts-ignore
              ['--len' as any]: `${len}px`,
            };

            const lineClass = styles[`line${li + 1}` as keyof typeof styles] || "";
            const classNames = `${styles.path} ${styles.animate} ${lineClass}`;

            return (
              <path
                key={id}
                ref={setRef(id)}
                d={v.d}
                className={classNames}
                style={style}
                strokeWidth={1}
              />
            );
          });
        })}
      </svg>
    </div>
  );
}
