import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionKicker from "@/components/ui/SectionKicker";

export default function AboutPreview({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <section className="relative bg-ink-900/30 py-32">
      <Container>
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[3px] border border-gold-900/50 lg:aspect-[3/4]">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-gold-500/60 to-transparent"
              />
              <Image
                src="/heykel.png"
                alt="Adalet terazisi heykeli"
                fill
                className="object-cover"
              />
            </div>
          </Reveal>

          <div>
            <Reveal>
              <SectionKicker>Hakkımızda</SectionKicker>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-7 font-display text-3xl font-bold leading-[1.2] tracking-[-0.01em] text-foreground sm:text-4xl">
                {title}
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 max-w-lg text-base font-light leading-[1.75] text-foreground/50">
                {text}
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <Link
                href="/hakkimizda"
                className="group mt-8 inline-flex items-center gap-2 text-sm font-medium tracking-wide text-gold-400 transition-colors duration-500 hover:text-gold-200"
              >
                Hakkımızda
                <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
