import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, CalendarDays, PhoneCall } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import JsonLd from "@/components/seo/JsonLd";
import { articleSchema, breadcrumbSchema } from "@/lib/structured-data";
import { getArticleBySlug, getArticles, getSiteSettings } from "@/lib/data";

const dateFormatter = new Intl.DateTimeFormat("tr-TR", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};
  const path = `/makaleler/${article.slug}`;
  return {
    title: article.title,
    description: article.summary,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.summary,
      url: path,
      publishedTime: article.publishedAt.toISOString(),
      modifiedTime: article.updatedAt.toISOString(),
      images: article.coverImageUrl
        ? [{ url: article.coverImageUrl, width: 1200, height: 630, alt: article.title }]
        : undefined,
    },
  };
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [article, allArticles, settings] = await Promise.all([
    getArticleBySlug(slug),
    getArticles(),
    getSiteSettings(),
  ]);

  if (!article) notFound();

  const others = allArticles.filter((a) => a.slug !== slug).slice(0, 6);
  const paragraphs = article.content.split("\n").filter(Boolean);

  return (
    <>
      <JsonLd data={articleSchema(article, settings)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Ana Sayfa", path: "/" },
          { name: "Makaleler ve Güncel Bilgiler", path: "/makaleler" },
          { name: article.title, path: `/makaleler/${article.slug}` },
        ])}
      />
      <PageHero
        kicker="Makaleler ve Güncel Bilgiler"
        title={article.title}
        description={article.summary}
        crumb={article.title}
      />

      <section className="relative bg-ink-950 py-20">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1.6fr_1fr]">
            <Reveal>
              <span className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.14em] text-gold-500/80">
                <CalendarDays className="h-3.5 w-3.5" />
                {dateFormatter.format(new Date(article.publishedAt))}
              </span>

              {article.coverImageUrl && (
                <div className="relative mt-6 h-72 w-full overflow-hidden rounded-[3px] border border-gold-900/50 sm:h-96">
                  <Image
                    src={article.coverImageUrl}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

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
                  Diğer Makaleler
                </h3>
                <ul className="mt-5 space-y-1">
                  {others.map((a) => (
                    <li key={a.id}>
                      <Link
                        href={`/makaleler/${a.slug}`}
                        className="group flex flex-col gap-1 rounded-sm px-3 py-3 text-sm text-stone-300 transition-colors hover:bg-ink-800 hover:text-gold-200"
                      >
                        <span>{a.title}</span>
                        <span className="text-xs text-stone-500">
                          {dateFormatter.format(new Date(a.publishedAt))}
                        </span>
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
