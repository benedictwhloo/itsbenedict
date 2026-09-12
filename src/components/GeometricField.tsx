'use client';

import { useEffect, useRef } from 'react';

export default function GeometricField() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simple test - just add a background color to see if component is working
    if (containerRef.current) {
      containerRef.current.style.backgroundColor = 'rgba(0,0,0,0.02)';
      containerRef.current.style.position = 'absolute';
      containerRef.current.style.inset = '0';
      containerRef.current.style.pointerEvents = 'none';
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0"
      aria-hidden="true"
    >
      {/* Simple test background */}
    </div>
  );
}