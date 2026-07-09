"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function toggleMessageRead(id: string, isRead: boolean) {
  await prisma.contactMessage.update({ where: { id }, data: { isRead } });
  revalidatePath("/admin/mesajlar");
}

export async function deleteMessage(id: string) {
  await prisma.contactMessage.delete({ where: { id } });
  revalidatePath("/admin/mesajlar");
}
