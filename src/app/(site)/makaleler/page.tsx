import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/structured-data";
import { getArticles } from "@/lib/data";

const description =
  "AKKAYA HUKUK & DANIŞMANLIK'ın güncel mevzuat değişiklikleri ve hukuki gelişmeler üzerine hazırladığı makaleler.";

export const metadata: Metadata = {
  title: "Makaleler ve Güncel Bilgiler",
  description,
  alternates: { canonical: "/makaleler" },
  openGraph: { title: "Makaleler ve Güncel Bilgiler", description, url: "/makaleler" },
};

const dateFormatter = new Intl.DateTimeFormat("tr-TR", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Ana Sayfa", path: "/" },
          { name: "Makaleler ve Güncel Bilgiler", path: "/makaleler" },
        ])}
      />
      <PageHero
        kicker="Makaleler ve Güncel Bilgiler"
        title="Hukuki Gündemden Değerlendirmeler"
        description="Mevzuattaki güncel değişiklikleri ve uygulamadan edindiğimiz tecrübeleri, müvekkillerimiz için anlaşılır makaleler halinde paylaşıyoruz."
        crumb="Makaleler ve Güncel Bilgiler"
      />

      <section className="relative bg-ink-950 py-24">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, i) => (
              <Reveal key={article.id} delay={(i % 3) * 0.08}>
                <Link
                  href={`/makaleler/${article.slug}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-[3px] border border-gold-900/50 bg-gradient-to-b from-ink-900/70 to-ink-900/20 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-gold-600/40"
                >
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 z-20 h-px origin-left scale-x-0 bg-gradient-to-r from-transparent via-gold-400 to-transparent transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
                  />
                  {article.coverImageUrl && (
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={article.coverImageUrl}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-7">
                    <span className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.14em] text-gold-500/80">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {dateFormatter.format(new Date(article.publishedAt))}
                    </span>
                    <h2 className="mt-4 font-display text-xl font-bold text-foreground">
                      {article.title}
                    </h2>
                    <p className="mt-3 flex-1 text-[0.925rem] leading-relaxed text-foreground/50">
                      {article.summary}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium tracking-wide text-gold-400 transition-colors duration-500 group-hover:text-gold-200">
                      Devamını Oku
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
            {articles.length === 0 && (
              <p className="col-span-full rounded-[3px] border border-dashed border-ink-border p-12 text-center text-sm text-foreground/40">
                Henüz makale eklenmedi.
              </p>
            )}
          </div>
        </Container>
      </section>
    </>
  );
}
