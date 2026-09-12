import SplitReveal from "@/components/ui/SplitReveal";
import { about } from "@/lib/content";
import CountUp from "@/components/ui/CountUp";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-5xl px-6 py-28">
      <SplitReveal className="text-3xl font-semibold tracking-tight sm:text-4xl">
        {about.heading}
      </SplitReveal>
      <div className="mt-8 grid gap-12 sm:grid-cols-3">
        <div className="space-y-5 text-[hsl(var(--muted-foreground))/0.7] sm:col-span-2">
          {about.paragraphs.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
        <div className="flex flex-col gap-6 border-l border-[hsl(var(--border))/0.1] pl-6">
          {/* Stats would go here if we had them defined */}
        </div>
      </div>
    </section>
  );
}