"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import type { ActionState } from "@/components/admin/ActionForm";

function linesToJson(value: string): string {
  const items = value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  return JSON.stringify(items);
}

export async function updateLawyerProfile(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const data = {
    name: String(formData.get("name") ?? ""),
    title: String(formData.get("title") ?? ""),
    photoUrl: String(formData.get("photoUrl") ?? "") || null,
    bio: String(formData.get("bio") ?? ""),
    languages: String(formData.get("languages") ?? ""),
    specializations: linesToJson(String(formData.get("specializations") ?? "")),
    certifications: linesToJson(String(formData.get("certifications") ?? "")),
  };

  await prisma.lawyerProfile.upsert({
    where: { id: 1 },
    update: data,
    create: { id: 1, ...data },
  });

  revalidatePath("/hakkimizda");
  return { status: "success", message: "Avukat profili güncellendi." };
}
