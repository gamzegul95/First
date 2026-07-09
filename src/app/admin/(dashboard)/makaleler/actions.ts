"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";
import type { ActionState } from "@/components/admin/ActionForm";

function readArticleData(formData: FormData) {
  return {
    title: String(formData.get("title") ?? ""),
    summary: String(formData.get("summary") ?? ""),
    content: String(formData.get("content") ?? ""),
    coverImageUrl: String(formData.get("coverImageUrl") ?? "") || null,
    order: Number(formData.get("order") ?? 0),
  };
}

export async function createArticle(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const data = readArticleData(formData);
  if (!data.title.trim()) return { status: "error", message: "Başlık zorunludur." };

  const slug = slugify(data.title);
  const existing = await prisma.article.findUnique({ where: { slug } });
  if (existing) return { status: "error", message: "Bu başlıkla bir makale zaten mevcut." };

  const article = await prisma.article.create({ data: { ...data, slug } });
  revalidatePath("/makaleler");
  redirect(`/admin/makaleler/${article.id}?created=1`);
}

export async function updateArticle(
  id: string,
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const data = readArticleData(formData);
  if (!data.title.trim()) return { status: "error", message: "Başlık zorunludur." };

  await prisma.article.update({ where: { id }, data });
  revalidatePath("/makaleler");
  return { status: "success", message: "Makale güncellendi." };
}

export async function deleteArticle(id: string) {
  await prisma.article.delete({ where: { id } });
  revalidatePath("/makaleler");
  redirect("/admin/makaleler");
}
