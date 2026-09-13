"use client";

import { useRef, useSyncExternalStore } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * GeometricField — the hero's background visual. Replaces the old Vanta/
 * three.js globe (WebGL, laggy) with outline SVG shapes animated by GSAP.
 * No canvas, no WebGL, no extra dependency.
 *
 * CHROME FINISH
 * The shapes are stroked with a multi-stop gradient rather than a flat grey.
 * Chrome reads as metal because of abrupt light-to-dark banding (the "horizon"
 * reflection), so the ramp deliberately jumps white -> mid -> near-black
 * rather than fading smoothly.
 *
 * The gradient's rotation is animated INDEPENDENTLY of each shape's own
 * rotation. That's what sells it: a real reflection stays fixed to the
 * environment while the object turns. If the gradient rotated with the shape
 * it would look like flat painted grey.
 *
 * Stroke widths are set per shape in viewBox units so that every shape lands
 * at roughly 3-4 rendered px regardless of how large it's displayed. A
 * hairline can't show a gradient, so chrome needs a little more weight than
 * the old flat strokes had.
 *
 * Motion (all skipped when the user prefers reduced motion):
 *  - every shape slowly rotates forever, each at its own speed
 *  - the chrome gradient sweeps continuously, off-tempo from the shapes
 *  - shapes tagged data-parallax lean toward the cursor via gsap.quickTo
 *  - shapes tagged data-scroll drift/scale as the hero scrolls away
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

      // 2. Chrome sweep — rotate the gradients, not the shapes. Two gradients
      //    at different speeds and directions so the field doesn't pulse in
      //    unison. Animating a proxy object and writing the attribute is more
      //    reliable than tweening a transform-list attribute string directly.
      const sweeps: { el: SVGElement | null; speed: number; dir: number }[] = [
        { el: root.current.querySelector("#chrome-sweep"), speed: 14, dir: 1 },
        { el: root.current.querySelector("#chrome-sweep-alt"), speed: 22, dir: -1 },
      ];

      sweeps.forEach(({ el, speed, dir }) => {
        if (!el) return;
        const proxy = { angle: 0 };
        gsap.to(proxy, {
          angle: 360 * dir,
          duration: speed,
          repeat: -1,
          ease: "none",
          onUpdate: () =>
            el.setAttribute(
              "gradientTransform",
              `rotate(${proxy.angle} 0.5 0.5)`
            ),
        });
      });

      // 3. Cursor parallax on the shapes flagged data-parallax.
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

      // 4. Scroll drift — shapes flagged data-scroll move as the hero leaves.
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
      {/* Gradient definitions. Zero-size SVG; the shapes below reference these
          by fragment id, which resolves across inline SVGs in the same
          document. The hard jumps between stops are the chrome. */}
      <svg className="absolute h-0 w-0" aria-hidden focusable="false">
        <defs>
          {/* Chrome needs MANY bands and HARD transitions. Stop pairs sitting
              1% apart create a crisp edge instead of a soft fade; a smooth
              ramp just reads as faded pencil. Lightest stops stay off-white
              (#eee, not #fff) so they don't disappear into the #f5f5f4 page. */}
          <linearGradient id="chrome-sweep" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ededea" />
            <stop offset="6%" stopColor="#9a9a94" />
            <stop offset="7%" stopColor="#28282b" />
            <stop offset="13%" stopColor="#6b6b66" />
            <stop offset="14%" stopColor="#e4e4e0" />
            <stop offset="22%" stopColor="#aeaea7" />
            <stop offset="23%" stopColor="#1c1c1e" />
            <stop offset="30%" stopColor="#55555a" />
            <stop offset="31%" stopColor="#d6d6d2" />
            <stop offset="40%" stopColor="#8a8a84" />
            <stop offset="41%" stopColor="#232327" />
            <stop offset="50%" stopColor="#ebebe8" />
            <stop offset="58%" stopColor="#787872" />
            <stop offset="59%" stopColor="#1e1e22" />
            <stop offset="68%" stopColor="#a2a29b" />
            <stop offset="69%" stopColor="#e9e9e6" />
            <stop offset="78%" stopColor="#46464a" />
            <stop offset="79%" stopColor="#c2c2bc" />
            <stop offset="88%" stopColor="#2c2c2f" />
            <stop offset="89%" stopColor="#dededa" />
            <stop offset="100%" stopColor="#86867f" />
          </linearGradient>

          <linearGradient id="chrome-sweep-alt" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#c8c8c2" />
            <stop offset="9%" stopColor="#2f2f32" />
            <stop offset="10%" stopColor="#e6e6e2" />
            <stop offset="19%" stopColor="#7e7e78" />
            <stop offset="20%" stopColor="#1c1c1e" />
            <stop offset="29%" stopColor="#b0b0a9" />
            <stop offset="30%" stopColor="#ececE8" />
            <stop offset="39%" stopColor="#4e4e52" />
            <stop offset="40%" stopColor="#d2d2ce" />
            <stop offset="50%" stopColor="#212125" />
            <stop offset="51%" stopColor="#9e9e97" />
            <stop offset="61%" stopColor="#eaeae7" />
            <stop offset="62%" stopColor="#3a3a3d" />
            <stop offset="72%" stopColor="#bcbcb6" />
            <stop offset="73%" stopColor="#26262a" />
            <stop offset="83%" stopColor="#e0e0dc" />
            <stop offset="84%" stopColor="#6a6a64" />
            <stop offset="93%" stopColor="#1f1f23" />
            <stop offset="100%" stopColor="#d8d8d4" />
          </linearGradient>
        </defs>
      </svg>

      {/* Large ring, top-right — chrome sweep + scroll drift.
          38rem wide, so 1 viewBox unit ≈ 6px: 0.7u ≈ 4px rendered. */}
      <svg
        data-shape
        data-scroll
        className="absolute -right-24 -top-32 h-[38rem] w-[38rem] opacity-90 sm:-right-40"
        viewBox="0 0 100 100"
        fill="none"
      >
        <circle cx="50" cy="50" r="48" stroke="url(#chrome-sweep)" strokeWidth="0.7" />
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke="url(#chrome-sweep-alt)"
          strokeWidth="0.4"
          strokeDasharray="1.6 3.4"
        />
      </svg>

      {/* Small circle beside the name — the reference-image motif.
          112px wide, so 1u ≈ 1.12px: 3.5u ≈ 4px rendered. */}
      <svg
        data-shape
        data-parallax="1.4"
        className="absolute left-[58%] top-[42%] h-20 w-20 opacity-100 sm:left-[62%] sm:h-28 sm:w-28"
        viewBox="0 0 100 100"
        fill="none"
      >
        <circle cx="50" cy="50" r="45" stroke="url(#chrome-sweep)" strokeWidth="3.5" />
      </svg>

      {/* Crossed lines, lower-left — parallax.
          224px wide, so 1u ≈ 2.24px: 1.3u ≈ 3px rendered. */}
      <svg
        data-shape
        data-parallax="0.8"
        className="absolute -left-10 bottom-16 h-56 w-56 opacity-85"
        viewBox="0 0 100 100"
        fill="none"
      >
        <line x1="0" y1="50" x2="100" y2="50" stroke="url(#chrome-sweep-alt)" strokeWidth="1.3" />
        <line x1="50" y1="0" x2="50" y2="100" stroke="url(#chrome-sweep-alt)" strokeWidth="1.3" />
      </svg>

      {/* Ring with centre dot, bottom-right — parallax + scroll drift.
          288px wide, so 1u ≈ 2.88px: 1.4u ≈ 4px rendered. */}
      <svg
        data-shape
        data-parallax="1"
        data-scroll
        className="absolute -bottom-24 right-[18%] h-72 w-72 opacity-90"
        viewBox="0 0 100 100"
        fill="none"
      >
        <circle cx="50" cy="50" r="46" stroke="url(#chrome-sweep)" strokeWidth="1.4" />
        <circle cx="50" cy="50" r="2.4" fill="url(#chrome-sweep-alt)" />
      </svg>

      {/* Rotated square, top-left — rotation only.
          96px wide, so 1u ≈ 0.96px: 3.5u ≈ 3.4px rendered. */}
      <svg
        data-shape
        className="absolute left-[8%] top-24 h-24 w-24 opacity-95 sm:left-[14%]"
        viewBox="0 0 100 100"
        fill="none"
      >
        <rect
          x="10"
          y="10"
          width="80"
          height="80"
          stroke="url(#chrome-sweep-alt)"
          strokeWidth="3.5"
        />
      </svg>
    </div>
  );
}