"use client";

import { useRef } from "react";
import type { MouseEvent, ReactNode } from "react";

type SpotlightCardProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Card with a soft radial "spotlight" that follows the cursor — a React
 * Bits staple, done here with a CSS custom property updated on pointer
 * move so no per-frame JS animation loop is needed.
 *
 * The glow is neutral (dark grey at low alpha) — never a tinted colour.
 */
export default function SpotlightCard({
  children,
  className = "",
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      className={`group relative overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/[0.03] p-6 transition-colors hover:border-foreground/25 ${className}`}
      style={
        {
          "--spot-x": "50%",
          "--spot-y": "50%",
        } as React.CSSProperties
      }
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(400px circle at var(--spot-x) var(--spot-y), rgba(28,28,30,0.08), transparent 65%)",
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}