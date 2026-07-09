"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import type { ActionState } from "@/components/admin/ActionForm";

export async function updateSiteSettings(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const data = {
    firmName: String(formData.get("firmName") ?? ""),
    tagline: String(formData.get("tagline") ?? ""),
    metaDescription: String(formData.get("metaDescription") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    whatsapp: String(formData.get("whatsapp") ?? ""),
    email: String(formData.get("email") ?? ""),
    address: String(formData.get("address") ?? ""),
    workingHours: String(formData.get("workingHours") ?? ""),
    mapEmbedUrl: String(formData.get("mapEmbedUrl") ?? "") || null,
    instagram: String(formData.get("instagram") ?? "") || null,
    linkedin: String(formData.get("linkedin") ?? "") || null,
  };

  await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: data,
    create: { id: 1, ...data },
  });

  revalidatePath("/", "layout");
  return { status: "success", message: "Site ayarları güncellendi." };
}
