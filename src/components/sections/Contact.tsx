import SplitReveal from "@/components/ui/SplitReveal";
import MagnetButton from "@/components/ui/MagnetButton";
import GradientText from "@/components/ui/GradientText";
import { contact, site } from "@/lib/content";

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-5xl px-6 py-28 text-center">
      <SplitReveal className="text-3xl font-semibold tracking-tight sm:text-4xl">
        {contact.heading}
      </SplitReveal>
      <p className="mx-auto mt-4 max-w-lg text-white/60">{contact.blurb}</p>
      <div className="mt-10">
        <MagnetButton
          href={`mailto:${site.email}`}
          className="border border-white/20 px-8 py-4 text-lg hover:border-white/40"
        >
          <GradientText>{site.email}</GradientText>
        </MagnetButton>
      </div>
      <footer className="mt-24 text-sm text-white/30">
        © {new Date().getFullYear()} {site.name}
      </footer>
    </section>
  );
}
