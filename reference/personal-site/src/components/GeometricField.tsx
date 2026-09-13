"use client";

import { useRef, useSyncExternalStore } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * GeometricField — the hero's background visual. Replaces the old Vanta/
 * three.js globe (WebGL, laggy) with a handful of thin outline SVG shapes
 * animated by GSAP. No canvas, no WebGL, no extra dependency.
 *
 * Motion (all skipped when the user prefers reduced motion):
 *  - every shape slowly rotates forever, each at its own speed
 *  - the three "parallax" shapes lean toward the cursor via gsap.quickTo
 *  - two shapes drift/scale as the hero scrolls away (ScrollTrigger scrub)
 */

function subscribeReducedMotion(callback: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}
const getReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const getReducedMotionServer = () => false;

export default function GeometricField() {
  const root = useRef<HTMLDivElement | null>(null);
  const reduced = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    getReducedMotionServer
  );

  useGSAP(
    () => {
      if (reduced || !root.current) return;

      const shapes = gsap.utils.toArray<SVGElement>("[data-shape]");

      // 1. Continuous slow rotation, desynced per shape.
      shapes.forEach((el, i) => {
        gsap.to(el, {
          rotation: i % 2 === 0 ? 360 : -360,
          duration: 45 + i * 9,
          repeat: -1,
          ease: "none",
          transformOrigin: "50% 50%",
        });
      });

      // 2. Cursor parallax on the shapes flagged data-parallax.
      const parallax = gsap.utils.toArray<SVGElement>("[data-parallax]");
      const setters = parallax.map((el) => ({
        x: gsap.quickTo(el, "x", { duration: 0.9, ease: "power3.out" }),
        y: gsap.quickTo(el, "y", { duration: 0.9, ease: "power3.out" }),
        depth: Number(el.dataset.parallax) || 1,
      }));

      const onMove = (e: MouseEvent) => {
        const nx = e.clientX / window.innerWidth - 0.5; // -0.5 .. 0.5
        const ny = e.clientY / window.innerHeight - 0.5;
        setters.forEach((s) => {
          s.x(nx * 18 * s.depth);
          s.y(ny * 18 * s.depth);
        });
      };
      window.addEventListener("mousemove", onMove, { passive: true });

      // 3. Scroll drift — shapes flagged data-scroll move as the hero leaves.
      gsap.utils.toArray<SVGElement>("[data-scroll]").forEach((el, i) => {
        gsap.to(el, {
          yPercent: i % 2 === 0 ? -35 : 35,
          scale: 1.15,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      return () => window.removeEventListener("mousemove", onMove);
    },
    { scope: root, dependencies: [reduced] }
  );

  return (
    <div
      ref={root}
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Large ring, top-right — slow rotation + scroll drift */}
      <svg
        data-shape
        data-scroll
        className="absolute -right-24 -top-32 h-[38rem] w-[38rem] sm:-right-40"
        viewBox="0 0 100 100"
        fill="none"
      >
        <circle cx="50" cy="50" r="48" stroke="var(--shape-stroke)" strokeWidth="0.35" />
        <circle cx="50" cy="50" r="40" stroke="var(--shape-stroke)" strokeWidth="0.35" strokeDasharray="1 3" />
      </svg>

      {/* Small circle beside the name — the reference-image motif */}
      <svg
        data-shape
        data-parallax="1.4"
        className="absolute left-[58%] top-[42%] h-20 w-20 sm:left-[62%] sm:h-28 sm:w-28"
        viewBox="0 0 100 100"
        fill="none"
      >
        <circle cx="50" cy="50" r="46" stroke="var(--shape-stroke)" strokeWidth="1.5" />
      </svg>

      {/* Crossed lines, lower-left — parallax */}
      <svg
        data-shape
        data-parallax="0.8"
        className="absolute -left-10 bottom-16 h-56 w-56"
        viewBox="0 0 100 100"
        fill="none"
      >
        <line x1="0" y1="50" x2="100" y2="50" stroke="var(--shape-stroke)" strokeWidth="0.6" />
        <line x1="50" y1="0" x2="50" y2="100" stroke="var(--shape-stroke)" strokeWidth="0.6" />
      </svg>

      {/* Ring, bottom-right — parallax + scroll drift */}
      <svg
        data-shape
        data-parallax="1"
        data-scroll
        className="absolute -bottom-24 right-[18%] h-72 w-72"
        viewBox="0 0 100 100"
        fill="none"
      >
        <circle cx="50" cy="50" r="47" stroke="var(--shape-stroke)" strokeWidth="0.5" />
        <circle cx="50" cy="50" r="2" fill="var(--shape-stroke)" />
      </svg>

      {/* Square, top-left, rotated — rotation only */}
      <svg
        data-shape
        className="absolute left-[8%] top-24 h-24 w-24 sm:left-[14%]"
        viewBox="0 0 100 100"
        fill="none"
      >
        <rect x="8" y="8" width="84" height="84" stroke="var(--shape-stroke)" strokeWidth="0.8" />
      </svg>
    </div>
  );
}
