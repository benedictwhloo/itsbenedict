# Design framework — itsbenedict.com

Reference spec for the original build. Use this to realign the site if it's
drifted — treat these as constraints, not suggestions.

## Palette

**Light theme.** Dark grey text on a light ground, one neutral accent — no
blue, no purple, no saturated hue anywhere in the UI.

These are defined once in `src/app/globals.css` as CSS variables and exposed
to Tailwind as `bg-background`, `text-foreground`, `text-accent`, etc. Use
the token names, never raw hex, in components.

| Tailwind token | Value | Use |
|---|---|---|
| `background` | `#f5f5f4` | page background, always |
| `foreground` | `#1c1c1e` | body text (dark grey, not pure black) |
| `accent` | `#3f3f46` (charcoal) | stats, links, primary-button hover — same hue family as the text, just a shade shift, not a different colour |
| `foreground/10` | — | card borders, section rules |
| `foreground/50`–`/70` | — | secondary copy, labels, captions |
| `--shape-stroke` | `rgba(28,28,30,0.14)` | the GeometricField outline shapes only |

Opacity-on-foreground is the whole system: `text-foreground/60`,
`border-foreground/10`, `bg-foreground/[0.03]`. There are no other colours.
If brown, lime, blue, purple, or any tinted colour shows up anywhere
(GeometricField, SpotlightCard glow, GradientText, buttons), that's drift —
pull it back to these tokens.

## Typography

- Body/UI font: system stack (`-apple-system, BlinkMacSystemFont, "Segoe UI",
  Inter, Roboto, sans-serif`) — deliberate, avoids a Google Fonts build
  dependency. Used for everything except the one exception below.
- **Hero name (the `<h1>`) uses BBH Bartle** via the `font-display`
  utility. The font is loaded from the `@fontsource/bbh-bartle` npm package
  (`@import "@fontsource/bbh-bartle/400.css"` in globals.css) — not from
  hand-placed files. This is the one element that gets the display
  typeface; every other heading (About, Experience, Projects, Writing,
  Contact) stays on the system stack with `font-semibold tracking-tight`.
- BBH Bartle is a very wide extended face, so the hero name is sized
  smaller than a normal h1 would be: `text-3xl sm:text-5xl lg:text-[3.4rem]`
  with `text-balance`, so it breaks as "BENEDICT" / "DIELENBERG-LOO". Don't
  push it to `text-6xl`+ — it overflows the column.
- `SplitReveal` waits for `document.fonts.ready` before splitting. This is
  required — without it the hero name splits its lines while the fallback
  font is still active and you get a stray orphaned letter on its own line
  once BBH Bartle loads.
- Section headings: `text-3xl sm:text-4xl`.
- Body copy: `text-black/60` or `/70`, never full-opacity black for
  paragraphs.
- Small labels (location, tags): `text-sm uppercase tracking-[0.2em]
  text-black/50`.

## Layout

- Every section: `mx-auto max-w-5xl px-6`, vertical rhythm `py-28` (hero is
  `py-32` inside a `min-h-screen` section).
- Content never exceeds `max-w-5xl` — this is a narrow, readable column, not
  a full-bleed layout, except the Hero's Vanta background which is
  `absolute inset-0` behind it.
- Grids are simple: `grid gap-12 sm:grid-cols-3`, `grid gap-6 sm:grid-cols-2`.
  No asymmetric or complex grid layouts — the whole site is single-column
  content blocks stacked vertically.

## Motion (GSAP + Lenis)

- Lenis smooth scroll is synced to **GSAP's ticker**, not its own rAF loop —
  this is the one detail most re-implementations get wrong and it causes
  visible jitter if skipped. See `SmoothScroll.tsx`.
- Every heading uses `SplitReveal` (GSAP SplitText, char-level, `yPercent:
  120 → 0`, `power4.out`, `stagger: 0.015`), triggered once on scroll
  (`start: "top 85%", once: true`) — except the Hero `<h1>`, which plays
  `immediate` on load instead of waiting for scroll.
- Motion respects `prefers-reduced-motion`: Lenis, the hero's `GeometricField`
  shapes, and any scroll-triggered animation must degrade gracefully — check
  the media query via `useSyncExternalStore`, not a `useEffect` + `setState`
  (see `SmoothScroll.tsx` for the reference pattern).
- Nothing animates opacity/transform on hover with anything other than
  `transition-colors` or `transition-opacity` — no layout-shifting hover
  effects.

