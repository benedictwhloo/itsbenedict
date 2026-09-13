"use client";

import { useRef } from "react";
import gsap from "gsap";
import type { ReactNode, MouseEvent } from "react";

type MagnetButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  /** How strongly the button follows the cursor (px). */
  strength?: number;
};

/**
 * Magnetic hover button — the button visually leans toward the cursor
 * within its bounds, then springs back on leave. Common React Bits pattern,
 * implemented here with gsap.quickTo for cheap per-frame updates.
 */
export default function MagnetButton({
  children,
  href,
  onClick,
  className = "",
  strength = 24,
}: MagnetButtonProps) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const quickX = useRef<gsap.QuickToFunc | null>(null);
  const quickY = useRef<gsap.QuickToFunc | null>(null);

  const ensureQuickSetters = () => {
    if (!ref.current) return;
    if (!quickX.current) {
      quickX.current = gsap.quickTo(ref.current, "x", {
        duration: 0.5,
        ease: "power3.out",
      });
      quickY.current = gsap.quickTo(ref.current, "y", {
        duration: 0.5,
        ease: "power3.out",
      });
    }
  };

  const handleMove = (e: MouseEvent<HTMLElement>) => {
    if (!ref.current) return;
    ensureQuickSetters();
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    quickX.current?.((relX / rect.width) * strength);
    quickY.current?.((relY / rect.height) * strength);
  };

  const handleLeave = () => {
    quickX.current?.(0);
    quickY.current?.(0);
  };

  const sharedProps = {
    ref: ref as never,
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    className: `inline-flex items-center justify-center rounded-full px-6 py-3 font-medium transition-colors will-change-transform ${className}`,
  };

  if (href) {
    return (
      <a href={href} {...sharedProps}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} {...sharedProps}>
      {children}
    </button>
  );
}
