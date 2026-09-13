import GeometricField from "@/components/GeometricField";
import SplitReveal from "@/components/ui/SplitReveal";
import GradientText from "@/components/ui/GradientText";
import MagnetButton from "@/components/ui/MagnetButton";
import { site } from "@/lib/content";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      <GeometricField />
      <div className="relative mx-auto w-full max-w-5xl px-6 py-32">
        <p className="mb-4 text-sm uppercase tracking-[0.2em] text-foreground/50">
          {site.location}
        </p>
        {/* The ONLY element that uses BBH Bartle (font-display). */}
        <SplitReveal
          as="h1"
          immediate
          className="font-display text-3xl uppercase leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-[3.4rem]"
        >
          {site.name}
        </SplitReveal>
        <h2 className="mt-4 text-xl font-medium sm:text-2xl">
          <GradientText>{site.title}</GradientText>
        </h2>
        <p className="mt-6 max-w-xl text-base text-foreground/60 sm:text-lg">
          {site.tagline}
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <MagnetButton
            href="#projects"
            className="bg-foreground text-background hover:bg-accent"
          >
            See my work
          </MagnetButton>
          <MagnetButton
            href={`mailto:${site.email}`}
            className="border border-foreground/20 text-foreground hover:border-foreground/50"
          >
            Get in touch
          </MagnetButton>
        </div>
      </div>
    </section>
  );
}
