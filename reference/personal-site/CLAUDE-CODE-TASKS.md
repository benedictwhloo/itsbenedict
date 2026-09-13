# Instructions for Claude Code — restore the site to the design framework

Read this whole file before touching anything. Then follow the phases in
order. Do not skip Phase 0. Do not "improve" or reinterpret anything — the
design decisions are already made in `DESIGN-FRAMEWORK.md`; your job is to
implement them exactly.

A complete, verified reference implementation is provided in the
`personal-site-v2.zip` next to this file. When a step says "copy from
reference", copy the file byte-for-byte from that zip. Do not rewrite it in
your own words.

---

## Phase 0 — Diagnose why Tailwind isn't loading (do this first)

The current site renders with NO Tailwind at all: nav links are default
browser blue and underlined, there is no max-width column, buttons render
as bare links, no spacing rhythm. Nothing else can be judged until this is
fixed. Check every item; fix any that fail.

1. `src/app/globals.css` — the **very first line** must be exactly:
   ```css
   @import "tailwindcss";
   ```
   If the file instead contains `@tailwind base;` / `@tailwind components;`
   / `@tailwind utilities;` — delete those three lines. That is Tailwind v3
   syntax and does nothing in v4 (this project is v4). Replace with the
   single `@import` above.
2. `src/app/layout.tsx` must contain `import "./globals.css";`. If missing,
   add it.
3. `postcss.config.mjs` must exist at the repo root with exactly:
   ```js
   const config = {
     plugins: {
       "@tailwindcss/postcss": {},
     },
   };
   export default config;
   ```
4. `package.json` devDependencies must include `"@tailwindcss/postcss": "^4"`
   and `"tailwindcss": "^4"`. If either is missing:
   `npm install -D tailwindcss @tailwindcss/postcss`
5. There must be **no** `tailwind.config.js` / `.ts` / `.mjs` at the root.
   Tailwind v4 does not use one in this project. If one was added, delete it.
6. Do not add any `@config` or `@source` directives to globals.css.

**Acceptance check for Phase 0:** run `npm run dev`, open localhost:3000, and
confirm the nav links are dark grey text with no underline, and the page
content sits in a centred column (not edge-to-edge). If links are still
blue, Phase 0 is not done — go back through the list.

---

## Phase 1 — Replace these files with the reference versions

Copy each of the following from `personal-site-v2.zip` into the same path in
this repo, overwriting what's there:

| File | Why |
|---|---|
| `src/app/globals.css` | Tailwind import, light palette tokens, BBH Bartle import, `font-display` token |
| `src/app/layout.tsx` | body uses `bg-background text-foreground` tokens |
| `src/components/GeometricField.tsx` | **new file** — the GSAP shapes hero background |
| `src/components/Nav.tsx` | palette tokens |
| `src/components/SmoothScroll.tsx` | Lenis synced to GSAP ticker (unchanged, but restore it if it was modified) |
| `src/components/sections/Hero.tsx` | uses GeometricField, BBH Bartle on the h1 only |
| `src/components/sections/About.tsx` | palette tokens |
| `src/components/sections/Experience.tsx` | palette tokens |
| `src/components/sections/Projects.tsx` | palette tokens |
| `src/components/sections/Writing.tsx` | palette tokens |
| `src/components/sections/Contact.tsx` | palette tokens |
| `src/components/ui/SplitReveal.tsx` | now waits for `document.fonts.ready` before splitting — fixes orphaned characters on the hero name |
| `src/components/ui/SpotlightCard.tsx` | neutral grey glow instead of blue |
| `src/components/ui/GradientText.tsx` | grey-only shimmer instead of blue/purple |
| `src/components/ui/MagnetButton.tsx` | unchanged — restore if modified |
| `src/components/ui/CountUp.tsx` | unchanged — restore if modified |

**Do NOT overwrite `src/lib/content.ts`** if the user has edited their copy.
Only the one project blurb changed in the reference (the "This Site" entry
no longer mentions Vanta/Three.js and its tags are `["Next.js", "GSAP",
"Lenis"]`). Apply that single change by hand if their content.ts differs.

---

## Phase 2 — Dependencies

```bash
npm uninstall vanta three @types/three
npm install @fontsource/bbh-bartle
```

Then delete these if they still exist:
- `src/components/VantaBackground.tsx`
- `src/types/vanta.d.ts` (and the `src/types` folder if now empty)

If the user previously added BBH Bartle font files by hand (e.g. in
`public/fonts/` with a custom `@font-face`), remove that custom
`@font-face` and the manual files. The font is now loaded by
`@import "@fontsource/bbh-bartle/400.css";` in globals.css. Two sources of
the same font-family will fight each other.

---

## Phase 3 — Verify (all must pass)

Run each and confirm the stated result. Do not report done until every
line passes.

```bash
npm run lint      # must print no errors and no warnings
npm run build     # must end with "Generating static pages (4/4)" and no errors
```

Then `npm run dev` and, at localhost:3000, confirm each of these by looking:

- [ ] Background is light off-white (`#f5f5f4`), body text is dark grey. No
      brown, no lime/yellow, no blue, no purple anywhere on the page.
- [ ] Nav links are dark grey, not underlined, not browser-blue.
- [ ] Content is in a centred column with side padding, not edge-to-edge.
- [ ] Hero name is in BBH Bartle (wide, extended, uppercase display font)
      and breaks cleanly onto two lines — "BENEDICT" / "DIELENBERG-LOO" —
      with no orphaned single letter on a third line.
- [ ] Every other heading (About, Experience, Projects, Writing, Contact) is
      the normal system sans-serif, NOT BBH Bartle.
- [ ] Behind the hero there are 5 **thin outline** shapes (two rings, a small
      circle, crossed lines, a rotated square), light grey stroke. They are
      NOT thick, NOT filled, NOT huge arcs. They are slowly rotating (watch
      for ~10 seconds). Moving the mouse across the hero makes three of
      them drift slightly. Scrolling down makes two of them drift/scale.
- [ ] Hero "See my work" button is solid dark charcoal with light text;
      "Get in touch" is outlined. Both are pill-shaped and lean toward the
      cursor on hover.
- [ ] Project cards have a rounded border and a soft grey glow that follows
      the cursor on hover (not a coloured glow).
- [ ] Scrolling is smooth (Lenis) and section headings reveal character by
      character as they enter the viewport.
- [ ] Browser devtools console shows zero errors.

---

## Phase 4 — Commit

```bash
git add -A
git commit -m "Restore design framework: light palette, BBH Bartle hero, GSAP GeometricField replacing Vanta"
git push
```

---

## Rules while working on this repo (also in DESIGN-FRAMEWORK.md)

- Never introduce a colour that isn't `background`, `foreground`, `accent`,
  or one of those at an opacity (`text-foreground/60`, `border-foreground/10`).
- Never apply `font-display` (BBH Bartle) to anything except the hero `<h1>`.
- Never re-add Vanta, three.js, or any WebGL/canvas library.
- Never write Tailwind v3 syntax (`@tailwind base` etc.) — this is v4.
- Never hardcode copy inside components — it comes from `src/lib/content.ts`.
- When the user asks for a change and the request is unclear, ask ONE
  clarifying question before editing. Do not guess and then edit ten files.
