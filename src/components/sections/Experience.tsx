import SplitReveal from "@/components/ui/SplitReveal";
import { experience } from "@/lib/content";

export default function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-5xl px-6 py-28">
      <SplitReveal className="text-3xl font-semibold tracking-tight sm:text-4xl">
        Experience
      </SplitReveal>
      <div className="mt-12 space-y-12">
        {experience.map((exp) => (
          <div key={exp.role} className="flex flex-col gap-4">
            <div className="flex-1 space-y-2">
              <h3 className="text-lg font-medium text-[hsl(var(--foreground))]">
                {exp.role}
              </h3>
              <p className="text-sm text-[hsl(var(--muted-foreground))/0.6]">
                {exp.org}
              </p>
              <p className="mt-1 text-[hsl(var(--muted-foreground))/0.5]">
                {exp.period}
              </p>
            </div>
            <p className="text-[hsl(var(--muted-foreground))/0.6]">
              {exp.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}