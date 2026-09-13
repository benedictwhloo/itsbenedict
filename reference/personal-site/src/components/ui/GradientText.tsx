import type { ReactNode } from "react";

/**
 * Animated text shimmer — React Bits' "GradientText" pattern, pure CSS
 * (background-clip + keyframe). The gradient stays inside the grey family:
 * foreground → accent → foreground. No hue shift, only lightness.
 */
export default function GradientText({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`animate-gradient-x bg-gradient-to-r from-foreground via-accent to-foreground bg-[length:200%_auto] bg-clip-text text-transparent ${className}`}
    >
      {children}
    </span>
  );
}
