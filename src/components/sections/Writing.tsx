import SplitReveal from "@/components/ui/SplitReveal";
import { writing } from "@/lib/content";

export default function Writing() {
  return (
    <section id="writing" className="mx-auto max-w-5xl px-6 py-28">
      <SplitReveal className="text-3xl font-semibold tracking-tight sm:text-4xl">
        {writing.heading}
      </SplitReveal>
      <p className="mt-4 max-w-2xl text-foreground/60">{writing.intro}</p>
      <div className="mt-10 divide-y divide-foreground/10 border-y border-foreground/10">
        {writing.placeholderPosts.map((post) => (
          <div key={post.title} className="flex items-baseline justify-between py-5">
            <div>
              <h3 className="font-medium">{post.title}</h3>
              <p className="text-sm text-foreground/50">{post.excerpt}</p>
            </div>

            <span className="shrink-0 pl-4 text-sm text-foreground/40">{post.date}</span>
          </div>
        ))}
      </div>
    </section>
  );
}