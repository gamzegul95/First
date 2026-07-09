import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { DynamicIcon } from "@/lib/icon-map";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/structured-data";
import { getServices } from "@/lib/data";

const description =
  "AKKAYA HUKUK & DANIŞMANLIK'ın kurumsal, ticari, gayrimenkul, aile, iş ve icra-iflas hukuku alanlarındaki hizmetleri.";

export const metadata: Metadata = {
  title: "Çalışma Alanlarımız",
  description,
  alternates: { canonical: "/hizmetler" },
  openGraph: { title: "Çalışma Alanlarımız", description, url: "/hizmetler" },
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Ana Sayfa", path: "/" },
          { name: "Çalışma Alanlarımız", path: "/hizmetler" },
        ])}
      />
      <PageHero
        kicker="Çalışma Alanlarımız"
        title="Uzmanlık Alanlarımız"
        description="Kurumsal ve bireysel müvekkillerimize geniş bir hukuki hizmet yelpazesi sunuyoruz. Her alanda derinlemesine uzmanlık ve stratejik yaklaşımla yanınızdayız."
        crumb="Çalışma Alanlarımız"
      />

      <section className="relative bg-ink-950 py-24">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            {services.map((service, i) => (
              <Reveal key={service.id} delay={(i % 2) * 0.1}>
                <Link
                  href={`/hizmetler/${service.slug}`}
                  className="group relative flex h-full gap-6 overflow-hidden rounded-sm border border-ink-border bg-ink-900/40 p-8 transition-all duration-500 hover:-translate-y-1 hover:border-gold-600/50 hover:bg-ink-900"
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gold-500/0 blur-2xl transition-all duration-500 group-hover:bg-gold-500/10"
                  />
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-sm border border-gold-700/40 bg-gold-500/5 text-gold-400 transition-colors group-hover:border-gold-500 group-hover:text-gold-300">
                    <DynamicIcon name={service.icon} className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-semibold text-stone-100">
                      {service.title}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-stone-400">
                      {service.summary}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-gold-400 transition-colors group-hover:text-gold-200">
                      Detaylı Bilgi
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
