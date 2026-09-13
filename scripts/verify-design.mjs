/**
 * Design regression check for itsbenedict.com
 *
 * Asserts the things DESIGN-FRAMEWORK.md actually promises, by loading the
 * real page in a headless browser and reading computed styles and live
 * animation state. These are the checks a person would otherwise have to
 * make by eye, which is exactly the kind of verification an agent cannot
 * do honestly.
 *
 * Usage:
 *   npm run dev            (in one terminal)
 *   node scripts/verify-design.mjs
 *   node scripts/verify-design.mjs http://localhost:3001   (custom URL)
 *
 * Exits 0 if every check passes, 1 otherwise.
 */

import { chromium } from "playwright";

const URL = process.argv[2] || "http://localhost:3000";

const results = [];
const pass = (name, detail = "") => results.push({ ok: true, name, detail });
const fail = (name, detail = "") => results.push({ ok: false, name, detail });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

const consoleErrors = [];
page.on("console", (m) => m.type() === "error" && consoleErrors.push(m.text()));
page.on("pageerror", (e) => consoleErrors.push("pageerror: " + e.message));

try {
  await page.goto(URL, { waitUntil: "networkidle", timeout: 30000 });
} catch (e) {
  console.error(`\nCould not load ${URL}. Is the dev server running?\n${e.message}\n`);
  await browser.close();
  process.exit(1);
}

await sleep(2000);

// --- 1. Tailwind is actually loaded -----------------------------------------
// If Tailwind fails, links render as default browser blue (#0000EE) and the
// layout loses its column. This is the single highest-value check: everything
// else looks "fine" in the source while the page is visibly broken.
const navColor = await page.evaluate(() => {
  const a = document.querySelector("header a");
  return a ? getComputedStyle(a).color : null;
});
if (!navColor) fail("Tailwind loaded", "no header link found");
else if (navColor === "rgb(0, 0, 238)")
  fail("Tailwind loaded", `nav link is browser-default blue (${navColor}) — utilities are not applying`);
else pass("Tailwind loaded", `nav link colour ${navColor}`);

const maxWidth = await page.evaluate(() => {
  const s = document.querySelector("#about");
  return s ? getComputedStyle(s).maxWidth : null;
});
if (maxWidth && maxWidth !== "none") pass("Content column constrained", `max-width ${maxWidth}`);
else fail("Content column constrained", `#about max-width is ${maxWidth}`);

// --- 2. Palette --------------------------------------------------------------
const bodyBg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
if (bodyBg === "rgb(245, 245, 244)") pass("Background is #f5f5f4", bodyBg);
else fail("Background is #f5f5f4", `got ${bodyBg}`);

const bodyColor = await page.evaluate(() => getComputedStyle(document.body).color);
if (bodyColor === "rgb(28, 28, 30)") pass("Foreground is #1c1c1e", bodyColor);
else fail("Foreground is #1c1c1e", `got ${bodyColor}`);