## Component patterns (the "React Bits" set)

These are hand-built, not pulled from a component library — keep them that
way rather than swapping in a random UI kit mid-project.

- **SpotlightCard** — `rounded-2xl border border-black/10 bg-black/[0.03]
  p-6`, radial gradient following the cursor via a CSS custom property
  (`--spot-x`/`--spot-y`), not a JS animation loop. The glow itself should
  be a soft dark-grey/charcoal radial (e.g. `rgba(0,0,0,0.08)`), not a tinted
  color. Used for all card grids (Projects).
- **MagnetButton** — pill button (`rounded-full px-6 py-3`), leans toward
  the cursor via `gsap.quickTo` on x/y, springs back on leave. Two visual
  variants only: solid dark-on-light (charcoal background, light text —
  primary action) and outlined `black/20` border (secondary) — don't add a
  third button style.
- **GradientText** — animated shimmer, but now within the grey family only
  (e.g. `#1c1c1e → #52525b → #1c1c1e`), pure CSS keyframe
  (`animate-gradient-x`), used sparingly (role/title line, email in
  Contact) — not for body text. No hue shift, just a lightness shimmer.
- **CountUp** — GSAP tween on a plain number object, scroll-triggered once.
  Used only for the About stats row.

## Content rules

- Real content lives in one file (`src/lib/content.ts`) — no hardcoded copy
  inside components. If Claude Code is writing strings directly into JSX
  instead of importing from `content.ts`, that's the drift to fix first.
- Section order is fixed: Hero → About → Experience → Projects → Writing →
  Contact. Nav links match this order exactly.

## Hero visual — GSAP shapes (replaces Vanta)

Vanta/three.js is gone — it was a WebGL globe rendering every frame, which is
exactly why it lagged. Replacement is pure inline SVG + GSAP, no canvas, no
WebGL, no new dependency (GSAP's already in the stack).

**Component: `src/components/GeometricField.tsx`** — five absolutely-
positioned, outline-only inline SVGs scattered around the hero content: a
large dashed double ring (top-right), a small circle beside the name (the
reference-image motif), crossed lines (lower-left), a ring with a centre
dot (bottom-right), a rotated square (top-left). Stroke only, no fill, using
the `--shape-stroke` token (`rgba(28,28,30,0.14)`), sub-1px strokes in
viewBox units so they stay hairline at any size. It reads as texture behind
the text and never competes with it. **Not** thick rings, **not** filled,
**not** giant arcs bleeding off the page.

Motion, all GSAP (reuse patterns already in the codebase rather than
inventing new ones):
- Each shape gets its own slow continuous loop —
  `gsap.to(el, { rotation: 360, duration: 40–70, repeat: -1, ease: "none" })`,
  duration varied per shape so they don't sync up.
- Cursor parallax on 2–3 of the shapes using the same `gsap.quickTo` pattern
  as `MagnetButton` — small offset (10–20px range), not a 1:1 cursor follow.
- Tie one or two shapes to a scroll-scrubbed `ScrollTrigger` (drift/scale
  slightly as the hero scrolls past) so the hero isn't a dead zone once you
  start scrolling — this plugs into the existing Lenis+ScrollTrigger sync,
  not a separate scroll listener.
- `prefers-reduced-motion` is checked via `useSyncExternalStore` against the
  media query; if set, the shapes render static (no rotation, no parallax,
  no scroll drift). Shapes are tagged with `data-shape`, `data-parallax`
  (with a depth multiplier), and `data-scroll` so each behaviour is opt-in
  per shape.

Nothing here is async-loaded or GPU-canvas-based, so this should cost close
to nothing compared to the three.js globe.

## What "butchered" usually means in practice

If it's drifted, check these first — they're the highest-leverage things to
restore:
1. Any blue, purple, or other saturated hue creeping back in anywhere
   (`GeometricField`, SpotlightCard glow, GradientText, accent color) —
   everything should read as light-grey background / dark-grey text /
   charcoal accent
2. BBH Bartle applied outside the hero name, or not applied to it at all
3. Full-width layouts breaking the `max-w-5xl` column
4. Content hardcoded in components instead of `content.ts`
5. Lenis un-synced from GSAP's ticker (causes scroll jitter)
6. New button/card styles that don't match MagnetButton/SpotlightCard
7. Any WebGL/canvas library creeping back into the hero — the whole point
   of `GeometricField` was dropping that weight; if the hero starts lagging
   again, check for exactly this
