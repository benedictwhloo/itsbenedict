import SplitReveal from "@/components/ui/SplitReveal";
import CountUp from "@/components/ui/CountUp";
import { about } from "@/lib/content";

const STATS = [
  { to: 5, suffix: "+", label: "Companies worked with" },
  { to: 2, suffix: "", label: "Roles running in parallel" },
  { to: 1, suffix: "", label: "Site built end to end" },
];

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-5xl px-6 py-28">
      <SplitReveal className="text-3xl font-semibold tracking-tight sm:text-4xl">
        {about.heading}
      </SplitReveal>
      <div className="mt-8 grid gap-12 sm:grid-cols-3">
        <div className="space-y-5 text-foreground/70 sm:col-span-2">
          {about.paragraphs.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
        <div className="flex flex-col gap-6 border-l border-foreground/10 pl-6">
          {STATS.map((s) => (
            <div key={s.label}>
              <CountUp
                to={s.to}
                suffix={s.suffix}
                className="text-3xl font-semibold text-accent"
              />
              <p className="mt-1 text-sm text-foreground/50">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}