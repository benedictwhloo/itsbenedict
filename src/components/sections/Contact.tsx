import SplitReveal from "@/components/ui/SplitReveal";
import { contact } from "@/lib/content";

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-5xl px-6 py-28">
      <SplitReveal className="text-3xl font-semibold tracking-tight sm:text-4xl">
        {contact.heading}
      </SplitReveal>
      <div className="mt-12 space-y-6">
        <p className="max-w-xl text-[hsl(var(--muted-foreground))/0.6]">
          {contact.blurb}
        </p>
        <div className="mt-6 flex items-center gap-4">
          <a
            href={`mailto:benedict@hey.com`}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[hsl(var(--border))/0.2] hover:border-[hsl(var(--border))/0.4] transition-all"
          >
            ✉️
          </a>
          <div className="flex-1 flex flex-wrap gap-4">
            {/* Social links would go here if we had them defined */}
          </div>
        </div>
      </div>
    </section>
  );
}