// No saturated hue anywhere: sample every element's colour-ish properties and
// flag anything where the R/G/B channels diverge enough to read as a tint.
const tinted = await page.evaluate(() => {
  const offenders = [];
  const parse = (v) => {
    const m = /rgba?\((\d+), ?(\d+), ?(\d+)/.exec(v || "");
    return m ? [ +m[1], +m[2], +m[3] ] : null;
  };
  for (const el of document.querySelectorAll("*")) {
    const cs = getComputedStyle(el);
    for (const prop of ["color", "backgroundColor", "borderTopColor"]) {
      const rgb = parse(cs[prop]);
      if (!rgb) continue;
      const [r, g, b] = rgb;
      // Allow a small spread for warm-grey tokens like #f5f5f4.
      if (Math.max(r, g, b) - Math.min(r, g, b) > 12) {
        offenders.push(`${el.tagName.toLowerCase()}.${el.className?.toString().slice(0, 30)} ${prop}: ${cs[prop]}`);
      }
    }
  }
  return [...new Set(offenders)].slice(0, 8);
});
if (tinted.length === 0) pass("No saturated/tinted colours", "everything is greyscale");
else fail("No saturated/tinted colours", tinted.join(" | "));

// --- 3. Typography -----------------------------------------------------------
const h1Font = await page.evaluate(() => getComputedStyle(document.querySelector("h1")).fontFamily);
if (/BBH Bartle/.test(h1Font)) pass("Hero h1 uses BBH Bartle", h1Font.split(",")[0]);
else fail("Hero h1 uses BBH Bartle", `got ${h1Font}`);

const fontReallyLoaded = await page.evaluate(() => document.fonts.check('16px "BBH Bartle"'));
if (fontReallyLoaded) pass("BBH Bartle webfont actually loaded", "document.fonts.check true");
else fail("BBH Bartle webfont actually loaded", "font file did not load — h1 is falling back");

// BBH Bartle must NOT leak onto other headings.
const leaked = await page.evaluate(() =>
  [...document.querySelectorAll("h2, h3")]
    .filter((el) => /BBH Bartle/.test(getComputedStyle(el).fontFamily))
    .map((el) => el.textContent.trim().slice(0, 30))
);
if (leaked.length === 0) pass("BBH Bartle scoped to h1 only", "no h2/h3 using it");
else fail("BBH Bartle scoped to h1 only", `also on: ${leaked.join(", ")}`);

// Hero name must not orphan a character onto its own line.
const h1Lines = await page.evaluate(() => {
  const el = document.querySelector("h1");
  const lines = el.querySelectorAll(".split-line");
  return [...(lines.length ? lines : [el])].map((l) => l.textContent.trim());
});
const orphan = h1Lines.find((l) => l.length > 0 && l.length <= 2);
if (!orphan) pass("Hero name has no orphaned line", h1Lines.join(" / "));
else fail("Hero name has no orphaned line", `line "${orphan}" — SplitText likely split before the font loaded`);

// --- 4. GeometricField: shapes exist, animate, and are chrome ----------------
const shapeCount = await page.evaluate(() => document.querySelectorAll("[data-shape]").length);
if (shapeCount === 5) pass("5 GeometricField shapes present", `${shapeCount} found`);
else fail("5 GeometricField shapes present", `${shapeCount} found`);

const noWebgl = await page.evaluate(() => document.querySelectorAll("canvas").length);
if (noWebgl === 0) pass("No canvas/WebGL in the hero", "0 canvas elements");
else fail("No canvas/WebGL in the hero", `${noWebgl} canvas element(s) — Vanta/three may be back`);

const shapeTransform = await page.evaluate(
  () => getComputedStyle(document.querySelector("[data-shape]")).transform
);
if (shapeTransform && shapeTransform !== "none" && shapeTransform !== "matrix(1, 0, 0, 1, 0, 0)")
  pass("Shapes are rotating (GSAP live)", shapeTransform.slice(0, 40));
else fail("Shapes are rotating (GSAP live)", `transform is ${shapeTransform}`);

const strokeIsGradient = await page.evaluate(() => {
  const c = document.querySelector("[data-shape] circle");
  return c ? getComputedStyle(c).stroke : null;
});
if (/url\(.*chrome-sweep/.test(strokeIsGradient || ""))
  pass("Shapes have chrome gradient stroke", strokeIsGradient);
else fail("Shapes have chrome gradient stroke", `stroke is ${strokeIsGradient} — gradient ref failed to resolve`);

const stopCount = await page.evaluate(() => {
  const g = document.querySelector("#chrome-sweep");
  return g ? g.querySelectorAll("stop").length : 0;
});
if (stopCount >= 15) pass("Chrome ramp has enough bands", `${stopCount} stops`);
else fail("Chrome ramp has enough bands", `only ${stopCount} stops — too few to read as metal (want 15+)`);

// The sweep must animate independently of the shapes.
const sweepA = await page.evaluate(() =>
  document.querySelector("#chrome-sweep")?.getAttribute("gradientTransform")
);
await sleep(900);
const sweepB = await page.evaluate(() =>
  document.querySelector("#chrome-sweep")?.getAttribute("gradientTransform")
);
if (sweepA && sweepB && sweepA !== sweepB)
  pass("Chrome sweep is animating", `${sweepA} -> ${sweepB}`);
else fail("Chrome sweep is animating", `gradientTransform stayed at ${sweepA}`);

// --- 5. Content comes from content.ts ---------------------------------------
const bodyText = await page.evaluate(() => document.body.innerText);
for (const [label, needle] of [
  ["Hero title from content.ts", "Full-Cycle Account Manager"],
  ["Experience populated", "Cana Capital"],
  ["Previously entry present", "Previously"],
]) {
  if (bodyText.includes(needle)) pass(label, `found "${needle}"`);
  else fail(label, `"${needle}" missing from page`);
}

// --- 6. Console --------------------------------------------------------------
if (consoleErrors.length === 0) pass("No console errors", "");
else fail("No console errors", consoleErrors.slice(0, 3).join(" | "));

await browser.close();

// --- Report ------------------------------------------------------------------
const failed = results.filter((r) => !r.ok);
console.log("");
for (const r of results) {
  console.log(`${r.ok ? "PASS" : "FAIL"}  ${r.name}${r.detail ? `  (${r.detail})` : ""}`);
}
console.log(`\n${results.length - failed.length}/${results.length} checks passed\n`);

if (failed.length) {
  console.log("FAILED:");
  for (const f of failed) console.log(`  - ${f.name}: ${f.detail}`);
  console.log("");
  process.exit(1);
}
process.exit(0);
