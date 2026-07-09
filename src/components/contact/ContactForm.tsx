"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { submitContactMessage, type ContactFormState } from "@/app/(site)/iletisim/actions";
import { cn } from "@/lib/utils";

const initialState: ContactFormState = { status: "idle" };

function Field({
  label,
  name,
  type = "text",
  required,
  error,
  textarea,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  error?: string;
  textarea?: boolean;
}) {
  const commonClass = cn(
    "w-full rounded-sm border bg-ink-950/60 px-4 py-3 text-sm text-stone-100 placeholder:text-stone-600 outline-none transition-colors focus:border-gold-500",
    error ? "border-red-500/60" : "border-ink-border"
  );
  return (
    <div>
      <label htmlFor={name} className="text-xs font-medium uppercase tracking-[0.14em] text-stone-400">
        {label} {required && <span className="text-gold-500">*</span>}
      </label>
      {textarea ? (
        <textarea
          id={name}
          name={name}
          rows={5}
          required={required}
          className={cn(commonClass, "mt-2 resize-none")}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          required={required}
          className={cn(commonClass, "mt-2")}
        />
      )}
      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="group inline-flex items-center justify-center gap-2 rounded-sm bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 bg-[length:200%_100%] px-8 py-4 text-sm font-semibold text-ink-950 transition-all duration-500 hover:bg-[position:100%_0] disabled:opacity-70"
    >
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Gönderiliyor
        </>
      ) : (
        <>
          Mesajı Gönder
          <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </>
      )}
    </button>
  );
}

export default function ContactForm() {
  const [state, formAction] = useActionState(submitContactMessage, initialState);

  if (state.status === "success") {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-sm border border-gold-700/40 bg-ink-900/40 px-8 py-16 text-center">
        <CheckCircle2 className="h-12 w-12 text-gold-400" />
        <h3 className="font-display text-xl font-semibold text-stone-50">Teşekkürler</h3>
        <p className="max-w-sm text-sm text-stone-400">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Ad Soyad" name="name" required error={state.fieldErrors?.name} />
        <Field label="E-posta" name="email" type="email" required error={state.fieldErrors?.email} />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Telefon" name="phone" type="tel" error={state.fieldErrors?.phone} />
        <Field label="Konu" name="subject" error={state.fieldErrors?.subject} />
      </div>
      <Field label="Mesajınız" name="message" required textarea error={state.fieldErrors?.message} />
      <SubmitButton />
    </form>
  );
}
