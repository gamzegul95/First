import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Container from "@/components/ui/Container";

export default function PageHero({
  kicker,
  title,
  description,
  crumb,
}: {
  kicker: string;
  title: string;
  description?: string;
  crumb: string;
}) {
  return (
    <section className="relative overflow-hidden bg-ink-950 pb-20 pt-40">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-gold-600/10 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #c2984f 1px, transparent 1px), linear-gradient(to bottom, #c2984f 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      <Container className="relative">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-stone-500">
          <Link href="/" className="transition-colors hover:text-gold-300">
            Ana Sayfa
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-gold-400">{crumb}</span>
        </div>

        <p className="mt-8 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.32em] text-gold-400">
          <span className="h-px w-10 bg-gold-500" />
          {kicker}
        </p>
        <h1 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-tight text-stone-50 sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-stone-400">
            {description}
          </p>
        )}
      </Container>
    </section>
  );
}
