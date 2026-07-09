import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Target, Eye } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionKicker from "@/components/ui/SectionKicker";
import ProfilePhoto from "@/components/ui/ProfilePhoto";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/structured-data";
import { getAboutContent, getLawyerProfile } from "@/lib/data";

const description =
  "AKKAYA HUKUK & DANIŞMANLIK'ın hikayesi, misyonu, vizyonu ve değerleri.";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description,
  alternates: { canonical: "/hakkimizda" },
  openGraph: { title: "Hakkımızda", description, url: "/hakkimizda" },
};

export default async function AboutPage() {
  const [about, lawyer] = await Promise.all([
    getAboutContent(),
    getLawyerProfile(),
  ]);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Ana Sayfa", path: "/" },
          { name: "Hakkımızda", path: "/hakkimizda" },
        ])}
      />
      <PageHero
        kicker="Hakkımızda"
        title={about.title}
        description={about.intro}
        crumb="Hakkımızda"
      />

      <section className="relative bg-ink-950 py-24">
        <Container>
          <Reveal>
            <Link
              href="/hakkimizda/avukat"
              className="group flex flex-col items-center gap-8 overflow-hidden rounded-[3px] border border-gold-900/50 bg-gradient-to-b from-ink-900/70 to-ink-900/20 p-8 text-center transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-gold-600/40 sm:flex-row sm:justify-center sm:p-10 sm:text-left"
            >
              <ProfilePhoto
                photoUrl={lawyer.photoUrl}
                name={lawyer.name}
                className="aspect-square w-28 rounded-[3px] border border-gold-900/50 sm:w-40"
              />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500/80">
                  {lawyer.title}
                </p>
                <h3 className="mt-2 font-display text-2xl font-bold text-foreground">
                  {lawyer.name}
                </h3>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium tracking-wide text-gold-400 transition-colors duration-500 group-hover:text-gold-200">
                  Profili Görüntüle
                  <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </Reveal>
        </Container>
      </section>

      <section className="relative bg-ink-900/40 py-24">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-sm border border-ink-border bg-ink-950/60 p-10">
                <Target className="h-7 w-7 text-gold-500" />
                <h3 className="mt-5 font-display text-2xl font-semibold text-stone-50">
                  {about.missionTitle}
                </h3>
                <p className="mt-4 leading-relaxed text-stone-400">
                  {about.missionBody}
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="h-full rounded-sm border border-ink-border bg-ink-950/60 p-10">
                <Eye className="h-7 w-7 text-gold-500" />
                <h3 className="mt-5 font-display text-2xl font-semibold text-stone-50">
                  {about.visionTitle}
                </h3>
                <p className="mt-4 leading-relaxed text-stone-400">
                  {about.visionBody}
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="relative bg-ink-950 py-24">
        <Container>
          <div className="flex flex-col items-center text-center">
            <Reveal>
              <SectionKicker align="center">Değerlerimiz</SectionKicker>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-6 max-w-xl font-display text-3xl font-semibold text-stone-50 sm:text-4xl">
                Çalışma Prensiplerimiz
              </h2>
            </Reveal>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {about.values.map((value, i) => (
              <Reveal key={value.title} delay={i * 0.1}>
                <div className="h-full rounded-sm border border-ink-border p-7 text-center transition-colors hover:border-gold-700/50">
                  <h3 className="font-display text-lg font-semibold text-stone-100">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-400">
                    {value.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
