import { prisma } from "@/lib/prisma";

export async function getSiteSettings() {
  const existing = await prisma.siteSettings.findUnique({ where: { id: 1 } });
  if (existing) return existing;
  return prisma.siteSettings.create({ data: { id: 1 } });
}

export type WhyUsItem = { title: string; description: string };

export async function getHomeContent() {
  const existing = await prisma.homeContent.findUnique({ where: { id: 1 } });
  const row = existing ?? (await prisma.homeContent.create({ data: { id: 1 } }));
  const whyUsItems: WhyUsItem[] = JSON.parse(row.whyUsItems || "[]");
  return { ...row, whyUsItems };
}

export type ValueItem = { title: string; description: string };

export async function getAboutContent() {
  const existing = await prisma.aboutContent.findUnique({ where: { id: 1 } });
  const row = existing ?? (await prisma.aboutContent.create({ data: { id: 1 } }));
  const values: ValueItem[] = JSON.parse(row.values || "[]");
  return { ...row, values };
}

export async function getServices() {
  return prisma.service.findMany({ orderBy: { order: "asc" } });
}

export async function getServiceBySlug(slug: string) {
  return prisma.service.findUnique({ where: { slug } });
}

export async function getArticles() {
  return prisma.article.findMany({ orderBy: { publishedAt: "desc" } });
}

export async function getArticleBySlug(slug: string) {
  return prisma.article.findUnique({ where: { slug } });
}

export async function getLawyerProfile() {
  const existing = await prisma.lawyerProfile.findUnique({ where: { id: 1 } });
  const row = existing ?? (await prisma.lawyerProfile.create({ data: { id: 1 } }));
  const specializations: string[] = JSON.parse(row.specializations || "[]");
  const certifications: string[] = JSON.parse(row.certifications || "[]");
  return { ...row, specializations, certifications };
}
