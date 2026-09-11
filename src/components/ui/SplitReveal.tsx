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
 * Character/line reveal on scroll, in the spirit of React Bits' SplitText
 * component — built directly on GSAP's own SplitText + ScrollTrigger since
 * both ship free with GSAP now.
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
      if (!ref.current) return;
      const split = new SplitText(ref.current, { type: "lines,chars" });

      gsap.set(split.chars, { yPercent: 120, opacity: 0 });

      const tween = gsap.to(split.chars, {
        yPercent: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power4.out",
        stagger: 0.015,
        delay,
        scrollTrigger: immediate
          ? undefined
          : {
              trigger: ref.current,
              start: "top 85%",
              once: true,
            },
      });

      return () => {
        tween.kill();
        split.revert();
      };
    },
    { scope: ref, dependencies: [children] }
  );

  const Tag = as;
  return (
    <Tag ref={ref as never} className={`overflow-hidden ${className}`}>
      {children}
    </Tag>
  );
}
