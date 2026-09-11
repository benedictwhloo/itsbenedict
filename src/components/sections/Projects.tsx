import SplitReveal from "@/components/ui/SplitReveal";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { projects } from "@/lib/content";

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-28">
      <SplitReveal className="text-3xl font-semibold tracking-tight sm:text-4xl">
        Projects
      </SplitReveal>
      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <SpotlightCard key={project.title}>
            <h3 className="text-lg font-medium">{project.title}</h3>
            <p className="mt-2 text-sm text-[rgba(17,17,17,0.6)]">{project.blurb}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[rgba(17,17,17,0.1)] px-3 py-1 text-xs text-[rgba(17,17,17,0.5)]"
                >
                  {tag}
                </span>
              ))}
            </div>
            {project.href && (
              <a
                href={project.href}
                className="mt-4 inline-block text-sm text-red-500 hover:underline"
              >
                View →
              </a>
            )}
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
}
