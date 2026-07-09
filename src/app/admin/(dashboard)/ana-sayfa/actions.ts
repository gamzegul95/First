"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import type { ActionState } from "@/components/admin/ActionForm";

export async function updateHomeContent(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const data = {
    heroKicker: String(formData.get("heroKicker") ?? ""),
    heroTitle: String(formData.get("heroTitle") ?? ""),
    heroSubtitle: String(formData.get("heroSubtitle") ?? ""),
    heroCtaLabel: String(formData.get("heroCtaLabel") ?? ""),
    stat1Value: String(formData.get("stat1Value") ?? ""),
    stat1Label: String(formData.get("stat1Label") ?? ""),
    stat2Value: String(formData.get("stat2Value") ?? ""),
    stat2Label: String(formData.get("stat2Label") ?? ""),
    stat3Value: String(formData.get("stat3Value") ?? ""),
    stat3Label: String(formData.get("stat3Label") ?? ""),
    stat4Value: String(formData.get("stat4Value") ?? ""),
    stat4Label: String(formData.get("stat4Label") ?? ""),
    whyUsTitle: String(formData.get("whyUsTitle") ?? ""),
    whyUsSubtitle: String(formData.get("whyUsSubtitle") ?? ""),
    whyUsItems: String(formData.get("whyUsItems") ?? "[]"),
  };

  await prisma.homeContent.upsert({
    where: { id: 1 },
    update: data,
    create: { id: 1, ...data },
  });

  revalidatePath("/");
  return { status: "success", message: "Ana sayfa içeriği güncellendi." };
}
