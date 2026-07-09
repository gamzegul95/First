"use server";

import { redirect } from "next/navigation";
import { verifyCredentials, createSession } from "@/lib/auth";

export type LoginState = {
  status: "idle" | "error";
  message?: string;
};

export async function loginAction(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");
  const redirectTo = String(formData.get("redirectTo") ?? "/admin");

  const valid = await verifyCredentials(username, password);
  if (!valid) {
    return { status: "error", message: "Kullanıcı adı veya şifre hatalı." };
  }

  await createSession(username);
  redirect(redirectTo || "/admin");
}
