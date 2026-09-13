"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

type SplitRevealProps = {
  children: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  /** Animate immediately on mount instead of waiting for scroll. */
  immediate?: boolean;
  delay?: number;
};

/**
 * Character reveal on scroll, in the spirit of React Bits' SplitText —
 * built directly on GSAP's own SplitText + ScrollTrigger (both free).
 *
 * IMPORTANT: splitting waits for `document.fonts.ready`. SplitText measures
 * line breaks at split time; if a webfont (BBH Bartle on the hero name)
 * loads *after* the split, the pre-measured lines overflow and you get
 * stray orphaned characters on their own line. Waiting for fonts fixes it.
 */
export default function SplitReveal({
  children,
  as = "h2",
  className = "",
  immediate = false,
  delay = 0,
}: SplitRevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      let split: SplitText | null = null;
      let tween: gsap.core.Tween | null = null;
      let cancelled = false;

      // Hide until fonts are ready so there's no flash of unsplit text.
      gsap.set(el, { autoAlpha: 0 });

      document.fonts.ready.then(() => {
        if (cancelled) return;

        split = new SplitText(el, {
          type: "lines,chars",
          linesClass: "split-line",
        });

        gsap.set(el, { autoAlpha: 1 });
        gsap.set(split.chars, { yPercent: 120, opacity: 0 });

        tween = gsap.to(split.chars, {
          yPercent: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power4.out",
          stagger: 0.015,
          delay,
          scrollTrigger: immediate
            ? undefined
            : { trigger: el, start: "top 85%", once: true },
        });
      });

      return () => {
        cancelled = true;
        tween?.kill();
        split?.revert();
      };
    },
    { scope: ref, dependencies: [children] }
  );

  const Tag = as;
  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  );
}
