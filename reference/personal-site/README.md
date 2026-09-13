# Personal Site

Next.js (App Router, TypeScript, Tailwind v4) with GSAP scroll animation, Lenis
smooth scrolling, a Vanta.js WebGL background, and hand-built React
Bits-style interactive components (magnetic buttons, spotlight cards,
character-reveal text, animated counters).

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Editing content

Nearly everything text-based lives in one file: `src/lib/content.ts` —
name, bio, experience entries, projects, and contact info. Edit that file
first; you shouldn't need to touch component code for routine content
changes.

Search the codebase for `TODO` to find placeholder content worth
replacing (LinkedIn URL, project links, expanded experience entries, real
writing posts).

## Structure

- `src/app/` — root layout + the single page (`page.tsx`) that composes
  all sections
- `src/components/sections/` — Hero, About, Experience, Projects,
  Writing, Contact
- `src/components/ui/` — reusable interactive primitives (SplitReveal,
  MagnetButton, SpotlightCard, GradientText, CountUp)
- `src/components/SmoothScroll.tsx` — Lenis + GSAP ScrollTrigger sync,
  respects `prefers-reduced-motion`
- `src/components/VantaBackground.tsx` — the hero's WebGL globe

## Notes

- **Fonts**: uses a system font stack rather than `next/font/google`, since
  the build environment this was built in couldn't reach Google Fonts. If
  you want a specific typeface (e.g. Geist), swap it back in
  `src/app/layout.tsx` — Vercel's build servers have normal internet
  access, so this isn't a real constraint once deployed.
- **React Bits**: the actual reactbits.dev components are pulled via a
  `jsrepo` CLI, which needs to hit GitHub's API — not reachable from this
  build sandbox. The `src/components/ui/` primitives above were built by
  hand instead, using the same GSAP/Tailwind stack, so behavior matches
  the React Bits patterns (magnetic buttons, spotlight cards, split-text
  reveals). You can still pull real React Bits components later with
  `npx jsrepo@latest add` if you want specific ones.
- **Vanta effect**: currently `GLOBE`. Other geometric options worth
  trying: `CELLS`, `NET`, `RINGS` — swap the import in
  `VantaBackground.tsx` and the matching type in `src/types/vanta.d.ts`.

## Deploying to Vercel

```bash
npx vercel
```

or push to GitHub and import the repo at vercel.com/new — zero config
needed, Next.js is auto-detected.
