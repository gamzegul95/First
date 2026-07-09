import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Languages, GraduationCap, Scale as ScaleIcon, PhoneCall } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import ProfilePhoto from "@/components/ui/ProfilePhoto";
import JsonLd from "@/components/seo/JsonLd";
import { attorneySchema, breadcrumbSchema } from "@/lib/structured-data";
import { getLawyerProfile, getSiteSettings } from "@/lib/data";

export async function generateMetadata(): Promise<Metadata> {
  const lawyer = await getLawyerProfile();
  const description = lawyer.bio.split("\n")[0];
  return {
    title: lawyer.name,
    description,
    alternates: { canonical: "/hakkimizda/avukat" },
    openGraph: { title: lawyer.name, description, url: "/hakkimizda/avukat" },
  };
}

export default async function LawyerProfilePage() {
  const [lawyer, settings] = await Promise.all([getLawyerProfile(), getSiteSettings()]);
  const paragraphs = lawyer.bio.split("\n").filter(Boolean);

  return (
    <>
      <JsonLd data={attorneySchema(lawyer, settings)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Ana Sayfa", path: "/" },
          { name: "Hakkımızda", path: "/hakkimizda" },
          { name: lawyer.name, path: "/hakkimizda/avukat" },
        ])}
      />
      <PageHero
        kicker="Hakkımızda"
        title={lawyer.name}
        description={lawyer.title}
        crumb={lawyer.name}
      />

      <section className="relative bg-ink-950 py-20">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1.6fr_1fr]">
            <Reveal>
              <ProfilePhoto
                photoUrl={lawyer.photoUrl}
                name={lawyer.name}
                className="mx-auto aspect-[4/5] w-full max-w-sm rounded-[3px] border border-gold-900/50"
              />
              <div className="mt-10 max-w-2xl space-y-5 text-base leading-relaxed text-stone-300">
                {paragraphs.map((p, i) => (
                  <p key={i} className="text-justify">
                    {p}
                  </p>
                ))}
              </div>

              <div className="mt-12 rounded-sm border border-gold-700/30 bg-gradient-to-br from-ink-900 to-ink-950 p-8">
                <h3 className="font-display text-xl font-semibold text-stone-50">
                  Dosyanızı görüşmek ister misiniz?
                </h3>
                <p className="mt-2 text-sm text-stone-400">
                  Hukuki talebinizi değerlendirmemiz için bizimle iletişime geçin.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/iletisim"
                    className="group inline-flex items-center justify-center gap-2 rounded-sm bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 bg-[length:200%_100%] px-6 py-3 text-sm font-semibold text-ink-950 transition-all duration-500 hover:bg-[position:100%_0]"
                  >
                    İletişime Geçin
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <a
                    href={`tel:${settings.phone.replace(/\s/g, "")}`}
                    className="inline-flex items-center justify-center gap-2 rounded-sm border border-gold-600/40 px-6 py-3 text-sm font-medium text-gold-200 transition-all hover:border-gold-400 hover:bg-gold-500/5"
                  >
                    <PhoneCall className="h-4 w-4" />
                    {settings.phone}
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="space-y-6">
                <div className="rounded-sm border border-ink-border bg-ink-900/40 p-7">
                  <h3 className="flex items-center gap-2 font-display text-sm uppercase tracking-[0.2em] text-gold-300">
                    <ScaleIcon className="h-4 w-4" />
                    Uzmanlık Alanları
                  </h3>
                  <ul className="mt-5 space-y-2.5">
                    {lawyer.specializations.map((item) => (
                      <li key={item} className="text-sm text-stone-300">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-sm border border-ink-border bg-ink-900/40 p-7">
                  <h3 className="flex items-center gap-2 font-display text-sm uppercase tracking-[0.2em] text-gold-300">
                    <Languages className="h-4 w-4" />
                    Diller
                  </h3>
                  <p className="mt-4 text-sm text-stone-300">{lawyer.languages}</p>
                </div>

                {lawyer.certifications.length > 0 && (
                  <div className="rounded-sm border border-ink-border bg-ink-900/40 p-7">
                    <h3 className="flex items-center gap-2 font-display text-sm uppercase tracking-[0.2em] text-gold-300">
                      <GraduationCap className="h-4 w-4" />
                      Eğitimler
                    </h3>
                    <ul className="mt-5 space-y-2.5">
                      {lawyer.certifications.map((item) => (
                        <li key={item} className="text-sm text-stone-300">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
