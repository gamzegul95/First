"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import type { ActionState } from "@/components/admin/ActionForm";

export async function updateAboutContent(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const data = {
    kicker: String(formData.get("kicker") ?? ""),
    title: String(formData.get("title") ?? ""),
    intro: String(formData.get("intro") ?? ""),
    storyTitle: String(formData.get("storyTitle") ?? ""),
    storyBody: String(formData.get("storyBody") ?? ""),
    missionTitle: String(formData.get("missionTitle") ?? ""),
    missionBody: String(formData.get("missionBody") ?? ""),
    visionTitle: String(formData.get("visionTitle") ?? ""),
    visionBody: String(formData.get("visionBody") ?? ""),
    values: String(formData.get("values") ?? "[]"),
  };

  await prisma.aboutContent.upsert({
    where: { id: 1 },
    update: data,
    create: { id: 1, ...data },
  });

  revalidatePath("/hakkimizda");
  return { status: "success", message: "Hakkımızda içeriği güncellendi." };
}
