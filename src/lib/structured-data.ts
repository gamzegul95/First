import { SITE_URL, absoluteUrl } from "@/lib/site";
import type { SiteSettings, LawyerProfile, Article, Service } from "@/generated/prisma/client";

// Turkish working-hours strings look like "Pazartesi - Cuma: 09:00 - 18:30".
// schema.org wants day codes + numeric times; parse on a best-effort basis
// and fall back to a sensible default rather than failing.
function parseOpeningHours(workingHours: string) {
  const match = workingHours.match(/(\d{1,2}):(\d{2})\s*-\s*(\d{1,2}):(\d{2})/);
  const opens = match ? `${match[1].padStart(2, "0")}:${match[2]}` : "09:00";
  const closes = match ? `${match[3].padStart(2, "0")}:${match[4]}` : "18:00";
  return {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens,
    closes,
  };
}

export function legalServiceSchema(settings: SiteSettings) {
  return {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "@id": `${SITE_URL}/#organization`,
    name: settings.firmName,
    description: settings.metaDescription,
    url: SITE_URL,
    image: absoluteUrl("/og-image.png"),
    logo: absoluteUrl("/logo-mark.png"),
    telephone: settings.phone,
    email: settings.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.address,
      addressCountry: "TR",
    },
    openingHoursSpecification: [parseOpeningHours(settings.workingHours)],
    sameAs: [settings.linkedin, settings.instagram].filter(Boolean),
    priceRange: "$$",
  };
}

type LawyerProfileWithParsedLists = Omit<LawyerProfile, "specializations" | "certifications"> & {
  specializations: string[];
  certifications: string[];
};

export function attorneySchema(lawyer: LawyerProfileWithParsedLists, settings: SiteSettings) {
  return {
    "@context": "https://schema.org",
    "@type": "Attorney",
    name: lawyer.name,
    jobTitle: lawyer.title,
    description: lawyer.bio.split("\n")[0],
    url: absoluteUrl("/hakkimizda/avukat"),
    image: lawyer.photoUrl ?? undefined,
    worksFor: {
      "@id": `${SITE_URL}/#organization`,
    },
    knowsLanguage: lawyer.languages.split(",").map((l) => l.trim()),
    knowsAbout: lawyer.specializations,
    telephone: settings.phone,
    email: settings.email,
  };
}

export function serviceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.title,
    name: service.title,
    description: service.summary,
    url: absoluteUrl(`/hizmetler/${service.slug}`),
    provider: {
      "@id": `${SITE_URL}/#organization`,
    },
    areaServed: {
      "@type": "Country",
      name: "Türkiye",
    },
    inLanguage: "tr-TR",
  };
}

export function articleSchema(article: Article, settings: SiteSettings) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.summary,
    image: article.coverImageUrl ? [article.coverImageUrl] : undefined,
    datePublished: article.publishedAt.toISOString(),
    dateModified: article.updatedAt.toISOString(),
    author: {
      "@type": "Organization",
      name: settings.firmName,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: settings.firmName,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/logo-mark.png"),
      },
    },
    mainEntityOfPage: absoluteUrl(`/makaleler/${article.slug}`),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
