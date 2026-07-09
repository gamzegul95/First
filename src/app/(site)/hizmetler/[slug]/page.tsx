import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, PhoneCall } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { DynamicIcon } from "@/lib/icon-map";
import JsonLd from "@/components/seo/JsonLd";
import { serviceSchema, breadcrumbSchema } from "@/lib/structured-data";
import { getServiceBySlug, getServices, getSiteSettings } from "@/lib/data";

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return {};
  const path = `/hizmetler/${service.slug}`;
  return {
    title: service.title,
    description: service.summary,
    alternates: { canonical: path },
    openGraph: { title: service.title, description: service.summary, url: path },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [service, allServices, settings] = await Promise.all([
    getServiceBySlug(slug),
    getServices(),
    getSiteSettings(),
  ]);

  if (!service) notFound();

  const others = allServices.filter((s) => s.slug !== slug);
  const paragraphs = service.description.split("\n").filter(Boolean);

  return (
    <>
      <JsonLd data={serviceSchema(service)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Ana Sayfa", path: "/" },
          { name: "Çalışma Alanlarımız", path: "/hizmetler" },
          { name: service.title, path: `/hizmetler/${service.slug}` },
        ])}
      />
      <PageHero
        kicker="Çalışma Alanlarımız"
        title={service.title}
        description={service.summary}
        crumb={service.title}
      />

      <section className="relative bg-ink-950 py-20">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1.6fr_1fr]">
            <Reveal>
              <div className="flex h-16 w-16 items-center justify-center rounded-sm border border-gold-700/40 bg-gold-500/5 text-gold-400">
                <DynamicIcon name={service.icon} className="h-7 w-7" />
              </div>
              <div className="mt-8 space-y-5 text-base leading-relaxed text-stone-300">
                {paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <div className="mt-12 rounded-sm border border-gold-700/30 bg-gradient-to-br from-ink-900 to-ink-950 p-8">
                <h3 className="font-display text-xl font-semibold text-stone-50">
                  Bu konuda danışmanlığa mı ihtiyacınız var?
                </h3>
                <p className="mt-2 text-sm text-stone-400">
                  Dosyanızı değerlendirmemiz için ekibimizle iletişime geçin.
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
              <div className="rounded-sm border border-ink-border bg-ink-900/40 p-7">
                <h3 className="font-display text-sm uppercase tracking-[0.2em] text-gold-300">
                  Diğer Çalışma Alanlarımız
                </h3>
                <ul className="mt-5 space-y-1">
                  {others.map((s) => (
                    <li key={s.id}>
                      <Link
                        href={`/hizmetler/${s.slug}`}
                        className="group flex items-center gap-3 rounded-sm px-3 py-3 text-sm text-stone-300 transition-colors hover:bg-ink-800 hover:text-gold-200"
                      >
                        <DynamicIcon name={s.icon} className="h-4 w-4 shrink-0 text-gold-500" />
                        {s.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
