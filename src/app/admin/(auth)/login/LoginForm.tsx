"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Loader2, LogIn } from "lucide-react";
import { loginAction, type LoginState } from "./actions";

const initialState: LoginState = { status: "idle" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 bg-[length:200%_100%] px-6 py-3.5 text-sm font-semibold text-ink-950 transition-all duration-500 hover:bg-[position:100%_0] disabled:opacity-70"
    >
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Giriş yapılıyor
        </>
      ) : (
        <>
          <LogIn className="h-4 w-4" />
          Giriş Yap
        </>
      )}
    </button>
  );
}

export default function LoginForm({ redirectTo }: { redirectTo: string }) {
  const [state, formAction] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="redirectTo" value={redirectTo} />
      <div>
        <label htmlFor="username" className="text-xs font-medium uppercase tracking-[0.14em] text-stone-400">
          Kullanıcı Adı
        </label>
        <input
          id="username"
          name="username"
          type="text"
          required
          autoComplete="username"
          className="mt-2 w-full rounded-sm border border-ink-border bg-ink-950/60 px-4 py-3 text-sm text-stone-100 outline-none transition-colors focus:border-gold-500"
        />
      </div>
      <div>
        <label htmlFor="password" className="text-xs font-medium uppercase tracking-[0.14em] text-stone-400">
          Şifre
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="mt-2 w-full rounded-sm border border-ink-border bg-ink-950/60 px-4 py-3 text-sm text-stone-100 outline-none transition-colors focus:border-gold-500"
        />
      </div>
      {state.status === "error" && (
        <p className="rounded-sm border border-red-500/30 bg-red-500/5 px-4 py-2.5 text-sm text-red-400">
          {state.message}
        </p>
      )}
      <SubmitButton />
    </form>
  );
}
