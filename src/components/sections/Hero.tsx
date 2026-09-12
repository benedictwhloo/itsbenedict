'use client';

import SplitReveal from "@/components/ui/SplitReveal";
import GradientText from "@/components/ui/GradientText";
import MagnetButton from "@/components/ui/MagnetButton";
import { site } from "@/lib/content";
import { bbhBartle } from "@/lib/fonts";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      <div className="absolute inset-0 -z-[1] overflow-hidden">
        <div className="hero-float-1 absolute w-28 h-28 bg-[radial-gradient(circle_at_50%_50%,rgba(252,125,125,0.2),transparent_70%)] rounded-full top-1/4 left-1/6 animate-float-slow"></div>
        <div className="hero-float-2 absolute w-24 h-24 bg-[radial-gradient(circle_at_50%_50%,rgba(255,102,102,0.15),transparent_70%)] rounded-full top-3/5 right-1/4 animate-float-medium"></div>
        <div className="hero-float-3 absolute w-20 h-20 bg-[radial-gradient(circle_at_50%_50%,rgba(252,125,125,0.22),transparent_70%)] rounded-full bottom-1/3 left-2/3 animate-float-fast"></div>
      </div>

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
          className={`text-3xl font-semibold tracking-tight sm:text-5xl text-[rgba(17,17,17,0.9)] ${bbhBartle.className}`}
        >
          {(() => {
            const [firstName, ...rest] = site.name.split(' ');
            const lastName = rest.join(' ');
            return (
              <>
                <span className="whitespace-nowrap">{firstName}</span><br />
                <span className="whitespace-nowrap">{lastName}</span>
              </>
            );
          })()}
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
