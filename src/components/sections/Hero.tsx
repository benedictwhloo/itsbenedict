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
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(255,255,255,0.3)]"
      />
      <div className="relative mx-auto w-full max-w-5xl px-6 py-32">
        <p className="mb-4 text-sm uppercase tracking-[0.2em] text-[rgba(17,17,17,0.5)]">
          {site.location}
        </p>
        <SplitReveal
          as="h1"
          immediate
          className="text-4xl font-semibold tracking-tight sm:text-6xl text-[rgba(17,17,17,0.9)]"
        >
          {site.name}
        </SplitReveal>
        <h2 className="mt-4 text-xl text-[rgba(17,17,17,0.7)] sm:text-2xl">
          <GradientText>{site.title}</GradientText>
        </h2>
        <p className="mt-6 max-w-xl text-base text-[rgba(17,17,17,0.6)] sm:text-lg">
          {site.tagline}
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <MagnetButton
            href="#projects"
            className="bg-white text-[#111111] hover:bg-white/90"
          >
            See my work
          </MagnetButton>
          <MagnetButton
            href={`mailto:${site.email}`}
            className="border border-[rgba(17,17,17,0.2)] text-[#111111] hover:border-[rgba(17,17,17,0.4)]"
          >
            Get in touch
          </MagnetButton>
        </div>
      </div>
    </section>
  );
}
