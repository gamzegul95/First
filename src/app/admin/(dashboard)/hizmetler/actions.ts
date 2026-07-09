"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";
import type { ActionState } from "@/components/admin/ActionForm";

function readServiceData(formData: FormData) {
  return {
    title: String(formData.get("title") ?? ""),
    summary: String(formData.get("summary") ?? ""),
    description: String(formData.get("description") ?? ""),
    icon: String(formData.get("icon") ?? "Scale"),
    order: Number(formData.get("order") ?? 0),
  };
}

export async function createService(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const data = readServiceData(formData);
  if (!data.title.trim()) return { status: "error", message: "Başlık zorunludur." };

  const slug = slugify(data.title);
  const existing = await prisma.service.findUnique({ where: { slug } });
  if (existing) return { status: "error", message: "Bu başlıkla bir hizmet zaten mevcut." };

  const service = await prisma.service.create({ data: { ...data, slug } });
  revalidatePath("/hizmetler");
  revalidatePath("/");
  redirect(`/admin/hizmetler/${service.id}?created=1`);
}

export async function updateService(
  id: string,
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const data = readServiceData(formData);
  if (!data.title.trim()) return { status: "error", message: "Başlık zorunludur." };

  await prisma.service.update({ where: { id }, data });
  revalidatePath("/hizmetler");
  revalidatePath("/");
  return { status: "success", message: "Hizmet güncellendi." };
}

export async function deleteService(id: string) {
  await prisma.service.delete({ where: { id } });
  revalidatePath("/hizmetler");
  revalidatePath("/");
  redirect("/admin/hizmetler");
}
