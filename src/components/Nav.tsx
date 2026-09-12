"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/content";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#writing", label: "Writing" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-[hsl(var(--background))/0.8] backdrop-blur-md border-b border-[hsl(var(--border))]"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a href="#top" className="text-sm font-semibold tracking-tight">
          {site.shortName}
        </a>
        <ul className="hidden gap-8 text-sm text-[hsl(var(--muted-foreground))/0.7] sm:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="transition-colors hover:text-[hsl(var(--foreground))]">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={`mailto:${site.email}`}
          className="rounded-full border border-[hsl(var(--border))/0.15] px-4 py-1.5 text-sm transition-colors hover:border-[hsl(var(--border))]/0.4"
        >
          Say hi
        </a>
      </nav>
    </header>
  );
}
