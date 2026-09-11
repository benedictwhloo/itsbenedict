import type { ReactNode } from "react";

/**
 * Animated gradient text — React Bits' "GradientText" pattern, done in
 * pure CSS (background-clip + keyframe) so it costs nothing on the JS
 * thread.
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
      className={`bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient-x bg-gradient-to-r from-sky-300 via-violet-300 to-sky-300 ${className}`}
    >
      {children}
    </span>
  );
}
