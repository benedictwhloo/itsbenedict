import VantaBackground from "@/components/VantaBackground";
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
      <VantaBackground />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0f]"
      />
      <div className="relative mx-auto w-full max-w-5xl px-6 py-32">
        <p className="mb-4 text-sm uppercase tracking-[0.2em] text-white/50">
          {site.location}
        </p>
        <SplitReveal
          as="h1"
          immediate
          className="text-4xl font-semibold tracking-tight sm:text-6xl"
        >
          {site.name}
        </SplitReveal>
        <h2 className="mt-4 text-xl text-white/70 sm:text-2xl">
          <GradientText>{site.title}</GradientText>
        </h2>
        <p className="mt-6 max-w-xl text-base text-white/60 sm:text-lg">
          {site.tagline}
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <MagnetButton
            href="#projects"
            className="bg-white text-[#0a0a0f] hover:bg-white/90"
          >
            See my work
          </MagnetButton>
          <MagnetButton
            href={`mailto:${site.email}`}
            className="border border-white/20 text-white hover:border-white/40"
          >
            Get in touch
          </MagnetButton>
        </div>
      </div>
    </section>
  );
}
