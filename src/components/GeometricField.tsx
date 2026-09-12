'use client';

import { useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default function GeometricField() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shapesRef = useRef<Array<SVGSVGElement | null>>([]);

  useGSAP(
    () => {
      if (!containerRef.current) {
        console.warn('GeometricField: containerRef.current is null');
        return;
      }

      console.log('GeometricField: Initializing GSAP animations');

      // Create 8 geometric shapes
      const shapes = Array.from({ length: 8 }, (_, i) => {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('class', 'geometric-shape');
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');
        svg.setAttribute('viewBox', '0 0 100 100');
        svg.setAttribute('preserveAspectRatio', 'none');

        // Create different shape types: circle, ring, line
        const shapeType = i % 3;
        let shapeElement: SVGElement;

        if (shapeType === 0) {
          // Circle
          shapeElement = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
          shapeElement.setAttribute('cx', '50');
          shapeElement.setAttribute('cy', '50');
          shapeElement.setAttribute('r', `${20 + Math.random() * 20}`);
        } else if (shapeType === 1) {
          // Ring (circle with stroke only)
          shapeElement = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
          shapeElement.setAttribute('cx', '50');
          shapeElement.setAttribute('cy', '50');
          shapeElement.setAttribute('r', `${30 + Math.random() * 15}`);
          shapeElement.setAttribute('stroke-width', '2');
        } else {
          // Line
          shapeElement = document.createElementNS('http://www.w3.org/2000/svg', 'line');
          shapeElement.setAttribute('x1', `${10 + Math.random() * 80}`);
          shapeElement.setAttribute('y1', `${10 + Math.random() * 80}`);
          shapeElement.setAttribute('x2', `${10 + Math.random() * 80}`);
          shapeElement.setAttribute('y2', `${10 + Math.random() * 80}`);
          shapeElement.setAttribute('stroke-width', `${1 + Math.random() * 2}`);
        }

        // Apply grayscale styling - stroke only, no fill
        shapeElement.setAttribute('fill', 'none');
        shapeElement.setAttribute('stroke', 'currentColor');
        shapeElement.setAttribute('stroke-opacity', `${0.15 + Math.random() * 0.1}`); // 0.15-0.25 opacity

        svg.appendChild(shapeElement);
        containerRef.current?.appendChild(svg);
        return svg;
      });

      shapesRef.current = shapes;

      // Animate each shape with different durations
      shapes.forEach((shape, index) => {
        if (!shape) return;

        // Random rotation animation
        gsap.to(shape, {
          rotation: 360,
          duration: 40 + Math.random() * 30, // 40-70 seconds
          repeat: -1,
          ease: 'none',
        });

        // Cursor parallax on some shapes (indices 0, 2, 4, 6)
        if (index % 2 === 0) {
          const parallaxStrength = 15 + Math.random() * 10; // 15-25px

          gsap.to(shape, {
            x: () => {
              // Safely access window properties
              const mouseX = (typeof window !== 'undefined' && (window as any).mouseX) || 0;
              const move = mouseX * parallaxStrength / 100;
              return move - parallaxStrength / 2;
            },
            y: () => {
              // Safely access window properties
              const mouseY = (typeof window !== 'undefined' && (window as any).mouseY) || 0;
              const move = mouseY * parallaxStrength / 100;
              return move - parallaxStrength / 2;
            },
            duration: 0.5,
            ease: 'power2.out',
          });
        }

        // Scroll-triggered drift on some shapes (indices 1, 3, 5, 7)
        if (index % 2 === 1) {
          gsap.to(shape, {
            x: () => {
              const scrollProgress = typeof window !== 'undefined'
                ? window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)
                : 0;
              const drift = scrollProgress * 50 - 25; // -25 to 25px drift
              return drift;
            },
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
            duration: 1,
          });
        }
      });

      // Set up mouse tracking for cursor parallax
      const handleMouseMove = (e: MouseEvent) => {
        if (typeof window !== 'undefined') {
          (window as any).mouseX = e.clientX / window.innerWidth;
          (window as any).mouseY = e.clientY / window.innerHeight;
        }
      };

      if (typeof window !== 'undefined') {
        window.addEventListener('mousemove', handleMouseMove);
      }

      return () => {
        console.log('GeometricField: Cleaning up GSAP animations');
        if (typeof window !== 'undefined') {
          window.removeEventListener('mousemove', handleMouseMove);
        }
        shapes.forEach(shape => gsap.killTweensOf(shape));
      };
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0"
      aria-hidden="true"
    >
      {/* Shapes are appended dynamically in useGSAP */}
    </div>
  );
}