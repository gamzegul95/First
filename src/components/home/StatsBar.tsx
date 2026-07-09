import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

export default function StatsBar({
  stats,
}: {
  stats: { value: string; label: string }[];
}) {
  return (
    <section className="relative border-y border-gold-900/30 bg-ink-900/50">
      <Container>
        <div className="grid grid-cols-2 divide-y divide-gold-900/30 lg:grid-cols-4 lg:divide-y-0 lg:divide-x">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08}>
              <div className="flex flex-col items-center gap-2.5 px-6 py-14 text-center">
                <span className="font-display text-4xl font-bold text-gold-300 sm:text-5xl">
                  <AnimatedCounter value={stat.value} />
                </span>
                <span className="text-xs uppercase tracking-[0.24em] text-foreground/40">
                  {stat.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
