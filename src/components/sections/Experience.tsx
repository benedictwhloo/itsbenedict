import SplitReveal from "@/components/ui/SplitReveal";
import { experience } from "@/lib/content";

export default function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-5xl px-6 py-28">
      <SplitReveal className="text-3xl font-semibold tracking-tight sm:text-4xl">
        Experience
      </SplitReveal>
      <ol className="mt-12 space-y-10 border-l border-[rgba(17,17,17,0.1)]">
        {experience.map((entry) => (
          <li key={entry.role + entry.org} className="relative pl-8">
            <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-red-500" />
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-lg font-medium">{entry.role}</h3>
              <span className="text-sm text-[rgba(17,17,17,0.4)]">{entry.period}</span>
            </div>
            <p className="text-sm text-[rgba(17,17,17,0.5)]">{entry.org}</p>
            <p className="mt-2 max-w-2xl text-[rgba(17,17,17,0.7)]">{entry.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
