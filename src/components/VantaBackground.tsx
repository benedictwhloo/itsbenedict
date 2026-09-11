"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import * as THREE from "three";

type VantaEffect = { destroy: () => void };

function subscribeReducedMotion(callback: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

/**
 * Vanta GLOBE — a dark, geometric wireframe sphere behind the hero section.
 * Loaded client-side only (WebGL needs the DOM), and skipped entirely for
 * users who prefer reduced motion.
 */
export default function VantaBackground() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const effectRef = useRef<VantaEffect | null>(null);
  const reduced = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  useEffect(() => {
    if (reduced || !containerRef.current || effectRef.current) return;

    let cancelled = false;

    import("vanta/dist/vanta.globe.min").then((mod) => {
      if (cancelled || !containerRef.current) return;
      const GLOBE = mod.default;
      effectRef.current = GLOBE({
        el: containerRef.current,
        THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        color: 0xfc7d7d,
        color2: 0xfed7d7,
        backgroundColor: 0xf8f9fa,
        size: 1.1,
      });
    });

    return () => {
      cancelled = true;
      if (effectRef.current) {
        effectRef.current.destroy();
        effectRef.current = null;
      }
    };
  }, [reduced]);

  if (reduced) {
    return (
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(252,125,125,0.15),transparent_60%)]"
      />
    );
  }

  return <div ref={containerRef} aria-hidden className="absolute inset-0" />;
}
