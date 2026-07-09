import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionKicker from "@/components/ui/SectionKicker";
import CardFanCarousel, { type CardItem } from "@/components/ui/card-fan-carousel";
import { DynamicIcon } from "@/lib/icon-map";
import type { Service } from "@/generated/prisma/client";

// Practice-area imagery for the fan carousel, keyed by service slug.
// Falls back to a generic law-themed photo for any slug not listed here
// (e.g. a new service added later from the admin panel).
const SERVICE_IMAGES: Record<string, string> = {
  "sirketler-hukuku":
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=800&fit=crop",
  "ticaret-hukuku":
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=500&h=800&fit=crop",
  "gayrimenkul-hukuku":
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&h=800&fit=crop",
  "aile-hukuku":
    "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=500&h=800&fit=crop",
  "is-hukuku":
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&h=800&fit=crop",
  "icra-iflas-hukuku":
    "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=500&h=800&fit=crop",
  "miras-hukuku":
    "https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?w=500&h=800&fit=crop",
  "fikri-ve-sinai-haklar-hukuku":
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&h=800&fit=crop",
  "alternatif-uyusmazlik-cozum-yollari":
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&h=800&fit=crop",
};
const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=500&h=800&fit=crop";

export default function ServicesPreview({ services }: { services: Service[] }) {
  const fanCards: CardItem[] = services.map((service) => ({
    imgUrl: SERVICE_IMAGES[service.slug] ?? FALLBACK_IMAGE,
    alt: service.title,
    linkUrl: `/hizmetler/${service.slug}`,
    title: service.title,
  }));

  return (
    <section className="relative bg-ink-950 py-32">
      <Container>
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <SectionKicker align="center">Uzmanlık Alanlarımız</SectionKicker>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-7 max-w-2xl font-display text-3xl font-bold tracking-[-0.01em] text-foreground sm:text-4xl">
              Her Hukuki İhtiyacınıza Özel Çözümler
            </h2>
          </Reveal>
        </div>

        <Reveal delay={0.14}>
          <CardFanCarousel cards={fanCards} />
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.id} delay={(i % 3) * 0.08}>
              <Link
                href={`/hizmetler/${service.slug}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-[3px] border border-gold-900/50 bg-gradient-to-b from-ink-900/70 to-ink-900/20 p-8 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-gold-600/40 hover:bg-ink-900/60"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-transparent via-gold-400 to-transparent transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gold-500/0 blur-2xl transition-all duration-500 group-hover:bg-gold-500/[0.06]"
                />
                <div className="flex h-11 w-11 items-center justify-center rounded-[3px] border border-gold-700/40 bg-gold-500/[0.04] text-gold-400 transition-colors duration-500 group-hover:border-gold-500 group-hover:text-gold-300">
                  <DynamicIcon name={service.icon} className="h-[1.15rem] w-[1.15rem]" />
                </div>
                <h3 className="mt-7 font-display text-xl font-bold text-foreground">
                  {service.title}
                </h3>
                <p className="mt-3 flex-1 text-[0.925rem] leading-relaxed text-foreground/50">
                  {service.summary}
                </p>
                <span className="mt-7 inline-flex items-center gap-1.5 text-sm font-medium tracking-wide text-gold-400 transition-colors duration-500 group-hover:text-gold-200">
                  Detaylı Bilgi
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
