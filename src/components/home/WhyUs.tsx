import { CheckCircle2 } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionKicker from "@/components/ui/SectionKicker";
import type { WhyUsItem } from "@/lib/data";

export default function WhyUs({
  title,
  subtitle,
  items,
}: {
  title: string;
  subtitle: string;
  items: WhyUsItem[];
}) {
  return (
    <section className="relative bg-ink-900/30 py-32">
      <Container>
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <Reveal>
              <SectionKicker>Neden Biz</SectionKicker>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-7 font-display text-3xl font-bold leading-[1.2] tracking-[-0.01em] text-foreground sm:text-4xl">
                {title}
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 max-w-lg text-base font-light leading-[1.75] text-foreground/50">
                {subtitle}
              </p>
            </Reveal>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {items.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08}>
                <div className="group relative h-full overflow-hidden rounded-[3px] border border-gold-900/50 bg-ink-950/50 p-6 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-gold-600/40">
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-transparent via-gold-400 to-transparent transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
                  />
                  <div className="flex h-10 w-10 items-center justify-center rounded-[3px] border border-gold-700/40 bg-gold-500/[0.04] text-gold-400 transition-colors duration-500 group-hover:border-gold-500 group-hover:text-gold-300">
                    <CheckCircle2 className="h-[1.05rem] w-[1.05rem]" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-bold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-foreground/50">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
