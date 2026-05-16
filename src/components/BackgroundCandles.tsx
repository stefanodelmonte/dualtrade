"use client";

import React, { useEffect, useRef } from "react";
import styles from "./BackgroundCandles.module.css";

const rand = (min: number, max: number) => Math.random() * (max - min) + min;
const randInt = (min: number, max: number) => Math.floor(rand(min, max + 1));

export default function BackgroundCandles() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const groupsRef = useRef<SVGSVGElement[]>([]);
  const timeoutsRef = useRef<number[]>([]);
  const spawnTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let mounted = true;

    const clearAll = () => {
      timeoutsRef.current.forEach((id) => clearTimeout(id));
      timeoutsRef.current = [];
      if (spawnTimerRef.current) {
        clearTimeout(spawnTimerRef.current);
        spawnTimerRef.current = null;
      }
      groupsRef.current.forEach((g) => { try { g.remove(); } catch {} });
      groupsRef.current = [];
    };

    const maxForViewport = () => (window.innerWidth < 768 ? 1 : 3);

    const scheduleNextSpawn = () => {
      const delay = rand(3000, 5000); // 3-5s
      spawnTimerRef.current = window.setTimeout(() => {
        spawnGroup();
        if (mounted) scheduleNextSpawn();
      }, delay);
    };

    const spawnGroup = () => {
      const maxActive = maxForViewport();
      if (groupsRef.current.length >= maxActive) return;

      const groupW = randInt(80, 100);
      const groupH = randInt(60, 100);
      const numCandles = randInt(5, 8);
      const candleWidth = randInt(6, 8);
      const gap = 3; // 3px separation
      const totalW = numCandles * candleWidth + (numCandles - 1) * gap;

      // position in percentages across entire viewport
      const leftPct = rand(5, 95);
      const topPct = rand(5, 95);

      const svgNS = "http://www.w3.org/2000/svg";
      const svgEl = document.createElementNS(svgNS, "svg") as SVGSVGElement;
      svgEl.setAttribute("width", `${groupW}px`);
      svgEl.setAttribute("height", `${groupH}px`);
      svgEl.setAttribute("viewBox", `0 0 ${groupW} ${groupH}`);
      svgEl.classList.add(styles.group);
      svgEl.style.position = "absolute";
      svgEl.style.left = `${leftPct}%`;
      svgEl.style.top = `${topPct}%`;
      svgEl.style.transform = "translate(-50%, -50%)";
      svgEl.style.pointerEvents = "none";

      // subtle group opacity
      const groupOpacity = rand(0.08, 0.15);
      svgEl.style.opacity = "0"; // start hidden -> fade in
      svgEl.style.setProperty("--group-opacity", String(groupOpacity));

      // prices: random walk base centered vertically
      let prevClose = groupH / 2;
      const candles: { open: number; close: number; high: number; low: number }[] = [];
      for (let i = 0; i < numCandles; i++) {
        const open = prevClose + rand(-6, 6);
        // choose body height between 12 and 50
        const bodyH = rand(12, 50);
        const bullish = Math.random() < 0.45;
        const close = bullish ? open - bodyH : open + bodyH;
        const high = Math.min(open, close) - rand(2, 8);
        const low = Math.max(open, close) + rand(2, 8);
        candles.push({ open, close, high, low });
        prevClose = close; // chain
      }

      // create candle elements
      const startX = (groupW - totalW) / 2;
      const baseDelay = 420; // ms between each candle drawing (slower)
      for (let i = 0; i < candles.length; i++) {
        const c = candles[i];
        const x = startX + i * (candleWidth + gap);

        // wick
        const line = document.createElementNS(svgNS, "line");
        line.setAttribute("x1", String(x + candleWidth / 2));
        line.setAttribute("x2", String(x + candleWidth / 2));
        line.setAttribute("y1", String(c.high));
        line.setAttribute("y2", String(c.low));
        line.setAttribute("stroke-width", "1");
        const bullish = c.close < c.open;
        line.setAttribute("class", `${styles["candle-line"]} ${bullish ? styles.bull : styles.bear}`);
        // prepare dash animation
        const len = Math.abs(c.low - c.high);
        line.style.strokeDasharray = String(len);
        line.style.strokeDashoffset = String(len);
        line.style.transition = `stroke-dashoffset 0.28s linear ${i * 0.16}s`;

        // body
        const rect = document.createElementNS(svgNS, "rect");
        const y = Math.min(c.open, c.close);
        const h = Math.max(1, Math.abs(c.close - c.open));
        rect.setAttribute("x", String(x));
        rect.setAttribute("y", String(y));
        rect.setAttribute("width", String(candleWidth));
        rect.setAttribute("height", "0");
        rect.setAttribute("class", `${styles["candle-body"]} ${bullish ? styles.bull : styles.bear}`);
        rect.style.transition = `height 0.36s ease ${i * 0.16}s, y 0.36s ease ${i * 0.16}s, opacity 0.36s ease ${i * 0.16}s`;
        rect.style.opacity = "0";

        svgEl.appendChild(line);
        svgEl.appendChild(rect);

        // schedule drawing
        const drawDelay = 800 + i * baseDelay; // wait for fade-in then draw candles (slower)
        const t1 = window.setTimeout(() => {
          // draw wick
          line.style.strokeDashoffset = "0";
        }, drawDelay);
        timeoutsRef.current.push(t1);

        const t2 = window.setTimeout(() => {
          rect.setAttribute("height", String(h));
          rect.setAttribute("y", String(y));
          rect.style.opacity = "1";
        }, drawDelay + 40);
        timeoutsRef.current.push(t2);
      }

      // durations: fade in ~0.7s, draw phase longer, fade out ~1.2s => total ~6-7s
      const totalDuration = rand(6, 7) * 1000; // ms

      // attach and animate
      container.appendChild(svgEl);
      groupsRef.current.push(svgEl);

      // trigger fade-in next frame
      requestAnimationFrame(() => {
        svgEl.style.transition = `opacity 0.7s ease`;
        svgEl.style.opacity = String(groupOpacity);
      });

      // schedule fade-out and removal
      const fadeOutAt = totalDuration - 1200 - rand(0, 500); // start fade-out ~1-1.5s before end
      const tFade = window.setTimeout(() => {
        svgEl.style.transition = `opacity 1.2s ease`;
        svgEl.style.opacity = "0";
      }, fadeOutAt);
      timeoutsRef.current.push(tFade);

      const tRemove = window.setTimeout(() => {
        const idx = groupsRef.current.indexOf(svgEl);
        if (idx !== -1) groupsRef.current.splice(idx, 1);
        try { svgEl.remove(); } catch {}
      }, totalDuration + 100);
      timeoutsRef.current.push(tRemove);
    };

    // start spawning
    scheduleNextSpawn();

    // cleanup on unmount
    return () => {
      mounted = false;
      clearAll();
    };
  }, []);

  return (
    <div className={styles.container} ref={containerRef} aria-hidden="true" />
  );
}
